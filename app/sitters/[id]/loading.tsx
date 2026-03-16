export default function SitterProfileLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Profile header skeleton */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Photo placeholder */}
            <div className="aspect-square w-full animate-pulse rounded-xl bg-[var(--color-bg-cream)] md:w-[280px] md:shrink-0" />

            {/* Info skeleton */}
            <div className="flex flex-1 flex-col gap-4">
              <div className="h-8 w-[200px] animate-pulse rounded bg-[var(--color-bg-cream)]" />
              <div className="flex gap-2">
                <div className="h-6 w-[80px] animate-pulse rounded bg-[var(--color-bg-cream)]" />
                <div className="h-6 w-[100px] animate-pulse rounded bg-[var(--color-bg-cream)]" />
              </div>
              <div className="h-5 w-[120px] animate-pulse rounded bg-[var(--color-bg-cream)]" />
              <div className="h-7 w-[140px] animate-pulse rounded bg-[var(--color-bg-cream)]" />
              <div className="h-4 w-full animate-pulse rounded bg-[var(--color-bg-cream)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews skeleton */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="h-6 w-[120px] animate-pulse rounded bg-[var(--color-bg-cream)]" />
          <div className="mt-4 flex flex-col">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-[var(--color-border)] py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--color-bg-cream)]" />
                  <div>
                    <div className="h-4 w-[100px] animate-pulse rounded bg-[var(--color-bg-cream)]" />
                    <div className="mt-1 h-3 w-[80px] animate-pulse rounded bg-[var(--color-bg-cream)]" />
                  </div>
                </div>
                <div className="mt-2 h-4 w-full animate-pulse rounded bg-[var(--color-bg-cream)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
