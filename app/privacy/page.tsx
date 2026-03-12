import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";

export const metadata = {
  title: "Privacy Policy — Petit Stay",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-[#222222]">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-[#717171]">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-6 py-16">
        <h1 className="text-[26px] font-semibold text-[#222222]">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-[#B0B0B0]">
          Last updated: March 2026
        </p>

        <Section title="Information we collect">
          <p>
            We collect information you provide when creating an account, booking
            a sitter, or contacting us. This includes your name, email, phone
            number, and payment information.
          </p>
        </Section>

        <Section title="How we use your information">
          <p>
            We use your information to facilitate bookings, process payments, and
            improve our service. We do not sell your personal data.
          </p>
        </Section>

        <Section title="Children's data">
          <p>
            We collect limited information about children (name, age, allergies)
            solely to ensure safe and appropriate care. Parental consent is
            required for all child data. This data is shared only with the
            assigned sitter for the duration of the session.
          </p>
        </Section>

        <Section title="Data security">
          <p>
            We implement industry-standard security measures to protect your
            information.
          </p>
        </Section>

        <Section title="Contact">
          <p>For privacy inquiries: privacy@petitstay.com</p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
