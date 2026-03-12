"use client";

import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { useTranslations } from "next-intl";

function QA({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-[#DDDDDD] py-4">
      <p className="text-base font-semibold text-[#222222]">{question}</p>
      <p className="mt-1 text-sm text-[#717171]">{answer}</p>
    </div>
  );
}

export default function HelpPage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-6 py-16">
        <h1 className="text-[26px] font-semibold text-[#222222]">
          {t("help.title")}
        </h1>

        <div className="mt-8">
          <QA question={t("help.q1")} answer={t("help.a1")} />
          <QA question={t("help.q2")} answer={t("help.a2")} />
          <QA question={t("help.q3")} answer={t("help.a3")} />
          <QA question={t("help.q4")} answer={t("help.a4")} />
          <QA question={t("help.q5")} answer={t("help.a5")} />
          <QA question={t("help.q6")} answer={t("help.a6")} />
          <QA question={t("help.q7")} answer={t("help.a7")} />
          <QA question={t("help.q8")} answer={t("help.a8")} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
