"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { createClient } from "@/src/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <Header />

      <main className="flex flex-1 justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          {/* Title */}
          <h1 className="text-[26px] font-semibold text-[#222222]">Log in</h1>
          <p className="mt-2 text-sm text-[#717171]">
            Welcome back to Petit Stay
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <Input
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-end">
              <a href="#" className="text-sm text-[#222222] underline">
                Forgot password?
              </a>
            </div>

            {error && (
              <p className="text-sm text-[var(--color-error)]">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#DDDDDD]" />
            <span className="text-sm text-[#B0B0B0]">or</span>
            <div className="h-px flex-1 bg-[#DDDDDD]" />
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-3">
            <Button variant="secondary" className="w-full">
              Continue with Google
            </Button>
            <Button variant="secondary" className="w-full">
              Continue with Kakao
            </Button>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-[#717171]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#222222] underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
