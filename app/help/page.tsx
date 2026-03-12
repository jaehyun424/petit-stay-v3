import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";

export const metadata = {
  title: "Help Center",
};

function QA({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-[#DDDDDD] py-4">
      <p className="text-base font-semibold text-[#222222]">{question}</p>
      <p className="mt-1 text-sm text-[#717171]">{answer}</p>
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-6 py-16">
        <h1 className="text-[26px] font-semibold text-[#222222]">
          Help Center
        </h1>

        <h2 className="mt-12 text-lg font-semibold text-[#222222]">
          For Parents
        </h2>
        <div className="mt-3">
          <QA
            question="How do I book a sitter?"
            answer="Search for available sitters, view their profiles, and book directly through the platform."
          />
          <QA
            question="What if I need to cancel?"
            answer="Free cancellation up to 24 hours before your session. Late cancellations may be subject to a fee."
          />
          <QA
            question="Is my payment secure?"
            answer="All payments are processed securely. You won't be charged until the sitter confirms."
          />
        </div>

        <h2 className="mt-12 text-lg font-semibold text-[#222222]">
          For Sitters
        </h2>
        <div className="mt-3">
          <QA
            question="How do I get started?"
            answer="Create an account, complete your profile and verification, then set your availability."
          />
          <QA
            question="How do I get paid?"
            answer="Earnings are deposited after each completed session, minus the platform service fee."
          />
        </div>

        <h2 className="mt-12 text-lg font-semibold text-[#222222]">
          For Partners
        </h2>
        <div className="mt-3">
          <QA
            question="How does the referral program work?"
            answer="Share your unique QR code or link with guests. Track referrals through your partner dashboard."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
