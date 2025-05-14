import { ROUTES } from '@/constants/routes';
import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const user = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith('/protected') && user.error) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
  }

  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname === '/protected'
  ) {
    return NextResponse.redirect(
      new URL(user.error ? ROUTES.SIGN_IN : ROUTES.HOME, request.url)
    );
  }

  return response;
};
