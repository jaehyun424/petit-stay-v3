"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Button } from "@/src/components/ui/button";

export default function CompletePage() {
  const t = useTranslations('checkout');
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = params.bookingId as string;

  const redirectStatus = searchParams.get("redirect_status");
  const paymentIntentId = searchParams.get("payment_intent");

  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (redirectStatus !== "succeeded" || !paymentIntentId) return;

    async function confirmBooking() {
      setConfirming(true);
      try {
        const res = await fetch("/api/checkout/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId, paymentIntentId }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to confirm booking");
        }
        setConfirmed(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setConfirming(false);
      }
    }

    confirmBooking();
  }, [redirectStatus, paymentIntentId, bookingId]);

  const succeeded = redirectStatus === "succeeded";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="mx-auto max-w-[480px] text-center">
          {succeeded && confirming && (
            <>
              <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-[#DDDDDD] border-t-[#C4956A]" />
              <h1 className="text-[24px] font-bold text-[#222222]">
                {t('confirmingPayment')}
              </h1>
              <p className="mt-2 text-sm text-[#717171]">
                {t('verifyingPayment')}
              </p>
            </>
          )}

          {succeeded && confirmed && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E9]">
                <svg
                  className="h-8 w-8 text-[#4CAF50]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-[24px] font-bold text-[#222222]">
                {t('paymentConfirmed')}
              </h1>
              <p className="mt-2 text-sm text-[#717171]">
                {t('bookingConfirmedNote')}
              </p>
              <div className="mt-8">
                <Button asChild>
                  <Link href={`/booking/${bookingId}`}>{t('viewBooking')}</Link>
                </Button>
              </div>
            </>
          )}

          {(error || (!succeeded && !confirming)) && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFEBEE]">
                <svg
                  className="h-8 w-8 text-[#F44336]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-[24px] font-bold text-[#222222]">
                {t('paymentFailed')}
              </h1>
              <p className="mt-2 text-sm text-[#717171]">
                {error || t('paymentFailedNote')}
              </p>
              <div className="mt-8">
                <Button asChild>
                  <Link href={`/checkout/${bookingId}`}>{t('tryAgain')}</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
