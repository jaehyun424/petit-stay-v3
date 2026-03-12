"use client";

import { useState } from "react";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

const TABS = ["Dashboard", "QR Code", "Bookings", "Reports"] as const;
type Tab = (typeof TABS)[number];

/* ───────────────────── mock data ───────────────────── */

const dashboardStats = [
  { label: "This month", value: "8 referrals" },
  { label: "This month", value: "6 completed" },
  { label: "This month", value: "₩720,000 total value" },
];

const recentActivity = [
  "Mar 15 · James T. booked Emily K. via your QR · Completed ✓",
  "Mar 12 · Mika S. booked Sarah L. via your QR · Completed ✓",
  "Mar 10 · Lisa W. booked Mika T. via your link · In Progress",
];

const bookings = [
  { info: "Mar 15 · Room 1204 · James T. · Emily K. · 18:00–22:00", status: "Completed" as const },
  { info: "Mar 14 · Room 803 · Mika S. · Sarah L. · 19:00–22:00", status: "Completed" as const },
  { info: "Mar 12 · Room 1506 · Lisa W. · Mika T. · 18:00–21:00", status: "Completed" as const },
  { info: "Mar 18 · Room 912 · Tom H. · Emily K. · 18:00–22:00", status: "Confirmed" as const },
  { info: "Mar 20 · Room 1105 · Sarah K. · Nami O. · 19:00–23:00", status: "Pending" as const },
];

const reports = [
  { header: "Mar 15 · James T. · Emily K.", session: "Session: 18:00–22:00 · 1 child" },
  { header: "Mar 14 · Mika S. · Sarah L.", session: "Session: 19:00–22:00 · 1 child" },
  { header: "Mar 12 · Lisa W. · Mika T.", session: "Session: 18:00–21:00 · 2 children" },
];

/* ───────────────────── tab content ───────────────────── */

function DashboardTab() {
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
        <div className="mt-4">
          {recentActivity.map((item, i) => (
            <p
              key={i}
              className={`py-3 text-[14px] text-[#222222] ${
                i < recentActivity.length - 1 ? "border-b border-[#DDDDDD]" : ""
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function QRCodeTab() {
  return (
    <div className="space-y-8">
      {/* QR placeholder */}
      <div className="flex flex-col items-center">
        <h2 className="text-[18px] font-semibold text-[#222222]">Your referral QR code</h2>
        <div className="mt-4 flex h-[200px] w-[200px] items-center justify-center rounded-[12px] bg-[#F5F0EB]">
          <span className="text-[32px] font-semibold text-[#8B7355]">QR</span>
        </div>
        <p className="mt-3 text-[14px] text-[#717171]">
          Scan to find a sitter through Grand Hyatt Seoul
        </p>
      </div>

      {/* share link */}
      <div>
        <p className="text-[16px] font-semibold text-[#222222]">Share link</p>
        <p className="mt-1 text-[14px] text-[#717171]">petitstay.com/ref/grand-hyatt</p>
        <div className="mt-3">
          <Button variant="secondary" size="sm">
            Copy link
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

function BookingsTab() {
  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#222222]">Guest bookings</h2>
      <div className="mt-4">
        {bookings.map((booking, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between ${
              i < bookings.length - 1 ? "border-b border-[#DDDDDD]" : ""
            }`}
          >
            <p className="text-[14px] text-[#222222]">{booking.info}</p>
            <Badge
              variant={
                booking.status === "Completed"
                  ? "verified"
                  : booking.status === "Confirmed"
                    ? "language"
                    : "default"
              }
            >
              {booking.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsTab() {
  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#222222]">Session reports</h2>
      <p className="mt-1 text-[14px] text-[#717171]">
        View care reports from completed sessions
      </p>
      <div className="mt-4 space-y-4">
        {reports.map((report) => (
          <div
            key={report.header}
            className="rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <p className="text-[14px] text-[#222222]">{report.header}</p>
            <p className="mt-1 text-[14px] text-[#717171]">{report.session}</p>
            <p className="mt-1 text-[14px] text-[#6B8F71]">Status: Completed ✓</p>
            <div className="mt-3">
              <Button variant="secondary" size="sm">
                View report
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── main page ───────────────────── */

export default function PartnerConsolePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6">
        {/* partner header */}
        <div className="py-6">
          <h1 className="text-[22px] font-semibold text-[#222222]">Grand Hyatt Seoul</h1>
          <p className="mt-1 text-[14px] text-[#717171]">Channel partner · Since 2026</p>
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
          {activeTab === "QR Code" && <QRCodeTab />}
          {activeTab === "Bookings" && <BookingsTab />}
          {activeTab === "Reports" && <ReportsTab />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
