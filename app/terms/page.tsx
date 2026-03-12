import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";

export const metadata = {
  title: "Terms of Service",
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

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-6 py-16">
        <h1 className="text-[26px] font-semibold text-[#222222]">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-[#B0B0B0]">
          Last updated: March 2026
        </p>

        <Section title="About Petit Stay">
          <p>
            Petit Stay is an online platform that connects families with
            independent babysitters. We are not an employer of sitters, nor do we
            directly provide childcare services.
          </p>
        </Section>

        <Section title="Booking and payment">
          <p>
            All bookings are agreements between parents and sitters. Petit Stay
            facilitates the transaction and charges a service fee. Payment is
            processed when the sitter confirms the booking.
          </p>
        </Section>

        <Section title="Cancellation">
          <p>
            Free cancellation up to 24 hours before the session. Cancellations
            within 24 hours may incur a fee.
          </p>
        </Section>

        <Section title="Excluded services">
          <p>
            Sitters do not provide overnight care, pool supervision, vehicle
            transportation, medication administration, medical procedures, or
            bathing.
          </p>
        </Section>

        <Section title="Liability">
          <p>
            Petit Stay facilitates connections between parents and independent
            sitters. While we verify sitter identities and qualifications,
            parents are responsible for their booking decisions.
          </p>
        </Section>

        <Section title="Contact">
          <p>legal@petitstay.com</p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
