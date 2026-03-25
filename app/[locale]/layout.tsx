import { locales } from '@/i18n/request';
import { ToastProvider } from '@/context/toast-context';
import { ToastContainer } from '@/components/ui/toast-container';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/context/ThemeContext';
import { UIThemeProvider } from '@/context/UIThemeContext';
import { createClient } from '@/lib/supabase/server';
import '../globals.css';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    return {
      title: 'Персонажка | My Own Story',
      description: 'Создавайте уникальные сказки для своих детей'
    };
  }
  
  const messages: any = (await import(`../../messages/${locale}.json`)).default;

  return {
    title: messages.App?.title || 'Персонажка | My Own Story',
    description: messages.App?.description || 'Создавайте уникальные сказки для своих детей',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: messages.App?.title || 'Персонажка'
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  // Проверяем язык из профиля пользователя
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let activeLocale = locale;

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('language')
      .eq('id', user.id)
      .single();
    
    if (profile?.language && locales.includes(profile.language as any) && profile.language !== locale) {
      // Для серверного компонента используем locale из params
      const newPath = `/${profile.language}`;
      redirect(newPath);
    }
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <UIThemeProvider>
            <ToastProvider>
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
              <ToastContainer />
            </ToastProvider>
          </UIThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
