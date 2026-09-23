// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // If Supabase is not configured yet (e.g. initial setup), allow access and show warnings in console
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id')) {
    console.warn('Middleware: Supabase is not configured. Access is temporarily allowed to bypass locks during configuration.');
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Protect the admin dashboard route
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
      if (!user) {
        // User not logged in, redirect to login page
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/admin/login';
        // Keep the original requested dashboard URL as a redirect query param
        redirectUrl.searchParams.set('next', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }
  } catch (error) {
    console.error('Middleware error checking authentication:', error);
  }

  return response;
}

export const config = {
  // Run middleware only on admin routes to save execution overhead
  matcher: ['/admin/:path*'],
};
