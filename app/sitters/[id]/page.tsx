import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Avatar } from "@/src/components/ui/avatar";
import {
  getSitterById,
  buildSitterBadges,
  formatAvailability,
  formatRelativeTime,
} from "@/src/lib/queries";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const sitter = await getSitterById(id);
  if (!sitter) return { title: "Sitter Not Found" };
  return {
    title: `${sitter.name} — ★ ${sitter.rating_avg.toFixed(1)}`,
    description:
      sitter.bio ?? `Book ${sitter.name}, a verified babysitter in Seoul.`,
  };
}

function Stars({ count }: { count: number }) {
  const full = Math.round(count);
  return (
    <span className="text-sm text-[#222222]" aria-label={`${full} out of 5 stars`}>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

export default async function SitterProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sitter = await getSitterById(id);
  const t = await getTranslations();

  if (!sitter) notFound();

  const badges = buildSitterBadges(sitter);
  const firstName = sitter.name.split(" ")[0];
  const initial = sitter.name.charAt(0);
  const formattedPrice = sitter.hourly_rate.toLocaleString();
  const availabilityLines = formatAvailability(sitter.availability);
  const certificationLines = sitter.certifications.map((c) => {
    const parts = [c.name];
    if (c.issued_by) parts.push(`— ${c.issued_by}`);
    if (c.year) parts.push(`${c.year}`);
    return parts.join(" ");
  });

  return (
    <>
      <Header />

      <main id="main-content">
      {/* Section 1: Profile Header */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Photo Placeholder */}
            <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-[#E8E0D8] md:w-[280px] md:shrink-0">
              <span className="text-[48px] font-semibold text-[#C4B5A6]">
                {initial}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              <h1 className="text-[26px] font-semibold text-[#222222]">
                {sitter.name}
              </h1>

              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge key={badge.label} variant={badge.variant}>
                    {badge.label}
                  </Badge>
                ))}
              </div>

              <p className="text-base text-[#222222]">
                ★ {sitter.rating_avg.toFixed(2)} ({t('sitter.reviewCountText', { count: sitter.review_count })})
              </p>

              <p className="text-[22px] font-semibold text-[#222222]">
                {formattedPrice}{t('sitter.perHour')}
              </p>

              {sitter.bio && (
                <p className="text-base text-[#717171]">{sitter.bio}</p>
              )}

              <div className="hidden md:block">
                <Button variant="primary" asChild>
                  <Link href={`/book/${id}`}>{t('sitter.bookSitter', { name: firstName })}</Link>
                </Button>
              </div>
              <div className="md:hidden">
                <Button variant="primary" className="w-full" asChild>
                  <Link href={`/book/${id}`}>{t('sitter.bookSitter', { name: firstName })}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Video Introduction Placeholder */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-[#E8E0D8]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <path d="M18 14L36 24L18 34V14Z" fill="#C4B5A6" />
            </svg>
          </div>
          <p className="mt-3 text-sm text-[#717171]">{t('sitter.videoIntro')}</p>
        </div>
      </section>

      {/* Section 3: About */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-6">
          <h2 className="text-lg font-semibold text-[#222222]">
            {t('sitter.about', { name: firstName })}
          </h2>
          {sitter.bio ? (
            <p
              className="mt-3 text-base leading-relaxed text-[#717171]"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {sitter.bio}
            </p>
          ) : (
            <p className="mt-3 text-base text-[#717171]">
              {t('sitter.noBio')}
            </p>
          )}
        </div>
      </section>

      {/* Section 4: Qualifications & Experience */}
      {certificationLines.length > 0 && (
        <section className="bg-[#F5F0EB]">
          <div className="mx-auto max-w-[1280px] px-6 py-8">
            <h2 className="text-lg font-semibold text-[#222222]">
              {t('sitter.qualifications')}
            </h2>
            <ul className="mt-4">
              {certificationLines.map((q, i) => (
                <li
                  key={i}
                  className={`py-3 text-base text-[#222222] ${
                    i < certificationLines.length - 1
                      ? "border-b border-[#DDDDDD]"
                      : ""
                  }`}
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Section 5: Reviews */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <h2 className="text-lg font-semibold text-[#222222]">
            {t('sitter.reviews')}{" "}
            <span className="font-semibold">{t('sitter.reviewCount', { count: sitter.review_count })}</span>
          </h2>

          {sitter.reviews.length > 0 ? (
            <div className="mt-4">
              {sitter.reviews.map((review, i) => (
                <div
                  key={review.id}
                  className={`py-4 ${
                    i < sitter.reviews.length - 1
                      ? "border-b border-[#DDDDDD]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="sm"
                      fallback={review.parent_name.charAt(0)}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#222222]">
                        {review.parent_name}
                      </p>
                      <div className="flex items-center gap-2">
                        <Stars count={review.rating} />
                        <span className="text-xs text-[#717171]">
                          {formatRelativeTime(review.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-base text-[#717171]">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-base text-[#717171]">{t('sitter.noReviews')}</p>
          )}

          {sitter.review_count > 3 && (
            <a
              href="#"
              className="mt-4 inline-block text-sm text-[#222222] underline"
            >
              {t('sitter.seeAllReviews', { count: sitter.review_count })}
            </a>
          )}
        </div>
      </section>

      {/* Section 6: Availability */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-6">
          <h2 className="text-lg font-semibold text-[#222222]">
            {t('sitter.availability')}
          </h2>
          {availabilityLines.length > 0 ? (
            <div className="mt-3 space-y-1">
              {availabilityLines.map((line, i) => (
                <p key={i} className="text-base text-[#222222]">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-base text-[#717171]">
              {t('sitter.noAvailability')}
            </p>
          )}
          <p className="mt-3 text-sm text-[#717171]">
            {t('sitter.advanceBooking')}
          </p>
        </div>
      </section>

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-20 md:hidden" />
      </main>

      <Footer />

      {/* Section 7: Sticky Bottom CTA (mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#DDDDDD] bg-white px-6 py-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden">
        <div className="flex items-center justify-between gap-4">
          <p className="text-base font-semibold text-[#222222]">
            {formattedPrice}{t('sitter.perHour')}
          </p>
          <Button variant="primary" asChild>
            <Link href={`/book/${id}`}>{t('sitter.bookSitter', { name: firstName })}</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
