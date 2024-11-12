import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')

    const authPages = ["/login", "/signup"];
    const protectedPaths = ["/cart"];

    const isAuthPage = authPages.includes(request.nextUrl.pathname);
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));
    if (!token && isProtectedPath) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: ['/login', '/signup', '/cart/:path*'],
}