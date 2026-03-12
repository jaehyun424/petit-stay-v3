import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Sitter",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
