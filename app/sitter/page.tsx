"use client";

import { useState } from "react";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Avatar } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

const TABS = ["Dashboard", "Requests", "Schedule", "Earnings", "Profile"] as const;
type Tab = (typeof TABS)[number];

/* ───────────────────── mock data ───────────────────── */
const stats = [
  { label: "This month", value: "12 sessions", accent: false },
  { label: "This month", value: "₩960,000 earned", accent: false },
  { label: "This month", value: "4.94 avg rating", accent: false },
  { label: "This month", value: "2 pending requests", accent: true },
];

const upcomingSessions = [
  { date: "Mar 18", time: "18:00–22:00", parent: "James T.", children: "1 child", status: "Confirmed" as const },
  { date: "Mar 20", time: "19:00–22:00", parent: "Mika S.", children: "2 children", status: "Confirmed" as const },
  { date: "Mar 22", time: "18:00–21:00", parent: "Lisa W.", children: "1 child", status: "Pending" as const },
];

const bookingRequests = [
  {
    name: "Lisa W.",
    children: "1 child (age 5)",
    schedule: "Mar 22 · 18:00–21:00",
    notes: "Mild peanut allergy",
  },
  {
    name: "Tom H.",
    children: "2 children (ages 4, 7)",
    schedule: "Mar 25 · 19:00–23:00",
    notes: "Bedtime at 21:00 for younger child",
  },
];

const weeklySchedule = [
  { day: "Mon", hours: "18:00 – 23:00", active: true },
  { day: "Tue", hours: "18:00 – 23:00", active: true },
  { day: "Wed", hours: "Off", active: false },
  { day: "Thu", hours: "18:00 – 23:00", active: true },
  { day: "Fri", hours: "18:00 – 23:00", active: true },
  { day: "Sat", hours: "14:00 – 23:00", active: true },
  { day: "Sun", hours: "14:00 – 23:00", active: true },
];

const recentTransactions = [
  { date: "Mar 15", parent: "James T.", hours: "4hrs", amount: "₩100,000", status: "Paid ✓" },
  { date: "Mar 12", parent: "Mika S.", hours: "3hrs", amount: "₩75,000", status: "Paid ✓" },
  { date: "Mar 10", parent: "Sarah K.", hours: "4hrs", amount: "₩100,000", status: "Paid ✓" },
];

/* ───────────────────── tab content ───────────────────── */

function DashboardTab() {
  return (
    <div className="space-y-8">
      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
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
        <h2 className="text-[18px] font-semibold text-[#222222]">Upcoming sessions</h2>
        <div className="mt-4">
          {upcomingSessions.map((session, i) => (
            <div
              key={i}
              className={`flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between ${
                i < upcomingSessions.length - 1 ? "border-b border-[#DDDDDD]" : ""
              }`}
            >
              <p className="text-[14px] text-[#222222]">
                {session.date} · {session.time} · {session.parent} · {session.children}
              </p>
              <Badge variant={session.status === "Confirmed" ? "verified" : "default"}>
                {session.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RequestsTab() {
  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#222222]">Booking requests</h2>
      <div className="mt-4 space-y-4">
        {bookingRequests.map((req) => (
          <div
            key={req.name}
            className="rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <p className="text-[16px] font-semibold text-[#222222]">{req.name}</p>
            <p className="mt-1 text-[14px] text-[#717171]">{req.children}</p>
            <p className="mt-1 text-[14px] text-[#717171]">{req.schedule}</p>
            <p className="mt-2 text-[14px] text-[#222222]">
              <span className="text-[#717171]">Special notes: </span>
              {req.notes}
            </p>
            <div className="mt-4 flex gap-3">
              <Button size="sm">Accept</Button>
              <Button variant="ghost" size="sm" className="text-[#C13515] no-underline hover:underline">
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleTab() {
  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#222222]">Your availability</h2>
      <div className="mt-4">
        {weeklySchedule.map((slot, i) => (
          <div
            key={slot.day}
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
        <Button variant="secondary">Edit availability</Button>
      </div>
    </div>
  );
}

function EarningsTab() {
  return (
    <div className="space-y-8">
      {/* monthly summary */}
      <div className="rounded-[12px] bg-[#F5F0EB] p-5">
        <h2 className="text-[18px] font-semibold text-[#222222]">March 2026</h2>
        <p className="mt-2 text-[26px] font-bold text-[#222222]">Total earned: ₩960,000</p>
        <p className="mt-1 text-[14px] text-[#717171]">12 sessions · Avg ₩80,000/session</p>
        <p className="mt-1 text-[14px] text-[#717171]">Platform fee (20%): -₩192,000</p>
        <p className="mt-2 text-[18px] font-semibold text-[#222222]">Net payout: ₩768,000</p>
      </div>

      {/* recent transactions */}
      <div>
        <h2 className="text-[18px] font-semibold text-[#222222]">Recent transactions</h2>
        <div className="mt-4">
          {recentTransactions.map((tx, i) => (
            <div
              key={i}
              className={`py-3 text-[14px] text-[#222222] ${
                i < recentTransactions.length - 1 ? "border-b border-[#DDDDDD]" : ""
              }`}
            >
              {tx.date} · {tx.parent} · {tx.hours} · {tx.amount} · {tx.status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#222222]">Edit your profile</h2>

      {/* photo */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F5F0EB]" />
        <button type="button" className="text-[14px] text-[#222222] underline">
          Change photo
        </button>
      </div>

      {/* form fields */}
      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-1.5 block text-[14px] font-medium text-[#222222]">Display name</label>
          <input
            type="text"
            defaultValue="Emily K."
            className="h-12 w-full rounded-[8px] border border-[#DDDDDD] px-4 text-[16px] text-[#222222] outline-none focus:border-[#222222]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[14px] font-medium text-[#222222]">Bio</label>
          <textarea
            rows={4}
            defaultValue=""
            className="w-full rounded-[8px] border border-[#DDDDDD] px-4 py-3 text-[16px] text-[#222222] outline-none focus:border-[#222222]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[14px] font-medium text-[#222222]">Hourly rate</label>
          <input
            type="text"
            defaultValue="25,000"
            className="h-12 w-full rounded-[8px] border border-[#DDDDDD] px-4 text-[16px] text-[#222222] outline-none focus:border-[#222222]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[14px] font-medium text-[#222222]">Languages</label>
          <input
            type="text"
            defaultValue="English (Native), Korean (Conversational)"
            className="h-12 w-full rounded-[8px] border border-[#DDDDDD] px-4 text-[16px] text-[#222222] outline-none focus:border-[#222222]"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button>Save changes</Button>
      </div>
    </div>
  );
}

/* ───────────────────── main page ───────────────────── */

export default function SitterDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6">
        {/* sitter profile header */}
        <div className="flex items-center gap-4 py-6">
          <Avatar size="lg" fallback="E" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[20px] font-semibold text-[#222222]">Emily K.</h1>
              <Badge variant="verified">Verified</Badge>
              <Badge variant="language">L3 English</Badge>
            </div>
            <p className="mt-1 text-[14px] text-[#717171]">
              Active sitter · Member since 2025
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
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* tab content */}
        <div className="py-6">
          {activeTab === "Dashboard" && <DashboardTab />}
          {activeTab === "Requests" && <RequestsTab />}
          {activeTab === "Schedule" && <ScheduleTab />}
          {activeTab === "Earnings" && <EarningsTab />}
          {activeTab === "Profile" && <ProfileTab />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
