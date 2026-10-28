import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

// Do not import @clerk/nextjs at module scope. On Vercel's edge runtime that
// import throws while the module is evaluated when the publishable key is
// missing, and every request dies before this function runs.
export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (!publishableKey || !secretKey) {
    if (isDashboard) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    const response = NextResponse.next();
    response.headers.set("x-gm-auth", "off");
    return response;
  }

  const { clerkMiddleware } = await import("@clerk/nextjs/server");
  const withClerk = clerkMiddleware(async (auth, request) => {
    if (request.nextUrl.pathname.startsWith("/dashboard")) await auth.protect();
  });
  return withClerk(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
