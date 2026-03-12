# Petit Stay — Routes & Information Architecture V3

> 기준일: 2026-03-12
> 모든 경로는 `/{locale}/...` 형식 (locale: en, ja, zh-tw, zh-cn, ko)

---

## 영역 구분

| 영역 | 접근 권한 | 설명 |
|---|---|---|
| **public** | 비로그인 포함 모든 사용자 | 랜딩, 검색, 시터 프로필, 예약·결제 진입, 정보 페이지 |
| **auth** | 비로그인 사용자 | 회원가입, 로그인, 비밀번호 찾기 |
| **parent** | 로그인된 부모 | 리뷰, 세션 관리, 아동 프로필, 설정 |
| **sitter** | 로그인된 시터 | 프로필 관리, 예약 수락/거절, 정산 |
| **partner** | 로그인된 파트너 (호텔/숙소) | 예약 현황, QR 발급, 리포트 열람 |
| **info** | 비로그인 포함 | 이용약관, 개인정보처리방침, FAQ, 회사소개 |
| **admin** | 운영자 | 시터 검증, 배정 관제, 분쟁 대응, 정산, 통계 |

---

## Public 영역

| 경로 | 목적 |
|---|---|
| `/{locale}` | 메인 랜딩. 서비스 소개, 검색 진입점, Trust Stack 요약 |
| `/{locale}/search` | 시터 검색 결과. 날짜·시간·아이나이·위치·언어 필터 |
| `/{locale}/sitters/{sitterId}` | 시터 공개 프로필. 사진, 영상, 자격, 리뷰, 시급, 배지 |
| `/{locale}/how-it-works` | 서비스 이용 흐름 안내 (부모 관점) |
| `/{locale}/become-a-sitter` | 시터 모집 랜딩. 혜택, 조건, 등록 CTA |
| `/{locale}/partners` | 파트너 안내 랜딩. 호텔·숙소 제휴 설명, 문의 CTA |
| `/{locale}/trust-and-safety` | Trust Stack 상세 설명. 검증 절차, 보험, 안전 정책 |
| `/{locale}/pricing` | 요금 안내. 수수료 구조, 시터 가격 범위 참고 |
| `/{locale}/book/{sitterId}` | 예약 생성. 시터 선택 후 아동 정보·일정 입력. 비로그인 접근 가능 (제출 시 로그인/회원가입 유도) |
| `/{locale}/checkout/{bookingId}` | 결제 진행. 해외카드/간편결제. 비로그인 접근 가능 (결제 시 로그인 요구) |
| `/{locale}/booking/{id}` | 예약 확인. 예약 상태·시터 정보·세션 리포트 열람. 비로그인 접근 가능 (본인 확인은 토큰/링크 기반) |

---

## Auth 영역

| 경로 | 목적 |
|---|---|
| `/{locale}/login` | 로그인 (이메일/소셜) |
| `/{locale}/signup` | 회원가입. 부모/시터 역할 선택 |
| `/{locale}/signup/parent` | 부모 회원가입 상세 |
| `/{locale}/signup/sitter` | 시터 회원가입 상세 |
| `/{locale}/forgot-password` | 비밀번호 재설정 |

---

## Parent 영역

| 경로 | 목적 |
|---|---|
| `/{locale}/parent/dashboard` | 부모 홈. 예약 현황, 알림, 빠른 검색 |
| `/{locale}/parent/bookings` | 예약 목록 (예정/진행중/완료/취소) |
| `/{locale}/parent/review/{bookingId}` | 리뷰 작성. 완료된 세션에 대한 평가. 로그인 필수 |
| `/{locale}/parent/children` | 아동 프로필 관리. 알레르기, 루틴, 선호 활동 |
| `/{locale}/parent/settings` | 부모 계정 설정. 연락처, 결제수단, 알림 |
| `/{locale}/parent/support` | 고객지원 문의. 분쟁 신고 |

---

## Sitter 영역

| 경로 | 목적 |
|---|---|
| `/{locale}/sitter/dashboard` | 시터 홈. 예약 요청, 일정, 수익 요약 |
| `/{locale}/sitter/profile` | 프로필 편집. 사진, 영상, 자격, 언어, 가용시간, 가격 |
| `/{locale}/sitter/bookings` | 예약 목록. 요청/확정/진행중/완료 |
| `/{locale}/sitter/bookings/{bookingId}` | 예약 상세. 아동 정보, 숙소 위치, 체크인/리포트 |
| `/{locale}/sitter/bookings/{bookingId}/report` | 세션 리포트 작성. 활동 내역, 건강 상태, 특이사항 |
| `/{locale}/sitter/earnings` | 정산 내역. 수익, 수수료, 지급 이력 |
| `/{locale}/sitter/verification` | 검증 상태. 신원확인, 자격 제출, 배지 현황 |
| `/{locale}/sitter/settings` | 시터 계정 설정. 연락처, 정산계좌, 알림 |

---

## Partner 영역

| 경로 | 목적 |
|---|---|
| `/{locale}/partner/dashboard` | 파트너 홈. 예약 현황 요약, 최근 세션 |
| `/{locale}/partner/bookings` | 파트너 경유 예약 목록 |
| `/{locale}/partner/qr` | QR코드 발급. 투숙객 안내용 |
| `/{locale}/partner/reports` | 종료 리포트 열람. 세션 요약 |
| `/{locale}/partner/settings` | 파트너 계정 설정. 숙소 정보, 담당자 |

---

## Info 영역

| 경로 | 목적 |
|---|---|
| `/{locale}/terms` | 이용약관 |
| `/{locale}/privacy` | 개인정보처리방침 (PIPA, 다국어) |
| `/{locale}/cookie-policy` | 쿠키 정책 |
| `/{locale}/faq` | 자주 묻는 질문 (부모/시터/파트너 탭) |
| `/{locale}/about` | 회사 소개, 미션, 팀 |
| `/{locale}/contact` | 문의하기 |
| `/{locale}/safety-policy` | 안전 정책. 제외업무, 사고 대응, 보험 안내 |
| `/{locale}/cancellation-policy` | 취소/환불 정책 |
| `/{locale}/sitter-guidelines` | 시터 가이드라인. 서비스 범위, 금지업무, SOP |
| `/{locale}/blog` | 블로그/콘텐츠 (SEO) |
| `/{locale}/blog/{slug}` | 블로그 포스트 상세 |

---

## Admin 영역

| 경로 | 목적 |
|---|---|
| `/admin` | 관리자 대시보드. 핵심 지표, 알림 |
| `/admin/sitters` | 시터 관리. 검증 대기, 활동 시터, 정지 |
| `/admin/sitters/{sitterId}` | 시터 상세. 검증 항목, 이력, 메모 |
| `/admin/bookings` | 예약 관제. 전체 예약 현황, 이슈 |
| `/admin/bookings/{bookingId}` | 예약 상세. 분쟁 대응, 상태 변경 |
| `/admin/partners` | 파트너 관리. 제휴 숙소 목록 |
| `/admin/disputes` | 분쟁/이슈 관리. 이의제기, 환불 심사 |
| `/admin/settlements` | 정산 관리. 시터 지급, PG 정산 |
| `/admin/reports` | 운영 리포트. SLA, KPI, 통계 |
| `/admin/settings` | 시스템 설정. 수수료율, 언어, 공지 |

---

## 참고: 페이지 수 요약

| 영역 | 페이지 수 |
|---|---|
| Public | 11 |
| Auth | 5 |
| Parent | 6 |
| Sitter | 8 |
| Partner | 5 |
| Info | 11 |
| Admin | 10 |
| **합계** | **56** |
