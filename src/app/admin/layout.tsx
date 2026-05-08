import type {ReactNode} from "react";

import {redirect} from "next/navigation";

import {AppShell} from "../../components/app-shell";
import {getCurrentUserFromSession} from "../../lib/auth/session";

export default async function AppGroupLayout({children}: {children: ReactNode}) {
  const user = await getCurrentUserFromSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <AppShell basePath="/admin" user={user}>
      {children}
    </AppShell>
  );
}
