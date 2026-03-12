"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Logo } from "@/src/components/ui/logo";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[#222222]">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <Logo variant="white" className="h-6" />
        <nav aria-label="Footer" className="mt-4 flex flex-wrap gap-6 text-sm text-[#B0B0B0]">
          <Link href="/about" className="transition-colors hover:text-white">
            {t('footer.about')}
          </Link>
          <Link href="/help" className="transition-colors hover:text-white">
            {t('footer.help')}
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-white">
            {t('footer.privacy')}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            {t('footer.terms')}
          </Link>
        </nav>
        <p className="mt-6 text-sm text-[#B0B0B0]">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
