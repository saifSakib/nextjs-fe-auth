import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { authRoutes,privateRoutes,publicRoutes,defaultLoginRedirect,apiAuthPrefix } from "./routes";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const nextUrl = req.nextUrl;

  const isPrivateRoute = privateRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiAuthPrefix = pathname.startsWith(apiAuthPrefix);
  
  if (isPublicRoute || isApiAuthPrefix) {
    return;
  }
  
  if (isPrivateRoute) {
    if (!isLoggedIn) {
        return Response.redirect(new URL ("/auth/login",nextUrl))
    }
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
        return Response.redirect(new URL(defaultLoginRedirect,nextUrl))
    }
    return;
  }

  return;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
