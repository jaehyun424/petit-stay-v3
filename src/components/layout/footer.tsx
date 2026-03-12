export function Footer() {
  return (
    <footer className="bg-[#222222]">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <p className="text-base font-semibold text-white">Petit Stay</p>
        <nav className="mt-4 flex flex-wrap gap-6 text-sm text-[#B0B0B0]">
          <a href="#" className="transition-colors hover:text-white">
            About
          </a>
          <a href="#" className="transition-colors hover:text-white">
            Help
          </a>
          <a href="#" className="transition-colors hover:text-white">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-white">
            Terms
          </a>
        </nav>
        <p className="mt-6 text-sm text-[#B0B0B0]">
          © 2026 Petit Stay. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
