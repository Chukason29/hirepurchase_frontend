import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const unguardedRoutes = ["/", "/login", "/otp", "/forgot-password", "/forgot-password/otp"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if route is unguarded
  if (unguardedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get token from cookies (better than localStorage for SSR)
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // Redirect to login if no token
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static files & API
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
