"use client";

import type {FormEvent} from "react";
import type {Auth, User} from "firebase/auth";

import {FirebaseError} from "firebase/app";
import {
  GoogleAuthProvider,
  OAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useMemo, useState, useTransition} from "react";

import {Button, Card, Checkbox, FieldError, Input, Label, Separator, TextField, toast} from "@heroui/react";

import {getFirebaseClientAuth} from "../../lib/firebase/client";
import {normalizeNextPath} from "../../lib/auth/redirects";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

const appleProvider = new OAuthProvider("apple.com");

appleProvider.addScope("email");
appleProvider.addScope("name");

const AUTH_NEXT_PATH_KEY = "surau-admin-auth-next-path";

type LoginMode = "password" | "reset";
type ProviderName = "Google" | "Apple";

interface LoginFormProps {
  nextPath: string;
}

function getFirebaseErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return "Unable to sign in right now. Please try again.";
  }

  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Email or password is incorrect.";
    case "auth/popup-closed-by-user":
      return "The sign-in window was closed before completion.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment before trying again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Unable to sign in right now. Please try again.";
  }
}

function getDisplayErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) return getFirebaseErrorMessage(error);
  if (error instanceof Error) return error.message;

  return "Unable to sign in right now. Please try again.";
}

async function exchangeUserForSession(user: User) {
  const idToken = await user.getIdToken(true);
  const response = await fetch("/api/auth/session", {
    body: JSON.stringify({idToken}),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {message?: string} | null;

    throw new Error(body?.message ?? "This account is not allowed to access the dashboard.");
  }
}

export function LoginForm({nextPath}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [mode, setMode] = useState<LoginMode>("password");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<ProviderName | null>(null);
  const [isPending, startTransition] = useTransition();
  const safeNextPath = useMemo(() => normalizeNextPath(nextPath), [nextPath]);

  const completeSignIn = useCallback(
    async (user: User) => {
      const auth = getFirebaseClientAuth();
      const storedNextPath = normalizeNextPath(
        window.sessionStorage.getItem(AUTH_NEXT_PATH_KEY),
        safeNextPath,
      );

      await exchangeUserForSession(user);
      await signOut(auth);
      window.sessionStorage.removeItem(AUTH_NEXT_PATH_KEY);

      toast.success("Signed in", {
        description: "Welcome back to Surau Admin.",
      });

      router.replace(storedNextPath);
      router.refresh();
    },
    [router, safeNextPath],
  );

  useEffect(() => {
    let isMounted = true;
    let hasHandledUser = false;
    let auth: Auth;

    try {
      auth = getFirebaseClientAuth();
    } catch {
      return () => {
        isMounted = false;
      };
    }

    const handleUser = (user: User) => {
      if (!isMounted || hasHandledUser) return;

      hasHandledUser = true;

      startTransition(async () => {
        try {
          await completeSignIn(user);
        } catch (error) {
          if (!isMounted) return;

          const message = getDisplayErrorMessage(error);

          setErrorMessage(message);
          toast.danger("Sign-in failed", {
            description: message,
          });
        }
      });
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) handleUser(user);
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result) handleUser(result.user);
      })
      .catch((error: unknown) => {
        if (!isMounted) return;

        const message = getFirebaseErrorMessage(error);

        setErrorMessage(message);
      });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [completeSignIn]);

  const submitPasswordLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const credential = await signInWithEmailAndPassword(
          getFirebaseClientAuth(),
          email.trim(),
          password,
        );

        await completeSignIn(credential.user);
      } catch (error) {
        const message = getDisplayErrorMessage(error);

        setErrorMessage(message);
        toast.danger("Sign-in failed", {
          description: message,
        });
      }
    });
  };

  const submitPasswordReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    startTransition(async () => {
      try {
        await sendPasswordResetEmail(getFirebaseClientAuth(), email.trim(), {
          url: `${window.location.origin}/login`,
        });
      } catch {
        // Keep the response generic so reset attempts cannot enumerate users.
      }

      toast.success("Check your email", {
        description: "If the account exists, Firebase will send password reset instructions.",
      });
      setMode("password");
    });
  };

  const signInWithProvider = (providerName: ProviderName) => {
    setErrorMessage(null);
    setActiveProvider(providerName);

    startTransition(async () => {
      const provider = providerName === "Google" ? googleProvider : appleProvider;

      try {
        window.sessionStorage.setItem(AUTH_NEXT_PATH_KEY, safeNextPath);
        const credential = await signInWithPopup(getFirebaseClientAuth(), provider);

        await completeSignIn(credential.user);
      } catch (error) {
        if (error instanceof FirebaseError && error.code === "auth/popup-blocked") {
          await signInWithRedirect(getFirebaseClientAuth(), provider);

          return;
        }

        const message = getDisplayErrorMessage(error);

        setErrorMessage(message);
        toast.danger("Sign-in failed", {
          description: message,
        });
        setActiveProvider(null);
      }
    });
  };

  const isBusy = isPending;
  const isResetMode = mode === "reset";

  return (
    <main className="min-h-dvh bg-background">
      <section className="grid min-h-dvh overflow-hidden lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col bg-background">
          <div className="flex flex-1 items-center justify-center px-6 py-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-separator/70 bg-surface-secondary px-3 py-1 text-xs font-medium text-foreground/70">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    SA
                  </span>
                  Surau Admin
                </p>

                <div className="space-y-2">
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                    {isResetMode ? "Reset Password" : "Welcome back"}
                  </h1>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {isResetMode
                      ? "Enter your admin email to receive reset instructions."
                      : "Welcome back! Please enter your details."}
                  </p>
                </div>
              </div>

              <Card className="rounded-2xl border border-separator/70 bg-surface">
                <Card.Content className="flex flex-col gap-6 p-6 sm:p-7">
                  {!isResetMode ? (
                    <div className="grid gap-3">
                      <Button
                        fullWidth
                        isDisabled={isBusy}
                        isPending={activeProvider === "Google"}
                        type="button"
                        variant="outline"
                        onPress={() => signInWithProvider("Google")}
                      >
                        Continue with Google
                      </Button>
                      <Button
                        fullWidth
                        isDisabled={isBusy}
                        isPending={activeProvider === "Apple"}
                        type="button"
                        variant="outline"
                        onPress={() => signInWithProvider("Apple")}
                      >
                        Continue with Apple
                      </Button>
                    </div>
                  ) : null}

                  {!isResetMode ? (
                    <div className="flex items-center gap-3">
                      <Separator className="h-px flex-1" />
                      <span className="text-xs text-foreground/70">or</span>
                      <Separator className="h-px flex-1" />
                    </div>
                  ) : null}

                  <form className="flex flex-col gap-4" onSubmit={isResetMode ? submitPasswordReset : submitPasswordLogin}>
                    <TextField
                      isRequired
                      className="w-full"
                      isDisabled={isBusy}
                      name="email"
                      type="email"
                      value={email}
                      onChange={setEmail}
                    >
                      <Label>Email</Label>
                      <Input autoComplete="email" placeholder="admin@example.com" />
                    </TextField>

                    {!isResetMode ? (
                      <TextField
                        isRequired
                        className="w-full"
                        isDisabled={isBusy}
                        isInvalid={Boolean(errorMessage)}
                        name="password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                      >
                        <Label>Password</Label>
                        <Input autoComplete="current-password" placeholder="Enter your password" />
                        <FieldError>{errorMessage}</FieldError>
                      </TextField>
                    ) : null}

                    {isResetMode ? (
                      <p className="text-danger text-sm">{errorMessage}</p>
                    ) : null}

                    <Button fullWidth isPending={isBusy} type="submit">
                      {isResetMode ? "Send Reset Link" : "Sign in"}
                    </Button>

                    {!isResetMode ? (
                      <div className="flex items-center justify-between">
                        <Checkbox
                          isDisabled={isBusy}
                          isSelected={rememberMe}
                          onChange={setRememberMe}
                        >
                          Remember for 30 days
                        </Checkbox>
                        <Button
                          isDisabled={isBusy}
                          size="sm"
                          type="button"
                          variant="ghost"
                          onPress={() => {
                            setErrorMessage(null);
                            setMode("reset");
                          }}
                        >
                          Forgot password
                        </Button>
                      </div>
                    ) : null}

                    {isResetMode ? (
                      <Button
                        isDisabled={isBusy}
                        type="button"
                        variant="ghost"
                        onPress={() => {
                          setErrorMessage(null);
                          setMode("password");
                        }}
                      >
                        Back to Login
                      </Button>
                    ) : null}
                  </form>
                </Card.Content>
              </Card>
            </div>
          </div>

          <footer className="hidden p-6 pt-8 text-center text-sm text-foreground/60 lg:block">
            <p>© Surau Admin 2026</p>
          </footer>
        </div>

        <div className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,_255,_255,_0.2)_1px,_transparent_0)] bg-[size:26px_26px]" />
          <Image
            fill
            alt="Surau public library and dashboard preview"
            className="object-cover"
            sizes="50vw"
            src="/marketing/hero-surau.png"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-background/40 to-background/80" />
          <div className="absolute inset-0 flex items-end p-10">
            <div>
              <p className="text-2xl font-semibold text-white drop-shadow">Surau Admin Console</p>
              <p className="mt-2 max-w-sm text-sm text-white/90">
                Secure, fast access for management dashboards and reporting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
