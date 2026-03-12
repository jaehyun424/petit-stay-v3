"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { createClient } from "@/src/lib/supabase/client";
import type { UserRole } from "@/src/lib/supabase/types";

type Role = "parent" | "sitter" | null;

export default function SignupPage() {
  const t = useTranslations();
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
      setError(t('auth.selectRole'));
      return;
    }
    if (!agreed) {
      setError(t('auth.agreeRequired'));
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
              {t('auth.checkEmail')}
            </h1>
            <p className="mt-4 text-sm text-[#717171]">
              {t('auth.confirmEmail', { email })}
            </p>
            <Link
              href="/login"
              className="mt-8 inline-block text-sm text-[#222222] underline"
            >
              {t('auth.backToLogin')}
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

      <main id="main-content" className="flex flex-1 justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          {/* Title */}
          <h1 className="text-[26px] font-semibold text-[#222222]">
            {t('auth.signupTitle')}
          </h1>
          <p className="mt-2 text-sm text-[#717171]">
            {t('auth.signupDesc')}
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
                {t('auth.imParent')}
              </p>
              <p className="mt-1 text-xs text-[#717171]">
                {t('auth.parentDesc')}
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
                {t('auth.imSitter')}
              </p>
              <p className="mt-1 text-xs text-[#717171]">
                {t('auth.sitterDesc')}
              </p>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Input
              label={t('auth.fullName')}
              placeholder={t('auth.fullName')}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              label={t('auth.email')}
              placeholder={t('auth.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label={t('auth.password')}
              placeholder={t('auth.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <Input
              label={t('auth.phone')}
              placeholder={t('auth.phone')}
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
              <span>{t('auth.agreeTerms')}</span>
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
              {loading ? t('auth.creatingAccount') : t('auth.createAccount')}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#DDDDDD]" />
            <span className="text-sm text-[#B0B0B0]">{t('auth.orDivider')}</span>
            <div className="h-px flex-1 bg-[#DDDDDD]" />
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-3">
            <Button variant="secondary" className="w-full">
              {t('auth.continueGoogle')}
            </Button>
            <Button variant="secondary" className="w-full">
              {t('auth.continueKakao')}
            </Button>
          </div>

          {/* Login link */}
          <p className="mt-8 text-center text-sm text-[#717171]">
            {t('auth.hasAccount')}{" "}
            <Link href="/login" className="text-[#222222] underline">
              {t('common.login')}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
