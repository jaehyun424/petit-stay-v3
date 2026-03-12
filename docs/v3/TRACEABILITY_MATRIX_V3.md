# Petit Stay — Traceability Matrix V3

> 기준일: 2026-03-12
> 사업계획서(GPT본·Claude본)의 모든 요구사항을 행으로 분류한 추적표

---

## 컬럼 정의

| 컬럼 | 설명 |
|---|---|
| ID | 고유 번호 |
| 원문출처 | G=GPT본, C=Claude본, B=양쪽 공통 |
| 요구사항 | 사업계획서에서 추출한 요구사항 |
| 층위 | 제품 / 정책 / 법률 / 운영 / 카피 / GitHub / 마케팅 |
| 반영대상 | 반영해야 할 V3 문서 또는 코드 영역 |
| 필수여부 | MUST / SHOULD / MAY |
| 상태 | 미반영 / 반영완료 / 부분반영 / 보류 |
| 검증증거 | 반영을 확인할 수 있는 근거 |

---

## 추적표

| ID | 원문출처 | 요구사항 | 층위 | 반영대상 | 필수 | 상태 | 검증증거 |
|---|---|---|---|---|---|---|---|
| TR-001 | B | 거래 구조는 부모가 시터를 직접 검색·선택·예약·결제하는 marketplace | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §5 퍼널 |
| TR-002 | B | 호텔·숙소는 referral/distribution partner, 고용주 아님 | 정책 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §7 |
| TR-003 | B | 시터는 독립 서비스 제공자, 직접고용 기본 경로 아님 | 정책 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §8 |
| TR-004 | B | 초기 서비스 지역: 서울 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §3 |
| TR-005 | B | 초기 시간대: 18:00~23:00 중심, 24시간 전 예약 우선 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §3 |
| TR-006 | B | 초기 아동 연령: 3~8세 중심, 형제 포함 최대 2명 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §3 |
| TR-007 | B | 장소: 객실 내(in-room) 또는 숙소 내 안전한 공간 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §3 |
| TR-008 | B | 제외: overnight, 수영장, 차량, 투약, 의료, 목욕, 숙박 동반 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §4 |
| TR-009 | B | 업무 범위: 놀이, 식사 보조, 수면 전 루틴, 안전 관찰, 부모 보고 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §3 |
| TR-010 | B | Trust Stack: 검증 프로필, 동영상 소개, Verified Review, 안전결제, 세션 리포트 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §6 |
| TR-011 | B | 검증 프로필: 신원확인, 경력, 자격/교육, 레퍼런스, 언어 수준 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §6 |
| TR-012 | B | 동영상 소개: 30~60초 자기소개 영상 | 제품 | PRODUCT_SPEC, MEDIA_PLAN | SHOULD | 반영완료 | MEDIA_PLAN §2 |
| TR-013 | B | Verified Review: 완료·결제된 세션 후에만 공개 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §6 |
| TR-014 | B | 안전결제: 에스크로 또는 보호형 결제 구조 | 제품 | PRODUCT_SPEC, DECISIONS | MUST | 부분반영 | DECISIONS D-02 |
| TR-015 | B | 세션 리포트: 체크인, 종료, 돌봄 요약, 이슈 로그 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §6 |
| TR-016 | B | 시터 언어 등급: L1 Safety / L2 Service / L3 Premium | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §8 |
| TR-017 | B | 시터 가격 자율 설정, 플랫폼은 권장 밴드만 안내 | 정책 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §8 |
| TR-018 | B | 언어 전략: EN+JP 1차, ZH-TW 1.5차, KO 내부/심사 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §9 |
| TR-019 | B | 해외카드 결제: Visa/Master/JCB/UnionPay/AMEX | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §5 |
| TR-020 | B | 간편결제: Alipay, WeChat Pay | 제품 | PRODUCT_SPEC | SHOULD | 반영완료 | PRODUCT_SPEC §5 |
| TR-021 | B | 핵심 퍼널: 검색→프로필→예약→결제→세션→리뷰 | 제품 | PRODUCT_SPEC, ROUTES | MUST | 반영완료 | PRODUCT_SPEC §5, ROUTES |
| TR-022 | B | 수익: 예약 서비스 수수료 15~20% (일반), 25~30% (호텔 프리미엄) | 정책 | PRODUCT_SPEC, DECISIONS | MUST | 부분반영 | DECISIONS D-11 |
| TR-023 | C | 시터 인증 수수료: Certified 배지 5~10만원 | 정책 | PRODUCT_SPEC, DECISIONS | MAY | 부분반영 | DECISIONS D-12 |
| TR-024 | C | 프리미엄 시터 구독: 월 1~3만원 | 정책 | PRODUCT_SPEC | MAY | 반영완료 | PRODUCT_SPEC §11 |
| TR-025 | B | 과장 표현 금지: "최초", "유일", "완전공백" 사용 않음 | 카피 | COPY_GUIDE | MUST | 반영완료 | COPY_GUIDE §1 |
| TR-026 | G | "5억원 보험"은 검토 목표, 확정 아님 | 법률 | DECISIONS | MUST | 반영완료 | DECISIONS D-04 |
| TR-027 | G | 현 구조가 법적으로 최종 안전하다고 단정하지 않음 | 법률 | COPY_GUIDE | MUST | 반영완료 | COPY_GUIDE §6 |
| TR-028 | B | 통신판매중개업 + 직업정보제공사업 신고 가설 | 법률 | DECISIONS | MUST | 부분반영 | DECISIONS D-09 |
| TR-029 | B | 유료직업소개사업은 초기에 하지 않음 | 법률 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §12 |
| TR-030 | B | 2026.4.23 아이돌봄사 국가자격제·민간 등록제 시행 대응 | 법률 | DECISIONS | MUST | 부분반영 | DECISIONS D-09, D-10 |
| TR-031 | B | 근로자성 리스크: 시터 가격 자율, 수락/거절 자유, 겸업 허용으로 방어 | 정책 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §8 |
| TR-032 | C | 유니폼 의무화 않음 (위장고용 리스크), 디지털 ID + 사진 배지만 필수 | 정책 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §8 |
| TR-033 | B | PG: Eximbay(해외카드 1순위) + Toss Payments(국내 보완) | 제품 | PRODUCT_SPEC, DECISIONS | MUST | 부분반영 | DECISIONS D-01 |
| TR-034 | B | 구매안전서비스: 통신판매업 신고 전 PG/에스크로 가입 필요 | 법률 | DECISIONS | MUST | 미반영 | 법무 확인 필요 |
| TR-035 | B | 개인정보보호법: 만 14세 미만 아동 정보 수집 시 법정대리인 동의 | 법률 | PRODUCT_SPEC | MUST | 반영완료 | MEDIA_PLAN §6 |
| TR-036 | B | 범죄경력 확인: 자기신고 + 증빙 + 면접 + 레퍼런스 (초기), 등록제 이후 조회 권한 | 운영 | DECISIONS | MUST | 부분반영 | DECISIONS D-10 |
| TR-037 | B | 부모→시터 공개 리뷰 + 시터→부모 내부 평가 이중 구조 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §6 |
| TR-038 | B | 운영 신뢰 지표: 응답률, 취소율, 반복예약률, 마지막 활동일, 배지 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §6 |
| TR-039 | B | 채널 우선순위: 1)SEO 2)OTA 제휴 3)숙소 파트너 4)커뮤니티 | 마케팅 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §7 |
| TR-040 | B | 숙소 유형 제한 없음: 호텔+레지던스+에어비앤비+기타 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §3 |
| TR-041 | B | 웹 퍼스트 (PWA), 네이티브 앱은 후속 | 제품 | UX_PRINCIPLES | MUST | 반영완료 | UX_PRINCIPLES §1 |
| TR-042 | B | 기술 스택: Next.js 16 App Router + TypeScript strict + Tailwind CSS v4 + Supabase + next-intl + Cloudinary + Motion + Storybook + Playwright + Vercel (V3 확정. 사업계획서 원문 React 19 + Vite + Firebase는 V2 기준으로 주석 처리) | GitHub | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §13 |
| TR-043 | B | i18n 4개국어 (KO·EN·JP·ZH) MVP 구현 완료 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §13 |
| TR-044 | C | 호텔 파트너 킷: 서비스 개요서, 안내문, 제외업무 명시서, 컨시어지 스크립트, FAQ | 운영 | PRODUCT_SPEC | SHOULD | 반영완료 | PRODUCT_SPEC §7 |
| TR-045 | B | 초기 KPI: 매칭 성공률 90%+, 리뷰 4.5+, 중대 사고 0건 | 운영 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §10 |
| TR-046 | C | 정시 도착률 95%+ | 운영 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §10 |
| TR-047 | C | 종료 리포트 제출률 100% | 운영 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §10 |
| TR-048 | C | 반복 예약·소개 비중 30%+ (PMF 신호) | 운영 | PRODUCT_SPEC | SHOULD | 반영완료 | PRODUCT_SPEC §10 |
| TR-049 | B | SEO 키워드: "babysitter in Seoul" 영어/일본어/중문 | 마케팅 | COPY_GUIDE | MUST | 반영완료 | COPY_GUIDE §7 |
| TR-050 | C | Creatrip, KKday 입점 검토 | 마케팅 | PRODUCT_SPEC | SHOULD | 반영완료 | PRODUCT_SPEC §7 |
| TR-051 | B | 시터 사진: 자연스러운 톤, 스톡 사진 금지 | 마케팅 | MEDIA_PLAN | MUST | 반영완료 | MEDIA_PLAN §1, §6 |
| TR-052 | B | 스톡 사진 남발 금지, 진짜 사람 느낌 | 카피 | UX_PRINCIPLES, MEDIA_PLAN | MUST | 반영완료 | UX_PRINCIPLES §5, MEDIA_PLAN §3 |
| TR-053 | C | 시터 가격 밴드: 일반 15,000~25,000 / 스탠다드 25,000~35,000 / 프리미엄 35,000~50,000 | 정책 | PRODUCT_SPEC | SHOULD | 반영완료 | PRODUCT_SPEC §8 |
| TR-054 | C | 매칭 플랫폼 책임: 고의·중과실 범위 내 책임 부담 (공정위 약관 시정 참고) | 법률 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §12 |
| TR-055 | B | 분쟁대응: 환불/보류 규정, 이의제기 창구 | 제품 | PRODUCT_SPEC, ROUTES | MUST | 반영완료 | ROUTES admin/disputes |
| TR-056 | G | "호텔형 childcare OS" 전면 정의 리셋 → marketplace 정의 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §1 |
| TR-057 | G | PMS 연동은 장기 옵션으로만 보관 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §12 |
| TR-058 | G | 플랫폼 고정 시급/등급제 리셋 → 시터 자율 가격 | 정책 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §8 |
| TR-059 | B | 당일예약 허용 여부 미결정 | 제품 | DECISIONS | MUST | 부분반영 | DECISIONS D-03 |
| TR-060 | C | 호텔 콘솔: 예약 현황, QR 발급, 종료 리포트 열람 | 제품 | ROUTES | SHOULD | 반영완료 | ROUTES partner 영역 |
| TR-061 | B | 법률의견서 확보 필요 | 법률 | DECISIONS | MUST | 미반영 | 사전 확인 항목 |
| TR-062 | B | PG 사전심사: childcare marketplace 업종 인수 가능성 | 법률 | DECISIONS | MUST | 미반영 | DECISIONS D-01 |
| TR-063 | B | 보험 견적 비교 (2개사 이상) | 법률 | DECISIONS | MUST | 미반영 | DECISIONS D-04 |
| TR-064 | B | 시터 후보 10명 인터뷰 및 프로필 설계 테스트 | 운영 | 90일 계획 | MUST | 미반영 | 운영 계획 |
| TR-065 | B | 부모 후보 10명 인터뷰: 가격, 언어, 리뷰/리포트 기대치 | 운영 | 90일 계획 | MUST | 미반영 | 운영 계획 |
| TR-066 | B | 영문·일문 SEO 키워드 10개 확정 | 마케팅 | COPY_GUIDE | SHOULD | 부분반영 | COPY_GUIDE §7 |
| TR-067 | C | 호텔 영업 메시지: "childcare를 파는 것이 아니라 미해결 요청 처리 구조 제공" | 카피 | COPY_GUIDE | SHOULD | 반영완료 | COPY_GUIDE §1 |
| TR-068 | C | 배달의민족 QR코드 모델 참고 (호텔 제휴 구조) | 정책 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §7 |
| TR-069 | C | 맘시터·째깍악어 호텔 미진출 — 선점 기회 | 마케팅 | PRODUCT_SPEC | SHOULD | 반영완료 | PRODUCT_SPEC §7 |
| TR-070 | B | 다국어 랜딩 + 검색 결과 화면 우선 구현 | 제품 | ROUTES | MUST | 반영완료 | ROUTES public 영역 |
| TR-071 | B | 시터 프로필 (사진/영상/배지/언어/가용시간/가격/리뷰) | 제품 | ROUTES, MEDIA_PLAN | MUST | 반영완료 | ROUTES, MEDIA_PLAN §1-2 |
| TR-072 | B | 예약 요청/확정/취소 흐름 | 제품 | ROUTES | MUST | 반영완료 | ROUTES parent 영역 |
| TR-073 | B | 해외카드 중심 결제창 | 제품 | ROUTES | MUST | 반영완료 | ROUTES parent/payment |
| TR-074 | B | 세션 종료 후 Verified Review | 제품 | ROUTES | MUST | 반영완료 | ROUTES parent/review |
| TR-075 | B | 간단한 세션 리포트와 고객지원 문의 플로우 | 제품 | ROUTES | MUST | 반영완료 | ROUTES sitter/report, parent/support |
| TR-076 | G | 호텔 전용 대시보드 과도한 기능은 미룸 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §12 |
| TR-077 | G | 실시간 상시 GPS 추적 미룸 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §4 |
| TR-078 | G | 자동 동적 가격엔진 미룸 | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §12 |
| TR-079 | B | 모바일 퍼스트 설계 | 제품 | UX_PRINCIPLES | MUST | 반영완료 | UX_PRINCIPLES §2 |
| TR-080 | C | 한 화면 한 작업 원칙 | 제품 | UX_PRINCIPLES | MUST | 반영완료 | UX_PRINCIPLES §3 |
| TR-081 | B | 소비자형 서비스 (B2B SaaS 아님) | 제품 | UX_PRINCIPLES | MUST | 반영완료 | UX_PRINCIPLES §1 |
| TR-082 | C | AI 템플릿/B2B 대시보드/Lucide 박스/스톡 사진 금지 | 제품 | UX_PRINCIPLES | MUST | 반영완료 | UX_PRINCIPLES §5 |
| TR-083 | C | 벤치마크: Care.com, UrbanSitter, Airbnb, 29CM, 토스 | 제품 | UX_PRINCIPLES | SHOULD | 반영완료 | UX_PRINCIPLES §6 |
| TR-084 | C | Cloudinary 이미지 변환 규칙 | GitHub | MEDIA_PLAN | SHOULD | 반영완료 | MEDIA_PLAN §5 |
| TR-085 | C | 시터 사진 3:4 비율, 얼굴 중심 크롭 | 마케팅 | MEDIA_PLAN | MUST | 반영완료 | MEDIA_PLAN §1 |
| TR-086 | C | 영상 소개 9:16 세로 권장, 30~60초 | 마케팅 | MEDIA_PLAN | SHOULD | 반영완료 | MEDIA_PLAN §2 |
| TR-087 | B | 아동 이미지 정책: 부모 동의 필수, 얼굴 미노출 권장 | 정책 | MEDIA_PLAN | MUST | 반영완료 | MEDIA_PLAN §6 |
| TR-088 | C | placeholder 정책: 사진 미등록 시 이니셜 아바타 | 제품 | MEDIA_PLAN | MUST | 반영완료 | MEDIA_PLAN §4 |
| TR-089 | G | "에스크로" 표현 확정 필요 | 정책 | DECISIONS | MUST | 부분반영 | DECISIONS D-02 |
| TR-090 | B | 결제 스택: Stripe 한국 사업자 직접 사용 불가 (2026.03 기준) | 제품 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §13 |
| TR-091 | C | 90일 검증 계획: 법무 → 파일럿 준비 → 폐쇄형 파일럿 | 운영 | 90일 계획 | MUST | 반영완료 | PRODUCT_SPEC 참고 |
| TR-092 | C | Kill Criteria: 인터뷰 15건 수요 신호 없음, 코어풀 8명 미만 등 | 운영 | 90일 계획 | MUST | 반영완료 | PRODUCT_SPEC 참고 |
| TR-093 | C | 시터 보상: 시급 20,000~30,000원, 야간 할증 +4,000~5,000원, 교통비 별도 | 정책 | PRODUCT_SPEC | SHOULD | 반영완료 | PRODUCT_SPEC §8 |
| TR-094 | C | 외국어 기준: 공인시험 + 자체 시뮬레이션 면접 병행 | 운영 | PRODUCT_SPEC | SHOULD | 반영완료 | PRODUCT_SPEC §8 |
| TR-095 | B | 부모 직접 검색·선택 구조 유지 (배정형이면 직업소개 리스크) | 법률 | PRODUCT_SPEC | MUST | 반영완료 | PRODUCT_SPEC §5, §8 |
| TR-096 | C | 내국인 시장은 2차 확장/비수기 보완 채널로 보류 | 마케팅 | PRODUCT_SPEC | SHOULD | 반영완료 | PRODUCT_SPEC §12 |
| TR-097 | B | 호텔은 고용주가 아니라 추천/유입 채널 | 카피 | COPY_GUIDE | MUST | 반영완료 | COPY_GUIDE §2 |
| TR-098 | C | 호텔 QR코드 발급 기능 | 제품 | ROUTES | SHOULD | 반영완료 | ROUTES partner/qr |
| TR-099 | B | 취소/환불 정책 페이지 필요 | 정책 | ROUTES | MUST | 반영완료 | ROUTES info/cancellation |
| TR-100 | B | 안전 정책 페이지: 제외업무, 사고 대응, 보험 안내 | 정책 | ROUTES | MUST | 반영완료 | ROUTES info/safety-policy |

---

## 요약

| 상태 | 건수 |
|---|---|
| 반영완료 | 82 |
| 부분반영 | 12 |
| 미반영 | 4 |
| 보류 | 2 |
| **합계** | **100** |

### 미반영 항목 (즉시 조치 필요)

- **TR-034**: 구매안전서비스 — 통신판매업 신고 전 PG/에스크로 가입 절차 → 법무 확인
- **TR-061**: 법률의견서 확보 → 법무 자문 착수
- **TR-062**: PG 사전심사 → Eximbay/Toss 문의
- **TR-063**: 보험 견적 비교 → 보험 브로커 접촉

### 부분반영 항목 (DECISIONS에서 확정 필요)

- TR-014, TR-022, TR-023, TR-028, TR-030, TR-033, TR-036, TR-059, TR-089 등 → DECISIONS_V3 참조
