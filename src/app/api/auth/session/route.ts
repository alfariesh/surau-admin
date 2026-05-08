import {NextResponse} from "next/server";

import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "../../../../lib/auth/constants";
import {createVerifiedSessionCookie} from "../../../../lib/auth/session";

interface SessionRequestBody {
  idToken?: unknown;
}

function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function POST(request: Request) {
  let body: SessionRequestBody;

  try {
    body = (await request.json()) as SessionRequestBody;
  } catch {
    return NextResponse.json({message: "Invalid JSON body."}, {status: 400});
  }

  if (typeof body.idToken !== "string" || body.idToken.length === 0) {
    return NextResponse.json({message: "Missing Firebase ID token."}, {status: 400});
  }

  try {
    const {sessionCookie, user} = await createVerifiedSessionCookie(body.idToken);
    const response = NextResponse.json({user});

    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    const response = NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to create an admin session for this account.",
      },
      {status: 403},
    );

    clearSessionCookie(response);

    return response;
  }
}

export async function DELETE() {
  const response = NextResponse.json({ok: true});

  clearSessionCookie(response);

  return response;
}
