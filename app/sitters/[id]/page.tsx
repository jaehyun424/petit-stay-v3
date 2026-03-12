import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Avatar } from "@/src/components/ui/avatar";

const sitter = {
  id: "emily-k",
  name: "Emily K.",
  initials: "E",
  rating: 4.92,
  reviews: 47,
  price: "25,000",
  badges: [
    { label: "Verified", variant: "verified" as const },
    { label: "L3 English", variant: "language" as const },
    { label: "CPR", variant: "certification" as const },
  ],
  bio: "I love spending time with children and making their stay in Seoul special.",
  about:
    "Hi! I'm Emily, a certified early childhood educator from New York, currently living in Seoul. I have 5 years of experience working with children aged 2-10. I speak English (native) and Korean (conversational). I enjoy creative play, storytelling, and outdoor activities.",
  qualifications: [
    "Early Childhood Education — NYU, 2019",
    "CPR & First Aid Certified",
    "5 years experience with ages 2-10",
    "DBS Background Check completed",
  ],
  availability: {
    weekday: "Mon — Fri: 18:00 – 23:00",
    weekend: "Sat — Sun: 14:00 – 23:00",
  },
};

const reviews = [
  {
    initial: "J",
    name: "James T.",
    stars: 5,
    date: "2 weeks ago",
    text: "Emily was fantastic with our kids. She arrived on time and our children didn't want her to leave!",
  },
  {
    initial: "M",
    name: "Mika S.",
    stars: 5,
    date: "1 month ago",
    text: "Very professional and caring. Will book again on our next trip to Seoul.",
  },
  {
    initial: "L",
    name: "Lisa W.",
    stars: 4,
    date: "1 month ago",
    text: "Great experience overall. Good communication throughout the session.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="text-sm text-[#222222]" aria-label={`${count} out of 5 stars`}>
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export default function SitterProfilePage() {
  return (
    <>
      <Header />

      {/* Section 1: Profile Header */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Photo Placeholder */}
            <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-[#E8E0D8] md:w-[280px] md:shrink-0">
              <span className="text-[48px] font-semibold text-[#C4B5A6]">
                {sitter.initials}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              <h1 className="text-[26px] font-semibold text-[#222222]">
                {sitter.name}
              </h1>

              <div className="flex flex-wrap gap-2">
                {sitter.badges.map((badge) => (
                  <Badge key={badge.label} variant={badge.variant}>
                    {badge.label}
                  </Badge>
                ))}
              </div>

              <p className="text-base text-[#222222]">
                ★ {sitter.rating} ({sitter.reviews} reviews)
              </p>

              <p className="text-[22px] font-semibold text-[#222222]">
                {sitter.price}원/시간
              </p>

              <p className="text-base text-[#717171]">{sitter.bio}</p>

              <div className="hidden md:block">
                <Button variant="primary">Book Emily</Button>
              </div>
              <div className="md:hidden">
                <Button variant="primary" className="w-full">
                  Book Emily
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Video Introduction Placeholder */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-[#E8E0D8]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <path d="M18 14L36 24L18 34V14Z" fill="#C4B5A6" />
            </svg>
          </div>
          <p className="mt-3 text-sm text-[#717171]">Video introduction</p>
        </div>
      </section>

      {/* Section 3: About */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-6">
          <h2 className="text-lg font-semibold text-[#222222]">
            About {sitter.name.split(" ")[0]}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#717171]" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {sitter.about}
          </p>
        </div>
      </section>

      {/* Section 4: Qualifications & Experience */}
      <section className="bg-[#F5F0EB]">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <h2 className="text-lg font-semibold text-[#222222]">
            Qualifications
          </h2>
          <ul className="mt-4">
            {sitter.qualifications.map((q, i) => (
              <li
                key={i}
                className={`py-3 text-base text-[#222222] ${
                  i < sitter.qualifications.length - 1
                    ? "border-b border-[#DDDDDD]"
                    : ""
                }`}
              >
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 5: Reviews */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <h2 className="text-lg font-semibold text-[#222222]">
            Reviews{" "}
            <span className="font-semibold">({sitter.reviews})</span>
          </h2>

          <div className="mt-4">
            {reviews.map((review, i) => (
              <div
                key={i}
                className={`py-4 ${
                  i < reviews.length - 1
                    ? "border-b border-[#DDDDDD]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar size="sm" fallback={review.initial} />
                  <div>
                    <p className="text-sm font-semibold text-[#222222]">
                      {review.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <Stars count={review.stars} />
                      <span className="text-xs text-[#717171]">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-base text-[#717171]">{review.text}</p>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="mt-4 inline-block text-sm text-[#222222] underline"
          >
            See all {sitter.reviews} reviews
          </a>
        </div>
      </section>

      {/* Section 6: Availability */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <h2 className="text-lg font-semibold text-[#222222]">
            Availability
          </h2>
          <div className="mt-3 space-y-1">
            <p className="text-base text-[#222222]">
              {sitter.availability.weekday}
            </p>
            <p className="text-base text-[#222222]">
              {sitter.availability.weekend}
            </p>
          </div>
          <p className="mt-3 text-sm text-[#717171]">
            24-hour advance booking recommended
          </p>
        </div>
      </section>

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-20 md:hidden" />

      <Footer />

      {/* Section 7: Sticky Bottom CTA (mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#DDDDDD] bg-white px-6 py-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden">
        <div className="flex items-center justify-between gap-4">
          <p className="text-base font-semibold text-[#222222]">
            {sitter.price}원/시간
          </p>
          <Button variant="primary">Book Emily</Button>
        </div>
      </div>
    </>
  );
}
