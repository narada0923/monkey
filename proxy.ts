import { NextResponse } from "next/server";

import { getAuth0Client } from "@/lib/auth0";
import { hasAuth0Env } from "@/lib/env";

export async function proxy(request: Request) {
  if (!hasAuth0Env()) {
    return NextResponse.next();
  }

  return getAuth0Client().middleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
