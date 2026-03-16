"use client";

import { useTranslations } from "next-intl";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-[var(--color-text-secondary)]">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-6 py-16">
        <h1 className="text-[26px] font-semibold text-[var(--color-text-primary)]">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-light)]">
          {t("lastUpdated")}
        </p>
        <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
          {t("intro")}
        </p>

        <Section title={t("section1Title")}>
          <p>{t("section1")}</p>
        </Section>

        <Section title={t("section2Title")}>
          <p>{t("section2")}</p>
        </Section>

        <Section title={t("section3Title")}>
          <p>{t("section3")}</p>
        </Section>

        <Section title={t("section4Title")}>
          <p>{t("section4")}</p>
        </Section>

        <Section title={t("section5Title")}>
          <p>{t("section5")}</p>
        </Section>

        <Section title={t("section6Title")}>
          <p>{t("section6")}</p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
