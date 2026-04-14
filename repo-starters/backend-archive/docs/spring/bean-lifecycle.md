# Spring Bean Lifecycle

## 흐름

1. 스프링 컨테이너 생성
2. 빈 생성
3. 의존관계 주입
4. 초기화 콜백
5. 사용
6. 종료 콜백

## 포인트

- `@PostConstruct`
- `@PreDestroy`
- 싱글톤 빈 관리

