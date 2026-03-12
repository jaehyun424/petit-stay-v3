import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { getSitters, buildSitterBadges } from "@/src/lib/queries";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const sitters = await getSitters(4);
  const t = await getTranslations();

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-20">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
            <div className="flex flex-1 flex-col gap-6">
              <h1
                className="text-[32px] leading-[1.2] font-semibold tracking-tight text-[#222222] md:text-[48px]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t('landing.heroTitle')}
              </h1>
              <p className="max-w-md text-base leading-relaxed text-[#717171]">
                {t('landing.heroSubtitle')}
              </p>
              <div>
                <Button variant="primary">{t('landing.heroCta')}</Button>
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
                {t('landing.trustVerified')}
              </p>
              <p className="mt-1 text-sm text-[#717171]">
                {t('landing.trustVerifiedDesc')}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-[#222222]">
                {t('landing.trustInsured')}
              </p>
              <p className="mt-1 text-sm text-[#717171]">
                {t('landing.trustInsuredDesc')}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-[#222222]">
                {t('landing.trustReviews')}
              </p>
              <p className="mt-1 text-sm text-[#717171]">
                {t('landing.trustReviewsDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <h2 className="mb-10 text-[22px] font-semibold text-[#222222]">
            {t('landing.howTitle')}
          </h2>
          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            {[
              {
                num: "1",
                title: t('landing.how1Title'),
                desc: t('landing.how1Desc'),
              },
              {
                num: "2",
                title: t('landing.how2Title'),
                desc: t('landing.how2Desc'),
              },
              {
                num: "3",
                title: t('landing.how3Title'),
                desc: t('landing.how3Desc'),
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
            {t('landing.sittersTitle')}
          </h2>
          {sitters && sitters.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
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
                        {sitter.hourly_rate.toLocaleString()}{t('landing.perHour')}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="text-base text-[#717171]">{t('landing.noSitters')}</p>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#C4956A]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 text-center">
          <h2 className="mb-6 text-[22px] font-semibold text-white">
            {t('landing.ctaTitle')}
          </h2>
          <Button
            variant="secondary"
            className="border-white text-white hover:bg-white/10"
          >
            {t('landing.heroCta')}
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
}
