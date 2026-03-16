"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Header } from "@/src/components/layout/header";
import { Footer } from "@/src/components/layout/footer";
import { createClient } from "@/src/lib/supabase/client";

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const [email, setEmail] = useState("demo@petitstay.com");
  const [password, setPassword] = useState("PetitStay2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot password state
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

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
      setError(t('auth.invalidCredentials'));
      return;
    }

    router.refresh();
    router.push("/");
  }

  async function handleResetPassword(e: FormEvent) {
    e.preventDefault();
    setResetError(null);
    setResetLoading(true);

    const supabase = createClient();
    const { error: resetErr } = await supabase.auth.resetPasswordForEmail(
      resetEmail,
      { redirectTo: `${window.location.origin}/auth/callback` }
    );

    setResetLoading(false);

    if (resetErr) {
      setResetError(resetErr.message);
      return;
    }

    setResetSent(true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <Header />

      <main id="main-content" className="flex flex-1 justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          {/* Title */}
          <h1 className="text-[26px] font-semibold text-[#222222]">{t('auth.loginTitle')}</h1>
          <p className="mt-2 text-sm text-[#717171]">
            {t('auth.loginWelcome')}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
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
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowReset(true);
                  setResetEmail(email);
                  setResetSent(false);
                  setResetError(null);
                }}
                className="cursor-pointer text-sm text-[#222222] underline"
              >
                {t('auth.forgotPassword')}
              </button>
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
              {loading ? t('auth.loggingIn') : t('common.login')}
            </Button>
          </form>

          {/* Forgot password inline form */}
          {showReset && (
            <div className="mt-6 rounded-xl border border-[#DDDDDD] bg-[#F5F0EB] p-5">
              <h2 className="text-sm font-semibold text-[#222222]">
                {t('auth.resetPassword')}
              </h2>
              <p className="mt-1 text-xs text-[#717171]">
                {t('auth.resetPasswordDesc')}
              </p>

              {resetSent ? (
                <div className="mt-3">
                  <p className="text-sm text-[#222222]">
                    {t('auth.resetPasswordSent')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowReset(false)}
                    className="mt-2 cursor-pointer text-sm text-[#717171] underline"
                  >
                    {t('auth.cancel')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="mt-3 flex flex-col gap-3">
                  <Input
                    label={t('auth.email')}
                    placeholder={t('auth.email')}
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                  {resetError && (
                    <p className="text-xs text-[var(--color-error)]">{resetError}</p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1"
                      disabled={resetLoading}
                    >
                      {resetLoading ? t('auth.sending') : t('auth.sendResetLink')}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setShowReset(false)}
                    >
                      {t('auth.cancel')}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#DDDDDD]" />
            <span className="text-sm text-[#B0B0B0]">{t('auth.orDivider')}</span>
            <div className="h-px flex-1 bg-[#DDDDDD]" />
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-3">
            <Button variant="secondary" className="w-full opacity-50 cursor-not-allowed" disabled>
              {t('auth.continueGoogle')}
            </Button>
            <Button variant="secondary" className="w-full opacity-50 cursor-not-allowed" disabled>
              {t('auth.continueKakao')}
            </Button>
            <p className="text-center text-xs text-[#B0B0B0]">{t('auth.comingSoon')}</p>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-[#717171]">
            {t('auth.noAccount')}{" "}
            <Link href="/signup" className="text-[#222222] underline">
              {t('common.signup')}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
