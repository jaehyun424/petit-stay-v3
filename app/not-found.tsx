import Link from "next/link";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { Button } from "@/src/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex flex-1 items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-[22px] font-semibold text-[#222222]">
            Page not found
          </h1>
          <p className="mt-3 text-base text-[#717171]">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="mt-8">
            <Button variant="secondary" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
