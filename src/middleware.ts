import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const locale = routing.locales.includes(segments[0] as typeof routing.locales[number])
    ? (segments[0] as 'en' | 'ar')
    : routing.defaultLocale;

  // Define public and protected routes
  const publicRoutes = [`/login`, `/register`, `/forget-password`, `/reset-password`];
  const protectedRoutes = [`/`];

  // Determine if the route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === `/${locale}${route}`
  );

  // Determine if the route is protected (supports subpaths)
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname.startsWith(`/${locale}${route}`)
  );

  if (isPublicRoute) {
    return intlMiddleware(request);
  }

  // if (!token && isProtectedRoute) {
  //   // No token in cookies, redirect to login
  //   return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  // }

  // If token exists or route is not protected, continue
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
