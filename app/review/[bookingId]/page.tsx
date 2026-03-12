"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Avatar } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

const TAG_KEYS = [
  "tagPunctual",
  "tagGreatWithKids",
  "tagCommunicator",
  "tagCreative",
  "tagProfessional",
  "tagCaring",
  "tagWouldBookAgain",
  "tagFlexible",
] as const;

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill={filled ? "#C4956A" : "#DDDDDD"}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

interface BookingInfo {
  sitter_name: string;
  sitter_initial: string;
  sitter_is_verified: boolean;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  has_review: boolean;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(timeStr: string): string {
  return timeStr.slice(0, 5);
}

export default function ReviewPage() {
  const t = useTranslations();
  const { bookingId } = useParams<{ bookingId: string }>();
  const router = useRouter();

  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const displayRating = hoveredRating || rating;

  const RATING_LABELS = [
    t('review.poor'),
    t('review.fair'),
    t('review.good'),
    t('review.great'),
    t('review.excellent'),
  ];

  useEffect(() => {
    async function loadBooking() {
      const res = await fetch(`/api/bookings/${bookingId}`);
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setError(t('review.bookingNotFound'));
        setLoading(false);
        return;
      }
      const data = await res.json();
      const sp = data.sitter_profiles;
      const sitterName = sp?.profiles?.full_name ?? "Unknown";

      setBookingInfo({
        sitter_name: sitterName,
        sitter_initial: sitterName.charAt(0),
        sitter_is_verified: sp?.is_verified ?? false,
        date: data.date,
        start_time: data.start_time,
        end_time: data.end_time,
        status: data.status,
        has_review: Array.isArray(data.reviews) && data.reviews.length > 0,
      });
      setLoading(false);
    }
    loadBooking();
  }, [bookingId, router, t]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleSubmit() {
    if (rating === 0 || submitting) return;
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId,
        rating,
        keywords: selectedTags,
        comment: reviewText || null,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? t('common.error'));
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-[#717171]">{t('common.loading')}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!bookingInfo) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-[#717171]">{error || t('review.bookingNotFound')}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (bookingInfo.has_review) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)]">
              {t('review.alreadyReviewed')}
            </h1>
            <p className="mt-3 text-base text-[var(--color-text-secondary)]">
              {t('review.alreadyReviewedNote')}
            </p>
            <div className="mt-8">
              <Button variant="secondary" asChild>
                <Link href={`/booking/${bookingId}`}>{t('review.backToBooking')}</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)]">
              {t('review.thankYou')}
            </h1>
            <p className="mt-3 text-base text-[var(--color-text-secondary)]">
              {t('review.helpNote')}
            </p>
            <div className="mt-8">
              <Button variant="secondary" asChild>
                <Link href="/">{t('review.backToHome')}</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <Header />
      <main id="main-content" className="mx-auto w-full max-w-[640px] px-6 py-6">
        {/* Sitter info */}
        <section className="flex items-center gap-3 py-6">
          <Avatar size="md" fallback={bookingInfo.sitter_initial} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-[var(--color-text-primary)]">
                {bookingInfo.sitter_name}
              </span>
              {bookingInfo.sitter_is_verified && (
                <Badge variant="verified">{t('common.verified')}</Badge>
              )}
            </div>
            <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
              {formatDate(bookingInfo.date)} · {formatTime(bookingInfo.start_time)} – {formatTime(bookingInfo.end_time)}
            </p>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-[8px] bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Star rating */}
        <section className="py-6">
          <h2 className="text-[22px] font-semibold text-[var(--color-text-primary)]">
            {t('review.howWas')}
          </h2>
          <div
            className="mt-4 flex gap-1"
            onMouseLeave={() => setHoveredRating(0)}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="cursor-pointer bg-transparent p-0"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <StarIcon filled={star <= displayRating} />
              </button>
            ))}
          </div>
          {displayRating > 0 && (
            <p className="mt-2 text-base text-[var(--color-text-primary)]">
              {RATING_LABELS[displayRating - 1]}
            </p>
          )}
        </section>

        {/* Keyword tags */}
        <section className="py-6">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {t('review.whatStoodOut')}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TAG_KEYS.map((tagKey) => {
              const label = t(`review.${tagKey}`);
              const isSelected = selectedTags.includes(label);
              return (
                <button
                  key={tagKey}
                  type="button"
                  onClick={() => toggleTag(label)}
                  className={`cursor-pointer rounded-[4px] px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-[#C4956A] text-white"
                      : "bg-[#F5F0EB] text-[#8B7355]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Review text */}
        <section className="py-6">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {t('review.tellOthers')}
          </h2>
          <textarea
            value={reviewText}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setReviewText(e.target.value);
              }
            }}
            placeholder={t('review.placeholder')}
            className="mt-4 h-[120px] w-full resize-none rounded-[8px] border border-[#DDDDDD] bg-[var(--color-bg)] px-4 py-4 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-weak)] outline-none transition-[border-color] duration-200 focus:border-2 focus:border-[var(--color-border-hover)] focus:px-[15px] focus:py-[15px]"
          />
          <p className="mt-2 text-right text-sm text-[var(--color-text-weak)]">
            {reviewText.length} / 500
          </p>
        </section>

        {/* Submit */}
        <section className="py-6">
          <Button
            className="w-full"
            disabled={rating === 0 || submitting}
            onClick={handleSubmit}
          >
            {submitting ? t('review.submitting') : t('review.submit')}
          </Button>
          <p className="mt-3 text-center text-sm text-[var(--color-text-secondary)]">
            {t('review.verifyNote')}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
