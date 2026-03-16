"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { formatDateShort, formatTime, formatWon } from "@/src/lib/format";

const TABS = ["Dashboard", "QR Code", "Bookings", "Reports"] as const;
type Tab = (typeof TABS)[number];

interface PartnerData {
  account: {
    business_name: string;
    business_type: string;
    referral_code: string;
    created_at: string;
  };
  stats: {
    monthReferrals: number;
    monthCompleted: number;
    monthTotalValue: number;
  };
  recentActivity: {
    date: string;
    parent_name: string;
    sitter_name: string;
    status: string;
  }[];
  bookings: {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    status: string;
    total_amount: number;
    parent_name: string;
    sitter_name: string;
    child_count: number;
  }[];
  reports: {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    parent_name: string;
    sitter_name: string;
    child_count: number;
    check_in_at: string;
    check_out_at: string | null;
    activities: string | null;
    mood_behavior: string | null;
    sleep_notes: string | null;
    additional_notes: string | null;
  }[];
}

/* ───────────────────── tab content ───────────────────── */

function DashboardTab({ data }: { data: PartnerData }) {
  const t = useTranslations();
  const { stats, recentActivity } = data;

  const statusText = (status: string) => {
    const map: Record<string, string> = {
      completed: t("partnerDashboard.statusCompleted"),
      confirmed: t("partnerDashboard.statusConfirmed"),
      pending: t("partnerDashboard.statusPending"),
      in_progress: t("partnerDashboard.statusInProgress"),
      cancelled: t("partnerDashboard.statusCancelled"),
    };
    return map[status] ?? status;
  };

  const dashboardStats = [
    { label: t("partnerDashboard.thisMonth"), value: t("partnerDashboard.statReferrals", { count: stats.monthReferrals }) },
    { label: t("partnerDashboard.thisMonth"), value: t("partnerDashboard.statCompleted", { count: stats.monthCompleted }) },
    { label: t("partnerDashboard.thisMonth"), value: t("partnerDashboard.statTotalValue", { amount: formatWon(stats.monthTotalValue) }) },
  ];

  return (
    <div className="space-y-8">
      {/* stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {dashboardStats.map((s) => (
          <div key={s.value} className="rounded-[12px] bg-[var(--color-bg-cream)] p-5">
            <p className="text-[14px] text-[var(--color-text-secondary)]">{s.label}</p>
            <p className="mt-1 text-[26px] font-semibold leading-tight text-[var(--color-text-primary)]">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* recent activity */}
      <div>
        <h2 className="text-[18px] font-semibold text-[var(--color-text-primary)]">{t("partnerDashboard.recentActivity")}</h2>
        {recentActivity.length === 0 ? (
          <p className="mt-4 text-[14px] text-[var(--color-text-secondary)]">{t("partnerDashboard.noRecentActivity")}</p>
        ) : (
          <div className="mt-4">
            {recentActivity.map((item, i) => (
              <p
                key={i}
                className={`py-3 text-[14px] text-[var(--color-text-primary)] ${
                  i < recentActivity.length - 1 ? "border-b border-[var(--color-border)]" : ""
                }`}
              >
                {formatDateShort(item.date)} · {t("partnerDashboard.bookedViaQR", { parent: item.parent_name, sitter: item.sitter_name })} · {statusText(item.status)} {item.status === "completed" ? "✓" : ""}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QRCodeTab({ data }: { data: PartnerData }) {
  const t = useTranslations();
  const { account } = data;
  const [copied, setCopied] = useState(false);
  const shareLink = `petitstay.com/ref/${account.referral_code}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — ignore silently
    }
  };

  return (
    <div className="space-y-8">
      {/* QR placeholder */}
      <div className="flex flex-col items-center">
        <h2 className="text-[18px] font-semibold text-[var(--color-text-primary)]">{t("partnerDashboard.yourQRCode")}</h2>
        <div className="mt-4 flex h-[200px] w-[200px] items-center justify-center rounded-[12px] bg-[var(--color-bg-cream)]">
          <span className="text-[32px] font-semibold text-[var(--color-accent-dark)]">QR</span>
        </div>
        <p className="mt-3 text-[14px] text-[var(--color-text-secondary)]">
          {t("partnerDashboard.scanToFind", { name: account.business_name })}
        </p>
      </div>

      {/* share link */}
      <div>
        <p className="text-[16px] font-semibold text-[var(--color-text-primary)]">{t("partnerDashboard.shareLink")}</p>
        <p className="mt-1 text-[14px] text-[var(--color-text-secondary)]">{shareLink}</p>
        <div className="mt-3">
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? t("partnerDashboard.copied") : t("partnerDashboard.copyLink")}
          </Button>
        </div>
      </div>

      {/* guidance */}
      <p className="text-[14px] text-[var(--color-text-secondary)]">
        {t("partnerDashboard.qrPlacement")}
      </p>
    </div>
  );
}

function BookingsTab({ data }: { data: PartnerData }) {
  const t = useTranslations();
  const { bookings } = data;

  const statusText = (status: string) => {
    const map: Record<string, string> = {
      completed: t("partnerDashboard.statusCompleted"),
      confirmed: t("partnerDashboard.statusConfirmed"),
      pending: t("partnerDashboard.statusPending"),
      in_progress: t("partnerDashboard.statusInProgress"),
      cancelled: t("partnerDashboard.statusCancelled"),
    };
    return map[status] ?? status;
  };

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[var(--color-text-primary)]">{t("partnerDashboard.guestBookings")}</h2>
      {bookings.length === 0 ? (
        <p className="mt-4 text-[14px] text-[var(--color-text-secondary)]">{t("partnerDashboard.noBookings")}</p>
      ) : (
        <div className="mt-4">
          {bookings.map((booking, i) => (
            <div
              key={booking.id}
              className={`flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between ${
                i < bookings.length - 1 ? "border-b border-[var(--color-border)]" : ""
              }`}
            >
              <p className="text-[14px] text-[var(--color-text-primary)]">
                {formatDateShort(booking.date)} · {booking.parent_name} · {booking.sitter_name} · {formatTime(booking.start_time)}–{formatTime(booking.end_time)}
              </p>
              <Badge
                variant={
                  booking.status === "completed"
                    ? "verified"
                    : booking.status === "confirmed"
                      ? "language"
                      : "default"
                }
              >
                {statusText(booking.status)}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReportsTab({ data }: { data: PartnerData }) {
  const t = useTranslations();
  const { reports } = data;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[var(--color-text-primary)]">{t("partnerDashboard.sessionReports")}</h2>
      <p className="mt-1 text-[14px] text-[var(--color-text-secondary)]">
        {t("partnerDashboard.viewCareReports")}
      </p>
      {reports.length === 0 ? (
        <p className="mt-4 text-[14px] text-[var(--color-text-secondary)]">{t("partnerDashboard.noReports")}</p>
      ) : (
        <div className="mt-4 space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <p className="text-[14px] text-[var(--color-text-primary)]">
                {formatDateShort(report.date)} · {report.parent_name} · {report.sitter_name}
              </p>
              <p className="mt-1 text-[14px] text-[var(--color-text-secondary)]">
                {t("partnerDashboard.session")} {formatTime(report.start_time)}–{formatTime(report.end_time)} · {t('common.childCount', { count: report.child_count })}
              </p>
              <p className="mt-1 text-[14px] text-[var(--color-success)]">{t("partnerDashboard.completedCheck")}</p>

              {expandedId === report.id && (
                <div className="mt-3 space-y-2 border-t border-[var(--color-border)] pt-3">
                  {report.activities && (
                    <p className="text-[14px] text-[var(--color-text-primary)]">
                      <span className="text-[var(--color-text-secondary)]">{t("partnerDashboard.activities")} </span>{report.activities}
                    </p>
                  )}
                  {report.mood_behavior && (
                    <p className="text-[14px] text-[var(--color-text-primary)]">
                      <span className="text-[var(--color-text-secondary)]">{t("partnerDashboard.moodBehavior")} </span>{report.mood_behavior}
                    </p>
                  )}
                  {report.sleep_notes && (
                    <p className="text-[14px] text-[var(--color-text-primary)]">
                      <span className="text-[var(--color-text-secondary)]">{t("partnerDashboard.sleepNotes")} </span>{report.sleep_notes}
                    </p>
                  )}
                  {report.additional_notes && (
                    <p className="text-[14px] text-[var(--color-text-primary)]">
                      <span className="text-[var(--color-text-secondary)]">{t("partnerDashboard.additionalNotes")} </span>{report.additional_notes}
                    </p>
                  )}
                  {!report.activities && !report.mood_behavior && !report.sleep_notes && !report.additional_notes && (
                    <p className="text-[14px] text-[var(--color-text-secondary)]">{t("partnerDashboard.noDetails")}</p>
                  )}
                </div>
              )}

              <div className="mt-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
                >
                  {expandedId === report.id ? t("partnerDashboard.hideReport") : t("partnerDashboard.viewReport")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────────────── main page ───────────────────── */

export default function PartnerConsolePage() {
  const t = useTranslations();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");
  const [data, setData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabLabels: Record<Tab, string> = {
    Dashboard: t("partnerDashboard.tabDashboard"),
    "QR Code": t("partnerDashboard.tabQRCode"),
    Bookings: t("partnerDashboard.tabBookings"),
    Reports: t("partnerDashboard.tabReports"),
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/partner/dashboard");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (res.status === 403) {
        setError("accessDenied");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError("loadFailed");
        setLoading(false);
        return;
      }
      const json = await res.json();
      setData(json);
    } catch {
      setError("loadFailed");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-6">
          <p className="text-[16px] text-[var(--color-text-secondary)]">{t("partnerDashboard.loading")}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    const errorText = error === "accessDenied"
      ? t("partnerDashboard.accessDenied")
      : t("partnerDashboard.loadFailed");
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-6">
          <p className="text-[16px] text-[var(--color-error)]">{errorText}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) return null;

  const { account } = data;
  const memberYear = new Date(account.created_at).getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main id="main-content" className="mx-auto w-full max-w-[1280px] flex-1 px-6">
        {/* Demo role switcher */}
        <div className="flex gap-2 pt-6">
          <Link
            href="/my"
            className="rounded-full px-4 py-2 text-sm font-medium bg-[var(--color-bg-cream)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            {t("myPage.parentMode")}
          </Link>
          <Link
            href="/sitter"
            className="rounded-full px-4 py-2 text-sm font-medium bg-[var(--color-bg-cream)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            {t("myPage.sitterMode")}
          </Link>
          <span className="rounded-full px-4 py-2 text-sm font-medium bg-[var(--color-text-primary)] text-white">
            {t("myPage.partnerMode")}
          </span>
        </div>

        {/* partner header */}
        <div className="py-6">
          <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)]">{account.business_name}</h1>
          <p className="mt-1 text-[14px] text-[var(--color-text-secondary)]">{t("partnerDashboard.channelPartner", { year: memberYear })}</p>
        </div>

        {/* tab navigation */}
        <div className="border-b border-[var(--color-border)]">
          <nav className="-mb-px flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 cursor-pointer border-b-2 px-4 py-3 text-[14px] transition-colors ${
                  activeTab === tab
                    ? "border-[var(--color-accent)] font-semibold text-[var(--color-text-primary)]"
                    : "border-transparent font-normal text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </nav>
        </div>

        {/* tab content */}
        <div className="py-6">
          {activeTab === "Dashboard" && <DashboardTab data={data} />}
          {activeTab === "QR Code" && <QRCodeTab data={data} />}
          {activeTab === "Bookings" && <BookingsTab data={data} />}
          {activeTab === "Reports" && <ReportsTab data={data} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
