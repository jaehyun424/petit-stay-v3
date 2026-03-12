"use client";

import { useState } from "react";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Avatar } from "@/src/components/ui/avatar";

type BookingStatus = "confirmed" | "inProgress" | "completed";

const STATUS_OPTIONS: { key: BookingStatus; label: string }[] = [
  { key: "confirmed", label: "Confirmed" },
  { key: "inProgress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

/* ── Confirmed ── */
function ConfirmedView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Banner */}
      <div className="rounded-[var(--radius-card)] bg-[#F5F0EB] p-5">
        <p className="text-lg font-semibold text-[var(--color-text-primary)]">
          Booking confirmed ✓
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Emily K. will arrive at 18:00 on March 15, 2026
        </p>
      </div>

      {/* Info card */}
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5">
        <div className="flex flex-col gap-4">
          {/* Sitter */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              Sitter
            </span>
            <div className="flex items-center gap-2">
              <Avatar size="sm" fallback="E" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                Emily K.
              </span>
              <Badge variant="verified">Verified</Badge>
            </div>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Date */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              Date
            </span>
            <span className="text-sm text-[var(--color-text-primary)]">
              March 15, 2026
            </span>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Time */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              Time
            </span>
            <span className="text-sm text-[var(--color-text-primary)]">
              18:00 – 22:00
            </span>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Children */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              Children
            </span>
            <span className="text-sm text-[var(--color-text-primary)]">
              1 child
            </span>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Emergency contact */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              Emergency contact
            </span>
            <span className="text-sm text-[var(--color-text-primary)]">
              James T. (+82-10-1234-5678)
            </span>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Total paid */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">
              Total paid
            </span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              120,000원
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button variant="secondary" className="w-full">
          Contact sitter
        </Button>
        <Button
          variant="ghost"
          className="w-full text-[var(--color-error)] no-underline hover:text-[var(--color-error)]"
        >
          Cancel booking
        </Button>
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Free cancellation until March 14, 18:00
        </p>
      </div>
    </div>
  );
}

/* ── In Progress ── */
const TIMELINE = [
  { time: "18:02", desc: "Emily arrived and checked in" },
  { time: "18:05", desc: "Session started" },
];

function InProgressView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Banner */}
      <div className="rounded-[var(--radius-card)] bg-[var(--color-cta)] p-5 text-white">
        <p className="text-lg font-semibold">Session in progress</p>
        <p className="mt-1 text-sm">Emily checked in at 18:02</p>
      </div>

      {/* Timeline */}
      <div className="flex flex-col">
        {TIMELINE.map((item, i) => (
          <div key={i} className="flex gap-4">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-cta)]" />
              {i < TIMELINE.length - 1 && (
                <div className="w-[2px] grow bg-[var(--color-border)]" />
              )}
            </div>
            {/* Content */}
            <div className={i < TIMELINE.length - 1 ? "pb-6" : ""}>
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
        Emily will send a care report when the session ends
      </p>
    </div>
  );
}

/* ── Completed ── */
const REPORT_SECTIONS = [
  {
    title: "Activities",
    body: "We played board games, read stories, and did some coloring. Had a light snack around 19:30.",
  },
  {
    title: "Mood & Behavior",
    body: "Very happy and cooperative throughout. Got a bit tired around 21:00.",
  },
  {
    title: "Sleep",
    body: "Fell asleep at 21:30 after bedtime story.",
  },
  {
    title: "Notes",
    body: "No issues. Had a wonderful time!",
  },
];

function CompletedView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Banner */}
      <div className="rounded-[var(--radius-card)] bg-[#F5F0EB] p-5">
        <p className="text-lg font-semibold text-[var(--color-text-primary)]">
          Session completed ✓
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          March 15, 2026 · 18:00 – 22:00
        </p>
      </div>

      {/* Care Report card */}
      <div className="rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--shadow-md)]">
        <p className="text-lg font-semibold text-[var(--color-text-primary)]">
          Care Report from Emily
        </p>

        <div className="mt-4 flex flex-col">
          {REPORT_SECTIONS.map((section, i) => (
            <div
              key={i}
              className={`py-3 ${i < REPORT_SECTIONS.length - 1 ? "border-b border-[var(--color-border)]" : ""}`}
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

      {/* CTA */}
      <div className="flex flex-col gap-2">
        <Button variant="primary" className="w-full">
          Write a review
        </Button>
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Your review helps other families find great sitters
        </p>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function BookingDetailPage() {
  const [status, setStatus] = useState<BookingStatus>("confirmed");

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-page)]">
      <Header />

      <main className="mx-auto w-full max-w-[640px] flex-1 px-6 py-8">
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
        {status === "confirmed" && <ConfirmedView />}
        {status === "inProgress" && <InProgressView />}
        {status === "completed" && <CompletedView />}
      </main>

      <Footer />
    </div>
  );
}
