"use client";

import { useState } from "react";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

type PaymentMethod = "card" | "alipay" | "wechat" | "paypal";

/* ── Booking Summary ── */
function BookingSummary() {
  return (
    <div className="rounded-[12px] bg-[#F5F0EB] p-5">
      <dl className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-[#717171]">Sitter</dt>
          <dd className="font-medium text-[#222222]">
            Emily K. <span className="text-[#C4956A]">&#9733;</span> 4.92
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#717171]">Date</dt>
          <dd className="font-medium text-[#222222]">March 15, 2026</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#717171]">Time</dt>
          <dd className="font-medium text-[#222222]">
            18:00 – 22:00 (4 hours)
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#717171]">Children</dt>
          <dd className="font-medium text-[#222222]">1 child</dd>
        </div>

        <hr className="my-3 border-t border-[#DDDDDD]" />

        <div className="flex justify-between">
          <dt className="text-[#717171]">Rate</dt>
          <dd className="font-medium text-[#222222]">
            25,000&#xA0;won &#215; 4 hours
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#717171]">Subtotal</dt>
          <dd className="font-medium text-[#222222]">100,000&#xA0;won</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#717171]">Service fee (20%)</dt>
          <dd className="font-medium text-[#222222]">20,000&#xA0;won</dd>
        </div>

        <hr className="my-3 border-t border-[#DDDDDD]" />

        <div className="flex justify-between">
          <dt className="text-[18px] font-bold text-[#222222]">Total</dt>
          <dd className="text-[18px] font-bold text-[#222222]">
            120,000&#xA0;won
          </dd>
        </div>
      </dl>
    </div>
  );
}

/* ── Payment Method Option ── */
function PaymentOption({
  label,
  description,
  value,
  selected,
  onSelect,
}: {
  label: string;
  description?: string;
  value: PaymentMethod;
  selected: boolean;
  onSelect: (v: PaymentMethod) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`flex w-full items-center gap-3 rounded-[8px] p-4 text-left transition-colors ${
        selected
          ? "border-2 border-[#C4956A]"
          : "border border-[#DDDDDD]"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-[#C4956A]" : "border-[#DDDDDD]"
        }`}
      >
        {selected && (
          <span className="h-2.5 w-2.5 rounded-full bg-[#C4956A]" />
        )}
      </span>
      <div>
        <p className="text-sm font-medium text-[#222222]">{label}</p>
        {description && (
          <p className="text-xs text-[#717171]">{description}</p>
        )}
      </div>
    </button>
  );
}

/* ── Page ── */
export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-[640px] md:max-w-[1040px]">
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* ── Left: Payment form ── */}
            <div className="w-full md:flex-1 md:max-w-[640px]">
              {/* Mobile collapsible booking summary */}
              <div className="mb-6 md:hidden">
                <button
                  type="button"
                  onClick={() => setShowSummary(!showSummary)}
                  className="flex w-full items-center justify-between text-sm font-semibold text-[#222222]"
                >
                  View booking details
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
                    <BookingSummary />
                  </div>
                )}
              </div>

              {/* Payment method selection */}
              <section className="mb-8">
                <h2 className="mb-4 text-[18px] font-semibold text-[#222222]">
                  Payment method
                </h2>
                <div className="flex flex-col gap-3">
                  <PaymentOption
                    label="Credit / Debit Card"
                    description="Visa, Mastercard, JCB, AMEX"
                    value="card"
                    selected={paymentMethod === "card"}
                    onSelect={setPaymentMethod}
                  />
                  <PaymentOption
                    label="Alipay"
                    value="alipay"
                    selected={paymentMethod === "alipay"}
                    onSelect={setPaymentMethod}
                  />
                  <PaymentOption
                    label="WeChat Pay"
                    value="wechat"
                    selected={paymentMethod === "wechat"}
                    onSelect={setPaymentMethod}
                  />
                  <PaymentOption
                    label="PayPal"
                    value="paypal"
                    selected={paymentMethod === "paypal"}
                    onSelect={setPaymentMethod}
                  />
                </div>
              </section>

              {/* Card info inputs (Credit Card only) */}
              {paymentMethod === "card" && (
                <section className="mb-8">
                  <div className="flex flex-col gap-4">
                    <Input label="Card number" placeholder="Card number" />
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Input label="Expiry" placeholder="MM/YY" />
                      </div>
                      <div className="flex-1">
                        <Input label="CVC" placeholder="CVC" />
                      </div>
                    </div>
                    <Input label="Name on card" placeholder="Name on card" />
                  </div>
                </section>
              )}

              {/* Secure payment notice */}
              <section className="mb-8">
                <h3 className="text-base font-semibold text-[#222222]">
                  Secure payment
                </h3>
                <p className="mt-1 text-sm text-[#717171]">
                  Your payment is protected. You won&#39;t be charged until the
                  sitter confirms your booking.
                </p>
              </section>

              {/* Cancellation policy */}
              <section className="mb-8">
                <h3 className="text-base font-semibold text-[#222222]">
                  Cancellation policy
                </h3>
                <p className="mt-1 text-sm text-[#717171]">
                  Free cancellation up to 24 hours before the session.
                  Cancellations within 24 hours may be subject to a fee.
                </p>
              </section>

              {/* Pay button */}
              <Button className="w-full">Pay 120,000&#xA0;won</Button>
              <p className="mt-3 text-center text-xs text-[#B0B0B0]">
                By confirming, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>

            {/* ── Right: Desktop sticky summary ── */}
            <aside className="hidden md:block w-[360px] shrink-0">
              <div className="sticky top-24">
                <BookingSummary />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
