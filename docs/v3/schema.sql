-- ============================================================
-- Petit Stay V3 — Database Schema
-- Supabase SQL Editor에서 실행
-- ============================================================

-- ── Extensions ──
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Custom Types ──

CREATE TYPE user_role AS ENUM ('parent', 'sitter', 'partner', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE business_type AS ENUM ('hotel', 'residence', 'airbnb', 'other');

-- ── Helper: auto-update updated_at ──

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Tables
-- ============================================================

-- ── profiles (auth.users 확장) ──

CREATE TABLE profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        user_role NOT NULL,
  full_name   text NOT NULL,
  phone       text,
  avatar_url  text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── sitter_profiles ──

CREATE TABLE sitter_profiles (
  id              uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  bio             text,
  hourly_rate     integer NOT NULL,
  languages       jsonb NOT NULL DEFAULT '[]'::jsonb,
  certifications  jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_verified     boolean NOT NULL DEFAULT false,
  is_active       boolean NOT NULL DEFAULT true,
  rating_avg      numeric(3,2) NOT NULL DEFAULT 0,
  review_count    integer NOT NULL DEFAULT 0,
  response_rate   numeric(3,2) NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER sitter_profiles_updated_at
  BEFORE UPDATE ON sitter_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── sitter_availability ──

CREATE TABLE sitter_availability (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sitter_id    uuid NOT NULL REFERENCES sitter_profiles(id) ON DELETE CASCADE,
  day_of_week  integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time   time NOT NULL,
  end_time     time NOT NULL,
  is_active    boolean NOT NULL DEFAULT true,
  CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

CREATE INDEX idx_sitter_availability_sitter ON sitter_availability(sitter_id);

-- ── bookings ──

CREATE TABLE bookings (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id           uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  sitter_id           uuid NOT NULL REFERENCES sitter_profiles(id) ON DELETE CASCADE,
  partner_referral_id uuid,
  status              booking_status NOT NULL DEFAULT 'pending',
  date                date NOT NULL,
  start_time          time NOT NULL,
  end_time            time NOT NULL,
  total_amount        integer NOT NULL,
  service_fee         integer NOT NULL,
  net_amount          integer NOT NULL,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_bookings_parent ON bookings(parent_id);
CREATE INDEX idx_bookings_sitter ON bookings(sitter_id);
CREATE INDEX idx_bookings_status ON bookings(status);

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── booking_children ──

CREATE TABLE booking_children (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id    uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  name          text NOT NULL,
  age           integer NOT NULL,
  special_notes text
);

CREATE INDEX idx_booking_children_booking ON booking_children(booking_id);

-- ── booking_emergency_contacts ──

CREATE TABLE booking_emergency_contacts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id    uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  name          text NOT NULL,
  phone         text NOT NULL,
  relationship  text NOT NULL
);

CREATE INDEX idx_booking_emergency_contacts_booking ON booking_emergency_contacts(booking_id);

-- ── session_reports ──

CREATE TABLE session_reports (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id       uuid NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  sitter_id        uuid NOT NULL REFERENCES sitter_profiles(id) ON DELETE CASCADE,
  check_in_at      timestamptz NOT NULL,
  check_out_at     timestamptz,
  activities       text,
  mood_behavior    text,
  sleep_notes      text,
  additional_notes text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_session_reports_sitter ON session_reports(sitter_id);

-- ── reviews ──

CREATE TABLE reviews (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id  uuid NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  parent_id   uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  sitter_id   uuid NOT NULL REFERENCES sitter_profiles(id) ON DELETE CASCADE,
  rating      integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  keywords    jsonb NOT NULL DEFAULT '[]'::jsonb,
  comment     text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_sitter ON reviews(sitter_id);
CREATE INDEX idx_reviews_parent ON reviews(parent_id);

-- ── partner_accounts ──

CREATE TABLE partner_accounts (
  id             uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  business_name  text NOT NULL,
  business_type  business_type NOT NULL,
  referral_code  text NOT NULL UNIQUE,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- ── partner_referrals ──

CREATE TABLE partner_referrals (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id  uuid NOT NULL REFERENCES partner_accounts(id) ON DELETE CASCADE,
  booking_id  uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_partner_referrals_partner ON partner_referrals(partner_id);
CREATE INDEX idx_partner_referrals_booking ON partner_referrals(booking_id);

-- partner_referral_id FK (bookings → partner_referrals) — 양쪽 테이블 생성 후 추가
ALTER TABLE bookings
  ADD CONSTRAINT bookings_partner_referral_id_fkey
  FOREIGN KEY (partner_referral_id) REFERENCES partner_referrals(id);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sitter_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sitter_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_children ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_referrals ENABLE ROW LEVEL SECURITY;

-- ── profiles: 본인만 읽기/쓰기 ──

CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ── sitter_profiles: 누구나 읽기, 본인만 쓰기 ──

CREATE POLICY "sitter_profiles_select_all"
  ON sitter_profiles FOR SELECT
  USING (true);

CREATE POLICY "sitter_profiles_insert_own"
  ON sitter_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "sitter_profiles_update_own"
  ON sitter_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ── sitter_availability: 누구나 읽기, 본인만 쓰기 ──

CREATE POLICY "sitter_availability_select_all"
  ON sitter_availability FOR SELECT
  USING (true);

CREATE POLICY "sitter_availability_insert_own"
  ON sitter_availability FOR INSERT
  WITH CHECK (auth.uid() = sitter_id);

CREATE POLICY "sitter_availability_update_own"
  ON sitter_availability FOR UPDATE
  USING (auth.uid() = sitter_id)
  WITH CHECK (auth.uid() = sitter_id);

CREATE POLICY "sitter_availability_delete_own"
  ON sitter_availability FOR DELETE
  USING (auth.uid() = sitter_id);

-- ── bookings: 관련 parent/sitter만 읽기/쓰기 ──

CREATE POLICY "bookings_select_own"
  ON bookings FOR SELECT
  USING (auth.uid() = parent_id OR auth.uid() = sitter_id);

CREATE POLICY "bookings_insert_parent"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "bookings_update_own"
  ON bookings FOR UPDATE
  USING (auth.uid() = parent_id OR auth.uid() = sitter_id);

-- ── booking_children: 관련 parent/sitter만 ──

CREATE POLICY "booking_children_select"
  ON booking_children FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_children.booking_id
        AND (bookings.parent_id = auth.uid() OR bookings.sitter_id = auth.uid())
    )
  );

CREATE POLICY "booking_children_insert"
  ON booking_children FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_children.booking_id
        AND bookings.parent_id = auth.uid()
    )
  );

-- ── booking_emergency_contacts: 관련 parent/sitter만 ──

CREATE POLICY "booking_emergency_contacts_select"
  ON booking_emergency_contacts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_emergency_contacts.booking_id
        AND (bookings.parent_id = auth.uid() OR bookings.sitter_id = auth.uid())
    )
  );

CREATE POLICY "booking_emergency_contacts_insert"
  ON booking_emergency_contacts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_emergency_contacts.booking_id
        AND bookings.parent_id = auth.uid()
    )
  );

-- ── session_reports: 관련 parent/sitter 읽기, sitter만 쓰기 ──

CREATE POLICY "session_reports_select"
  ON session_reports FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = session_reports.booking_id
        AND (bookings.parent_id = auth.uid() OR bookings.sitter_id = auth.uid())
    )
  );

CREATE POLICY "session_reports_insert_sitter"
  ON session_reports FOR INSERT
  WITH CHECK (auth.uid() = sitter_id);

CREATE POLICY "session_reports_update_sitter"
  ON session_reports FOR UPDATE
  USING (auth.uid() = sitter_id)
  WITH CHECK (auth.uid() = sitter_id);

-- ── reviews: 누구나 읽기, 본인 parent만 쓰기 ──

CREATE POLICY "reviews_select_all"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "reviews_insert_parent"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "reviews_update_parent"
  ON reviews FOR UPDATE
  USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

-- ── partner_accounts: 본인만 읽기/쓰기 ──

CREATE POLICY "partner_accounts_select_own"
  ON partner_accounts FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "partner_accounts_insert_own"
  ON partner_accounts FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "partner_accounts_update_own"
  ON partner_accounts FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ── partner_referrals: 관련 partner만 읽기 ──

CREATE POLICY "partner_referrals_select_own"
  ON partner_referrals FOR SELECT
  USING (auth.uid() = partner_id);

CREATE POLICY "partner_referrals_insert_own"
  ON partner_referrals FOR INSERT
  WITH CHECK (auth.uid() = partner_id);
