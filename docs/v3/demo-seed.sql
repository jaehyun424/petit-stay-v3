-- ============================================================
-- Petit Stay V3 — Demo Master Account Seed
-- ============================================================
--
-- 사전 조건:
--   1. schema.sql 실행 완료
--   2. seed.sql 실행 완료 (시터 데이터 필요)
--   3. auth-trigger.sql 실행 완료
--
-- ============================================================
-- 데모 계정 생성 방법 (Supabase Auth)
-- ============================================================
--
-- Supabase Auth 계정은 SQL로 직접 생성이 안정적이지 않으므로,
-- 아래 두 가지 방법 중 하나를 사용:
--
-- 방법 1: Supabase Dashboard (권장)
--   1. Supabase Dashboard > Authentication > Users
--   2. "Add user" > "Create new user" 클릭
--   3. Email: demo@petitstay.com
--   4. Password: PetitStay2026!
--   5. "Auto Confirm User" 체크 (이메일 확인 건너뛰기)
--   6. 생성된 user의 UUID를 복사
--   7. 아래 SQL에서 DEMO_USER_ID를 해당 UUID로 교체
--
-- 방법 2: SQL로 직접 생성 (테스트 환경에서만)
--   아래 INSERT문으로 auth.users에 직접 삽입.
--   auth-trigger.sql의 handle_new_user()가 profiles를 자동 생성하므로
--   profiles INSERT는 trigger 동작 후 UPDATE로 처리.
--
-- ============================================================

-- 변수 설정: 데모 계정 UUID
-- Dashboard에서 생성했다면 해당 UUID로 교체하세요.
-- SQL 직접 생성 시 아래 UUID를 그대로 사용합니다.

-- Demo User UUID
-- d0000000-0000-0000-0000-000000000000

-- ============================================================
-- 1. Auth User 생성 (SQL 방식 — 테스트 환경용)
-- ============================================================
-- Dashboard에서 이미 생성했다면 이 섹션을 건너뛰세요.

INSERT INTO auth.users (
  instance_id, id, aud, role, email,
  encrypted_password, email_confirmed_at,
  created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change,
  raw_app_meta_data, raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'd0000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'demo@petitstay.com',
  crypt('PetitStay2026!', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Demo User","role":"parent"}'
);

INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id,
  last_sign_in_at, created_at, updated_at
) VALUES (
  'd0000000-0000-0000-0000-000000000000',
  'd0000000-0000-0000-0000-000000000000',
  '{"sub":"d0000000-0000-0000-0000-000000000000","email":"demo@petitstay.com"}',
  'email',
  'd0000000-0000-0000-0000-000000000000',
  now(), now(), now()
);

-- ============================================================
-- 2. Profile 업데이트
-- ============================================================
-- auth-trigger가 profiles를 자동 생성하므로, role 확인 후 업데이트
-- trigger가 이미 실행되었다면 UPDATE, 아니면 INSERT

INSERT INTO profiles (id, role, full_name, phone)
VALUES (
  'd0000000-0000-0000-0000-000000000000',
  'parent',
  'Demo User',
  '+82-10-0000-0000'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'parent',
  full_name = 'Demo User',
  phone = '+82-10-0000-0000';

-- ============================================================
-- 3. Bookings (4건 — 전 상태 커버)
-- ============================================================
-- Booking UUIDs:
--   e1111111-1111-1111-1111-111111111111  → pending   (Emily K.)
--   e2222222-2222-2222-2222-222222222222  → confirmed (Sarah L.)
--   e3333333-3333-3333-3333-333333333333  → completed (Mika T.)  — 리뷰 미작성
--   e4444444-4444-4444-4444-444444444444  → completed (Yuna P.)  — 리뷰 작성 완료

INSERT INTO bookings (
  id, parent_id, sitter_id, status, date, start_time, end_time,
  total_amount, service_fee, net_amount
) VALUES
-- Booking 1: Demo → Emily K., pending, Mar 20 18:00-22:00
(
  'e1111111-1111-1111-1111-111111111111',
  'd0000000-0000-0000-0000-000000000000',
  'b1111111-1111-1111-1111-111111111111',
  'pending', '2026-03-20', '18:00', '22:00',
  120000, 20000, 100000
),
-- Booking 2: Demo → Sarah L., confirmed, Mar 18 19:00-22:00
(
  'e2222222-2222-2222-2222-222222222222',
  'd0000000-0000-0000-0000-000000000000',
  'b2222222-2222-2222-2222-222222222222',
  'confirmed', '2026-03-18', '19:00', '22:00',
  108000, 18000, 90000
),
-- Booking 3: Demo → Mika T., completed, Mar 10 18:00-21:00 (리뷰 미작성)
(
  'e3333333-3333-3333-3333-333333333333',
  'd0000000-0000-0000-0000-000000000000',
  'b3333333-3333-3333-3333-333333333333',
  'completed', '2026-03-10', '18:00', '21:00',
  100800, 16800, 84000
),
-- Booking 4: Demo → Yuna P., completed, Mar 05 18:00-22:00 (리뷰 작성 완료)
(
  'e4444444-4444-4444-4444-444444444444',
  'd0000000-0000-0000-0000-000000000000',
  'b4444444-4444-4444-4444-444444444444',
  'completed', '2026-03-05', '18:00', '22:00',
  105600, 17600, 88000
);

-- ============================================================
-- 4. Booking Children
-- ============================================================

INSERT INTO booking_children (booking_id, name, age, special_notes) VALUES
-- Booking 1 (pending): 1 child
('e1111111-1111-1111-1111-111111111111', 'Hana K.', 5, NULL),
-- Booking 2 (confirmed): 1 child
('e2222222-2222-2222-2222-222222222222', 'Hana K.', 5, 'Mild egg allergy'),
-- Booking 3 (completed, no review): 2 children
('e3333333-3333-3333-3333-333333333333', 'Hana K.', 5, NULL),
('e3333333-3333-3333-3333-333333333333', 'Sora K.', 3, 'Needs comfort blanket'),
-- Booking 4 (completed, with review): 1 child
('e4444444-4444-4444-4444-444444444444', 'Hana K.', 5, NULL);

-- ============================================================
-- 5. Booking Emergency Contacts
-- ============================================================

INSERT INTO booking_emergency_contacts (booking_id, name, phone, relationship) VALUES
('e1111111-1111-1111-1111-111111111111', 'Demo User', '+82-10-0000-0000', 'Parent'),
('e2222222-2222-2222-2222-222222222222', 'Demo User', '+82-10-0000-0000', 'Parent'),
('e3333333-3333-3333-3333-333333333333', 'Demo User', '+82-10-0000-0000', 'Parent'),
('e4444444-4444-4444-4444-444444444444', 'Demo User', '+82-10-0000-0000', 'Parent');

-- ============================================================
-- 6. Session Reports (completed 예약 2건)
-- ============================================================

INSERT INTO session_reports (
  booking_id, sitter_id, check_in_at, check_out_at,
  activities, mood_behavior, sleep_notes, additional_notes
) VALUES
-- Booking 3: Mika T. (completed, no review)
(
  'e3333333-3333-3333-3333-333333333333',
  'b3333333-3333-3333-3333-333333333333',
  '2026-03-10 18:05:00+09', '2026-03-10 21:00:00+09',
  'Building blocks, storytelling, and coloring. Had a light snack around 19:00.',
  'Both children were cheerful. Younger one was shy at first but warmed up quickly.',
  'Younger child fell asleep at 20:15 after a bedtime story.',
  'Smooth session. Comfort blanket was very helpful for Sora.'
),
-- Booking 4: Yuna P. (completed, with review)
(
  'e4444444-4444-4444-4444-444444444444',
  'b4444444-4444-4444-4444-444444444444',
  '2026-03-05 18:00:00+09', '2026-03-05 22:00:00+09',
  'Arts and crafts, puzzle time, and reading picture books together.',
  'Very happy and engaged throughout the session. Loved the craft activity.',
  'Fell asleep at 21:00 during story time.',
  'Wonderful session! Hana was very cooperative.'
);

-- ============================================================
-- 7. Review (completed + 리뷰 작성 완료 1건)
-- ============================================================

INSERT INTO reviews (booking_id, parent_id, sitter_id, rating, keywords, comment) VALUES
(
  'e4444444-4444-4444-4444-444444444444',
  'd0000000-0000-0000-0000-000000000000',
  'b4444444-4444-4444-4444-444444444444',
  5,
  '["Great with kids","Creative activities","Would book again"]',
  'Yuna was amazing with our daughter! Creative activities and great bedtime routine. Highly recommend.'
);

-- ============================================================
-- 완료!
-- ============================================================
-- 데모 계정으로 로그인하면 다음 데이터를 확인할 수 있습니다:
--   - pending 예약 1건 (Emily K., 시터 수락 대기)
--   - confirmed 예약 1건 (Sarah L., 확정)
--   - completed 예약 1건 (Mika T., 리뷰 미작성)
--   - completed 예약 1건 (Yuna P., 리뷰 작성 완료)
--   - 각 예약에 booking_children, booking_emergency_contacts 포함
-- ============================================================
