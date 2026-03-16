"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@/src/lib/supabase/client";
import { Logo } from "@/src/components/ui/logo";
import type { User } from "@supabase/supabase-js";

const languages = [
  { code: "en", label: "EN" },
  { code: "ja", label: "JA" },
  { code: "zh-TW", label: "中文" },
  { code: "ko", label: "한국어" },
] as const;

export function Header() {
  const t = useTranslations();
  const [user, setUser] = useState<User | null>(null);
  const [currentLocale, setCurrentLocale] = useState("en");

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    }).catch(() => {
      // Auth check failed (network error) — stay logged out
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Read locale from cookie
    const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
    if (match?.[1]) {
      setCurrentLocale(match[1]);
    }

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Sign out failed — redirect anyway
    }
    window.location.href = "/";
  }

  function handleLocaleChange(locale: string) {
    document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
    window.location.reload();
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-text-primary)] focus:shadow-lg"
      >
        {t('header.skipToMain')}
      </a>
      <header className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <Link href="/" aria-label={t('header.homeLabel')}>
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <select
            value={currentLocale}
            onChange={(e) => handleLocaleChange(e.target.value)}
            aria-label={t('header.selectLanguage')}
            className="cursor-pointer rounded border border-[var(--color-border)] bg-white px-2 py-1 text-sm text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
          {user ? (
            <>
              <Link href="/my" className="text-sm text-[var(--color-text-primary)] underline">
                {t('header.myPage')}
              </Link>
              <button
                onClick={handleLogout}
                className="cursor-pointer text-sm text-[var(--color-text-primary)] underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] rounded"
              >
                {t('common.logout')}
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm text-[var(--color-text-primary)] underline">
              {t('common.login')}
            </Link>
          )}
        </div>
      </div>
    </header>
    </>
  );
}
