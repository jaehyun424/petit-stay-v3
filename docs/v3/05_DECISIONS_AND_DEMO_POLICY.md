# Petit Stay V3 — 핵심 결정사항 + 데모 정책
> 최종 업데이트: 2026-03-13

---

## 제품 핵심 결정 (변경 불가)

| 항목 | 결정 | 근거 |
|------|------|------|
| 플랫폼 유형 | 마켓플레이스 (중개) | 시터는 독립 서비스 제공자 |
| 호텔 역할 | Referral partner | 고용주 아님 |
| 대상 연령 | 3~8세 | 사업계획서 확정 |
| 운영 시간 | 18:00~23:00 | 저녁 돌봄 특화 |
| 예약 리드타임 | 24시간 전 권장 | 시터 매칭 품질 |
| 돌봄 장소 | 호텔 객실 내 (in-room) | 초기 범위 |
| 최대 아이 수 | 2명 | 안전 기준 |
| 지역 | 서울 (초기) | 사업계획서 |
| 제외 서비스 | 숙박, 수영장, 차량, 약물 투여 | 보험/법적 리스크 |

## 기술 결정

| 항목 | 결정 | 비고 |
|------|------|------|
| 프레임워크 | Next.js 16 App Router | 초기 React 19 → Next.js로 전환 |
| 언어 | TypeScript strict | |
| 스타일 | Tailwind CSS v4 | |
| DB | Supabase (PostgreSQL) | Auth + DB + Storage |
| 결제 | Stripe | 테스트모드 |
| i18n | next-intl (non-routing, cookie) | 4개 언어 |
| 배포 | Vercel | petit-stay-v3.vercel.app |
| 이미지 | Cloudinary (예정) | 현재 미연결 |
| 애니메이션 | Motion (예정) | 현재 최소 |

## 디자인 결정

| 항목 | 결정 |
|------|------|
| 색상 | 지브리 60:30:10 — cream/charcoal/pink-gold |
| 60% | #FFFFFF, #F5F0EB, #F7F7F7 |
| 30% | #222222, #717171 |
| 10% | #C4956A, #8B7355 |
| 로고 | "Petit Stay" wordmark (Petit=#222, Stay=#C4956A) |
| 파비콘 | rounded square + 토끼 실루엣 |
| 기본 언어 | 한국어 (defaultLocale: 'ko') |
| 카피 톤 | ~해요/~돼요 (따뜻, 부드러운 존댓말) |

## 데모 정책

| 항목 | 내용 |
|------|------|
| 데모 계정 | demo@petitstay.com / PetitStay2026! |
| 데모 역할 | parent (부모) |
| 자동입력 | 로그인 페이지 email/password 초기값으로 설정 |
| Seeded 데이터 | 예약 4건 (pending/confirmed/completed×2) |
| 시터 데이터 | 4명 (Emily/Sarah/Mika/Yuna) |
| 리뷰 데이터 | 1건 (Yuna에 대한 리뷰) |
| 세션 리포트 | 2건 |
| Stripe | 테스트 모드 (실결제 안 됨) |
| 심사용 | 데모 계정으로 전체 플로우 체험 가능 |
| 주의 | 실제 런칭 시 자동입력 제거 필요 |

## Supabase 구조

| 테이블 | 역할 |
|--------|------|
| profiles | 유저 프로필 (role: parent/sitter/partner) |
| sitter_profiles | 시터 상세 (languages, certifications, hourly_rate 등) |
| sitter_availability | 시터 가용시간 |
| bookings | 예약 (status: pending/confirmed/completed/cancelled) |
| booking_children | 예약별 아이 정보 |
| booking_emergency_contacts | 긴급 연락처 |
| session_reports | 돌봄 리포트 |
| reviews | 리뷰 (rating, keywords, comment) |
| partner_referrals | 파트너 추천 추적 |

## Git 규칙

| 항목 | 내용 |
|------|------|
| 브랜치 | main (single branch) |
| 커밋 | feat:/fix:/docs: prefix |
| 배포 | main push → Vercel 자동 배포 |
| git config | jaehyun424@users.noreply.github.com |
| 주의 | hero.mp4 (53MB) GitHub 경고 — LFS 전환 고려 |

## 알림

| 항목 | 내용 |
|------|------|
| ntfy | curl -s -d "메시지" ntfy.sh/petit-stay-jh-2026 |
| 용도 | Claude Code 작업 완료 알림 |
