import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { getSitters, buildSitterBadges } from "@/src/lib/queries";

export default async function SearchPage() {
  const sitters = await getSitters();

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
              {sitters && sitters.length > 0
                ? `${sitters.length} sitter${sitters.length > 1 ? "s" : ""} available`
                : "No sitters available yet"}
            </p>
            <p className="text-sm text-[#717171]">Sort by: Recommended</p>
          </div>

          {/* Sitter Grid */}
          {sitters && sitters.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {sitters.map((sitter) => {
                const badges = buildSitterBadges(sitter);
                return (
                  <Card key={sitter.id}>
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
                        ★ {sitter.rating_avg.toFixed(2)} ({sitter.review_count})
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {badges.map((badge) => (
                          <Badge key={badge.label} variant={badge.variant}>
                            {badge.label}
                          </Badge>
                        ))}
                      </div>
                      <p className="mt-2 text-sm font-semibold text-[#222222]">
                        {sitter.hourly_rate.toLocaleString()}원/시간
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </>
  );
}
