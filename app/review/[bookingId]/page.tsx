"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Avatar } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

const RATING_LABELS = ["Poor", "Fair", "Good", "Great", "Excellent"] as const;

const TAGS = [
  "Punctual",
  "Great with kids",
  "Good communicator",
  "Creative activities",
  "Professional",
  "Caring",
  "Would book again",
  "Flexible",
] as const;

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill={filled ? "#C4956A" : "#DDDDDD"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const displayRating = hoveredRating || rating;

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-[22px] font-semibold text-[var(--color-text-primary)]">
              Thank you for your review!
            </h1>
            <p className="mt-3 text-base text-[var(--color-text-secondary)]">
              Your feedback helps other families find great sitters.
            </p>
            <div className="mt-8">
              <Button variant="secondary" asChild>
                <Link href="/">Back to home</Link>
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
      <main className="mx-auto w-full max-w-[640px] px-6 py-6">
        {/* Sitter info */}
        <section className="flex items-center gap-3 py-6">
          <Avatar size="md" fallback="E" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-[var(--color-text-primary)]">
                Emily K.
              </span>
              <Badge variant="verified">Verified</Badge>
            </div>
            <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
              March 15, 2026 · 18:00 – 22:00
            </p>
          </div>
        </section>

        {/* Star rating */}
        <section className="py-6">
          <h2 className="text-[22px] font-semibold text-[var(--color-text-primary)]">
            How was your experience?
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
            What stood out?
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`cursor-pointer rounded-[4px] px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-[#C4956A] text-white"
                      : "bg-[#F5F0EB] text-[#8B7355]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        {/* Review text */}
        <section className="py-6">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Tell other families about your experience
          </h2>
          <textarea
            value={reviewText}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setReviewText(e.target.value);
              }
            }}
            placeholder="What would you like other parents to know?"
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
            onClick={() => setSubmitted(true)}
          >
            Submit review
          </Button>
          <p className="mt-3 text-center text-sm text-[var(--color-text-secondary)]">
            Your review will be visible after verification
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
