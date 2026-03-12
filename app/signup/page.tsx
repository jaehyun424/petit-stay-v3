"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";

type Role = "parent" | "sitter" | null;

export default function SignupPage() {
  const [role, setRole] = useState<Role>(null);

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
          <div className="mt-6 flex flex-col gap-4">
            <Input placeholder="Full name" type="text" />
            <Input placeholder="Email address" type="email" />
            <Input placeholder="Password" type="password" />
            <Input placeholder="Phone number" type="tel" />

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 text-sm text-[#717171]">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#C4956A]"
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <Button variant="primary" className="w-full">
              Create account
            </Button>
          </div>

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
