export default function SearchLoading() {
  return (
    <>
      {/* Filter bar skeleton */}
      <div className="sticky top-0 z-10 border-b border-[#DDDDDD] bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-6 py-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-[140px] shrink-0 animate-pulse rounded-[8px] bg-[#F5F0EB]"
            />
          ))}
          <div className="h-10 w-[80px] shrink-0 animate-pulse rounded-[8px] bg-[#F5F0EB]" />
        </div>
      </div>

      {/* Results skeleton */}
      <main className="min-h-screen bg-[#F7F7F7]">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="mb-6">
            <div className="h-5 w-[200px] animate-pulse rounded bg-[#F5F0EB]" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[12px] bg-white"
              >
                <div className="aspect-square w-full animate-pulse bg-[#F5F0EB]" />
                <div className="p-4">
                  <div className="h-4 w-[60%] animate-pulse rounded bg-[#F5F0EB]" />
                  <div className="mt-2 h-3 w-[40%] animate-pulse rounded bg-[#F5F0EB]" />
                  <div className="mt-3 h-3 w-[80%] animate-pulse rounded bg-[#F5F0EB]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
