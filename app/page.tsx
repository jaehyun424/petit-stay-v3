import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

const sitters = [
  {
    name: "Emily K.",
    rating: 4.92,
    reviews: 47,
    badges: [
      { label: "Verified", variant: "verified" as const },
      { label: "L3 English", variant: "language" as const },
    ],
    price: "25,000",
  },
  {
    name: "Sarah L.",
    rating: 4.85,
    reviews: 32,
    badges: [
      { label: "Verified", variant: "verified" as const },
      { label: "L2 Japanese", variant: "language" as const },
    ],
    price: "30,000",
  },
  {
    name: "Mika T.",
    rating: 4.97,
    reviews: 61,
    badges: [
      { label: "Verified", variant: "verified" as const },
      { label: "CPR", variant: "certification" as const },
    ],
    price: "28,000",
  },
  {
    name: "Yuna P.",
    rating: 4.78,
    reviews: 19,
    badges: [{ label: "Verified", variant: "verified" as const }],
    price: "22,000",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-20">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
            <div className="flex flex-1 flex-col gap-6">
              <h1
                className="text-[32px] leading-[1.2] font-semibold tracking-tight text-[#222222] md:text-[48px]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Find a trusted babysitter in Seoul
              </h1>
              <p className="max-w-md text-base leading-relaxed text-[#717171]">
                Verified multilingual sitters for traveling families. Book in
                minutes, enjoy your evening.
              </p>
              <div>
                <Button variant="primary">Find a sitter</Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-[#E8E0D8]">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C4B5A6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 10.182V22h18V10.182L12 2L3 10.182Z" />
                  <path d="M9 22V14h6v8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#F5F0EB]">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="flex-1">
              <p className="text-base font-semibold text-[#222222]">
                ID Verified
              </p>
              <p className="mt-1 text-sm text-[#717171]">
                Every sitter completes identity verification before joining
              </p>
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-[#222222]">
                Insured Sessions
              </p>
              <p className="mt-1 text-sm text-[#717171]">
                Liability insurance covers every booking on the platform
              </p>
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-[#222222]">
                Verified Reviews Only
              </p>
              <p className="mt-1 text-sm text-[#717171]">
                Reviews come from parents with completed, paid sessions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <h2 className="mb-10 text-[22px] font-semibold text-[#222222]">
            How it works
          </h2>
          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            {[
              {
                num: "1",
                title: "Search",
                desc: "Browse verified sitters by date, time, and language",
              },
              {
                num: "2",
                title: "Book",
                desc: "Choose your sitter and confirm in minutes",
              },
              {
                num: "3",
                title: "Relax",
                desc: "Enjoy your evening. Get a care report when done.",
              },
            ].map((step) => (
              <div key={step.num} className="flex-1">
                <span className="block text-[32px] font-bold text-[#C4956A]">
                  {step.num}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-[#222222]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm font-normal text-[#717171]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sitter Preview */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <h2 className="mb-10 text-[22px] font-semibold text-[#222222]">
            Meet our sitters
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {sitters.map((sitter) => (
              <Card key={sitter.name}>
                <div className="flex aspect-square w-full items-center justify-center bg-[#E8E0D8]">
                  <span className="text-3xl font-semibold text-[#C4B5A6]">
                    {sitter.name.charAt(0)}
                  </span>
                </div>
                <CardContent>
                  <p className="text-sm font-semibold text-[#222222]">
                    {sitter.name}
                  </p>
                  <p className="mt-1 text-xs text-[#717171]">
                    ★ {sitter.rating} ({sitter.reviews})
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {sitter.badges.map((badge) => (
                      <Badge key={badge.label} variant={badge.variant}>
                        {badge.label}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[#222222]">
                    {sitter.price}원/시간
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#C4956A]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 text-center">
          <h2 className="mb-6 text-[22px] font-semibold text-white">
            Your evening in Seoul starts here
          </h2>
          <Button
            variant="secondary"
            className="border-white text-white hover:bg-white/10"
          >
            Find a sitter
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#222222]">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <p className="text-base font-semibold text-white">Petit Stay</p>
          <nav className="mt-4 flex flex-wrap gap-6 text-sm text-[#B0B0B0]">
            <a href="#" className="transition-colors hover:text-white">
              About
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Help
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
          </nav>
          <p className="mt-6 text-sm text-[#B0B0B0]">
            © 2026 Petit Stay. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
