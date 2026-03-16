import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { getSitters, buildSitterBadges } from "@/src/lib/queries";
import { getTranslations } from "next-intl/server";
import { SitterCarousel } from "@/src/components/ui/sitter-carousel";

export default async function Home() {
  const sitters = await getSitters(8);
  const t = await getTranslations();

  return (
    <>
      <Header />

      <main id="main-content">
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, var(--color-bg-cream) 0%, var(--color-avatar-bg) 50%, rgba(196,149,106,0.12) 100%)" }}>
        <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-20">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
            <div className="flex flex-1 flex-col gap-6">
              <h1
                className="text-[32px] leading-[1.2] font-semibold tracking-tight text-[var(--color-text-primary)] md:text-[48px]"
                style={{ fontFamily: "var(--font-serif)", textWrap: "balance" }}
              >
                {t('landing.heroTitle1')}<span className="whitespace-nowrap">{t('landing.heroTitle2')}</span>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-[var(--color-text-secondary)]">
                {t('landing.heroSubtitle')}
              </p>
              <div>
                <Button variant="primary" asChild>
                  <Link href="/search">{t('landing.heroCta')}</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative w-full overflow-hidden rounded-xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full aspect-[4/3] rounded-xl object-cover"
                  src="/hero.mp4"
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-[var(--color-bg-cream)]/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[var(--color-bg-cream)]">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="flex flex-1 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11 5.25-.85 9-5.75 9-11V7l-9-5Z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-[var(--color-text-primary)]">
                  {t('landing.trustVerified')}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {t('landing.trustVerifiedDesc')}
                </p>
              </div>
            </div>
            <div className="flex flex-1 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-[var(--color-text-primary)]">
                  {t('landing.trustInsured')}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {t('landing.trustInsuredDesc')}
                </p>
              </div>
            </div>
            <div className="flex flex-1 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2Z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-[var(--color-text-primary)]">
                  {t('landing.trustReviews')}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {t('landing.trustReviewsDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <h2 className="mb-10 text-[22px] font-semibold text-[var(--color-text-primary)]">
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
                <span className="block text-[32px] font-bold text-[var(--color-accent)]">
                  {step.num}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm font-normal text-[var(--color-text-secondary)]">
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
          <h2 className="mb-10 text-[22px] font-semibold text-[var(--color-text-primary)]">
            {t('landing.sittersTitle')}
          </h2>
          {sitters && sitters.length > 0 ? (
            <SitterCarousel>
              {sitters.map((sitter) => {
                const badges = buildSitterBadges(sitter);
                return (
                  <Link key={sitter.id} href={`/sitters/${sitter.id}`} className="block shrink-0 snap-start w-[220px] sm:w-[240px]">
                    <Card className="h-full">
                      <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-[var(--color-avatar-bg)]">
                        {sitter.avatar_url ? (
                          <img
                            src={sitter.avatar_url}
                            alt={sitter.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl font-semibold text-[var(--color-avatar-text)]">
                            {sitter.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <CardContent>
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] line-clamp-1">
                          {sitter.name}
                        </p>
                        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                          ★ {sitter.rating_avg.toFixed(2)} ({sitter.review_count})
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1 overflow-hidden max-h-[52px]">
                          {badges.map((badge) => (
                            <Badge key={badge.label} variant={badge.variant}>
                              {badge.label}
                            </Badge>
                          ))}
                        </div>
                        <p className="mt-auto pt-2 text-sm font-semibold text-[var(--color-text-primary)]">
                          {sitter.hourly_rate.toLocaleString()}{t('landing.perHour')}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </SitterCarousel>
          ) : (
            <p className="text-base text-[var(--color-text-secondary)]">{t('landing.noSitters')}</p>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[var(--color-accent)]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 text-center">
          <h2 className="mb-6 text-[22px] font-semibold text-white">
            {t('landing.ctaTitle')}
          </h2>
          <Button
            variant="secondary"
            className="border-white text-white hover:bg-white/10"
            asChild
          >
            <Link href="/search">{t('landing.ctaCta')}</Link>
          </Button>
        </div>
      </section>
      </main>

      <Footer />
    </>
  );
}
