-- ============================================================
-- Petit Stay V3 — Seed Data
-- schema.sql 실행 후 Supabase SQL Editor에서 실행
-- 모든 계정 비밀번호: demo1234
-- ============================================================

-- ── UUIDs ──
-- Parent:  a1111111-1111-1111-1111-111111111111  (James T.)
-- Sitter1: b1111111-1111-1111-1111-111111111111  (Emily K.)
-- Sitter2: b2222222-2222-2222-2222-222222222222  (Sarah L.)
-- Sitter3: b3333333-3333-3333-3333-333333333333  (Mika T.)
-- Sitter4: b4444444-4444-4444-4444-444444444444  (Yuna P.)
-- Sitter5: b5555555-5555-5555-5555-555555555555  (Hana M.)
-- Sitter6: b6666666-6666-6666-6666-666666666666  (Soyeon K.)
-- Sitter7: b7777777-7777-7777-7777-777777777777  (Jiwon L.)
-- Sitter8: b8888888-8888-8888-8888-888888888888  (Nami O.)
-- Partner: c1111111-1111-1111-1111-111111111111  (Grand Hyatt Seoul)

-- ============================================================
-- 1. auth.users
-- ============================================================

INSERT INTO auth.users (
  instance_id, id, aud, role, email,
  encrypted_password, email_confirmed_at,
  created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change,
  raw_app_meta_data, raw_user_meta_data
) VALUES
-- Parent: James T.
(
  '00000000-0000-0000-0000-000000000000',
  'a1111111-1111-1111-1111-111111111111',
  'authenticated', 'authenticated',
  'demo-parent@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"James T."}'
),
-- Sitter: Emily K.
(
  '00000000-0000-0000-0000-000000000000',
  'b1111111-1111-1111-1111-111111111111',
  'authenticated', 'authenticated',
  'demo-emily@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Emily K."}'
),
-- Sitter: Sarah L.
(
  '00000000-0000-0000-0000-000000000000',
  'b2222222-2222-2222-2222-222222222222',
  'authenticated', 'authenticated',
  'demo-sarah@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Sarah L."}'
),
-- Sitter: Mika T.
(
  '00000000-0000-0000-0000-000000000000',
  'b3333333-3333-3333-3333-333333333333',
  'authenticated', 'authenticated',
  'demo-mika@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Mika T."}'
),
-- Sitter: Yuna P.
(
  '00000000-0000-0000-0000-000000000000',
  'b4444444-4444-4444-4444-444444444444',
  'authenticated', 'authenticated',
  'demo-yuna@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Yuna P."}'
),
-- Sitter: Hana M.
(
  '00000000-0000-0000-0000-000000000000',
  'b5555555-5555-5555-5555-555555555555',
  'authenticated', 'authenticated',
  'demo-hana@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Hana M."}'
),
-- Sitter: Soyeon K.
(
  '00000000-0000-0000-0000-000000000000',
  'b6666666-6666-6666-6666-666666666666',
  'authenticated', 'authenticated',
  'demo-soyeon@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Soyeon K."}'
),
-- Sitter: Jiwon L.
(
  '00000000-0000-0000-0000-000000000000',
  'b7777777-7777-7777-7777-777777777777',
  'authenticated', 'authenticated',
  'demo-jiwon@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Jiwon L."}'
),
-- Sitter: Nami O.
(
  '00000000-0000-0000-0000-000000000000',
  'b8888888-8888-8888-8888-888888888888',
  'authenticated', 'authenticated',
  'demo-nami@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Nami O."}'
),
-- Partner: Grand Hyatt Seoul
(
  '00000000-0000-0000-0000-000000000000',
  'c1111111-1111-1111-1111-111111111111',
  'authenticated', 'authenticated',
  'demo-partner@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Grand Hyatt Seoul"}'
);

-- ── auth.identities (로그인에 필요) ──

INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id,
  last_sign_in_at, created_at, updated_at
) VALUES
('a1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111',
 '{"sub":"a1111111-1111-1111-1111-111111111111","email":"demo-parent@petitstay.com"}',
 'email', 'a1111111-1111-1111-1111-111111111111', now(), now(), now()),
('b1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111',
 '{"sub":"b1111111-1111-1111-1111-111111111111","email":"demo-emily@petitstay.com"}',
 'email', 'b1111111-1111-1111-1111-111111111111', now(), now(), now()),
('b2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222',
 '{"sub":"b2222222-2222-2222-2222-222222222222","email":"demo-sarah@petitstay.com"}',
 'email', 'b2222222-2222-2222-2222-222222222222', now(), now(), now()),
('b3333333-3333-3333-3333-333333333333', 'b3333333-3333-3333-3333-333333333333',
 '{"sub":"b3333333-3333-3333-3333-333333333333","email":"demo-mika@petitstay.com"}',
 'email', 'b3333333-3333-3333-3333-333333333333', now(), now(), now()),
('b4444444-4444-4444-4444-444444444444', 'b4444444-4444-4444-4444-444444444444',
 '{"sub":"b4444444-4444-4444-4444-444444444444","email":"demo-yuna@petitstay.com"}',
 'email', 'b4444444-4444-4444-4444-444444444444', now(), now(), now()),
('b5555555-5555-5555-5555-555555555555', 'b5555555-5555-5555-5555-555555555555',
 '{"sub":"b5555555-5555-5555-5555-555555555555","email":"demo-hana@petitstay.com"}',
 'email', 'b5555555-5555-5555-5555-555555555555', now(), now(), now()),
('b6666666-6666-6666-6666-666666666666', 'b6666666-6666-6666-6666-666666666666',
 '{"sub":"b6666666-6666-6666-6666-666666666666","email":"demo-soyeon@petitstay.com"}',
 'email', 'b6666666-6666-6666-6666-666666666666', now(), now(), now()),
('b7777777-7777-7777-7777-777777777777', 'b7777777-7777-7777-7777-777777777777',
 '{"sub":"b7777777-7777-7777-7777-777777777777","email":"demo-jiwon@petitstay.com"}',
 'email', 'b7777777-7777-7777-7777-777777777777', now(), now(), now()),
('b8888888-8888-8888-8888-888888888888', 'b8888888-8888-8888-8888-888888888888',
 '{"sub":"b8888888-8888-8888-8888-888888888888","email":"demo-nami@petitstay.com"}',
 'email', 'b8888888-8888-8888-8888-888888888888', now(), now(), now()),
('c1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111',
 '{"sub":"c1111111-1111-1111-1111-111111111111","email":"demo-partner@petitstay.com"}',
 'email', 'c1111111-1111-1111-1111-111111111111', now(), now(), now());

-- ============================================================
-- 2. profiles
-- ============================================================

INSERT INTO profiles (id, role, full_name, phone, avatar_url) VALUES
('a1111111-1111-1111-1111-111111111111', 'parent',  'James T.',           '+82-10-1234-5678', NULL),
('b1111111-1111-1111-1111-111111111111', 'sitter',  'Emily K.',           '+82-10-1111-0001', '/sitters/emily.jpg'),
('b2222222-2222-2222-2222-222222222222', 'sitter',  'Sarah L.',           '+82-10-1111-0002', '/sitters/sarah.jpg'),
('b3333333-3333-3333-3333-333333333333', 'sitter',  'Mika T.',            '+82-10-1111-0003', '/sitters/mika.jpg'),
('b4444444-4444-4444-4444-444444444444', 'sitter',  'Yuna P.',            '+82-10-1111-0004', '/sitters/yuna.jpg'),
('b5555555-5555-5555-5555-555555555555', 'sitter',  'Hana M.',            '+82-10-1111-0005', '/sitters/hana.jpg'),
('b6666666-6666-6666-6666-666666666666', 'sitter',  'Soyeon K.',          '+82-10-1111-0006', '/sitters/soyeon.jpg'),
('b7777777-7777-7777-7777-777777777777', 'sitter',  'Jiwon L.',           '+82-10-1111-0007', '/sitters/jiwon.jpg'),
('b8888888-8888-8888-8888-888888888888', 'sitter',  'Nami O.',            '+82-10-1111-0008', '/sitters/nami.jpg'),
('c1111111-1111-1111-1111-111111111111', 'partner', 'Grand Hyatt Seoul',  '+82-2-799-8888',   NULL);

-- ============================================================
-- 3. sitter_profiles
-- ============================================================

INSERT INTO sitter_profiles (
  id, bio, hourly_rate, languages, certifications,
  is_verified, is_active, rating_avg, review_count, response_rate
) VALUES
-- Emily K.
(
  'b1111111-1111-1111-1111-111111111111',
  'Hi! I''m Emily, a certified early childhood educator from New York, currently living in Seoul. I have 5 years of experience working with children aged 2-10. I speak English (native) and Korean (conversational). I enjoy creative play, storytelling, and outdoor activities.',
  25000,
  '[{"lang":"English","level":"L3"},{"lang":"Korean","level":"L2"}]',
  '[{"name":"Early Childhood Education","issued_by":"NYU","year":2019},{"name":"CPR & First Aid Certified"}]',
  true, true, 4.92, 47, 0.98
),
-- Sarah L.
(
  'b2222222-2222-2222-2222-222222222222',
  'I''m Sarah, originally from Osaka. I love helping families feel comfortable during their stay in Korea. Fluent in Japanese and English, conversational Korean.',
  30000,
  '[{"lang":"Japanese","level":"L3"},{"lang":"English","level":"L2"},{"lang":"Korean","level":"L1"}]',
  '[{"name":"Childcare Certificate","issued_by":"Tokyo Academy","year":2020}]',
  true, true, 4.85, 32, 0.95
),
-- Mika T.
(
  'b3333333-3333-3333-3333-333333333333',
  'Hello! I''m Mika, a bilingual sitter fluent in English and Korean. CPR certified with 4 years of babysitting experience. I specialize in creative activities and bedtime routines.',
  28000,
  '[{"lang":"English","level":"L3"},{"lang":"Korean","level":"L3"}]',
  '[{"name":"CPR & First Aid Certified"},{"name":"Child Psychology Course","issued_by":"Yonsei University","year":2021}]',
  true, true, 4.97, 61, 0.99
),
-- Yuna P.
(
  'b4444444-4444-4444-4444-444444444444',
  'Hi, I''m Yuna! Korean native with strong English skills. I''m a university student studying early childhood education. Great with toddlers and preschoolers.',
  22000,
  '[{"lang":"Korean","level":"L3"},{"lang":"English","level":"L2"}]',
  '[]',
  true, true, 4.78, 19, 0.92
),
-- Hana M.
(
  'b5555555-5555-5555-5555-555555555555',
  '아동심리학을 전공했으며, 아이들의 정서적 발달에 관심이 많아요.',
  26000,
  '[{"lang":"English","level":"L3"},{"lang":"Korean","level":"L3"}]',
  '[{"name":"Child Psychology Course"},{"name":"CPR & First Aid Certified"}]',
  true, true, 4.90, 38, 0.96
),
-- Soyeon K.
(
  'b6666666-6666-6666-6666-666666666666',
  '응급처치 전문 자격을 보유한 경험 많은 시터예요.',
  27000,
  '[{"lang":"Japanese","level":"L3"},{"lang":"Korean","level":"L3"}]',
  '[{"name":"First Aid Certified"},{"name":"Childcare Certificate"}]',
  true, true, 4.88, 29, 0.94
),
-- Jiwon L.
(
  'b7777777-7777-7777-7777-777777777777',
  '3개 국어를 구사하며, 다양한 문화의 가족과 소통할 수 있어요.',
  29000,
  '[{"lang":"English","level":"L3"},{"lang":"Chinese","level":"L2"},{"lang":"Korean","level":"L3"}]',
  '[{"name":"Early Childhood Education"},{"name":"Bilingual Teaching"}]',
  true, true, 4.93, 44, 0.97
),
-- Nami O.
(
  'b8888888-8888-8888-8888-888888888888',
  '유치원 교사 경력 5년, 아이들과 함께하는 시간을 사랑해요.',
  24000,
  '[{"lang":"English","level":"L2"},{"lang":"Japanese","level":"L3"}]',
  '[{"name":"Kindergarten Teacher License"}]',
  true, true, 4.82, 22, 0.93
);

-- ============================================================
-- 4. sitter_availability (Emily K. 기준 — 하드코딩 데이터와 동일)
-- ============================================================

INSERT INTO sitter_availability (sitter_id, day_of_week, start_time, end_time, is_active) VALUES
-- Emily K. Mon-Fri 18:00-23:00, Sat-Sun 14:00-23:00
('b1111111-1111-1111-1111-111111111111', 1, '18:00', '23:00', true),
('b1111111-1111-1111-1111-111111111111', 2, '18:00', '23:00', true),
('b1111111-1111-1111-1111-111111111111', 3, '18:00', '23:00', false), -- Wed off
('b1111111-1111-1111-1111-111111111111', 4, '18:00', '23:00', true),
('b1111111-1111-1111-1111-111111111111', 5, '18:00', '23:00', true),
('b1111111-1111-1111-1111-111111111111', 6, '14:00', '23:00', true),
('b1111111-1111-1111-1111-111111111111', 0, '14:00', '23:00', true),
-- Hana M. Mon-Fri 18:00-23:00, Sat 14:00-23:00
('b5555555-5555-5555-5555-555555555555', 1, '18:00', '23:00', true),
('b5555555-5555-5555-5555-555555555555', 2, '18:00', '23:00', true),
('b5555555-5555-5555-5555-555555555555', 3, '18:00', '23:00', true),
('b5555555-5555-5555-5555-555555555555', 4, '18:00', '23:00', true),
('b5555555-5555-5555-5555-555555555555', 5, '18:00', '23:00', true),
('b5555555-5555-5555-5555-555555555555', 6, '14:00', '23:00', true),
-- Soyeon K. Mon-Thu 18:00-23:00, Sat 15:00-22:00
('b6666666-6666-6666-6666-666666666666', 1, '18:00', '23:00', true),
('b6666666-6666-6666-6666-666666666666', 2, '18:00', '23:00', true),
('b6666666-6666-6666-6666-666666666666', 3, '18:00', '23:00', true),
('b6666666-6666-6666-6666-666666666666', 4, '18:00', '23:00', true),
('b6666666-6666-6666-6666-666666666666', 6, '15:00', '22:00', true),
-- Jiwon L. Mon-Sun 18:00-23:00, Sat-Sun 14:00-23:00
('b7777777-7777-7777-7777-777777777777', 1, '18:00', '23:00', true),
('b7777777-7777-7777-7777-777777777777', 2, '18:00', '23:00', true),
('b7777777-7777-7777-7777-777777777777', 3, '18:00', '23:00', true),
('b7777777-7777-7777-7777-777777777777', 4, '18:00', '23:00', true),
('b7777777-7777-7777-7777-777777777777', 5, '18:00', '23:00', true),
('b7777777-7777-7777-7777-777777777777', 6, '14:00', '23:00', true),
('b7777777-7777-7777-7777-777777777777', 0, '14:00', '23:00', true),
-- Nami O. Tue-Sat 18:00-23:00
('b8888888-8888-8888-8888-888888888888', 2, '18:00', '23:00', true),
('b8888888-8888-8888-8888-888888888888', 3, '18:00', '23:00', true),
('b8888888-8888-8888-8888-888888888888', 4, '18:00', '23:00', true),
('b8888888-8888-8888-8888-888888888888', 5, '18:00', '23:00', true),
('b8888888-8888-8888-8888-888888888888', 6, '18:00', '23:00', true);

-- ============================================================
-- 5. partner_accounts
-- ============================================================

INSERT INTO partner_accounts (id, business_name, business_type, referral_code) VALUES
('c1111111-1111-1111-1111-111111111111', 'Grand Hyatt Seoul', 'hotel', 'grand-hyatt');

-- ============================================================
-- 6. bookings (3건 — 모두 completed)
-- ============================================================

INSERT INTO bookings (
  id, parent_id, sitter_id, status, date, start_time, end_time,
  total_amount, service_fee, net_amount
) VALUES
-- Booking 1: James T. → Emily K., Mar 15 18:00-22:00
(
  'd1111111-1111-1111-1111-111111111111',
  'a1111111-1111-1111-1111-111111111111',
  'b1111111-1111-1111-1111-111111111111',
  'completed', '2026-03-15', '18:00', '22:00',
  120000, 20000, 100000
),
-- Booking 2: James T. → Sarah L., Mar 14 19:00-22:00
(
  'd2222222-2222-2222-2222-222222222222',
  'a1111111-1111-1111-1111-111111111111',
  'b2222222-2222-2222-2222-222222222222',
  'completed', '2026-03-14', '19:00', '22:00',
  108000, 18000, 90000
),
-- Booking 3: James T. → Mika T., Mar 12 18:00-21:00
(
  'd3333333-3333-3333-3333-333333333333',
  'a1111111-1111-1111-1111-111111111111',
  'b3333333-3333-3333-3333-333333333333',
  'completed', '2026-03-12', '18:00', '21:00',
  100800, 16800, 84000
);

-- ============================================================
-- 7. booking_children
-- ============================================================

INSERT INTO booking_children (booking_id, name, age, special_notes) VALUES
-- Booking 1: 1 child
('d1111111-1111-1111-1111-111111111111', 'Liam T.', 5, NULL),
-- Booking 2: 1 child
('d2222222-2222-2222-2222-222222222222', 'Liam T.', 5, NULL),
-- Booking 3: 2 children
('d3333333-3333-3333-3333-333333333333', 'Liam T.', 5, NULL),
('d3333333-3333-3333-3333-333333333333', 'Sophie T.', 3, 'Mild peanut allergy');

-- ============================================================
-- 8. booking_emergency_contacts
-- ============================================================

INSERT INTO booking_emergency_contacts (booking_id, name, phone, relationship) VALUES
('d1111111-1111-1111-1111-111111111111', 'James T.', '+82-10-1234-5678', 'Father'),
('d2222222-2222-2222-2222-222222222222', 'James T.', '+82-10-1234-5678', 'Father'),
('d3333333-3333-3333-3333-333333333333', 'James T.', '+82-10-1234-5678', 'Father');

-- ============================================================
-- 9. session_reports
-- ============================================================

INSERT INTO session_reports (
  booking_id, sitter_id, check_in_at, check_out_at,
  activities, mood_behavior, sleep_notes, additional_notes
) VALUES
-- Booking 1: Emily K.
(
  'd1111111-1111-1111-1111-111111111111',
  'b1111111-1111-1111-1111-111111111111',
  '2026-03-15 18:02:00+09', '2026-03-15 22:00:00+09',
  'We played board games, read stories, and did some coloring. Had a light snack around 19:30.',
  'Very happy and cooperative throughout. Got a bit tired around 21:00.',
  'Fell asleep at 21:30 after bedtime story.',
  'No issues. Had a wonderful time!'
),
-- Booking 2: Sarah L.
(
  'd2222222-2222-2222-2222-222222222222',
  'b2222222-2222-2222-2222-222222222222',
  '2026-03-14 19:00:00+09', '2026-03-14 22:00:00+09',
  'Drawing, puzzles, and watched a short cartoon together.',
  'Calm and well-behaved. Enjoyed the puzzle time the most.',
  'No nap needed — stayed awake throughout.',
  'Very smooth session.'
),
-- Booking 3: Mika T.
(
  'd3333333-3333-3333-3333-333333333333',
  'b3333333-3333-3333-3333-333333333333',
  '2026-03-12 18:00:00+09', '2026-03-12 21:00:00+09',
  'Creative play with building blocks, storytelling, and light snack preparation.',
  'Both children were energetic and happy. Younger child needed some comforting initially.',
  'Younger child fell asleep at 20:30.',
  'Great experience with both kids. No allergy issues.'
);

-- ============================================================
-- 10. partner_referrals (3건 — Grand Hyatt 경유)
-- ============================================================

INSERT INTO partner_referrals (id, partner_id, booking_id) VALUES
('f1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111'),
('f2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 'd2222222-2222-2222-2222-222222222222'),
('f3333333-3333-3333-3333-333333333333', 'c1111111-1111-1111-1111-111111111111', 'd3333333-3333-3333-3333-333333333333');

-- partner_referral_id 연결
UPDATE bookings SET partner_referral_id = 'f1111111-1111-1111-1111-111111111111' WHERE id = 'd1111111-1111-1111-1111-111111111111';
UPDATE bookings SET partner_referral_id = 'f2222222-2222-2222-2222-222222222222' WHERE id = 'd2222222-2222-2222-2222-222222222222';
UPDATE bookings SET partner_referral_id = 'f3333333-3333-3333-3333-333333333333' WHERE id = 'd3333333-3333-3333-3333-333333333333';

-- ============================================================
-- 11. reviews (3건 — 하드코딩 데이터와 동일)
-- ============================================================

INSERT INTO reviews (booking_id, parent_id, sitter_id, rating, keywords, comment) VALUES
-- Review 1: Emily K. — 5 stars
(
  'd1111111-1111-1111-1111-111111111111',
  'a1111111-1111-1111-1111-111111111111',
  'b1111111-1111-1111-1111-111111111111',
  5,
  '["Punctual","Great with kids","Would book again"]',
  'Emily was fantastic with our kids. She arrived on time and our children didn''t want her to leave!'
),
-- Review 2: Sarah L. — 5 stars
(
  'd2222222-2222-2222-2222-222222222222',
  'a1111111-1111-1111-1111-111111111111',
  'b2222222-2222-2222-2222-222222222222',
  5,
  '["Professional","Good communicator","Caring"]',
  'Very professional and caring. Will book again on our next trip to Seoul.'
),
-- Review 3: Mika T. — 4 stars
(
  'd3333333-3333-3333-3333-333333333333',
  'a1111111-1111-1111-1111-111111111111',
  'b3333333-3333-3333-3333-333333333333',
  4,
  '["Creative activities","Great with kids","Good communicator"]',
  'Great experience overall. Good communication throughout the session.'
);
