"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { createClient } from "@/src/lib/supabase/client";
import type { UserRole } from "@/src/lib/supabase/types";

type Role = "parent" | "sitter" | null;

export default function SignupPage() {
  const [role, setRole] = useState<Role>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!role) {
      setError("Please select a role");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          role: role as UserRole,
        },
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
        <Header />
        <main className="flex flex-1 justify-center px-6 py-16">
          <div className="w-full max-w-[400px] text-center">
            <h1 className="text-[26px] font-semibold text-[#222222]">
              Check your email
            </h1>
            <p className="mt-4 text-sm text-[#717171]">
              We sent a confirmation link to <strong>{email}</strong>.
              <br />
              Please check your email to confirm your account.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-block text-sm text-[#222222] underline"
            >
              Back to login
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <Header />

      <main className="flex flex-1 justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          {/* Title */}
          <h1 className="text-[26px] font-semibold text-[#222222]">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-[#717171]">
            Join Petit Stay as a parent or sitter
          </p>

          {/* Role selection */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("parent")}
              className={`cursor-pointer rounded-xl bg-[#F5F0EB] p-5 text-left transition-colors ${
                role === "parent"
                  ? "border-2 border-[#C4956A]"
                  : "border border-[#DDDDDD]"
              }`}
            >
              <p className="text-sm font-semibold text-[#222222]">
                I&apos;m a parent
              </p>
              <p className="mt-1 text-xs text-[#717171]">
                Find trusted sitters for your children
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRole("sitter")}
              className={`cursor-pointer rounded-xl bg-[#F5F0EB] p-5 text-left transition-colors ${
                role === "sitter"
                  ? "border-2 border-[#C4956A]"
                  : "border border-[#DDDDDD]"
              }`}
            >
              <p className="text-sm font-semibold text-[#222222]">
                I&apos;m a sitter
              </p>
              <p className="mt-1 text-xs text-[#717171]">
                Earn by caring for traveling families
              </p>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Input
              placeholder="Full name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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
              minLength={6}
            />
            <Input
              placeholder="Phone number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 text-sm text-[#717171]">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#C4956A]"
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            {error && (
              <p className="text-sm text-[var(--color-error)]">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
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

          {/* Login link */}
          <p className="mt-8 text-center text-sm text-[#717171]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#222222] underline">
              Log in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
