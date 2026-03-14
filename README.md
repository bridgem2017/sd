
# 에스디컴퍼니 업로드용 완성파일

다운로드 후 GitHub에 전체 업로드하면 바로 Vercel에서 배포 가능한 정적 사이트입니다.

## 포함된 것
- 골판박스 주문제작 안내
- 칼라박스 주문제작 안내
- 소량인쇄 안내
- 제조공정 안내
- 선택 항목 메일 전달형 문의폼
- 모바일 최적화
- SEO 기본 메타태그
- 상업용 사용 가능한 자체 SVG 이미지
- 회원가입 / 카카오 / 네이버 연동용 UI 및 연결 지점

## 반드시 먼저 수정할 파일
`config/site-config.js`

아래 2개는 꼭 바꾸세요.
- inquiryEmail
- formSubmitAction

예시
```js
inquiryEmail: "sdcompany@box.re.kr",
formSubmitAction: "https://formsubmit.co/sdcompany@box.re.kr"
```

## 문의 자동메일
FormSubmit 방식이라 첫 1회는 수신 이메일 인증이 필요합니다.

## 실운영용 회원가입/로그인
이 패키지에는 UI와 연결 지점만 들어 있습니다.
실제 작동에는 아래가 필요합니다.
- 사이트가입: Supabase 또는 Firebase
- 카카오: Kakao Developers 앱 등록, JS 키, Redirect URI
- 네이버: Naver Developers 앱 등록, Client ID, Callback URL

이 부분은 이 파일만으로 즉시 활성화할 수 없습니다.

## 상업용 이미지
assets 폴더의 SVG 이미지는 모두 이 패키지에서 직접 생성한 자체 벡터 이미지입니다.

## GitHub 업로드
1. 압축 해제
2. 저장소에서 `uploading an existing file`
3. 파일 전체 업로드
4. Commit changes


추가 수정
- 골판박스 형태 이미지 교체
- 칼라박스 형태 이미지 교체
- 형태/재질/두께 설명 문구 보강
