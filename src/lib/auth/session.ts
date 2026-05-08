import "server-only";

import type {DecodedIdToken} from "firebase-admin/auth";

import {cookies} from "next/headers";

import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_MS,
} from "./constants";
import type {AuthUser} from "./types";

import {getFirebaseAdminAuth} from "../firebase/admin";

function parseAllowlist() {
  return new Set(
    (process.env.ADMIN_EMAIL_ALLOWLIST ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAllowedAdminEmail(email: string | null | undefined) {
  if (!email) return false;

  return parseAllowlist().has(email.toLowerCase());
}

export function tokenToAuthUser(token: DecodedIdToken): AuthUser {
  return {
    displayName: typeof token.name === "string" ? token.name : null,
    email: typeof token.email === "string" ? token.email : null,
    emailVerified: token.email_verified === true,
    photoURL: typeof token.picture === "string" ? token.picture : null,
    uid: token.uid,
  };
}

export async function createVerifiedSessionCookie(idToken: string) {
  const auth = getFirebaseAdminAuth();
  const decodedToken = await auth.verifyIdToken(idToken, true);

  if (!isAllowedAdminEmail(decodedToken.email)) {
    throw new Error("Email is not allowed to access this admin dashboard.");
  }

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_MAX_AGE_MS,
  });

  return {
    sessionCookie,
    user: tokenToAuthUser(decodedToken),
  };
}

export async function getCurrentUserFromSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) return null;

  try {
    const decodedToken = await getFirebaseAdminAuth().verifySessionCookie(sessionCookie, true);

    if (!isAllowedAdminEmail(decodedToken.email)) return null;

    return tokenToAuthUser(decodedToken);
  } catch {
    return null;
  }
}
