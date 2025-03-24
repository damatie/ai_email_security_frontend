// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Retrieve the token from NextAuth's secure cookie.
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  // Handle root URL: if token exists, go to dashboard; otherwise, to login.
  if (pathname === '/') {
    return token
      ? NextResponse.redirect(new URL('/dashboard', request.url))
      : NextResponse.redirect(new URL('/login', request.url));
  }

  // List of public routes
  const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ];

  // Handle authenticated users trying to access public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // For protected routes (like /dashboard), redirect to login if no token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Otherwise, allow the authenticated user to access protected routes
  return NextResponse.next();
}

// Apply middleware to both public and protected routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/',
  ],
};
