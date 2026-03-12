import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-[800px] flex-1 px-6 py-16">
        <h1 className="text-[26px] font-semibold text-[#222222]">
          About Petit Stay
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[#717171]">
          Petit Stay connects traveling families with verified, multilingual
          babysitters in Seoul. We believe every family deserves a trustworthy
          childcare option — especially when visiting a new city.
        </p>

        <h2 className="mt-12 text-lg font-semibold text-[#222222]">
          Our mission
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#717171]">
          To help traveling families enjoy their time in Seoul with peace of
          mind, knowing their children are in safe, verified hands.
        </p>

        <h2 className="mt-12 text-lg font-semibold text-[#222222]">
          How we&apos;re different
        </h2>
        <ul className="mt-3">
          <li className="py-2 text-base text-[#222222]">
            Every sitter is ID-verified and background-checked
          </li>
          <li className="py-2 text-base text-[#222222]">
            Multilingual sitters who speak your language
          </li>
          <li className="py-2 text-base text-[#222222]">
            Verified reviews from real, completed sessions
          </li>
          <li className="py-2 text-base text-[#222222]">
            Session care reports sent after every booking
          </li>
        </ul>

        <h2 className="mt-12 text-lg font-semibold text-[#222222]">Contact</h2>
        <p className="mt-3 text-base text-[#717171]">hello@petitstay.com</p>
      </main>
      <Footer />
    </div>
  );
}
