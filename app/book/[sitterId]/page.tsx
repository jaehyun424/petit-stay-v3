"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Avatar } from "@/src/components/ui/avatar";

/* ── Types ── */

interface SitterInfo {
  id: string;
  name: string;
  avatar_url: string | null;
  hourly_rate: number;
  rating_avg: number;
  is_verified: boolean;
}

interface ChildData {
  name: string;
  age: string;
  specialNotes: string;
}

interface EmergencyData {
  name: string;
  phone: string;
  relationship: string;
}

/* ── Helpers ── */

function formatWon(amount: number): string {
  return `${amount.toLocaleString()} won`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function calculateHours(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  if (isNaN(sh) || isNaN(eh)) return 0;
  return eh + (em || 0) / 60 - (sh + (sm || 0) / 60);
}

/* ── Step indicator ── */
function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
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
function SitterSidebar({ sitter }: { sitter: SitterInfo }) {
  return (
    <aside className="hidden md:block w-[240px] shrink-0">
      <div className="rounded-[12px] bg-[#F5F0EB] p-4">
        <div className="flex items-center gap-3">
          <Avatar
            size="md"
            fallback={sitter.name.charAt(0)}
            alt={sitter.name}
          />
          <div>
            <p className="text-base font-semibold text-[#222222]">
              {sitter.name}
            </p>
            <p className="text-sm text-[#717171]">
              <span className="text-[#C4956A]">&#9733;</span>{" "}
              {sitter.rating_avg.toFixed(2)}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm font-medium text-[#222222]">
          {formatWon(sitter.hourly_rate)}/hr
        </p>
      </div>
    </aside>
  );
}

/* ── Step 1: Schedule ── */
function StepSchedule({
  date,
  startTime,
  endTime,
  onChangeDate,
  onChangeStartTime,
  onChangeEndTime,
  onNext,
}: {
  date: string;
  startTime: string;
  endTime: string;
  onChangeDate: (v: string) => void;
  onChangeStartTime: (v: string) => void;
  onChangeEndTime: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[22px] font-semibold leading-tight text-[#222222]">
        When do you need a sitter?
      </h1>

      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => onChangeDate(e.target.value)}
      />
      <Input
        label="Start time"
        placeholder="Start time, e.g. 18:00"
        value={startTime}
        onChange={(e) => onChangeStartTime(e.target.value)}
      />
      <Input
        label="End time"
        placeholder="End time, e.g. 22:00"
        value={endTime}
        onChange={(e) => onChangeEndTime(e.target.value)}
      />

      <p className="text-sm text-[#717171]">Evening sessions: 18:00 – 23:00</p>

      <Button className="w-full" onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

/* ── Step 2: Children ── */
function StepChildren({
  children,
  onChange,
  onNext,
  onBack,
}: {
  children: ChildData[];
  onChange: (children: ChildData[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const updateChild = (
    index: number,
    field: keyof ChildData,
    value: string,
  ) => {
    const updated = [...children];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

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
        <Input
          label="Name"
          placeholder="Child's name"
          value={children[0].name}
          onChange={(e) => updateChild(0, "name", e.target.value)}
        />
        <Input
          label="Age"
          placeholder="Age"
          value={children[0].age}
          onChange={(e) => updateChild(0, "age", e.target.value)}
        />
        <Input
          label="Special notes"
          placeholder="Allergies, routines, preferences..."
          value={children[0].specialNotes}
          onChange={(e) => updateChild(0, "specialNotes", e.target.value)}
        />
      </fieldset>

      {/* Child 2 */}
      {children.length > 1 ? (
        <fieldset className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <legend className="text-sm font-semibold text-[#222222]">
              Child 2
            </legend>
            <button
              type="button"
              className="text-sm text-[#717171] underline"
              onClick={() => onChange(children.slice(0, 1))}
            >
              Remove
            </button>
          </div>
          <Input
            label="Name"
            placeholder="Child's name"
            value={children[1].name}
            onChange={(e) => updateChild(1, "name", e.target.value)}
          />
          <Input
            label="Age"
            placeholder="Age"
            value={children[1].age}
            onChange={(e) => updateChild(1, "age", e.target.value)}
          />
          <Input
            label="Special notes"
            placeholder="Allergies, routines, preferences..."
            value={children[1].specialNotes}
            onChange={(e) => updateChild(1, "specialNotes", e.target.value)}
          />
        </fieldset>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="self-start"
          onClick={() =>
            onChange([...children, { name: "", age: "", specialNotes: "" }])
          }
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
  contact,
  onChange,
  onNext,
  onBack,
}: {
  contact: EmergencyData;
  onChange: (contact: EmergencyData) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[22px] font-semibold leading-tight text-[#222222]">
        Emergency contact
      </h1>

      <Input
        label="Contact name"
        placeholder="Name"
        value={contact.name}
        onChange={(e) => onChange({ ...contact, name: e.target.value })}
      />
      <Input
        label="Phone"
        placeholder="Phone number"
        type="tel"
        value={contact.phone}
        onChange={(e) => onChange({ ...contact, phone: e.target.value })}
      />
      <Input
        label="Relationship"
        placeholder="e.g. Parent, Hotel front desk"
        value={contact.relationship}
        onChange={(e) =>
          onChange({ ...contact, relationship: e.target.value })
        }
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
function StepConfirm({
  sitter,
  date,
  startTime,
  endTime,
  children,
  submitting,
  error,
  onSubmit,
  onBack,
}: {
  sitter: SitterInfo;
  date: string;
  startTime: string;
  endTime: string;
  children: ChildData[];
  submitting: boolean;
  error: string | null;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeExcluded, setAgreeExcluded] = useState(false);

  const hours = calculateHours(startTime, endTime);
  const subtotal = Math.round(sitter.hourly_rate * hours);
  const serviceFee = Math.round(subtotal * 0.2);
  const total = subtotal + serviceFee;
  const childCount = children.filter((c) => c.name.trim()).length;

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
            <dd className="font-medium text-[#222222]">{sitter.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Date</dt>
            <dd className="font-medium text-[#222222]">{formatDate(date)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Time</dt>
            <dd className="font-medium text-[#222222]">
              {startTime} – {endTime}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Duration</dt>
            <dd className="font-medium text-[#222222]">{hours} hours</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Children</dt>
            <dd className="font-medium text-[#222222]">
              {childCount} child{childCount !== 1 ? "ren" : ""}
            </dd>
          </div>

          <hr className="border-[#DDDDDD]" />

          <div className="flex justify-between">
            <dt className="text-[#717171]">Rate</dt>
            <dd className="font-medium text-[#222222]">
              {formatWon(sitter.hourly_rate)}/hr
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Subtotal</dt>
            <dd className="font-medium text-[#222222]">
              {formatWon(subtotal)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#717171]">Service fee (20%)</dt>
            <dd className="font-medium text-[#222222]">
              {formatWon(serviceFee)}
            </dd>
          </div>

          <hr className="border-[#DDDDDD]" />

          <div className="flex justify-between">
            <dt className="text-base font-semibold text-[#222222]">Total</dt>
            <dd className="text-base font-semibold text-[#222222]">
              {formatWon(total)}
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

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        className="w-full"
        disabled={!agreeTerms || !agreeExcluded || submitting}
        onClick={onSubmit}
      >
        {submitting ? "Submitting..." : "Confirm booking"}
      </Button>

      <p className="text-sm text-[#717171]">
        You won&#39;t be charged until the sitter confirms
      </p>

      <Button
        variant="secondary"
        className="w-full"
        onClick={onBack}
        disabled={submitting}
      >
        Back
      </Button>
    </div>
  );
}

/* ── Page ── */
export default function BookingPage() {
  const { sitterId } = useParams<{ sitterId: string }>();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sitter, setSitter] = useState<SitterInfo | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form data persisted across steps
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [children, setChildren] = useState<ChildData[]>([
    { name: "", age: "", specialNotes: "" },
  ]);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyData>({
    name: "",
    phone: "",
    relationship: "",
  });

  useEffect(() => {
    async function init() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const res = await fetch(`/api/sitters/${sitterId}`);
      if (!res.ok) {
        setError("Sitter not found");
        setLoading(false);
        return;
      }
      setSitter(await res.json());
      setLoading(false);
    }
    init();
  }, [sitterId, router]);

  const next = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!sitter) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sitterId: sitter.id,
          date,
          startTime,
          endTime,
          children: children
            .filter((c) => c.name.trim())
            .map((c) => ({
              name: c.name,
              age: parseInt(c.age, 10) || 0,
              specialNotes: c.specialNotes,
            })),
          emergencyContact,
        }),
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      router.push(`/booking/${data.bookingId}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#717171]">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!sitter) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#717171]">{error || "Sitter not found"}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 px-6 py-8">
        <div className="mx-auto flex max-w-[640px] gap-8 md:max-w-[920px]">
          <SitterSidebar sitter={sitter} />

          <div className="w-full max-w-[640px]">
            <div className="mb-8">
              <StepIndicator current={currentStep} total={4} />
            </div>

            {currentStep === 1 && (
              <StepSchedule
                date={date}
                startTime={startTime}
                endTime={endTime}
                onChangeDate={setDate}
                onChangeStartTime={setStartTime}
                onChangeEndTime={setEndTime}
                onNext={next}
              />
            )}
            {currentStep === 2 && (
              <StepChildren
                children={children}
                onChange={setChildren}
                onNext={next}
                onBack={back}
              />
            )}
            {currentStep === 3 && (
              <StepEmergency
                contact={emergencyContact}
                onChange={setEmergencyContact}
                onNext={next}
                onBack={back}
              />
            )}
            {currentStep === 4 && (
              <StepConfirm
                sitter={sitter}
                date={date}
                startTime={startTime}
                endTime={endTime}
                children={children}
                submitting={submitting}
                error={error}
                onSubmit={handleSubmit}
                onBack={back}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
