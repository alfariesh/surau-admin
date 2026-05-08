import type {NextRequest} from "next/server";

import {NextResponse} from "next/server";

import {SESSION_COOKIE_NAME} from "./lib/auth/constants";
import {normalizeNextPath} from "./lib/auth/redirects";

export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE_NAME)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  const nextPath = normalizeNextPath(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    "/admin",
  );

  loginUrl.searchParams.set("next", nextPath);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
