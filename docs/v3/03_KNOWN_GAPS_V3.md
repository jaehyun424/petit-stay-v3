# Petit Stay V3 — KNOWN GAPS (미완성 항목 솔직 기록)
> 최종 업데이트: 2026-03-13

---

## 🔴 심각 (런칭 전 반드시 해결)

### 1. 영어 하드코딩 페이지 4개
- `app/privacy/page.tsx` — 전체 영어
- `app/terms/page.tsx` — 전체 영어
- `app/error.tsx` — "Something went wrong" 영어
- `app/not-found.tsx` — "Page not found" 영어
- `app/loading.tsx` — "Loading..." 영어

### 2. 시터 사진 없음
- 4명 전부 이니셜 한 글자 (M, E, S, Y)
- 랜딩 + 검색 + 프로필 전부 영향
- 실제 서비스처럼 보이지 않음

### 3. 무반응 버튼 6개
- Google 로그인 (login/signup 각 1개)
- Kakao 로그인 (login/signup 각 1개)
- 예약 취소 (booking/[id])
- 시터에게 연락 (booking/[id])
- 리뷰 보기 링크 href="#" (sitters/[id])
- 가용시간 편집 (sitter dashboard)

### 4. 마이페이지 없음
- 부모가 로그인해도 예약 목록 볼 방법 없음
- URL 직접 입력해야만 예약 상세 접근 가능

---

## 🟡 중간 (런칭 전 권장)

### 5. 날짜 포맷 영어 (7곳)
```
app/booking/[id]/page.tsx:65 — toLocaleDateString("en-US")
app/booking/[id]/page.tsx:89 — toLocaleDateString("en-US")
app/book/[sitterId]/page.tsx:41 — toLocaleDateString("en-US")
app/checkout/[bookingId]/page.tsx:53 — toLocaleDateString("en-US")
app/review/[bookingId]/page.tsx:52 — toLocaleDateString("en-US")
app/sitter/page.tsx:74 — toLocaleDateString("en-US")
app/partner/page.tsx:61 — toLocaleDateString("en-US")
```

### 6. "child/children" 영어 하드코딩 (5곳)
```
app/booking/[id]/page.tsx:169 — child{childCount !== 1 ? "ren" : ""}
app/book/[sitterId]/page.tsx:413 — child{childCount !== 1 ? "ren" : ""}
app/checkout/[bookingId]/page.tsx:86 — (추정)
app/sitter/page.tsx:129 — child{...child_count}
app/partner/page.tsx:236 — child{...child_count}
```

### 7. 시터/파트너 대시보드 전체 영어
- sitter/page.tsx: ~31개 영어 문자열, useTranslations 미사용
- partner/page.tsx: ~20개 영어 문자열, useTranslations 미사용
- 탭명, 상태, 버튼, 에러메시지 전부 영어

### 8. 메타데이터 영어 (6곳)
```
app/layout.tsx — "Trusted Babysitters in Seoul"
app/search/page.tsx — "Find a Sitter"
app/login/layout.tsx — "Log In"
app/signup/layout.tsx — "Sign Up"
app/book/[sitterId]/layout.tsx — "Book a Sitter"
app/checkout/[bookingId]/layout.tsx — "Checkout"
```

### 9. 사업계획서 정합성 미완
- 연령 3~8세: UI에만 표시, 서버 검증 없음
- 운영시간 18~23시: 서버 검증 없음
- 24시간 전 예약: 서버 검증 없음
- 보험 문구: 실제 계약 전이면 "적용 예정"으로 수정 필요

### 10. 아이 나이 필터 무기능
- sitter_profiles에 age_min/age_max 컬럼 없음
- 검색 UI에는 3~8세 드롭다운이 있으나 실제 필터링 안 됨

---

## 🟢 경미 (런칭 후 가능)

### 11. hero.mp4 용량
- 53MB로 GitHub 권장 초과
- 페이지 로딩 느림 가능성
- 압축 또는 CDN 이관 필요

### 12. 접근성
- 캐러셀 role="region" / aria-label 미적용
- aria-label "Petit Stay Home", "Select language" 영어 고정

### 13. 인프라
- sitemap.xml 없음
- robots.txt 없음
- 쿠키 동의 배너 없음
- README.md 기본 상태
- 에러 모니터링 (Sentry 등) 없음

### 14. 고급 기능
- Cloudinary 이미지 업로드 파이프라인 미완
- 시터 영상 자기소개 placeholder만
- 이메일 알림 시스템 없음
- 인앱 메시지/채팅 없음

### 15. 운영 문서
- LAUNCH_CHECKLIST_V3.md — 이 파일로 대체
- QA_MATRIX_V3.md — 별도 생성 필요
- DEMO_POLICY_V3.md — 미생성
- CHANGELOG_V3.md — 미생성
