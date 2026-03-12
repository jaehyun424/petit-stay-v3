"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Avatar } from "@/src/components/ui/avatar";

/* ── Types ── */

type BookingStatus = "confirmed" | "inProgress" | "completed";

interface BookingData {
  id: string;
  status: string;
  date: string;
  start_time: string;
  end_time: string;
  total_amount: number;
  service_fee: number;
  net_amount: number;
  created_at: string;
  sitter_profiles: {
    is_verified: boolean;
    rating_avg: number;
    profiles: { full_name: string; avatar_url: string | null };
  };
  booking_children: {
    id: string;
    name: string;
    age: number;
    special_notes: string | null;
  }[];
  booking_emergency_contacts: {
    id: string;
    name: string;
    phone: string;
    relationship: string;
  }[];
  session_reports: {
    id: string;
    check_in_at: string;
    check_out_at: string | null;
    activities: string | null;
    mood_behavior: string | null;
    sleep_notes: string | null;
    additional_notes: string | null;
  }[];
  reviews: {
    id: string;
    rating: number;
    keywords: string[];
    comment: string | null;
  }[];
}

/* ── Helpers ── */

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatWon(amount: number): string {
  return `${amount.toLocaleString()}`;
}

function formatTime(timeStr: string): string {
  return timeStr.slice(0, 5);
}

function mapDbStatus(dbStatus: string): BookingStatus {
  if (dbStatus === "in_progress") return "inProgress";
  if (dbStatus === "completed") return "completed";
  return "confirmed";
}

function getCancellationDeadline(dateStr: string, startTime: string): string {
  const d = new Date(`${dateStr}T${startTime}`);
  d.setDate(d.getDate() - 1);
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const day = d.getDate();
  const time = formatTime(startTime);
  return `${month} ${day}, ${time}`;
}

function getSitterName(booking: BookingData): string {
  return booking.sitter_profiles?.profiles?.full_name ?? "Unknown";
}

/* ── Confirmed ── */
function ConfirmedView({ booking }: { booking: BookingData }) {
  const t = useTranslations('bookingDetail');
  const sitterName = getSitterName(booking);
  const isVerified = booking.sitter_profiles?.is_verified ?? false;
  const childCount = booking.booking_children.length;
  const contact = booking.booking_emergency_contacts[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Banner */}
      <div className="rounded-[var(--radius-card)] bg-[#F5F0EB] p-5">
        <p className="text-lg font-semibold text-[var(--color-text-primary)]">
          {t('confirmed')}
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {t('sitterArrival', { name: sitterName, time: formatTime(booking.start_time), date: formatDate(booking.date) })}
        </p>
      </div>

      {/* Info card */}
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5">
        <div className="flex flex-col gap-4">
          {/* Sitter */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              {t('sitterLabel')}
            </span>
            <div className="flex items-center gap-2">
              <Avatar size="sm" fallback={sitterName.charAt(0)} />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {sitterName}
              </span>
              {isVerified && <Badge variant="verified">{t('statusConfirmed')}</Badge>}
            </div>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Date */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              {t('dateLabel')}
            </span>
            <span className="text-sm text-[var(--color-text-primary)]">
              {formatDate(booking.date)}
            </span>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Time */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              {t('timeLabel')}
            </span>
            <span className="text-sm text-[var(--color-text-primary)]">
              {formatTime(booking.start_time)} –{" "}
              {formatTime(booking.end_time)}
            </span>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Children */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              {t('childrenLabel')}
            </span>
            <span className="text-sm text-[var(--color-text-primary)]">
              {childCount} child{childCount !== 1 ? "ren" : ""}
            </span>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Emergency contact */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              {t('emergencyContact')}
            </span>
            <span className="text-sm text-[var(--color-text-primary)]">
              {contact
                ? `${contact.name} (${contact.phone})`
                : "—"}
            </span>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Total paid */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              {t('totalPaid')}
            </span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              {formatWon(booking.total_amount)}원
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button variant="secondary" className="w-full">
          {t('contactSitter')}
        </Button>
        <Button
          variant="ghost"
          className="w-full text-[var(--color-error)] no-underline hover:text-[var(--color-error)]"
        >
          {t('cancelBooking')}
        </Button>
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          {t('freeCancellation', { deadline: getCancellationDeadline(booking.date, booking.start_time) })}
        </p>
      </div>
    </div>
  );
}

/* ── In Progress ── */
function InProgressView({ booking }: { booking: BookingData }) {
  const t = useTranslations('bookingDetail');
  const sitterName = getSitterName(booking);
  const report = booking.session_reports[0];

  const timeline = report
    ? [
        {
          time: report.check_in_at.slice(11, 16),
          desc: t('arrivedCheckedIn', { name: sitterName }),
        },
        {
          time: report.check_in_at.slice(11, 16),
          desc: t('sessionStarted'),
        },
      ]
    : [
        {
          time: formatTime(booking.start_time),
          desc: t('waitingArrival', { name: sitterName }),
        },
      ];

  return (
    <div className="flex flex-col gap-6">
      {/* Banner */}
      <div className="rounded-[var(--radius-card)] bg-[var(--color-cta)] p-5 text-white">
        <p className="text-lg font-semibold">{t('inProgress')}</p>
        <p className="mt-1 text-sm">
          {report
            ? t('checkedIn', { name: sitterName, time: report.check_in_at.slice(11, 16) })
            : t('waitingCheckIn', { name: sitterName })}
        </p>
      </div>

      {/* Timeline */}
      <div className="flex flex-col">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-4">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-cta)]" />
              {i < timeline.length - 1 && (
                <div className="w-[2px] grow bg-[var(--color-border)]" />
              )}
            </div>
            {/* Content */}
            <div className={i < timeline.length - 1 ? "pb-6" : ""}>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {item.time}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-sm text-[var(--color-text-secondary)]">
        {t('careReportNote', { name: sitterName })}
      </p>
    </div>
  );
}

/* ── Completed ── */
function CompletedView({ booking }: { booking: BookingData }) {
  const t = useTranslations('bookingDetail');
  const sitterName = getSitterName(booking);
  const report = booking.session_reports[0];

  const sections = report
    ? [
        { title: t('activities'), body: report.activities },
        { title: t('moodBehavior'), body: report.mood_behavior },
        { title: t('sleep'), body: report.sleep_notes },
        { title: t('notes'), body: report.additional_notes },
      ].filter((s) => s.body)
    : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Banner */}
      <div className="rounded-[var(--radius-card)] bg-[#F5F0EB] p-5">
        <p className="text-lg font-semibold text-[var(--color-text-primary)]">
          {t('completed')}
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {formatDate(booking.date)} · {formatTime(booking.start_time)} –{" "}
          {formatTime(booking.end_time)}
        </p>
      </div>

      {/* Care Report card */}
      {sections.length > 0 && (
        <div className="rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--shadow-md)]">
          <p className="text-lg font-semibold text-[var(--color-text-primary)]">
            {t('careReport', { name: sitterName })}
          </p>

          <div className="mt-4 flex flex-col">
            {sections.map((section, i) => (
              <div
                key={i}
                className={`py-3 ${i < sections.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
              >
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  {section.title}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col gap-2">
        {booking.reviews.length > 0 ? (
          <p className="text-center text-sm text-[var(--color-text-secondary)]">
            {t('alreadyReviewed')}
          </p>
        ) : (
          <>
            <Button variant="primary" className="w-full" asChild>
              <Link href={`/review/${booking.id}`}>{t('writeReview')}</Link>
            </Button>
            <p className="text-center text-sm text-[var(--color-text-secondary)]">
              {t('reviewHelps')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function BookingDetailPage() {
  const t = useTranslations();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [status, setStatus] = useState<BookingStatus>("confirmed");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const STATUS_OPTIONS: { key: BookingStatus; label: string }[] = [
    { key: "confirmed", label: t('bookingDetail.statusConfirmed') },
    { key: "inProgress", label: t('bookingDetail.statusInProgress') },
    { key: "completed", label: t('bookingDetail.statusCompleted') },
  ];

  useEffect(() => {
    async function init() {
      const res = await fetch(`/api/bookings/${id}`);
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setError(t('bookingDetail.notFound'));
        setLoading(false);
        return;
      }
      const data = await res.json();
      setBooking(data);
      setStatus(mapDbStatus(data.status));
      setLoading(false);
    }
    init();
  }, [id, router, t]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg-page)]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#717171]">{t('common.loading')}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg-page)]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#717171]">{error || t('bookingDetail.notFound')}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-page)]">
      <Header />

      <main id="main-content" className="mx-auto w-full max-w-[640px] flex-1 px-6 py-8">
        {/* Status switcher (demo only) */}
        <div className="mb-8 flex gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setStatus(opt.key)}
              className={`rounded-[var(--radius-button)] px-4 py-2 text-sm font-medium transition-colors ${
                status === opt.key
                  ? "bg-[var(--color-cta)] text-white"
                  : "bg-[#F5F0EB] text-[var(--color-text-primary)]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Content by status */}
        {status === "confirmed" && <ConfirmedView booking={booking} />}
        {status === "inProgress" && <InProgressView booking={booking} />}
        {status === "completed" && <CompletedView booking={booking} />}
      </main>

      <Footer />
    </div>
  );
}
