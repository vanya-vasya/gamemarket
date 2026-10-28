import { NextResponse, type NextRequest } from "next/server";

// Clerk stays out of this file on purpose. Importing @clerk/nextjs here is
// evaluated on Vercel's edge runtime and crashes every request when
// NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is unset. When both Clerk keys are added
// to the project, switch this back to clerkMiddleware so auth() can see the
// session. Until then, dashboard routes bounce to /login.
export function middleware(req: NextRequest) {
  const configured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );
  if (!configured && req.nextUrl.pathname.startsWith("/dashboard")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  const response = NextResponse.next();
  if (!configured) response.headers.set("x-gm-auth", "off");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
