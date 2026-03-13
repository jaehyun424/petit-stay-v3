"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#DDDDDD] border-t-[#C4956A]" />
        <p className="text-sm text-[#717171]">{t("loading")}</p>
      </div>
    </div>
  );
}
