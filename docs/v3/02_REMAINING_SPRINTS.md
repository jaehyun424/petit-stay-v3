# Petit Stay V3 — 남은 Sprint 전체 로드맵
> 최종 업데이트: 2026-03-13
> 순서: 심사 임팩트 + 런칭 필수 기준

---

## Sprint 5-A: Privacy/Terms/에러/404 번역 ⬅️ 지금 할 것
- **파일**: privacy/page.tsx, terms/page.tsx, error.tsx, not-found.tsx, loading.tsx, header.tsx
- **내용**: 영어 하드코딩 전부 번역키로 교체
- **프롬프트**: sprint5a-prompt.txt (이미 생성됨)
- **예상 소요**: Claude Code 1세션
- **효과**: 사이트에서 영어 페이지 0개

## Sprint 5-B: 시터 실사 사진 4장
- **파일**: public/sitters/*.jpg, seed.sql, app/page.tsx, search-content.tsx, sitters/[id]/page.tsx
- **내용**: Unsplash에서 따뜻한 톤 여성 사진 4장 다운 → public/sitters/에 저장 → DB avatar_url 업데이트
- **예상 소요**: 사진 고르기 10분 + Claude Code 1세션
- **효과**: 이니셜(M,E,S,Y) → 실사 사진. 제품 느낌 급상승

## Sprint 5-C: 무반응 버튼 정리 + 파비콘 귀 축소
- **파일**: login/page.tsx, signup/page.tsx, booking/[id]/page.tsx, sitters/[id]/page.tsx, sitter/page.tsx, favicon.svg
- **내용**:
  - Google/Kakao 버튼 → "준비 중" disabled 처리 또는 숨기기
  - 예약 취소 → 확인 모달 + API 연결 (또는 "준비 중")
  - 시터에게 연락 → mailto 연결 또는 "준비 중"
  - 리뷰 보기 href="#" → 실제 리뷰 섹션 앵커
  - 가용시간 편집 → "준비 중"
  - 파비콘 토끼 귀 ry 값 축소 (7.5 → 5.5 정도)
- **예상 소요**: Claude Code 1세션
- **효과**: "클릭했는데 무반응" 0건

## Sprint 6-A: 마이페이지 + 날짜포맷 + child→아이
- **파일**: 신규 app/my/page.tsx, booking/[id]/page.tsx, book/[sitterId]/page.tsx, checkout 등
- **내용**:
  - /my 페이지 신규 생성 (내 예약 목록 — pending/confirmed/completed)
  - Header에 로그인 시 "마이페이지" 링크 추가
  - toLocaleDateString("en-US") → 로케일 감지 또는 "ko-KR" 교체 (7곳)
  - "child/children" → "아이 N명" 번역키 (5곳)
- **예상 소요**: Claude Code 1~2세션
- **효과**: 부모 UX 완성. 영어 포맷 제거

## Sprint 6-B: 시터/파트너 대시보드 번역
- **파일**: sitter/page.tsx (637줄), partner/page.tsx (396줄), messages/*.json
- **내용**:
  - 시터 대시보드 ~31개 영어 문자열 → i18n 키
  - 파트너 대시보드 ~20개 영어 문자열 → i18n 키
  - "Dashboard", "Requests", "Schedule", "Earnings", "Profile" 탭명
  - "Accept", "Decline", "Confirmed", "Pending" 상태
  - "Save changes", "Uploading...", "Loading..." 등
- **예상 소요**: Claude Code 1~2세션 (양이 많음)
- **효과**: 시터/파트너 경험 완전 한국어화

## Sprint 7-A: 메타데이터 다국어 + 접근성
- **파일**: layout.tsx, search/page.tsx, login/layout.tsx, signup/layout.tsx, book/layout.tsx, checkout/layout.tsx
- **내용**:
  - 루트 메타데이터 "Trusted Babysitters in Seoul" → 번역
  - 각 페이지 메타데이터 영어 → 한국어 기본
  - aria-label "Petit Stay Home", "Select language" → 번역
  - 캐러셀 role="region" + aria-label
- **예상 소요**: Claude Code 1세션
- **효과**: SEO + 접근성 완성

## Sprint 7-B: 사업계획서 정합성 강화
- **파일**: API routes, 예약 폼, 검색 필터
- **내용**:
  - sitter_profiles에 age_min/age_max 컬럼 추가 (SQL)
  - 검색 아이나이 필터 실동작 연결
  - 예약 API에 운영시간 18:00~23:00 서버 검증 추가
  - 예약 API에 24시간 전 예약 서버 검증 추가
  - 보험 문구 보수적 표현으로 교체 ("적용 예정" 등)
- **예상 소요**: Claude Code 1~2세션
- **효과**: 사업계획서 ↔ 코드 100% 정합

## Sprint 8: 비주얼 폴리시
- **파일**: 전체 페이지
- **내용**:
  - hero.mp4 압축 (53MB → 10~15MB)
  - 카드 줄바꿈 전페이지 한국어 기준 QA
  - 모바일 터치 타깃 48px 보장
  - 빈 상태/로딩/에러 UI 통일
  - 고급 애니메이션 (Motion) 추가 (선택)
- **예상 소요**: Claude Code 1~2세션

## Sprint 9: 런칭 인프라
- **파일**: 신규 파일들
- **내용**:
  - sitemap.xml 자동 생성
  - robots.txt
  - 쿠키 동의 배너
  - README.md 제품화
  - KNOWN_GAPS.md 최종 업데이트
  - CHANGELOG.md 작성
  - 크로스브라우저 테스트 (Chrome, Safari, Firefox)
  - Lighthouse 성능 80+ 확보
- **예상 소요**: Claude Code 1~2세션

## Sprint 10: OAuth + 고급 기능 (런칭 후)
- Google OAuth 실제 연동
- Kakao OAuth 실제 연동
- 예약 취소 실동작 (API + 환불)
- 시터에게 연락 실동작 (인앱 메시지 또는 이메일)
- Cloudinary 이미지 업로드
- 시터 가용시간 편집 기능
- 이메일 알림 (예약 확정/취소)
- 에러 모니터링 (Sentry)

---

## 요약: 런칭 전 필수 Sprint

| Sprint | 내용 | 중요도 |
|--------|------|--------|
| 5-A | Privacy/Terms/에러 번역 | 🔴 필수 |
| 5-B | 시터 실사 사진 | 🔴 필수 |
| 5-C | 무반응 버튼 + 파비콘 | 🔴 필수 |
| 6-A | 마이페이지 + 날짜 + child | 🔴 필수 |
| 6-B | 대시보드 번역 | 🟡 중요 |
| 7-A | 메타데이터 + 접근성 | 🟡 중요 |
| 7-B | 사업계획서 정합성 | 🟡 중요 |
| 8 | 비주얼 폴리시 | 🟢 권장 |
| 9 | 런칭 인프라 | 🟢 권장 |
| 10 | OAuth + 고급기능 | ⚪ 런칭 후 |
