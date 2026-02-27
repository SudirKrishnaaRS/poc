import type { NextRequest } from "next/server";
import { auth0 } from "./auth0";

// This function runs on matched incoming requests before pages/routes
export async function middleware(request: NextRequest) {
  // Auth0 SDK handles:
  // - auth routes (/auth/login, /auth/logout, /auth/callback, etc.)
  // - session cookie handling
  // - user session refresh/validation behavior
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    // Run middleware for almost all routes, except static assets and metadata files
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
