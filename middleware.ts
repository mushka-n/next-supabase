import { middleware as supabaseMiddleware } from '@/server/db/middleware';
import { type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  request.headers.set('x-pathname', request.nextUrl.pathname);
  return await supabaseMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
