# 📝 Bigs Frontend Mission

게시판(Boards) 기능을 중심으로 **게시글 목록 / 상세 / 등록 / 수정 / 삭제** 를 제공하는 프론트엔드 프로젝트입니다.

---

## 🔗 API 정보

* **API Base URL** : https://front-mission.bigs.or.kr (환경 변수 `NEXT_PUBLIC_API_URL`을 통해 관리)

---

## 📦 기술 스택

### Core

* **Next.js (App Router)**
* **React 18**
* **TypeScript**

### State & Data Fetching

* **Zustand**
* **@tanstack/react-query**
* **Axios**


### Form & Validation

* **react-hook-form**
* **zod**
* **@hookform/resolvers**

### Styling

* **Tailwind CSS**

---

## 🧠 기술 스택 선택 이유

### 1. Next.js (App Router)

* 게시판 구조에 적합한 페이지 단위 라우팅 및 레이아웃 분리
* Client / Server Component 구분을 통해 렌더링 책임을 명확히 관리
* `next/image`를 활용한 이미지 최적화
* 환경 변수 관리(`NEXT_PUBLIC_API_URL`)를 통한 배포 환경 대응 용이

---

### 2. TanStack Query (React Query)

* 게시글 목록 / 상세 / 수정 후 동기화 등 서버 상태 관리에 최적
* 로딩 / 에러 상태를 선언적으로 관리하여 UX 안정성 향상

---

### 3. React Hook Form + Zod

* useState를 사용하지 않고 폼 관리 가능
* Zod Schema를 사용하여 타입 + 유효성 검증을 일관되게 관리

---

### 4. Zustand

* 로그인 시 Access Token 및 디코딩된 사용자 정보 저장
* 로그아웃 시 인증 상태 일괄 초기화

---

### 5. Axios

* 공통 인스턴스 생성 및 인터셉터 생성
* `multipart/form-data` (이미지 업로드) 처리 구조화
* API 요청 로직을 `authApi`,`boardsApi`로 구분하여 관심사 분리

---

### 6. TailwindCSS

* 빠른 UI 구현과 일관된 디자인 유지
* 반응형 레이아웃을 클래스 단위로 직관적으로 관리

---

## 🚀 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 .env 파일 생성

```env
NEXT_PUBLIC_API_URL=https://front-mission.bigs.or.kr
```

### 3. 개발 서버 실행

```bash
npm run dev
```

아래 주소로 접속

```
http://localhost:3000
```

---

## ✨ 주요 기능

### 📌 로그인 / 회원가입
* 로그인
* 회원가입

### 📌 게시판 CRUD

* 게시글 목록 조회 (Pagination)
* 게시글 상세 조회
* 게시글 등록 (이미지 업로드 포함)
* 게시글 수정 (기존 이미지 미리보기 + 덮어쓰기)
* 게시글 삭제

### 📌 UX 고려사항

* 수정 페이지 진입 시 기존 데이터 자동 세팅
* 로딩 / 에러 상태 분리 처리
* 모바일 / PC 헤더 UI 분기
* 폼 유효성 검증 실패 시 제출 방지
* 전역 모달 컴포넌트를 통해 사용자 경험 향상

---

## 🔐 인증 토큰 관리에 대한 설계

- Cookie 기반 인증이 아닌 JWT 직접 전달 구조를 전제로 설계
- Access Token은 보안을 위해 메모리에만 저장
- Refresh Token은 새로고침 대응을 위해 LocalStorage에 저장
- `/me` API가 없는 환경에서 jwt-decode를 통해 사용자 정보 구성
- 앱 초기화 시 Refresh Token 기반 인증 상태 복구

---
