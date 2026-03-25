import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always'
});

export async function middleware(request: NextRequest) {
  // 1. Handle localization first
  const response = nextIntlMiddleware(request);

  // 2. Handle Supabase Auth
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: any[]) {
          cookiesToSet.forEach(({ name, value, options }: any) =>
            request.cookies.set(name, value)
          )
          cookiesToSet.forEach(({ name, value, options }: any) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  
  // Обработка языка из профиля пользователя
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('language')
      .eq('id', user.id)
      .single();
    
    if (profile?.language && locales.includes(profile.language as any)) {
      const currentLocale = request.nextUrl.pathname.split('/')[1];
      if (currentLocale !== profile.language) {
        const newPath = `/${profile.language}${request.nextUrl.pathname.replace(`/${currentLocale}`, '')}`;
        return NextResponse.redirect(new URL(newPath, request.url))
      }
    }
  }
  
  // Helper to check if path is public regardless of locale
  const isPublicPath = (pathname: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|ru)/, '') || '/'
    return (
      pathWithoutLocale.startsWith('/login') || 
      pathWithoutLocale.startsWith('/auth/callback') || 
      pathWithoutLocale === '/'
    )
  }

  const isAuthPage = (pathname: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|ru)/, '') || '/'
    return pathWithoutLocale.startsWith('/login')
  }

  if (!user && !isPublicPath(path)) {
    const localeMatch = path.match(/^\/(en|ru)/);
    const locale = localeMatch ? localeMatch[0] : '/ru';
    return NextResponse.redirect(new URL(`${locale}/login`, request.url))
  }

  if (user && isAuthPage(path)) {
    const localeMatch = path.match(/^\/(en|ru)/);
    const locale = localeMatch ? localeMatch[0] : '/ru';
    return NextResponse.redirect(new URL(`${locale}/`, request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
