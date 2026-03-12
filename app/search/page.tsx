import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { getSitters, buildSitterBadges } from "@/src/lib/queries";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Find a Sitter",
  description:
    "Browse verified babysitters in Seoul. Filter by date, time, language, and more.",
};

export default async function SearchPage() {
  const sitters = await getSitters();
  const t = await getTranslations();

  return (
    <>
      <Header />

      {/* Search Filter Bar */}
      <div className="sticky top-0 z-10 border-b border-[#DDDDDD] bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 overflow-x-auto px-6 py-3 [&>*]:shrink-0">
          <input
            type="date"
            aria-label={t('search.date')}
            className="h-10 rounded-lg border border-[#DDDDDD] bg-white px-3 text-sm text-[#222222] outline-none focus:border-[#C4956A]"
          />
          <select
            aria-label={t('search.time')}
            defaultValue=""
            className="h-10 rounded-lg border border-[#DDDDDD] bg-white px-3 text-sm text-[#222222] outline-none focus:border-[#C4956A]"
          >
            <option value="" disabled>{t('search.time')}</option>
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
            aria-label={t('search.childAge')}
            defaultValue=""
            className="h-10 rounded-lg border border-[#DDDDDD] bg-white px-3 text-sm text-[#222222] outline-none focus:border-[#C4956A]"
          >
            <option value="" disabled>{t('search.childAge')}</option>
            <option value="3">{t('search.age', { age: 3 })}</option>
            <option value="4">{t('search.age', { age: 4 })}</option>
            <option value="5">{t('search.age', { age: 5 })}</option>
            <option value="6">{t('search.age', { age: 6 })}</option>
            <option value="7">{t('search.age', { age: 7 })}</option>
            <option value="8">{t('search.age', { age: 8 })}</option>
          </select>
          <select
            aria-label={t('search.language')}
            defaultValue=""
            className="h-10 rounded-lg border border-[#DDDDDD] bg-white px-3 text-sm text-[#222222] outline-none focus:border-[#C4956A]"
          >
            <option value="" disabled>{t('search.language')}</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="zh">中文</option>
          </select>
          <Button variant="primary" size="sm">
            {t('common.search')}
          </Button>
        </div>
      </div>

      {/* Search Results */}
      <main id="main-content" className="min-h-screen bg-[#F7F7F7]">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          {/* Results Header */}
          <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <p className="text-base font-semibold text-[#222222]">
              {sitters && sitters.length > 0
                ? t('search.available', { count: sitters.length })
                : t('search.noSitters')}
            </p>
            <select
              aria-label={t('search.sortBy')}
              className="h-9 rounded-lg border border-[#DDDDDD] bg-white px-3 text-sm text-[#717171] outline-none focus:border-[#C4956A]"
            >
              <option value="recommended">{t('search.sortRecommended')}</option>
              <option value="rating">{t('search.sortRating')}</option>
              <option value="price">{t('search.sortPrice')}</option>
              <option value="reviews">{t('search.sortReviews')}</option>
            </select>
          </div>

          {/* Sitter Grid */}
          {sitters && sitters.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {sitters.map((sitter) => {
                const badges = buildSitterBadges(sitter);
                return (
                  <Link key={sitter.id} href={`/sitters/${sitter.id}`} className="block">
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
                          ★ {sitter.rating_avg.toFixed(2)} ({sitter.review_count})
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1 overflow-hidden max-h-[52px]">
                          {badges.map((badge) => (
                            <Badge key={badge.label} variant={badge.variant}>
                              {badge.label}
                            </Badge>
                          ))}
                        </div>
                        <p className="mt-auto pt-2 text-sm font-semibold text-[#222222]">
                          {sitter.hourly_rate.toLocaleString()}{t('search.perHour')}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </>
  );
}
