"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@/src/lib/supabase/client";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Badge } from "@/src/components/ui/badge";

/* ── Types ── */

interface Booking {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  total_amount: number;
  sitter_profiles: {
    profiles: { full_name: string };
  };
}

const STATUS_FILTERS = ["all", "pending", "confirmed", "completed"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

/* ── Helpers ── */

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timeStr: string): string {
  return timeStr.slice(0, 5);
}

/* ── Page ── */

export default function MyPage() {
  const t = useTranslations();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>("all");

  useEffect(() => {
    async function init() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("bookings")
        .select(
          "id, date, start_time, end_time, status, total_amount, sitter_profiles(profiles(full_name))"
        )
        .eq("parent_id", user.id)
        .order("date", { ascending: false });

      setBookings((data as unknown as Booking[]) ?? []);
      setLoading(false);
    }
    init();
  }, [router]);

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  const statusBadgeVariant = (status: string) => {
    if (status === "confirmed") return "verified" as const;
    return "default" as const;
  };

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      pending: t("myPage.statusPending"),
      confirmed: t("myPage.statusConfirmed"),
      completed: t("myPage.statusCompleted"),
      in_progress: t("myPage.statusInProgress"),
      cancelled: t("myPage.statusCancelled"),
    };
    return map[status] ?? status;
  };

  const tabKeys: Record<StatusFilter, string> = {
    all: "myPage.allTab",
    pending: "myPage.pendingTab",
    confirmed: "myPage.confirmedTab",
    completed: "myPage.completedTab",
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#717171]">{t("common.loading")}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main
        id="main-content"
        className="mx-auto w-full max-w-[720px] flex-1 px-6 py-8"
      >
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[22px] font-semibold text-[#222222]">
            {t("myPage.title")}
          </h1>
          {/* Demo role switcher — compact inline pills */}
          <div className="flex gap-1.5">
            <span className="rounded-full bg-[#222222] px-3 py-1 text-xs font-medium text-white">
              {t("myPage.parentMode")}
            </span>
            <Link
              href="/sitter"
              className="rounded-full border border-[#DDDDDD] px-3 py-1 text-xs font-medium text-[#717171] transition-colors hover:text-[#222222]"
            >
              {t("myPage.sitterMode")}
            </Link>
            <Link
              href="/partner"
              className="rounded-full border border-[#DDDDDD] px-3 py-1 text-xs font-medium text-[#717171] transition-colors hover:text-[#222222]"
            >
              {t("myPage.partnerMode")}
            </Link>
          </div>
        </div>

        {/* Tab filters */}
        <div className="mt-6 flex gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-[#222222] text-white"
                  : "bg-[#F5F0EB] text-[#717171] hover:text-[#222222]"
              }`}
            >
              {t(tabKeys[f])}
            </button>
          ))}
        </div>

        {/* Booking list */}
        <div className="mt-6 flex flex-col gap-4">
          {filteredBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-base text-[#717171]">
                {t("myPage.noBookings")}
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const sitterName =
                booking.sitter_profiles?.profiles?.full_name ?? "—";
              return (
                <Link
                  key={booking.id}
                  href={`/booking/${booking.id}`}
                  className="block rounded-[12px] border border-[#DDDDDD] bg-white p-5 transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold text-[#222222]">
                        {sitterName}
                      </p>
                      <p className="text-sm text-[#717171]">
                        {formatDate(booking.date)} ·{" "}
                        {formatTime(booking.start_time)} –{" "}
                        {formatTime(booking.end_time)}
                      </p>
                    </div>
                    <Badge variant={statusBadgeVariant(booking.status)}>
                      {statusLabel(booking.status)}
                    </Badge>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
