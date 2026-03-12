# Petit Stay V3 — 마스터 개발 문서
> 최종 업데이트: 2026-03-13 04:30 KST
> 이 문서는 모든 Claude Code 세션 시작 시 반드시 읽혀야 합니다.
> 위치: ~/petit-stay-v3/docs/v3/PETIT_STAY_V3_MASTER.md

---

## 0. 핵심 원칙 (절대 변경 불가)

### 제품 정의
- 부모가 시터를 직접 검색·선택·예약·결제하는 **marketplace**
- 호텔/숙소 = referral partner (고용주 아님)
- 시터 = 독립 서비스 제공자 (자율 가격)
- 초기 범위: 서울, 18:00~23:00, 3~8세, in-room, 24시간 전 예약 우선
- 언어: EN+JP 1차, ZH-TW 1.5차, KO 내부/심사

### 디자인 철학 — 지브리 60:30:10 (정식 브랜드 규칙)
- **60%**: warm cream / off-white (#FFFFFF, #F5F0EB, #F7F7F7)
- **30%**: charcoal / deep cocoa (#222222, #717171)
- **10%**: pink-gold accent (#C4956A, #8B7355)
- 적용 범위: hero, trust bar, cards, badges, tabs, CTA, focus ring, hover, OG image, favicon, empty states, illustrations — 전부 이 규칙으로 통일
- 핑크골드는 **포인트**. 배경 전체를 물들이는 색이 아님.
- 심플, 깔끔, 고급스러운 느낌 유지. 싼티 절대 금지.
- 외부 이미지 URL 절대 금지.

### 텍스트/줄바꿈 원칙 (한국어 기준)
- **한국어를 기준 언어로 줄바꿈 설계**
- 핵심 단어 묶음 (베이비시터, 개인정보처리방침 등) whitespace-nowrap
- text-wrap: balance 보조 사용
- card titles, hero headlines, CTA, legal headings 전부 개별 점검
- 한글 clamp 기준으로 min-height 맞추기
- 모든 카피는 자연스러운 현지인 표현 (AI/번역 느낌 금지)

### 로고/파비콘
- 페이지 헤더: "Petit Stay" wordmark만 (현재 유지)
- 파비콘/브라우저탭/카톡미리보기: rounded square + 토끼 실루엣
  - GitHub 로고급 세련됨, 싸구려 금지
  - 크림/차콜/핑크골드 60:30:10

---

## 1. Claude Code 운영 체계 (4층 안전장치)

### 1층: 기억에 의존하지 않는다 — repo 기준 문서 12개

| # | 문서 | 역할 |
|---|------|------|
| 1 | PRODUCT_SPEC_V3.md | 제품 정의 (이미 있음) |
| 2 | TRACEABILITY_MATRIX_V3.md | 사업계획서 100% 반영 추적표 (이미 있음) |
| 3 | DECISIONS_V3.md | 운영 결정 기록 (이미 있음) |
| 4 | ROUTES_AND_IA_V3.md | 라우트/IA (이미 있음) |
| 5 | COPY_GUIDE_V3.md | 카피 원칙 (이미 있음) |
| 6 | UX_PRINCIPLES_V3.md | UX 원칙 (이미 있음) |
| 7 | MEDIA_PLAN_V3.md | 미디어 정책 (이미 있음) |
| 8 | LAUNCH_CHECKLIST_V3.md | 런칭 전 체크리스트 — **신규 필요** |
| 9 | QA_MATRIX_V3.md | 페이지별 QA 항목 — **신규 필요** |
| 10 | DEMO_POLICY_V3.md | 데모 계정 정책 — **신규 필요** |
| 11 | CHANGELOG_V3.md | 변경 이력 — **신규 필요** |
| 12 | KNOWN_GAPS_V3.md | 아직 안 된 것 솔직 기록 — **신규 필요** |
| 13 | PETIT_STAY_V3_MASTER.md | 이 문서 (총괄) |

### 2층: Claude Code를 믿지 않아도 되게 만든다

#### "완료"라는 말 금지
상태는 5개만 사용:
- PLANNED → CODED → BUILT → VERIFIED → HUMAN_APPROVED
- **HUMAN_APPROVED 전에는 절대 완료가 아님**

#### 작업 단위 제한
- 한 세션 = 한 화면 또는 한 작은 플로우
- 수정 파일 3~6개 이내
- giant prompt 금지
- 한 세션에 여러 Phase 금지

#### 강제 검증 프롬프트 (모든 세션 마지막에 필수)
```
변경한 파일을 전부 다시 읽고,
완료 기준을 하나씩 검증해줘.
실제로 적용되지 않은 항목은 정확히 NOT APPLIED라고 써.
부분 적용이면 PARTIAL이라고 써.
추측하지 마.
그리고 데스크톱/모바일 스크린샷 확인 포인트를 적어줘.
```

#### 스크린샷 승인 없이 다음 작업 금지
빌드 성공 ≠ 완료. 반드시:
- 데스크톱 확인
- 모바일 확인
- 한국어 줄바꿈 확인
- 카드 overflow 확인
- 카피 확인
→ **Jaehyeon이 보고 승인한 뒤에만** 다음 티켓으로.

### 3층: Claude Code 자체를 안전하게 쓴다

#### 모드 제한
- 설계/리팩터링/핵심 화면: **Plan mode**
- 작은 수정/버그픽스: **Normal mode**
- --dangerously-skip-permissions: **금지**
- Auto-accept mode: **금지**

#### Hooks (deterministic control)
| Hook | 동작 |
|------|------|
| TaskCompleted | build 안 돌면 막기, lint 안 돌면 막기 |
| Stop | 요약 출력, ntfy 알림, 변경 파일 목록 자동 기록 |
| PreToolUse | main에서 rm -rf, mass move, env 변경 차단 |

### 4층: 사람이 마지막에 잡는다

#### Definition of Done (12개 전부 충족해야 완료)
1. 기능이 실제 동작함
2. pnpm run build 통과
3. TypeScript/lint 문제 없음
4. 데스크톱 화면 정상
5. 모바일 화면 정상
6. 하드코딩 영어 없음
7. 한국어 카피 자연스러움
8. overflow/line-break 깨짐 없음
9. 60:30:10 컬러 규칙 준수
10. 사업계획서 추적표 해당 항목 반영
11. NOT APPLIED/PARTIAL 솔직 표기
12. **Jaehyeon 직접 승인**

---

## 2. 전체 개발 Track (9개, 80+ 항목)

### Track A — Auth & Access
| # | 항목 | 상태 |
|---|------|------|
| A1 | 회원가입 실동작 확인 + 수정 | TODO |
| A2 | 로그인 실동작 확인 + 수정 | TODO |
| A3 | 로그아웃 동작 확인 | TODO |
| A4 | 세션 유지 (새로고침 후) | TODO |
| A5 | Forgot password 실동작 | TODO |
| A6 | Google OAuth 실제 연동 | TODO |
| A7 | Kakao OAuth 실제 연동 | TODO |
| A8 | 데모 마스터 계정 (1개, 모든 role/기능) | TODO |
| A9 | 로그인 페이지 데모 자동입력 (UI 변경 없음) | TODO |
| A10 | Seeded 예약 데이터 (전 상태) | TODO |

### Track B — Copy & Localization
| # | 항목 | 상태 |
|---|------|------|
| B1 | About 페이지 번역 + 사업계획서 반영 | TODO |
| B2 | Help 페이지 번역 + 실제 FAQ | TODO |
| B3 | Privacy 페이지 번역 + 한국 개인정보보호법 | TODO |
| B4 | Terms 페이지 번역 + 제외업무/환불 | TODO |
| B5 | 모든 페이지 하드코딩 영어 제거 | TODO |
| B6 | 히어로 Trust/Care/Quality 번역 | TODO |
| B7 | Skip navigation 번역 | TODO |
| B8 | 한국어 전수 교정 (AI표현 자연스럽게) | TODO |
| B9 | 일본어 카피 교정 | TODO |
| B10 | 중문(ZH-TW) 카피 교정 | TODO |
| B11 | 날짜/시간 로케일 포맷 통일 | TODO |
| B12 | validation 에러 메시지 번역 | TODO |
| B13 | 시터/파트너 대시보드 번역 | TODO |
| B14 | 404/500 에러 페이지 번역 | TODO |
| B15 | 메타 description 다국어 | TODO |

### Track C — Business-plan Fidelity
| # | 항목 | 상태 |
|---|------|------|
| C1 | 연령 범위 3~8세 적용 | TODO |
| C2 | 24시간 전 예약 정책 로직 | TODO |
| C3 | 운영시간 18:00~23:00 강조/제한 | TODO |
| C4 | About: 미션/비전 (사업계획서) | TODO |
| C5 | Terms: 플랫폼 포지션/제외업무/환불 | TODO |
| C6 | Privacy: 아동데이터/부모동의/한국법 | TODO |
| C7 | Help: 실제 FAQ (사업계획서 기반) | TODO |
| C8 | Trust Stack 5층 카피 반영 | TODO |
| C9 | 보수적 공개 문구 원칙 적용 | TODO |
| C10 | TRACEABILITY_MATRIX 전체 업데이트 | TODO |

### Track D — Search & Matching
| # | 항목 | 상태 |
|---|------|------|
| D1 | 검색 필터 실제 동작 | TODO |
| D2 | 검색 필터 UX 개선 (드롭다운/날짜피커) | TODO |
| D3 | 정렬 실동작 | TODO |
| D4 | 검색 빈 상태 처리 | TODO |
| D5 | availability 로직 연동 | TODO |

### Track E — Profiles & Media
| # | 항목 | 상태 |
|---|------|------|
| E1 | 시터 실사 사진 적용 (seed) | TODO |
| E2 | Cloudinary 이미지 파이프라인 | TODO |
| E3 | 이미지 ratio/crop/tone 규격 고정 | TODO |
| E4 | 시터 영상 소개 구조 | TODO |
| E5 | 시터 가용시간 편집 기능 | TODO |

### Track F — Booking & Session
| # | 항목 | 상태 |
|---|------|------|
| F1 | Cancel booking API + 동작 | TODO |
| F2 | Contact sitter 기능 | TODO |
| F3 | 예약 상태 전이 검증 | TODO |
| F4 | 세션 리포트 UX 검증 | TODO |
| F5 | 리뷰 작성 UX 검증 | TODO |
| F6 | 환불/분쟁 카피 | TODO |

### Track G — Design Polish
| # | 항목 | 상태 |
|---|------|------|
| G1 | 전체 60:30:10 톤 점검/통일 | TODO |
| G2 | 카드 그리드 통일 (랜딩+검색) | TODO |
| G3 | 카드 내부 규격 잠금 | TODO |
| G4 | 텍스트 줄바꿈 전페이지 QA | TODO |
| G5 | Trust/Care/Quality → 신뢰바 통합 | TODO |
| G6 | 히어로에 가족 이미지 교체 | TODO |
| G7 | 파비콘 토끼 아이콘 | TODO |
| G8 | OG 이미지 (카톡 미리보기) | TODO |
| G9 | 고급 애니메이션 | TODO |
| G10 | micro-animation | TODO |
| G11 | 정보 페이지 editorial 디자인 | TODO |
| G12 | empty/loading/error states | TODO |

### Track H — Mobile QA
| # | 항목 | 상태 |
|---|------|------|
| H1 | 모바일 카드 그리드 최적화 | TODO |
| H2 | 모바일 필터 바 개선 | TODO |
| H3 | sticky CTA 충돌 | TODO |
| H4 | 터치 타깃 48px | TODO |
| H5 | bottom safe area | TODO |
| H6 | 모바일 폰트 리듬 | TODO |
| H7 | 정보 페이지 모바일 가독성 | TODO |
| H8 | 실기기 테스트 | TODO |

### Track I — Launch Ops
| # | 항목 | 상태 |
|---|------|------|
| I1 | 이메일 알림 | TODO |
| I2 | 쿠키 동의 배너 | TODO |
| I3 | sitemap.xml | TODO |
| I4 | robots.txt | TODO |
| I5 | 파트너 QR 코드 실제 생성 | TODO |
| I6 | analytics event tracking | TODO |
| I7 | 에러 모니터링 | TODO |
| I8 | auth/payment 실패 로그 | TODO |
| I9 | Vercel 환경변수 최종 | TODO |
| I10 | 커스텀 도메인 | TODO |
| I11 | Supabase URL 최종 | TODO |
| I12 | 하드코딩 영어 최종 grep | TODO |
| I13 | 전체 플로우 통합 테스트 | TODO |
| I14 | 크로스브라우저 | TODO |
| I15 | 성능 최적화 | TODO |
| I16 | 접근성 최종 | TODO |
| I17 | staging/prod 동일성 | TODO |

---

## 3. 데모 마스터 계정

- **계정 1개** (모든 role, 모든 기능 접근)
- Email: demo@petitstay.com
- Password: PetitStay2026!
- 로그인 페이지: UI 변경 없음, email/password 초기값만 설정
- Seeded 데이터: pending/confirmed/in_progress/completed/리뷰가능 예약 전부

---

## 4. 사업계획서 추적표

| 요구사항 | 코드 | 카피 | Track |
|---------|------|------|-------|
| 서울, 18:00~23:00 | 부분 | 부분 | C3 |
| 3~8세 중심 | ❌ | 부분 | C1 |
| 24시간 전 예약 우선 | ❌ | 문구만 | C2 |
| 시터 = 독립 서비스 제공자 | ✅ | ✅ | — |
| 호텔 = referral partner | ✅ | 부분 | C5 |
| Trust Stack 5층 | 부분 | 부분 | C8 |
| 동영상 소개 | placeholder | ❌ | E4 |
| Verified Review | ✅ | ✅ | — |
| 안전결제 | ✅ Stripe | 부분 | — |
| 세션 리포트 | ✅ | ✅ | — |
| 제외업무 | 예약 동의 | Terms | C5 |
| EN+JP 우선 | ✅ | 부분 | B |
| 시터 자율 가격 | ✅ | ✅ | — |
| partner QR/링크 | 부분 | 부분 | I5 |
| 보수적 공개 원칙 | ❌ | ❌ | C9 |

---

## 5. 기술 스택 (확정)

- Next.js 16 App Router + TypeScript strict
- Tailwind CSS v4
- Supabase (Auth + DB + RLS)
- Stripe (결제, 테스트 모드)
- next-intl (다국어, cookie 기반)
- Vercel (배포)
- Motion (애니메이션)
- Zod (validation)

---

## 6. 배포 정보

- **Live**: https://petit-stay-v3.vercel.app/
- **GitHub**: https://github.com/jaehyun424/petit-stay-v3
- **Supabase**: https://untsouokyfzdvmplnoih.supabase.co
- **ntfy**: curl -s -d "메시지" ntfy.sh/petit-stay-jh-2026
- **Git**: user.email = jaehyun424@users.noreply.github.com

---

## 7. Sprint 실행 순서

1. **Sprint 1**: Auth + Demo (A1~A10) — 로그인 되면 전체 테스트 가능
2. **Sprint 2**: 카드 그리드 + 줄바꿈 + 히어로 (G2~G8)
3. **Sprint 3**: 번역/카피 완성 (B1~B15)
4. **Sprint 4**: 사업계획서 정합성 (C1~C10)
5. **Sprint 5**: 기능 완성 (D1~D5, E1~E5, F1~F6)
6. **Sprint 6**: 디자인 폴리싱 (G1, G9~G12)
7. **Sprint 7**: 모바일 QA (H1~H8)
8. **Sprint 8**: 런칭 준비 (I1~I17)
9. **Sprint 9**: OAuth (A6, A7)

---

> **이 문서가 모든 개발의 기준점이다.**
> 까먹으면 이 문서로 돌아온다.
> 항목 추가되면 이 문서를 업데이트한다.
> 총 항목: 80+ (Track A~I)
