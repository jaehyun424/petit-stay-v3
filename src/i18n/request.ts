import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { locales, defaultLocale, type Locale } from './config';

function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

function matchLocaleFromHeader(acceptLanguage: string): Locale | null {
  const preferred = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0].trim().toLowerCase());

  for (const lang of preferred) {
    // Exact match (case-insensitive comparison)
    const exact = locales.find((l) => l.toLowerCase() === lang);
    if (exact) return exact;

    // Prefix match: "ja-jp" → "ja", "zh" → "zh-TW"
    const prefix = locales.find(
      (l) =>
        lang.startsWith(l.toLowerCase().split('-')[0] + '-') ||
        l.toLowerCase().startsWith(lang + '-') ||
        l.toLowerCase().split('-')[0] === lang
    );
    if (prefix) return prefix;
  }

  return null;
}

export default getRequestConfig(async () => {
  // 1. Cookie
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return {
      locale: cookieLocale,
      messages: (await import(`../../messages/${cookieLocale}.json`)).default,
    };
  }

  // 2. Accept-Language header
  const headerStore = await headers();
  const acceptLanguage = headerStore.get('accept-language');
  if (acceptLanguage) {
    const matched = matchLocaleFromHeader(acceptLanguage);
    if (matched) {
      return {
        locale: matched,
        messages: (await import(`../../messages/${matched}.json`)).default,
      };
    }
  }

  // 3. Default
  return {
    locale: defaultLocale,
    messages: (await import(`../../messages/${defaultLocale}.json`)).default,
  };
});
