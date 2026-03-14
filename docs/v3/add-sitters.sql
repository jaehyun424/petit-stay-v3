-- ============================================================
-- Petit Stay V3 — Add 4 New Sitters (Hana, Soyeon, Jiwon, Nami)
-- Supabase SQL Editor에서 실행
-- ON CONFLICT DO NOTHING: 중복 실행 시 에러 없음
-- ============================================================

-- ── 1. auth.users ──

INSERT INTO auth.users (
  instance_id, id, aud, role, email,
  encrypted_password, email_confirmed_at,
  created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change,
  raw_app_meta_data, raw_user_meta_data
) VALUES
-- Hana M.
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
-- Soyeon K.
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
-- Jiwon L.
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
-- Nami O.
(
  '00000000-0000-0000-0000-000000000000',
  'b8888888-8888-8888-8888-888888888888',
  'authenticated', 'authenticated',
  'demo-nami@petitstay.com',
  crypt('demo1234', gen_salt('bf')),
  now(), now(), now(), '', '', '', '',
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Nami O."}'
)
ON CONFLICT (id) DO NOTHING;

-- ── 2. auth.identities ──

INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id,
  last_sign_in_at, created_at, updated_at
) VALUES
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
 'email', 'b8888888-8888-8888-8888-888888888888', now(), now(), now())
ON CONFLICT (id, provider) DO NOTHING;

-- ── 3. profiles ──

INSERT INTO profiles (id, role, full_name, phone, avatar_url) VALUES
('b5555555-5555-5555-5555-555555555555', 'sitter', 'Hana M.',    '+82-10-1111-0005', '/sitters/hana.jpg'),
('b6666666-6666-6666-6666-666666666666', 'sitter', 'Soyeon K.',  '+82-10-1111-0006', '/sitters/soyeon.jpg'),
('b7777777-7777-7777-7777-777777777777', 'sitter', 'Jiwon L.',   '+82-10-1111-0007', '/sitters/jiwon.jpg'),
('b8888888-8888-8888-8888-888888888888', 'sitter', 'Nami O.',    '+82-10-1111-0008', '/sitters/nami.jpg')
ON CONFLICT (id) DO NOTHING;

-- ── 4. sitter_profiles ──

INSERT INTO sitter_profiles (
  id, bio, hourly_rate, languages, certifications,
  is_verified, is_active, rating_avg, review_count, response_rate
) VALUES
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
)
ON CONFLICT (id) DO NOTHING;

-- ── 5. sitter_availability ──

INSERT INTO sitter_availability (sitter_id, day_of_week, start_time, end_time, is_active) VALUES
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
('b8888888-8888-8888-8888-888888888888', 6, '18:00', '23:00', true)
ON CONFLICT DO NOTHING;

-- ── 6. update-avatars (새 시터 포함) ──

UPDATE profiles SET avatar_url = '/sitters/hana.jpg'   WHERE id = 'b5555555-5555-5555-5555-555555555555';
UPDATE profiles SET avatar_url = '/sitters/soyeon.jpg'  WHERE id = 'b6666666-6666-6666-6666-666666666666';
UPDATE profiles SET avatar_url = '/sitters/jiwon.jpg'   WHERE id = 'b7777777-7777-7777-7777-777777777777';
UPDATE profiles SET avatar_url = '/sitters/nami.jpg'    WHERE id = 'b8888888-8888-8888-8888-888888888888';
