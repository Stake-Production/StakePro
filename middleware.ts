import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 🔒 Protect only /users route
  if (pathname === "/users") {
    const key = searchParams.get("key");
    const expectedKey = process.env.USERS_PAGE_KEY;

    // ❌ Block if key is missing or invalid
    if (!expectedKey || key !== expectedKey) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 🎯 Apply middleware ONLY to /users
export const config = {
  matcher: ["/users"],
};
