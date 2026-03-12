import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";

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
  {
    name: "Hana J.",
    rating: 4.91,
    reviews: 38,
    badges: [
      { label: "Verified", variant: "verified" as const },
      { label: "L3 English", variant: "language" as const },
      { label: "CPR", variant: "certification" as const },
    ],
    price: "32,000",
  },
  {
    name: "Sora K.",
    rating: 4.88,
    reviews: 25,
    badges: [
      { label: "Verified", variant: "verified" as const },
      { label: "L2 Chinese", variant: "language" as const },
    ],
    price: "27,000",
  },
  {
    name: "Nami O.",
    rating: 4.95,
    reviews: 53,
    badges: [
      { label: "Verified", variant: "verified" as const },
      { label: "L3 Japanese", variant: "language" as const },
    ],
    price: "35,000",
  },
  {
    name: "Jina L.",
    rating: 4.82,
    reviews: 14,
    badges: [{ label: "Verified", variant: "verified" as const }],
    price: "20,000",
  },
];

export default function SearchPage() {
  return (
    <>
      <Header />

      {/* Search Filter Bar */}
      <div className="sticky top-0 z-10 border-b border-[#DDDDDD] bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 overflow-x-auto px-6 py-3 [&>*]:shrink-0">
          <Input type="date" placeholder="Date" />
          <Input placeholder="Time" />
          <Input placeholder="Child age" />
          <Input placeholder="Language" />
          <Button variant="primary" size="sm">
            Search
          </Button>
        </div>
      </div>

      {/* Search Results */}
      <main className="min-h-screen bg-[#F7F7F7]">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          {/* Results Header */}
          <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <p className="text-base font-semibold text-[#222222]">
              8 sitters available
            </p>
            <p className="text-sm text-[#717171]">Sort by: Recommended</p>
          </div>

          {/* Sitter Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
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
      </main>

      <Footer />
    </>
  );
}
