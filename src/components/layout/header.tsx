"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/src/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="border-b border-[#DDDDDD] bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-[#222222]">
          Petit Stay
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="cursor-pointer text-sm text-[#222222] underline"
          >
            Log out
          </button>
        ) : (
          <Link href="/login" className="text-sm text-[#222222] underline">
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
