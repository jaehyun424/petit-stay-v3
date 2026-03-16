"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Avatar } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

const TABS = ["Dashboard", "Requests", "Schedule", "Earnings", "Profile"] as const;
type Tab = (typeof TABS)[number];

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

interface DashboardData {
  profile: {
    full_name: string;
    avatar_url: string | null;
    is_verified: boolean;
    languages: { lang: string; level: string }[];
    bio: string | null;
    hourly_rate: number;
    created_at: string;
  };
  stats: {
    monthSessions: number;
    monthEarnings: number;
    avgRating: number;
    pendingCount: number;
  };
  upcomingSessions: {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    parent_name: string;
    child_count: number;
    status: string;
  }[];
  pendingRequests: {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    parent_name: string;
    children: { name: string; age: number }[];
    special_notes: string | null;
  }[];
  availability: {
    day_of_week: number;
    start_time: string;
    end_time: string;
    is_active: boolean;
  }[];
  earnings: {
    date: string;
    parent_name: string;
    hours: number;
    amount: number;
    status: string;
  }[];
  earningsSummary: {
    total: number;
    sessions: number;
    avgPerSession: number;
    platformFee: number;
    netPayout: number;
  };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

function formatTime(t: string) {
  return t.slice(0, 5);
}

function formatWon(amount: number) {
  return `₩${amount.toLocaleString()}`;
}

/* ───────────────────── tab content ───────────────────── */

function DashboardTab({ data }: { data: DashboardData }) {
  const t = useTranslations();
  const { stats, upcomingSessions } = data;
  const statCards = [
    { label: t("sitterDashboard.thisMonth"), value: t("sitterDashboard.statSessions", { count: stats.monthSessions }), accent: false },
    { label: t("sitterDashboard.thisMonth"), value: t("sitterDashboard.statEarned", { amount: formatWon(stats.monthEarnings) }), accent: false },
    { label: t("sitterDashboard.thisMonth"), value: t("sitterDashboard.statRating", { rating: stats.avgRating.toFixed(2) }), accent: false },
    { label: t("sitterDashboard.thisMonth"), value: t("sitterDashboard.statPending", { count: stats.pendingCount }), accent: true },
  ];

  return (
    <div className="space-y-8">
      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.value} className="rounded-[12px] bg-[#F5F0EB] p-5">
            <p className="text-[14px] text-[#717171]">{s.label}</p>
            <p
              className={`mt-1 text-[26px] font-semibold leading-tight ${
                s.accent ? "text-[#C4956A]" : "text-[#222222]"
              }`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* upcoming sessions */}
      <div>
        <h2 className="text-[18px] font-semibold text-[#222222]">{t("sitterDashboard.upcomingSessions")}</h2>
        {upcomingSessions.length === 0 ? (
          <p className="mt-4 text-[14px] text-[#717171]">{t("sitterDashboard.noUpcomingSessions")}</p>
        ) : (
          <div className="mt-4">
            {upcomingSessions.map((session, i) => (
              <div
                key={session.id}
                className={`flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between ${
                  i < upcomingSessions.length - 1 ? "border-b border-[#DDDDDD]" : ""
                }`}
              >
                <p className="text-[14px] text-[#222222]">
                  {formatDate(session.date)} · {formatTime(session.start_time)}–{formatTime(session.end_time)} · {session.parent_name} · {t('common.childCount', { count: session.child_count })}
                </p>
                <Badge variant={session.status === "confirmed" ? "verified" : "default"}>
                  {session.status === "confirmed" ? t("sitterDashboard.confirmed") : t("sitterDashboard.pending")}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RequestsTab({
  data,
  onAction,
  actionLoading,
}: {
  data: DashboardData;
  onAction: (id: string, action: "accept" | "decline") => void;
  actionLoading: string | null;
}) {
  const t = useTranslations();
  const { pendingRequests } = data;

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#222222]">{t("sitterDashboard.bookingRequests")}</h2>
      {pendingRequests.length === 0 ? (
        <p className="mt-4 text-[14px] text-[#717171]">{t("sitterDashboard.noPendingRequests")}</p>
      ) : (
        <div className="mt-4 space-y-4">
          {pendingRequests.map((req) => (
            <div
              key={req.id}
              className="rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]"
            >
              <p className="text-[16px] font-semibold text-[#222222]">{req.parent_name}</p>
              <p className="mt-1 text-[14px] text-[#717171]">
                {t('common.childCount', { count: req.children.length })} ({req.children.map(c => t('sitterDashboard.childAge', { age: c.age })).join(", ")})
              </p>
              <p className="mt-1 text-[14px] text-[#717171]">
                {formatDate(req.date)} · {formatTime(req.start_time)}–{formatTime(req.end_time)}
              </p>
              {req.special_notes && (
                <p className="mt-2 text-[14px] text-[#222222]">
                  <span className="text-[#717171]">{t("sitterDashboard.specialNotes")} </span>
                  {req.special_notes}
                </p>
              )}
              <div className="mt-4 flex gap-3">
                <Button
                  size="sm"
                  onClick={() => onAction(req.id, "accept")}
                  disabled={actionLoading === req.id}
                >
                  {actionLoading === req.id ? "..." : t("sitterDashboard.accept")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#C13515] no-underline hover:underline"
                  onClick={() => onAction(req.id, "decline")}
                  disabled={actionLoading === req.id}
                >
                  {t("sitterDashboard.decline")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScheduleTab({ data }: { data: DashboardData }) {
  const t = useTranslations();
  const { availability } = data;

  // Build full week schedule
  const weeklySchedule = Array.from({ length: 7 }, (_, i) => {
    const slots = availability.filter(a => a.day_of_week === i && a.is_active);
    if (slots.length === 0) return { day: t(`sitterDashboard.${DAY_KEYS[i]}`), hours: t("sitterDashboard.off"), active: false };
    const hours = slots.map(s => `${formatTime(s.start_time)} – ${formatTime(s.end_time)}`).join(", ");
    return { day: t(`sitterDashboard.${DAY_KEYS[i]}`), hours, active: true };
  });

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#222222]">{t("sitterDashboard.yourAvailability")}</h2>
      <div className="mt-4">
        {weeklySchedule.map((slot, i) => (
          <div
            key={i}
            className={`flex items-center justify-between py-3 ${
              i < weeklySchedule.length - 1 ? "border-b border-[#DDDDDD]" : ""
            }`}
          >
            <span
              className={`text-[14px] font-medium ${
                slot.active ? "text-[#222222]" : "text-[#B0B0B0]"
              }`}
            >
              {slot.day}
            </span>
            <span
              className={`text-[14px] ${slot.active ? "text-[#222222]" : "text-[#B0B0B0]"}`}
            >
              {slot.active ? `${slot.hours} ✓` : slot.hours}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button variant="secondary" disabled className="opacity-50 cursor-not-allowed">{t("sitterDashboard.editAvailability")}</Button>
        <p className="mt-1 text-xs text-[#B0B0B0]">{t("sitterDashboard.comingSoon")}</p>
      </div>
    </div>
  );
}

function EarningsTab({ data }: { data: DashboardData }) {
  const t = useTranslations();
  const { earnings, earningsSummary } = data;
  const now = new Date();
  const monthName = now.toLocaleDateString("ko-KR", { month: "long", year: "numeric" });

  return (
    <div className="space-y-8">
      {/* monthly summary */}
      <div className="rounded-[12px] bg-[#F5F0EB] p-5">
        <h2 className="text-[18px] font-semibold text-[#222222]">{monthName}</h2>
        <p className="mt-2 text-[26px] font-bold text-[#222222]">{t("sitterDashboard.totalEarned", { amount: formatWon(earningsSummary.total) })}</p>
        <p className="mt-1 text-[14px] text-[#717171]">
          {t("sitterDashboard.sessionsSummary", { count: earningsSummary.sessions, avg: formatWon(earningsSummary.avgPerSession) })}
        </p>
        <p className="mt-1 text-[14px] text-[#717171]">
          {t("sitterDashboard.platformFee", { amount: formatWon(earningsSummary.platformFee) })}
        </p>
        <p className="mt-2 text-[18px] font-semibold text-[#222222]">
          {t("sitterDashboard.netPayout", { amount: formatWon(earningsSummary.netPayout) })}
        </p>
      </div>

      {/* recent transactions */}
      <div>
        <h2 className="text-[18px] font-semibold text-[#222222]">{t("sitterDashboard.recentTransactions")}</h2>
        {earnings.length === 0 ? (
          <p className="mt-4 text-[14px] text-[#717171]">{t("sitterDashboard.noTransactions")}</p>
        ) : (
          <div className="mt-4">
            {earnings.map((tx, i) => (
              <div
                key={i}
                className={`py-3 text-[14px] text-[#222222] ${
                  i < earnings.length - 1 ? "border-b border-[#DDDDDD]" : ""
                }`}
              >
                {formatDate(tx.date)} · {tx.parent_name} · {tx.hours}h · {formatWon(tx.amount)} · {tx.status} ✓
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileTab({
  data,
  onSave,
  saving,
}: {
  data: DashboardData;
  onSave: (fields: { fullName: string; bio: string; hourlyRate: number; languages: string; avatarUrl?: string }) => void;
  saving: boolean;
}) {
  const t = useTranslations();
  const { profile } = data;
  const [fullName, setFullName] = useState(profile.full_name);
  const [bio, setBio] = useState(profile.bio ?? "");
  const [hourlyRate, setHourlyRate] = useState(String(profile.hourly_rate));
  const [languages, setLanguages] = useState(
    profile.languages.map(l => `${l.lang} (${l.level})`).join(", ")
  );
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar_url);
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setUploadError(t("sitterDashboard.errorFileType"));
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(t("sitterDashboard.errorFileSize"));
      return;
    }

    setUploadError(null);
    setAvatarPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const { uploadImage } = await import("@/src/lib/cloudinary");
      const url = await uploadImage(file);
      setUploadedAvatarUrl(url);
      setAvatarPreview(url);
    } catch {
      setUploadError(t("sitterDashboard.errorUploadFailed"));
      setAvatarPreview(profile.avatar_url);
      setUploadedAvatarUrl(undefined);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#222222]">{t("sitterDashboard.editProfile")}</h2>

      {/* photo */}
      <div className="mt-6 flex items-center gap-4">
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="Profile photo"
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F5F0EB]">
            <span className="text-2xl font-semibold text-[#C4B5A6]">
              {profile.full_name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            className="text-[14px] text-[#222222] underline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? t("sitterDashboard.uploading") : t("sitterDashboard.changePhoto")}
          </button>
          {uploadError && (
            <p className="text-[13px] text-[#C13515]">{uploadError}</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* form fields */}
      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-1.5 block text-[14px] font-medium text-[#222222]">{t("sitterDashboard.displayName")}</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12 w-full rounded-[8px] border border-[#DDDDDD] px-4 text-[16px] text-[#222222] outline-none focus:border-[#222222]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[14px] font-medium text-[#222222]">{t("sitterDashboard.bio")}</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-[8px] border border-[#DDDDDD] px-4 py-3 text-[16px] text-[#222222] outline-none focus:border-[#222222]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[14px] font-medium text-[#222222]">{t("sitterDashboard.hourlyRate")}</label>
          <input
            type="text"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="h-12 w-full rounded-[8px] border border-[#DDDDDD] px-4 text-[16px] text-[#222222] outline-none focus:border-[#222222]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[14px] font-medium text-[#222222]">{t("sitterDashboard.languages")}</label>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            className="h-12 w-full rounded-[8px] border border-[#DDDDDD] px-4 text-[16px] text-[#222222] outline-none focus:border-[#222222]"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={() =>
            onSave({
              fullName,
              bio,
              hourlyRate: Number(hourlyRate.replace(/,/g, "")) || 0,
              languages,
              avatarUrl: uploadedAvatarUrl,
            })
          }
          disabled={saving}
        >
          {saving ? t("sitterDashboard.saving") : t("sitterDashboard.saveChanges")}
        </Button>
      </div>
    </div>
  );
}

/* ───────────────────── main page ───────────────────── */

export default function SitterDashboardPage() {
  const t = useTranslations();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const tabLabels: Record<Tab, string> = {
    Dashboard: t("sitterDashboard.tabDashboard"),
    Requests: t("sitterDashboard.tabRequests"),
    Schedule: t("sitterDashboard.tabSchedule"),
    Earnings: t("sitterDashboard.tabEarnings"),
    Profile: t("sitterDashboard.tabProfile"),
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/sitter/dashboard");
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

  const handleBookingAction = async (id: string, action: "accept" | "decline") => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/sitter/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        await fetchData();
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleProfileSave = async (fields: {
    fullName: string;
    bio: string;
    hourlyRate: number;
    languages: string;
    avatarUrl?: string;
  }) => {
    setSaving(true);
    try {
      // Parse languages string like "English (L3), Korean (L2)"
      const langs = fields.languages
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => {
          const match = s.match(/^(.+?)\s*\((\w+)\)$/);
          if (match) return { lang: match[1].trim(), level: match[2] };
          return { lang: s, level: "L1" };
        });

      const res = await fetch("/api/sitter/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fields.fullName,
          bio: fields.bio,
          hourlyRate: fields.hourlyRate,
          languages: langs,
          ...(fields.avatarUrl !== undefined && { avatarUrl: fields.avatarUrl }),
        }),
      });
      if (res.ok) {
        await fetchData();
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-6">
          <p className="text-[16px] text-[#717171]">{t("sitterDashboard.loading")}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    const errorText = error === "accessDenied"
      ? t("sitterDashboard.accessDenied")
      : t("sitterDashboard.loadFailed");
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-6">
          <p className="text-[16px] text-[#C13515]">{errorText}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) return null;

  const { profile } = data;
  const memberYear = new Date(profile.created_at).getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main id="main-content" className="mx-auto w-full max-w-[1280px] flex-1 px-6">
        {/* Demo role switcher */}
        <div className="flex items-center gap-1.5 pt-6">
          <Link
            href="/my"
            className="rounded-full border border-[#DDDDDD] px-3 py-1 text-xs font-medium text-[#717171] transition-colors hover:text-[#222222]"
          >
            {t("myPage.parentMode")}
          </Link>
          <span className="rounded-full bg-[#222222] px-3 py-1 text-xs font-medium text-white">
            {t("myPage.sitterMode")}
          </span>
          <Link
            href="/partner"
            className="rounded-full border border-[#DDDDDD] px-3 py-1 text-xs font-medium text-[#717171] transition-colors hover:text-[#222222]"
          >
            {t("myPage.partnerMode")}
          </Link>
        </div>

        {/* sitter profile header */}
        <div className="flex items-center gap-4 py-6">
          <Avatar size="lg" src={profile.avatar_url ?? undefined} fallback={profile.full_name.charAt(0)} />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[20px] font-semibold text-[#222222]">{profile.full_name}</h1>
              {profile.is_verified && <Badge variant="verified">{t("sitterDashboard.verified")}</Badge>}
              {profile.languages.map((l) => (
                <Badge key={l.lang} variant="language">{l.level} {l.lang}</Badge>
              ))}
            </div>
            <p className="mt-1 text-[14px] text-[#717171]">
              {t("sitterDashboard.activeSitter", { year: memberYear })}
            </p>
          </div>
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
                {tabLabels[tab]}
              </button>
            ))}
          </nav>
        </div>

        {/* tab content */}
        <div className="py-6">
          {activeTab === "Dashboard" && <DashboardTab data={data} />}
          {activeTab === "Requests" && (
            <RequestsTab data={data} onAction={handleBookingAction} actionLoading={actionLoading} />
          )}
          {activeTab === "Schedule" && <ScheduleTab data={data} />}
          {activeTab === "Earnings" && <EarningsTab data={data} />}
          {activeTab === "Profile" && (
            <ProfileTab data={data} onSave={handleProfileSave} saving={saving} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
