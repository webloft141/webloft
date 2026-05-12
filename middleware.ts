import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getSupabasePublicEnv } from '@/lib/supabase/env'
import type { Database } from '@/lib/supabase/types'

// Supabase SSR auth cookie syncing.
// This prevents "random logouts" and broken sessions on refresh, especially when
// auth cookies are chunked (sb-*-auth-token.0 / .1 / ...).
export async function middleware(request: NextRequest) {
  const { supabaseUrl, supabaseAnonKey } = getSupabasePublicEnv()

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
      },
    },
  })

  // Touch auth so token refresh + cookie rotation happens consistently.
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    // Skip next internals and common static assets
    '/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon.png|manifest.webmanifest|robots.txt|sitemap.xml).*)',
  ],
}
