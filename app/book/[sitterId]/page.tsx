"use client";

import { useState } from "react";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Avatar } from "@/src/components/ui/avatar";

/* ── Step indicator ── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isComplete = step < current;
        const isCurrent = step === current;
        return (
          <span key={step} className="flex items-center gap-2">
            {i > 0 && (
              <span
                className={`h-px w-4 ${isComplete ? "bg-[#222222]" : "bg-[#DDDDDD]"}`}
              />
            )}
            <span
              className={
                isCurrent
                  ? "text-[#C4956A]"
                  : isComplete
                    ? "text-[#222222]"
                    : "text-[#B0B0B0]"
              }
            >
              Step {step}
            </span>
          </span>
        );
      })}
      <span className="text-[#B0B0B0]">of {total}</span>
    </div>
  );
}

/* ── Sitter sidebar (desktop only) ── */
function SitterSidebar() {
  return (
    <aside className="hidden md:block w-[240px] shrink-0">
      <div className="rounded-[12px] bg-[#F5F0EB] p-4">
        <div className="flex items-center gap-3">
          <Avatar size="md" fallback="E" alt="Emily K." />
          <div>
            <p className="text-base font-semibold text-[#222222]">Emily K.</p>
            <p className="text-sm text-[#717171]">
              <span className="text-[#C4956A]">&#9733;</span> 4.92
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm font-medium text-[#222222]">
          25,000&#xA0;won/hr
        </p>
      </div>
    </aside>
  );
}

/* ── Step 1: Schedule ── */
function StepSchedule({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[22px] font-semibold leading-tight text-[#222222]">
        When do you need a sitter?
      </h1>

      <Input label="Date" type="date" />
      <Input label="Start time" placeholder="Start time, e.g. 18:00" />
      <Input label="End time" placeholder="End time, e.g. 22:00" />

      <p className="text-sm text-[#717171]">Evening sessions: 18:00 – 23:00</p>

      <Button className="w-full" onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

/* ── Step 2: Children ── */
function StepChildren({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [showSecondChild, setShowSecondChild] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[22px] font-semibold leading-tight text-[#222222]">
        Tell us about your children
      </h1>

      {/* Child 1 */}
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-sm font-semibold text-[#222222]">
          Child 1
        </legend>
        <Input label="Name" placeholder="Child's name" />
        <Input label="Age" placeholder="Age" />
        <Input
          label="Special notes"
          placeholder="Allergies, routines, preferences..."
        />
      </fieldset>

      {/* Child 2 */}
      {showSecondChild ? (
        <fieldset className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <legend className="text-sm font-semibold text-[#222222]">
              Child 2
            </legend>
            <button
              type="button"
              className="text-sm text-[#717171] underline"
              onClick={() => setShowSecondChild(false)}
            >
              Remove
            </button>
          </div>
          <Input label="Name" placeholder="Child's name" />
          <Input label="Age" placeholder="Age" />
          <Input
            label="Special notes"
            placeholder="Allergies, routines, preferences..."
          />
        </fieldset>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="self-start"
          onClick={() => setShowSecondChild(true)}
        >
          + Add another child
        </Button>
      )}

      <p className="text-sm text-[#717171]">Max 2 children per session</p>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button className="flex-1" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

/* ── Step 3: Emergency Contact ── */
function StepEmergency({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[22px] font-semibold leading-tight text-[#222222]">
        Emergency contact
      </h1>

      <Input label="Contact name" placeholder="Name" />
      <Input label="Phone" placeholder="Phone number" type="tel" />
      <Input
        label="Relationship"
        placeholder="e.g. Parent, Hotel front desk"
      />

      <p className="text-sm text-[#717171]">
        We&#39;ll only use this in case of emergency
      </p>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button className="flex-1" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

/* ── Step 4: Confirm & Pay ── */
function StepConfirm({ onBack }: { onBack: () => void }) {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeExcluded, setAgreeExcluded] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[22px] font-semibold leading-tight text-[#222222]">
        Review your booking
      </h1>

      {/* Summary card */}
      <div className="rounded-[12px] bg-[#F5F0EB] p-6 text-sm">
        <dl className="flex flex-col gap-3">
          <div className="flex justify-between">
            <dt className="text-[#717171]">Sitter</dt>
            <dd className="font-medium text-[#222222]">Emily K.</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Date</dt>
            <dd className="font-medium text-[#222222]">March 15, 2026</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Time</dt>
            <dd className="font-medium text-[#222222]">18:00 – 22:00</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Duration</dt>
            <dd className="font-medium text-[#222222]">4 hours</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Children</dt>
            <dd className="font-medium text-[#222222]">1 child</dd>
          </div>

          <hr className="border-[#DDDDDD]" />

          <div className="flex justify-between">
            <dt className="text-[#717171]">Rate</dt>
            <dd className="font-medium text-[#222222]">25,000 won/hr</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Subtotal</dt>
            <dd className="font-medium text-[#222222]">100,000 won</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Service fee (20%)</dt>
            <dd className="font-medium text-[#222222]">20,000 won</dd>
          </div>

          <hr className="border-[#DDDDDD]" />

          <div className="flex justify-between">
            <dt className="text-base font-semibold text-[#222222]">Total</dt>
            <dd className="text-base font-semibold text-[#222222]">
              120,000 won
            </dd>
          </div>
        </dl>
      </div>

      {/* Agreements */}
      <div className="flex flex-col gap-3">
        <label className="flex items-start gap-3 text-sm text-[#222222]">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#C4956A]"
          />
          I agree to the service terms and cancellation policy
        </label>
        <label className="flex items-start gap-3 text-sm text-[#222222]">
          <input
            type="checkbox"
            checked={agreeExcluded}
            onChange={(e) => setAgreeExcluded(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#C4956A]"
          />
          I confirm the excluded services (no overnight, pool, vehicle,
          medication)
        </label>
      </div>

      <Button className="w-full">Confirm booking</Button>

      <p className="text-sm text-[#717171]">
        You won&#39;t be charged until the sitter confirms
      </p>

      <Button variant="secondary" className="w-full" onClick={onBack}>
        Back
      </Button>
    </div>
  );
}

/* ── Page ── */
export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const next = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 px-6 py-8">
        <div className="mx-auto flex max-w-[640px] gap-8 md:max-w-[920px]">
          <SitterSidebar />

          <div className="w-full max-w-[640px]">
            <div className="mb-8">
              <StepIndicator current={currentStep} total={4} />
            </div>

            {currentStep === 1 && <StepSchedule onNext={next} />}
            {currentStep === 2 && (
              <StepChildren onNext={next} onBack={back} />
            )}
            {currentStep === 3 && (
              <StepEmergency onNext={next} onBack={back} />
            )}
            {currentStep === 4 && <StepConfirm onBack={back} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
