export const projects = [
  {
    id: 'cwww',
    name: 'CWWW',
    subtitle: 'SNS 플랫폼',
    period: '2026.06 – 2026.07',
    role: '결제·인증 백엔드 담당 (Toss PG 연동)',
    summary:
      'PG 장애/중복/재시도 상황에서도 결제 상태가 일관되게 수렴하는 파이프라인 구축',
    tags: ['Java', 'Spring Boot', 'JPA', 'Spring Security', 'MySQL', 'Redis'],
    github: 'https://github.com/CWWW-project/CWWW',
    sections: [
      {
        title: '배경 / 문제',
        items: [
          'PG 타임아웃·장애로 결제 결과가 미확정인 상태에서 중복 실행·부분 실패가 발생하면 결제/정산 데이터 정합성이 깨질 위험',
        ],
      },
      {
        title: '핵심 기여',
        items: [
          "결제 흐름을 '요청 → 확정(중간 상태) → 완료/취소' 3단계 상태 모델로 재설계",
          'CONFIRMING/CANCELING 중간 상태 도입으로 재시도·중복 실행에서도 상태 전이가 단방향으로 수렴하도록 설계',
          'PG API 호출을 트랜잭션 밖으로 분리해 장시간 락/롤백 리스크 제거',
          '미확정 결제를 주기적으로 점검·재처리하는 보정 스케줄러 구현',
          'FOR UPDATE SKIP LOCKED + 소프트 락으로 다중 인스턴스 중복 처리 방지',
          '지수 백오프 재시도로 외부 장애 구간에서도 복구 가능하도록 구성',
        ],
      },
      {
        title: '검증 / 결과',
        items: [
          '타임아웃/중복 요청/재시도 시나리오 통합 테스트 866줄로 정합성 검증',
          'PG 4xx(명시 거절)와 5xx(불확실)를 분리 처리해 재시도 안전성 확보',
          '장애 상황에서도 결제 상태가 일관되게 수렴하는 처리 흐름 구축',
        ],
      },
    ],
  },
  {
    id: 'noomit',
    name: 'Noomit',
    subtitle: '통합 A/S 접수·처리 플랫폼',
    period: '2026.08',
    role: 'Repair 도메인 구현 및 성능·운영 안정성 검증',
    summary:
      '부하 테스트에서 BCrypt 반복 로그인 비용이 조회 병목을 가리는 문제를 분리해 제거하고, 조회 성능 p95 525ms → 51ms 안정화 (약 10배)',
    tags: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL', 'Docker', 'k6'],
    github: 'https://github.com/s-y-i-c/noomit',
    sections: [
      {
        title: '배경 / 목표',
        items: [
          '핵심 읽기 경로(기사 내 수리 목록/상세, 어드민 전체 조회)의 병목 지점을 k6로 재현하고 원인을 분리해 개선 포인트를 도출',
        ],
      },
      {
        title: '부하 테스트 설계 및 원인 분석',
        items: [
          '대상: GET /api/repair-cases/my, GET /api/repair-cases/{id}, GET /api/repair-cases',
          '1차 (로그인 포함, 5 VU): CPU 100% 순간 포화, 목록 max 14s → 반복 BCrypt 비용이 조회 병목을 가리는 노이즈로 판단',
          '2차 (세션 재사용, 5 VU): 목록 p95 51ms, 상세 p95 68ms → 조회 쿼리 자체 병목 아님을 검증',
          '3차 (세션 재사용, 20 VU): HikariCP active 10/10, idle 0, pending 1 → 병목을 DB 커넥션 풀로 특정',
        ],
      },
      {
        title: '결과 / 트레이드오프',
        items: [
          '목록 p95 525ms → 51ms (BCrypt 격리 후, 약 10배) / 처리량 ~28 req/s, 실패율 0%',
          '어드민 전체 조회: 20 VU p95 200ms, 실패율 0% 유지',
          'maximum-pool-size 증가로 포화 지점 완화 가능하나 1GB 서버 메모리 비용을 고려해야 하는 트레이드오프 도출',
        ],
      },
    ],
  },
  {
    id: 'prodio',
    name: 'Prodio',
    subtitle: '수주 관리 SaaS',
    period: '2026.08',
    role: '기획·개발·배포 단독 / 인증·인가 및 인프라 전반',
    summary:
      '권한 변경이 즉시 세션에 반영되는 보안 체계와 Oracle Cloud 기반 운영 환경을 단독으로 구축',
    tags: ['Java', 'Spring Boot', 'JPA', 'Spring Security', 'PostgreSQL', 'Docker', 'Oracle Cloud'],
    github: null,
    sections: [
      {
        title: '배경 / 문제',
        items: [
          '관리자가 권한 변경 후 기존 세션이 유지되면 이전 권한으로 계속 접근 가능한 보안 공백 발생',
        ],
      },
      {
        title: '핵심 기여',
        items: [
          'SessionRegistry로 권한 변경 대상 사용자의 세션 즉시 무효화, 포트-어댑터 패턴으로 Spring Security 의존 격리',
          '역할별 인가(PENDING·CLIENT·ADMIN) + CSRF 보호 구축',
          'QA 6개 그룹 총 23단계 시나리오 커버: 로그인 성공/실패, 역할별 403, 타 사용자 리소스 차단, 권한 변경 반영, 로그아웃 세션 무효화',
          'Nginx HTTPS 구성, Docker 컨테이너화, Oracle Cloud 배포',
          'JVM MaxRAMPercentage 조정으로 컨테이너 환경 Metaspace OOM 완화',
        ],
      },
      {
        title: '결과',
        items: [
          "'정책은 바뀌었는데 세션은 그대로'인 보안 공백을 제거하고 인증·인가 취약점 6개 시나리오 검증으로 재발 방지",
          '배포까지 포함한 운영 가능한 서비스 형태로 완성',
        ],
      },
    ],
  },
  {
    id: 'expopass',
    name: 'Expopass',
    subtitle: '박람회 예약 관리 플랫폼',
    period: '2026.07 – 2026.08',
    role: '배너 광고 결제·정산 백엔드 담당',
    summary:
      '결제 이벤트 유실·지연 상황에서도 미승인 상태로 멈추지 않도록 이벤트 처리와 보정 스케줄러로 복구 경로를 이중화',
    tags: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL', 'Git'],
    github: 'https://github.com/viinac/last-mission',
    sections: [
      {
        title: '배경 / 문제',
        items: [
          '결제 완료 이벤트 유실·지연 시 "결제됐는데 미승인" 상태로 방치될 위험',
        ],
      },
      {
        title: '핵심 기여',
        items: [
          'PaymentEventListener + BannerAdReconcileScheduler로 복구 경로 이중화, 이벤트 유실 시에도 상태 자동 복구 설계',
          '날짜 겹침 쿼리로 슬롯 수용량 초과 등록 사전 차단 → 409(CONFLICT)로 명확한 실패 처리',
          '결제 이벤트 유실/지연을 가정한 테스트로 미승인 상태가 자동 재처리로 수렴하는 흐름 검증',
          '@Modifying @Transactional 누락으로 발생한 런타임 오류를 직접 재현·수정',
        ],
      },
      {
        title: '결과',
        items: [
          '이벤트가 불안정한 환경에서도 결제/정산 상태가 복구되는 운영 친화적 처리 흐름 확보',
        ],
      },
    ],
  },
  {
    id: 'itmal',
    name: 'ITMAL',
    subtitle: '언어 교환 학습 플랫폼',
    period: '2026.06 – 2026.07',
    role: '인증·인가 도메인 오너 (단독 설계·구현)',
    summary:
      'JWT/OAuth2 인증·권한 체계를 처음부터 구축하고 예외 케이스까지 정책으로 흡수해 로그인 실패/권한 우회 리스크를 낮춘 보안 기반 구현',
    tags: ['Java', 'Spring Boot', 'JPA', 'Spring Security', 'MySQL', 'Redis'],
    github: 'https://github.com/ITMALLL/ITMAL-SpringBoot',
    sections: [
      {
        title: '핵심 기여',
        items: [
          'JWT Access·Refresh 발급/갱신 + 블랙리스트 로그아웃으로 탈취 토큰 재사용 위험 통제',
          'GitHub 비공개 이메일 케이스를 재현 → /user/emails 추가 조회로 primary·verified 이메일 폴백 처리',
          'URL 접근 제어 + PermissionAspect(AOP) 이중 권한 검증으로 튜터 전용 기능 우회 가능성 축소',
          '회원탈퇴 이메일 익명화 + 15일 재가입 제한(소프트 딜리트), 비밀번호 찾기 시 계정 존재 여부 미노출',
        ],
      },
      {
        title: '결과',
        items: [
          '소셜 로그인 예외(GitHub 비공개 이메일) 및 권한 우회 케이스를 정책으로 흡수해 미처리 케이스로 인한 인증 실패 경로를 사전 차단',
        ],
      },
    ],
  },
];
