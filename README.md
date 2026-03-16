# Petit Stay

서울 여행 가족을 위한 프리미엄 베이비시터 매칭 플랫폼

부모가 검증된 다국어 베이비시터를 직접 검색·선택·예약·결제할 수 있는 마켓플레이스입니다.

## 데모

- **라이브**: https://petit-stay-v3.vercel.app/
- **데모 계정**: `demo@petitstay.com` / `PetitStay2026!`

## 주요 기능

- 시터 검색 및 프로필 조회
- 날짜/시간/연령 기반 필터링
- 실시간 예약 및 Stripe 결제
- 다국어 지원 (한국어, 영어, 일본어, 중문번체)
- 세션 리포트 및 검증된 리뷰
- 호텔/숙소 파트너 대시보드
- 시터 대시보드 (일정 관리, 수익 확인)
- 반응형 모바일 최적화

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript (strict) |
| 스타일링 | Tailwind CSS v4 |
| 인증/DB | Supabase (Auth + PostgreSQL + RLS) |
| 결제 | Stripe (테스트 모드) |
| 다국어 | next-intl (cookie 기반) |
| 배포 | Vercel |

## 로컬 개발

```bash
# 의존성 설치
pnpm install

# 환경변수 설정
cp .env.example .env.local
# .env.local에 실제 값 입력

# 개발 서버 실행
pnpm dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 빌드

```bash
pnpm run build
```

## 프로젝트 구조

```
app/           # Next.js App Router 페이지 및 레이아웃
components/    # 재사용 가능한 UI 컴포넌트
lib/           # 유틸리티, Supabase 클라이언트, 타입
messages/      # 다국어 번역 파일 (ko, en, ja, zh-TW)
public/        # 정적 파일 (이미지, 파비콘)
docs/          # 프로젝트 문서
```
