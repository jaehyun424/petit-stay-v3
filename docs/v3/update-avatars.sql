-- ============================================================
-- Petit Stay V3 — Update Sitter Avatar URLs
-- Supabase SQL Editor에서 실행
-- public/sitters/ 폴더의 실사 사진 경로로 업데이트
-- ============================================================

UPDATE profiles SET avatar_url = '/sitters/emily.jpg' WHERE id = 'b1111111-1111-1111-1111-111111111111';
UPDATE profiles SET avatar_url = '/sitters/sarah.jpg' WHERE id = 'b2222222-2222-2222-2222-222222222222';
UPDATE profiles SET avatar_url = '/sitters/mika.jpg'  WHERE id = 'b3333333-3333-3333-3333-333333333333';
UPDATE profiles SET avatar_url = '/sitters/yuna.jpg'  WHERE id = 'b4444444-4444-4444-4444-444444444444';
