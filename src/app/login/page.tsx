import type {Metadata} from "next";

import {redirect} from "next/navigation";

import {getCurrentUserFromSession} from "../../lib/auth/session";
import {normalizeNextPath} from "../../lib/auth/redirects";

import {LoginForm} from "./login-form";

export const metadata: Metadata = {
  title: "Login - Surau Admin",
};

interface LoginPageProps {
  searchParams: Promise<{
    next?: string | string[];
  }>;
}

export default async function LoginPage({searchParams}: LoginPageProps) {
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextPath = normalizeNextPath(rawNext, "/admin");
  const user = await getCurrentUserFromSession();

  if (user) {
    redirect(nextPath);
  }

  return <LoginForm nextPath={nextPath} />;
}
