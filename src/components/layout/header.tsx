"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@/src/lib/supabase/client";
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
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  function handleLocaleChange(locale: string) {
    document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
    window.location.reload();
  }

  return (
    <header className="border-b border-[#DDDDDD] bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-[#222222]">
          Petit Stay
        </Link>
        <div className="flex items-center gap-4">
          <select
            value={currentLocale}
            onChange={(e) => handleLocaleChange(e.target.value)}
            className="cursor-pointer rounded border border-[#DDDDDD] bg-white px-2 py-1 text-sm text-[#222222]"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
          {user ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer text-sm text-[#222222] underline"
            >
              {t('common.logout')}
            </button>
          ) : (
            <Link href="/login" className="text-sm text-[#222222] underline">
              {t('common.login')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
