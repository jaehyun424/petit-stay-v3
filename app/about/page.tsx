"use client";

import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-6 py-16">
        <h1 className="text-[26px] font-semibold text-[var(--color-text-primary)]">
          {t("about.title")}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
          {t("about.intro1")}
        </p>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
          {t("about.intro2")}
        </p>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
          {t("about.intro3")}
        </p>

        <h2 className="mt-12 text-lg font-semibold text-[var(--color-text-primary)]">
          {t("about.roleTitle")}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-text-secondary)]">
          {t("about.roleDesc")}
        </p>

        <h2 className="mt-12 text-lg font-semibold text-[var(--color-text-primary)]">
          {t("about.promiseTitle")}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-text-secondary)]">
          {t("about.promiseDesc")}
        </p>

        <h2 className="mt-12 text-lg font-semibold text-[var(--color-text-primary)]">
          {t("about.contactTitle")}
        </h2>
        <p className="mt-3 text-base text-[var(--color-text-secondary)]">
          {t("about.contactEmail")}
        </p>
      </main>
      <Footer />
    </div>
  );
}
