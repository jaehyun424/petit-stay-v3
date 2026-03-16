import type { Metadata } from "next";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { SearchContent } from "./search-content";

export const metadata: Metadata = {
  title: "시터 찾기",
  description:
    "서울의 검증된 베이비시터를 날짜, 시간, 언어별로 찾아보세요.",
};

export default function SearchPage() {
  return (
    <>
      <Header />
      <SearchContent />
      <Footer />
    </>
  );
}
