import type { Metadata } from "next";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { SearchContent } from "./search-content";

export const metadata: Metadata = {
  title: "Find a Sitter",
  description:
    "Browse verified babysitters in Seoul. Filter by date, time, language, and more.",
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
