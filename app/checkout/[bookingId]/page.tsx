"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Button } from "@/src/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

/* ── Types ── */
interface BookingData {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  total_amount: number;
  service_fee: number;
  net_amount: number;
  sitter_profiles: {
    rating_avg: number | null;
    profiles: { full_name: string };
  };
  booking_children: { name: string; age: number }[];
}

/* ── Booking Summary ── */
function BookingSummary({ booking }: { booking: BookingData }) {
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const sitterName = booking.sitter_profiles?.profiles?.full_name ?? tCommon('unknownSitter');
  const rating = booking.sitter_profiles?.rating_avg;
  const startH = parseInt(booking.start_time.split(":")[0], 10);
  const endH = parseInt(booking.end_time.split(":")[0], 10);
  const startM = parseInt(booking.start_time.split(":")[1], 10) || 0;
  const endM = parseInt(booking.end_time.split(":")[1], 10) || 0;
  const hours = endH - startH + (endM - startM) / 60;
  const childCount = booking.booking_children?.length ?? 0;
  const hourlyRate = hours > 0 ? Math.round(booking.net_amount / hours) : 0;

  const fmt = (n: number) => n.toLocaleString("ko-KR");

  const dateStr = new Date(booking.date + "T00:00:00").toLocaleDateString(
    "ko-KR",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="rounded-[12px] bg-[var(--color-bg-cream)] p-5">
      <dl className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-[var(--color-text-secondary)]">{t('sitterLabel')}</dt>
          <dd className="font-medium text-[var(--color-text-primary)]">
            {sitterName}
            {rating != null && (
              <>
                {" "}
                <span className="text-[var(--color-accent)]">&#9733;</span> {rating.toFixed(2)}
              </>
            )}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[var(--color-text-secondary)]">{t('dateLabel')}</dt>
          <dd className="font-medium text-[var(--color-text-primary)]">{dateStr}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[var(--color-text-secondary)]">{t('timeLabel')}</dt>
          <dd className="font-medium text-[var(--color-text-primary)]">
            {booking.start_time.slice(0, 5)} – {booking.end_time.slice(0, 5)} (
            {t('hoursCount', { count: hours })})
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[var(--color-text-secondary)]">{t('childrenLabel')}</dt>
          <dd className="font-medium text-[var(--color-text-primary)]">
            {tCommon('childCount', { count: childCount })}
          </dd>
        </div>

        <hr className="my-3 border-t border-[var(--color-border)]" />

        <div className="flex justify-between">
          <dt className="text-[var(--color-text-secondary)]">{t('rateLabel')}</dt>
          <dd className="font-medium text-[var(--color-text-primary)]">
            {t('won', { amount: fmt(hourlyRate) })} &times; {t('hoursCount', { count: hours })}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[var(--color-text-secondary)]">{t('subtotalLabel')}</dt>
          <dd className="font-medium text-[var(--color-text-primary)]">
            {t('won', { amount: fmt(booking.net_amount) })}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[var(--color-text-secondary)]">{t('serviceFeeLabel')}</dt>
          <dd className="font-medium text-[var(--color-text-primary)]">
            {t('won', { amount: fmt(booking.service_fee) })}
          </dd>
        </div>

        <hr className="my-3 border-t border-[var(--color-border)]" />

        <div className="flex justify-between">
          <dt className="text-[18px] font-bold text-[var(--color-text-primary)]">{t('totalLabel')}</dt>
          <dd className="text-[18px] font-bold text-[var(--color-text-primary)]">
            {t('won', { amount: fmt(booking.total_amount) })}
          </dd>
        </div>
      </dl>
    </div>
  );
}

/* ── Payment Form (inside Elements) ── */
function PaymentForm({
  booking,
  showSummary,
  setShowSummary,
}: {
  booking: BookingData;
  showSummary: boolean;
  setShowSummary: (v: boolean) => void;
}) {
  const t = useTranslations('checkout');
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fmt = (n: number) => n.toLocaleString("ko-KR");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setProcessing(true);
      setErrorMsg(null);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/${booking.id}/complete`,
        },
      });

      // Only reaches here if there's an immediate error (redirect didn't happen)
      if (error) {
        setErrorMsg(error.message ?? t('paymentFailedNote'));
      }
      setProcessing(false);
    },
    [stripe, elements, booking.id, t]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto max-w-[640px] md:max-w-[1040px]">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* ── Left: Payment form ── */}
          <div className="w-full md:flex-1 md:max-w-[640px]">
            {/* Mobile collapsible booking summary */}
            <div className="mb-6 md:hidden">
              <button
                type="button"
                onClick={() => setShowSummary(!showSummary)}
                className="flex w-full items-center justify-between text-sm font-semibold text-[var(--color-text-primary)]"
              >
                {t('viewBookingDetails')}
                <span
                  className={`text-xs transition-transform duration-200 ${
                    showSummary ? "rotate-180" : ""
                  }`}
                >
                  &#9660;
                </span>
              </button>
              {showSummary && (
                <div className="mt-3">
                  <BookingSummary booking={booking} />
                </div>
              )}
            </div>

            {/* Stripe Payment Element */}
            <section className="mb-8">
              <h2 className="mb-4 text-[18px] font-semibold text-[var(--color-text-primary)]">
                {t('paymentMethod')}
              </h2>
              <PaymentElement />
            </section>

            {/* Secure payment notice */}
            <section className="mb-8">
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                {t('securePayment')}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {t('secureNote')}
              </p>
            </section>

            {/* Cancellation policy */}
            <section className="mb-8">
              <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                {t('cancellation')}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {t('cancellationNote')}
              </p>
            </section>

            {/* Error message */}
            {errorMsg && (
              <div className="mb-4 rounded-[8px] bg-[#FFEBEE] p-3 text-sm text-[#D32F2F]">
                {errorMsg}
              </div>
            )}

            {/* Pay button */}
            <Button
              type="submit"
              className="w-full"
              disabled={!stripe || !elements || processing}
            >
              {processing
                ? t('processing')
                : t('pay', { amount: fmt(booking.total_amount) })}
            </Button>
            <p className="mt-3 text-center text-xs text-[var(--color-text-light)]">
              {t('agreeNote')}
            </p>
          </div>

          {/* ── Right: Desktop sticky summary ── */}
          <aside className="hidden md:block w-[360px] shrink-0">
            <div className="sticky top-24">
              <BookingSummary booking={booking} />
            </div>
          </aside>
        </div>
      </div>
    </form>
  );
}

/* ── Page ── */
export default function CheckoutPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        // Fetch booking data and create PaymentIntent in parallel
        const [bookingRes, checkoutRes] = await Promise.all([
          fetch(`/api/bookings/${bookingId}`),
          fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId }),
          }),
        ]);

        if (!bookingRes.ok) {
          const data = await bookingRes.json();
          throw new Error(data.error || "Failed to load booking");
        }
        if (!checkoutRes.ok) {
          const data = await checkoutRes.json();
          throw new Error(data.error || "Failed to create payment");
        }

        const bookingData = await bookingRes.json();
        const { clientSecret: secret } = await checkoutRes.json();

        setBooking(bookingData);
        setClientSecret(secret);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [bookingId]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main id="main-content" className="flex-1 px-6 py-8">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-accent)]" />
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-[480px] py-20 text-center">
            <p className="text-sm text-[#D32F2F]">{error}</p>
          </div>
        )}

        {!loading && !error && clientSecret && booking && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#C4956A",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <PaymentForm
              booking={booking}
              showSummary={showSummary}
              setShowSummary={setShowSummary}
            />
          </Elements>
        )}
      </main>

      <Footer />
    </div>
  );
}
