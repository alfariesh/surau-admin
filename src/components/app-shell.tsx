"use client";

import type {ReactNode} from "react";
import type {AuthUser} from "../lib/auth/types";

import {AppLayout} from "@heroui-pro/react";
import {usePathname, useRouter} from "next/navigation";
import {useCallback, useMemo} from "react";

import {FOOTER_ITEMS, NAV_ITEMS} from "../nav-items";

import {DashboardNavbar} from "./dashboard-navbar";
import {DashboardSidebar} from "./dashboard-sidebar";

// Combined lookup so every registered route maps to its label in O(1).
// Hoisted per `server-hoist-static-io` — computed once at module load.
const ROUTE_LABELS = new Map<string, string>(
  [...NAV_ITEMS, ...FOOTER_ITEMS].map((item) => [item.href, item.label]),
);

function getUserFirstName(user: AuthUser) {
  const fallback = user.email?.split("@")[0] ?? "Admin";
  const name = user.displayName?.trim() || fallback;

  return name.split(/\s+/)[0] ?? fallback;
}

export interface AppShellProps {
  children: ReactNode;
  user: AuthUser;
  /**
   * Prefix used for navigation and active-state matching.
   * Empty in the standalone template; `/templates/dashboard` when embedded in the frontend preview.
   */
  basePath?: string;
}

export function AppShell({basePath = "", children, user}: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const homeGreeting = `Good morning, ${getUserFirstName(user)}`;

  // Primitive dep (basePath) + stable `router` ref → stable callback.
  const navigate = useCallback((href: string) => router.push(basePath + href), [router, basePath]);
  const logout = useCallback(async () => {
    await fetch("/api/auth/session", {
      method: "DELETE",
    });
    router.replace("/login");
    router.refresh();
  }, [router]);

  // Derive the navbar title from the current route during render —
  // no useState + useEffect mirror (`rerender-derived-state-no-effect`).
  const title = useMemo(() => {
    const relative = pathname.slice(basePath.length) || "/";

    if (relative === "/" || relative === "") return homeGreeting;

    return ROUTE_LABELS.get(relative) ?? homeGreeting;
  }, [pathname, basePath, homeGreeting]);

  return (
    <AppLayout
      navbar={<DashboardNavbar title={title} />}
      navigate={navigate}
      sidebar={
        <DashboardSidebar basePath={basePath} pathname={pathname} user={user} onLogout={logout} />
      }
      sidebarCollapsible="offcanvas"
    >
      {children}
    </AppLayout>
  );
}
