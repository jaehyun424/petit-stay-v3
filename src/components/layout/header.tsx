import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[#DDDDDD] bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-[#222222]">
          Petit Stay
        </Link>
        <Link href="/login" className="text-sm text-[#222222] underline">
          Log in
        </Link>
      </div>
    </header>
  );
}
