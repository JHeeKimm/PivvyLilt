# PivvyLilt

![pivvylilt](https://github.com/user-attachments/assets/edf77ff3-6039-4fad-b29e-d77ffc5fc3ff)

### 프로젝트 소개

PivvyLilt는 사용자가 손쉽게 콘텐츠를 공유하고, 활발히 소통할 수 있는 SNS 플랫폼입니다. <br/>직관적이고 빠른 성능을 기반으로, 유쾌한 사용자 경험을 제공합니다.

### 프로젝트 진행기간

2024.10 ~ 2024.12

### 프로젝트 배포링크

[🔗PivvyLilt 배포링크](https://pivvy-lilt.vercel.app)

<!--
#### 테스트 계정

> ID: test@gmail.com  
> PW: a123456!
-->
<br/>

## 1. 실행방법

1-1. 레포지토리 복제 후 의존성 설치

```
$ git clone https://github.com/JHeeKimm/PivvyLilt.git
$ npm install
```

1-2. 개발 서버 가동

```
$ npm run dev
```

1-3. 브라우저에서 실행

```
http://localhost:3000/
```

<br/>

## 2. 기술스택

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

<img src="https://img.shields.io/badge/Zustand-1E4CC9?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

<!--
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"> <img src="https://img.shields.io/badge/Testing Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white">
-->

<br/>

## 3. 주요기능

##### 토글을 열면 시연영상을 확인하실 수 있습니다

#### <details><summary>로그인 / 회원가입</summary> <br/> <img src="https://github.com/user-attachments/assets/93b129d7-f3d3-4926-8feb-cbb90754aca8" width="600" /> </details>

- 폼 유효성 검증
- 사용자 인증 상태 관리

#### <details><summary>메인 피드 페이지</summary> <br/><img src="https://github.com/user-attachments/assets/591e7588-e290-463e-a36e-7ce26207ce2a" width="600" /> <br/></details>

- 반응형 UI 구현
- 무한 스크롤 구현

#### <details><summary>피드 작성</summary> <br/> <p>피드 등록</p> <img src="https://github.com/user-attachments/assets/87982414-feff-4d4d-b3ce-a2fc0d53989a" width="600" /> <br/></details>

- 이미지 업로드와 글 작성 기능
- parallel & intercepting routes를 사용한 모달로 구현

#### <details><summary>피드 상세 페이지</summary><br/> <p>상세 페이지 조회</p> <img src="https://github.com/user-attachments/assets/90922e35-44c6-4a5c-8e53-1222aeddcdae" width="600" /> <br/></details>

- 피드 상세 페이지 조회 기능
- 댓글 작성 기능
- 사용자가 작성한 피드/댓글 수정 기능
- parallel & intercepting routes를 사용한 모달로 구현

#### <details><summary>좋아요 및 팔로우</summary><br/> <p>좋아요</p> <img src="https://github.com/user-attachments/assets/4e868086-e961-4601-8719-f05b81a34be9" width="600" /><br/> <br/> <p>팔로워/팔로잉</p> <img src="" width="600" /></details>

- 좋아요 추가/삭제 기능
- 팔로우/언팔로우 기능, 팔로워/팔로잉 수 표시

#### <details><summary>프로필 페이지</summary><br/> <p>사용자 프로필 조회</p> <img src="https://github.com/user-attachments/assets/1d430777-f293-4dce-9a71-b70447c906ba" width="600" /><br/></details>

- username으로 동적 경로 페이지 구현
- 사용자 프로필 조회 기능
- MyProfile인 경우, 사용자 프로필 수정 가능
- 해당 사용자가 작성한 피드 조회 기능

<br/>

<!--
## 4. 성능 최적화

- [SSR prefetch/hydration으로 로딩 속도 개선]()

  - **LCP** 1.2s → 0.8s
  - **Speed Index** 0.8s → 0.5s

- [이미지 최적화로 이미지 크기 % 축소]()
- [SEO 점수 % 개선]()

<br/>

## 5. 트러블 슈팅

- [문제1]()
- [문제2]()

<br/>

## 6. 기술적 의사결정

- Next.js:
- TypeScript:

- [customRequest 함수로 API 요청 중앙 관리](https://github.com/JHeeKimm/PivvyLilt/pull/37)

- [queryKey 구조화로 데이터 캐싱 일관성 유지 및 중복 캐싱 방지](https://github.com/JHeeKimm/PivvyLilt/commit/29588334348d0f77e152f80ecaba51d10c681bc7)

<br/>

## 7. 와이어프레임 & ERD & 폴더구조

![pivvylilt 와이어프레임]()
<br/>
![pivvylilt ERD]()

<br/>
-->


<details><summary>폴더구조</summary>

```
 pivvy-lilt
 ┣ public
 ┣ src
 ┃ ┣ actions
 ┃ ┣ app
 ┃ ┃ ┣ (afterLogin)
 ┃ ┃ ┃ ┣ chat
 ┃ ┃ ┃ ┣ create-post
 ┃ ┃ ┃ ┣ post
 ┃ ┃ ┃ ┃ ┗ [postId]
 ┃ ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┣ profile
 ┃ ┃ ┃ ┃ ┗ [nickname]
 ┃ ┃ ┃ ┃ ┃ ┣ edit
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┗ layout.tsx
 ┃ ┃ ┣ (beforeLogin)
 ┃ ┃ ┃ ┣ login
 ┃ ┃ ┃ ┣ signup
 ┃ ┃ ┃ ┗ layout.tsx
 ┃ ┃ ┣ @modal
 ┃ ┃ ┃ ┣ (.)create-post
 ┃ ┃ ┃ ┣ (.)post
 ┃ ┃ ┃ ┃ ┗ [postId]
 ┃ ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┣ (.)profile
 ┃ ┃ ┃ ┃ ┗ [nickname]
 ┃ ┃ ┃ ┃ ┃ ┗ edit
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┗ default.tsx
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┣ follows
 ┃ ┃ ┃ ┣ likes
 ┃ ┃ ┃ ┃ ┗ [postId]
 ┃ ┃ ┃ ┃ ┃ ┣ like
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ route.ts
 ┃ ┃ ┃ ┃ ┃ ┗ unlike
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ route.ts
 ┃ ┃ ┃ ┣ posts
 ┃ ┃ ┃ ┃ ┣ create-post
 ┃ ┃ ┃ ┃ ┣ read-by-user
 ┃ ┃ ┃ ┃ ┣ [postId]
 ┃ ┃ ┃ ┃ ┃ ┣ comments
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ [commentId]
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ route.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ route.ts
 ┃ ┃ ┃ ┃ ┃ ┗ route.ts
 ┃ ┃ ┃ ┃ ┗ route.ts
 ┃ ┃ ┃ ┗ user
 ┃ ┃ ┃ ┃ ┗ [nickname]
 ┃ ┃ ┃ ┃ ┃ ┗ profile
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ route.ts
 ┃ ┃ ┣ globals.css
 ┃ ┃ ┣ layout.tsx
 ┃ ┃ ┗ page.tsx
 ┃ ┣ components
 ┃ ┃ ┣ auth
 ┃ ┃ ┣ comment
 ┃ ┃ ┣ common
 ┃ ┃ ┃   .
 ┃ ┃ ┃   .
 ┃ ┃ ┃   .
 ┃ ┣ config
 ┃ ┣ constants
 ┃ ┣ hooks
 ┃ ┣ lib
 ┃ ┃ ┣ auth
 ┃ ┃ ┃   .
 ┃ ┃ ┃   .
 ┃ ┃ ┣ posts
 ┃ ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┣ api.ts
 ┃ ┃ ┃ ┣ key.ts
 ┃ ┃ ┃ ┣ schema.ts
 ┃ ┃ ┃ ┗ types.ts
 ┃ ┃ ┗ user
 ┃ ┣ providers
 ┃ ┣ store
 ┃ ┣ utils
 ┃ ┗ middleware.ts
 ┣ .eslintrc.json
 ┣ .gitignore
 ┣ next.config.mjs
 ┣ package.json
 ┣ postcss.config.mjs
 ┣ README.md
 ┣ tailwind.config.ts
 ┗ tsconfig.json
```

</details>
<br/>

- app: Next.js App Router의 메인 경로를 정의
  - (afterLogin): 로그인 후 접근 가능한 페이지.
  - (beforeLogin): 로그인 전 접근 가능한 페이지.
  - @modal: 모달을 사용하는 페이지.
  - api: API 라우트를 통해 데이터 CRUD 처리.
- components: 앱 전체에서 공유되는 모든 컴포넌트
- config: 프로젝트의 주요 설정 파일(Firebase, Tanstack Query Client) 관리
- constants: 프로젝트 내에서 사용하는 고정 경로(routes)와 같은 상수 정의
- lib: 주요 기능별 로직, 타입, 스키마, API 요청/응답 정의
- store: Zustand를 활용한 상태 관리(AuthStore, ToastStore 등)
- utils: 유틸리티 함수 모음(API 클라이언트, debounce, 경과 시간 계산 등)
