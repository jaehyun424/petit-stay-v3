"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

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

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(t: string) {
  return t.slice(0, 5);
}

function formatWon(amount: number) {
  return `₩${amount.toLocaleString()}`;
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    completed: "Completed",
    confirmed: "Confirmed",
    pending: "Pending",
    in_progress: "In Progress",
    cancelled: "Cancelled",
  };
  return map[status] ?? status;
}

/* ───────────────────── tab content ───────────────────── */

function DashboardTab({ data }: { data: PartnerData }) {
  const { stats, recentActivity } = data;
  const dashboardStats = [
    { label: "This month", value: `${stats.monthReferrals} referrals` },
    { label: "This month", value: `${stats.monthCompleted} completed` },
    { label: "This month", value: `${formatWon(stats.monthTotalValue)} total value` },
  ];

  return (
    <div className="space-y-8">
      {/* stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {dashboardStats.map((s) => (
          <div key={s.value} className="rounded-[12px] bg-[#F5F0EB] p-5">
            <p className="text-[14px] text-[#717171]">{s.label}</p>
            <p className="mt-1 text-[26px] font-semibold leading-tight text-[#222222]">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* recent activity */}
      <div>
        <h2 className="text-[18px] font-semibold text-[#222222]">Recent activity</h2>
        {recentActivity.length === 0 ? (
          <p className="mt-4 text-[14px] text-[#717171]">No recent activity</p>
        ) : (
          <div className="mt-4">
            {recentActivity.map((item, i) => (
              <p
                key={i}
                className={`py-3 text-[14px] text-[#222222] ${
                  i < recentActivity.length - 1 ? "border-b border-[#DDDDDD]" : ""
                }`}
              >
                {formatDate(item.date)} · {item.parent_name} booked {item.sitter_name} via your QR · {statusLabel(item.status)} {item.status === "completed" ? "✓" : ""}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QRCodeTab({ data }: { data: PartnerData }) {
  const { account } = data;
  const [copied, setCopied] = useState(false);
  const shareLink = `petitstay.com/ref/${account.referral_code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* QR placeholder */}
      <div className="flex flex-col items-center">
        <h2 className="text-[18px] font-semibold text-[#222222]">Your referral QR code</h2>
        <div className="mt-4 flex h-[200px] w-[200px] items-center justify-center rounded-[12px] bg-[#F5F0EB]">
          <span className="text-[32px] font-semibold text-[#8B7355]">QR</span>
        </div>
        <p className="mt-3 text-[14px] text-[#717171]">
          Scan to find a sitter through {account.business_name}
        </p>
      </div>

      {/* share link */}
      <div>
        <p className="text-[16px] font-semibold text-[#222222]">Share link</p>
        <p className="mt-1 text-[14px] text-[#717171]">{shareLink}</p>
        <div className="mt-3">
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy link"}
          </Button>
        </div>
      </div>

      {/* guidance */}
      <p className="text-[14px] text-[#717171]">
        Place this QR code at your front desk or in guest rooms
      </p>
    </div>
  );
}

function BookingsTab({ data }: { data: PartnerData }) {
  const { bookings } = data;

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#222222]">Guest bookings</h2>
      {bookings.length === 0 ? (
        <p className="mt-4 text-[14px] text-[#717171]">No bookings yet</p>
      ) : (
        <div className="mt-4">
          {bookings.map((booking, i) => (
            <div
              key={booking.id}
              className={`flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between ${
                i < bookings.length - 1 ? "border-b border-[#DDDDDD]" : ""
              }`}
            >
              <p className="text-[14px] text-[#222222]">
                {formatDate(booking.date)} · {booking.parent_name} · {booking.sitter_name} · {formatTime(booking.start_time)}–{formatTime(booking.end_time)}
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
                {statusLabel(booking.status)}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReportsTab({ data }: { data: PartnerData }) {
  const { reports } = data;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#222222]">Session reports</h2>
      <p className="mt-1 text-[14px] text-[#717171]">
        View care reports from completed sessions
      </p>
      {reports.length === 0 ? (
        <p className="mt-4 text-[14px] text-[#717171]">No reports yet</p>
      ) : (
        <div className="mt-4 space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <p className="text-[14px] text-[#222222]">
                {formatDate(report.date)} · {report.parent_name} · {report.sitter_name}
              </p>
              <p className="mt-1 text-[14px] text-[#717171]">
                Session: {formatTime(report.start_time)}–{formatTime(report.end_time)} · {report.child_count} child{report.child_count !== 1 ? "ren" : ""}
              </p>
              <p className="mt-1 text-[14px] text-[#6B8F71]">Status: Completed ✓</p>

              {expandedId === report.id && (
                <div className="mt-3 space-y-2 border-t border-[#DDDDDD] pt-3">
                  {report.activities && (
                    <p className="text-[14px] text-[#222222]">
                      <span className="text-[#717171]">Activities: </span>{report.activities}
                    </p>
                  )}
                  {report.mood_behavior && (
                    <p className="text-[14px] text-[#222222]">
                      <span className="text-[#717171]">Mood & behavior: </span>{report.mood_behavior}
                    </p>
                  )}
                  {report.sleep_notes && (
                    <p className="text-[14px] text-[#222222]">
                      <span className="text-[#717171]">Sleep notes: </span>{report.sleep_notes}
                    </p>
                  )}
                  {report.additional_notes && (
                    <p className="text-[14px] text-[#222222]">
                      <span className="text-[#717171]">Additional notes: </span>{report.additional_notes}
                    </p>
                  )}
                  {!report.activities && !report.mood_behavior && !report.sleep_notes && !report.additional_notes && (
                    <p className="text-[14px] text-[#717171]">No details recorded</p>
                  )}
                </div>
              )}

              <div className="mt-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
                >
                  {expandedId === report.id ? "Hide report" : "View report"}
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");
  const [data, setData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/partner/dashboard");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (res.status === 403) {
        setError("Access denied. This page is for channel partners only.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError("Failed to load dashboard");
        setLoading(false);
        return;
      }
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load dashboard");
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
          <p className="text-[16px] text-[#717171]">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-6">
          <p className="text-[16px] text-[#C13515]">{error}</p>
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

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6">
        {/* partner header */}
        <div className="py-6">
          <h1 className="text-[22px] font-semibold text-[#222222]">{account.business_name}</h1>
          <p className="mt-1 text-[14px] text-[#717171]">Channel partner · Since {memberYear}</p>
        </div>

        {/* tab navigation */}
        <div className="border-b border-[#DDDDDD]">
          <nav className="-mb-px flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 cursor-pointer border-b-2 px-4 py-3 text-[14px] transition-colors ${
                  activeTab === tab
                    ? "border-[#C4956A] font-semibold text-[#222222]"
                    : "border-transparent font-normal text-[#717171] hover:text-[#222222]"
                }`}
              >
                {tab}
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
