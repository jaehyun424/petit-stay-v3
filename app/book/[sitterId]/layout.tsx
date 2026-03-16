import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "시터 예약",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
