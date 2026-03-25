import { getRequestConfig } from 'next-intl/server';

export const locales = ['ru', 'en'] as const;
export const defaultLocale = 'ru';

export default getRequestConfig(async ({ requestLocale }) => {
  // Ожидаем locale из параметров запроса
  let locale = await requestLocale;

  // Если локаль не поддерживается, используем дефолтную
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
