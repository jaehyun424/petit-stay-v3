"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

/* ── Types ── */

interface SitterLanguage {
  lang: string;
  level: "L1" | "L2" | "L3";
}

interface SitterCertification {
  name: string;
  issued_by?: string;
  year?: number;
}

interface AvailabilitySlot {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface Sitter {
  id: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  hourly_rate: number;
  rating_avg: number;
  review_count: number;
  languages: SitterLanguage[];
  certifications: SitterCertification[];
  is_verified: boolean;
  availability: AvailabilitySlot[];
}

type SortOption = "recommended" | "rating" | "price" | "reviews";

interface ActiveFilters {
  date: string;
  time: string;
  childAge: string;
  language: string;
}

/* ── Helpers ── */

function buildBadges(
  sitter: Pick<Sitter, "is_verified" | "languages" | "certifications">
): { label: string; variant: "verified" | "language" | "certification" }[] {
  const badges: {
    label: string;
    variant: "verified" | "language" | "certification";
  }[] = [];
  if (sitter.is_verified)
    badges.push({ label: "Verified", variant: "verified" });
  for (const lang of sitter.languages)
    badges.push({ label: `${lang.level} ${lang.lang}`, variant: "language" });
  for (const cert of sitter.certifications)
    badges.push({ label: cert.name, variant: "certification" });
  return badges;
}

/* ── Component ── */

export function SearchContent() {
  const t = useTranslations();

  const [allSitters, setAllSitters] = useState<Sitter[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter inputs (UI state)
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [childAge, setChildAge] = useState("");
  const [language, setLanguage] = useState("");

  // Active filters (only updated on search click)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    date: "",
    time: "",
    childAge: "",
    language: "",
  });

  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  // Fetch all sitters on mount
  useEffect(() => {
    async function fetchSitters() {
      try {
        const res = await fetch("/api/search");
        if (res.ok) {
          const data = await res.json();
          setAllSitters(data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchSitters();
  }, []);

  // Filtered & sorted sitters
  const displayedSitters = useMemo(() => {
    let filtered = [...allSitters];

    // Language filter
    if (activeFilters.language) {
      filtered = filtered.filter((s) =>
        s.languages.some(
          (l) =>
            l.lang.toLowerCase() === activeFilters.language.toLowerCase()
        )
      );
    }

    // Date filter (match day_of_week from availability)
    if (activeFilters.date) {
      const dayOfWeek = new Date(activeFilters.date).getDay();
      filtered = filtered.filter((s) => {
        if (s.availability.length === 0) return true;
        return s.availability.some((a) => a.day_of_week === dayOfWeek);
      });
    }

    // Time filter (check if selected time falls within availability window)
    if (activeFilters.time) {
      filtered = filtered.filter((s) => {
        if (s.availability.length === 0) return true;
        return s.availability.some((a) => {
          const start = a.start_time.slice(0, 5);
          const end = a.end_time.slice(0, 5);
          return activeFilters.time >= start && activeFilters.time < end;
        });
      });
    }

    // Child age filter: sitter_profiles has no age_min/age_max → no-op
    // (data doesn't exist, filter is ignored per spec)

    // Sort
    switch (sortBy) {
      case "recommended":
        filtered.sort(
          (a, b) =>
            b.rating_avg * b.review_count - a.rating_avg * a.review_count
        );
        break;
      case "rating":
        filtered.sort((a, b) => b.rating_avg - a.rating_avg);
        break;
      case "price":
        filtered.sort((a, b) => a.hourly_rate - b.hourly_rate);
        break;
      case "reviews":
        filtered.sort((a, b) => b.review_count - a.review_count);
        break;
    }

    return filtered;
  }, [allSitters, activeFilters, sortBy]);

  const hasActiveFilter =
    activeFilters.date !== "" ||
    activeFilters.time !== "" ||
    activeFilters.childAge !== "" ||
    activeFilters.language !== "";

  function handleSearch() {
    setActiveFilters({ date, time, childAge, language });
  }

  return (
    <>
      {/* Search Filter Bar */}
      <div className="sticky top-0 z-10 border-b border-[#DDDDDD] bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 overflow-x-auto px-6 py-3 [&>*]:shrink-0">
          <input
            type="date"
            aria-label={t("search.date")}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 rounded-lg border border-[#DDDDDD] bg-white px-3 text-sm text-[#222222] outline-none focus:border-[#C4956A]"
          />
          <select
            aria-label={t("search.time")}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="h-10 rounded-lg border border-[#DDDDDD] bg-white px-3 text-sm text-[#222222] outline-none focus:border-[#C4956A]"
          >
            <option value="">{t("search.time")}</option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22:00">22:00</option>
          </select>
          <select
            aria-label={t("search.childAge")}
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            className="h-10 rounded-lg border border-[#DDDDDD] bg-white px-3 text-sm text-[#222222] outline-none focus:border-[#C4956A]"
          >
            <option value="">{t("search.childAge")}</option>
            <option value="3">{t("search.age", { age: 3 })}</option>
            <option value="4">{t("search.age", { age: 4 })}</option>
            <option value="5">{t("search.age", { age: 5 })}</option>
            <option value="6">{t("search.age", { age: 6 })}</option>
            <option value="7">{t("search.age", { age: 7 })}</option>
            <option value="8">{t("search.age", { age: 8 })}</option>
          </select>
          <select
            aria-label={t("search.language")}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="h-10 rounded-lg border border-[#DDDDDD] bg-white px-3 text-sm text-[#222222] outline-none focus:border-[#C4956A]"
          >
            <option value="">{t("search.language")}</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="zh">中文</option>
          </select>
          <Button variant="primary" size="sm" onClick={handleSearch}>
            {t("common.search")}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      <main id="main-content" className="min-h-screen bg-[#F7F7F7]">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          {/* Results Header */}
          <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <p className="text-base font-semibold text-[#222222]">
              {loading
                ? t("common.loading")
                : displayedSitters.length > 0
                  ? t("search.available", { count: displayedSitters.length })
                  : hasActiveFilter
                    ? t("search.noFilterResults")
                    : t("search.noSitters")}
            </p>
            <select
              aria-label={t("search.sortBy")}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-9 rounded-lg border border-[#DDDDDD] bg-white px-3 text-sm text-[#717171] outline-none focus:border-[#C4956A]"
            >
              <option value="recommended">
                {t("search.sortRecommended")}
              </option>
              <option value="rating">{t("search.sortRating")}</option>
              <option value="price">{t("search.sortPrice")}</option>
              <option value="reviews">{t("search.sortReviews")}</option>
            </select>
          </div>

          {/* Sitter Grid */}
          {displayedSitters.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {displayedSitters.map((sitter) => {
                const badges = buildBadges(sitter);
                return (
                  <Link
                    key={sitter.id}
                    href={`/sitters/${sitter.id}`}
                    className="block"
                  >
                    <Card className="h-full">
                      <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-[#E8E0D8]">
                        {sitter.avatar_url ? (
                          <img
                            src={sitter.avatar_url}
                            alt={sitter.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl font-semibold text-[#C4B5A6]">
                            {sitter.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <CardContent>
                        <p className="text-sm font-semibold text-[#222222] line-clamp-1">
                          {sitter.name}
                        </p>
                        <p className="mt-1 text-xs text-[#717171]">
                          ★ {sitter.rating_avg.toFixed(2)} (
                          {sitter.review_count})
                        </p>
                        <div className="mt-2 flex max-h-[52px] flex-wrap gap-1 overflow-hidden">
                          {badges.map((badge) => (
                            <Badge key={badge.label} variant={badge.variant}>
                              {badge.label}
                            </Badge>
                          ))}
                        </div>
                        <p className="mt-auto pt-2 text-sm font-semibold text-[#222222]">
                          {sitter.hourly_rate.toLocaleString()}
                          {t("search.perHour")}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : !loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-[#717171]">
                {hasActiveFilter
                  ? t("search.noFilterResults")
                  : t("search.noSitters")}
              </p>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
