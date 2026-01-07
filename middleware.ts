import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
 
// This example protects all routes including api/trpc routes
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/api/webhook(.*)",
  ],
  ignoredRoutes: [
    "/api/webhook(.*)",
  ],
  afterAuth(auth, req) {
    // Block access to /sign-up
    if (req.nextUrl.pathname.startsWith('/sign-up')) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    
    // If user is signed in but not with the allowed email, sign them out
    if (auth.userId && auth.sessionClaims?.email !== 'lmreyes@zerovariance.com') {
      return NextResponse.redirect(new URL('/sign-out', req.url));
    }
    
    // Redirect to home if trying to access sign-in while already signed in
    if (auth.userId && req.nextUrl.pathname.startsWith('/sign-in')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
