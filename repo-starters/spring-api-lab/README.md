# spring-api-lab

Spring Boot API 실험과 백엔드 기본기를 정리하는 레포.

## 목표

- REST API 설계와 CRUD 구현
- Validation, 예외 처리, 공통 응답 포맷 정리
- JPA 또는 MyBatis 기반 데이터 접근 연습
- Swagger/OpenAPI 문서화
- 테스트 코드와 배포 흐름 기초 정리

## 기술 스택

- Java
- Spring Boot
- Spring Validation
- JPA 또는 MyBatis
- MySQL
- Gradle

## 다루고 싶은 기능

- 회원, 게시글, 댓글 같은 기본 도메인 CRUD
- 검색, 페이징, 정렬
- DTO 분리
- 전역 예외 처리
- 로그인 또는 토큰 인증 기초
- 환경별 설정 분리

## 폴더 예시

```text
src
 ├─ main
 │   ├─ java
 │   │   └─ com/example/api
 │   │       ├─ common
 │   │       ├─ domain
 │   │       ├─ controller
 │   │       ├─ service
 │   │       ├─ repository
 │   │       └─ config
 │   └─ resources
 │       ├─ application.yml
 │       └─ data.sql
 └─ test
```

## 진행 계획

1. 프로젝트 초기 세팅
2. 도메인 1개 CRUD
3. 예외 처리와 응답 포맷 정리
4. DB 연동
5. 테스트 코드 추가
6. Swagger 적용

## 기록 방식

- 기능 단위 커밋
- 트러블슈팅은 `docs/troubleshooting.md`에 정리
- API 변경 사항은 `docs/api-notes.md`에 기록

