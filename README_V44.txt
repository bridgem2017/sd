box.re.kr 최종 통합본 안내

이 압축파일은 현재 site_v41_support_seo_realstyle 구조를 기준으로,
200개 스타터셋 박스 DB를 실제 HTML/JS 검색엔진과 연결한 버전입니다.

주요 교체 파일
- box-search.html
- quote.html
- config/box-db.js
- styles.css
- assets/box-db/*.jpg

적용 방법
1) 압축 해제
2) 기존 사이트 파일 위에 그대로 덮어쓰기
3) GitHub Desktop에서 변경 확인
4) Commit
5) Push
6) 배포 후 Ctrl + F5 새로고침

주의
- 이번 버전의 박스 이미지는 분쟁 방지용으로 구조/규격에 맞춘 대표 카드형 이미지입니다.
- 검색 결과에는 verified=yes 데이터만 노출되도록 구성되어 있습니다.
- 견적문의 버튼은 query string + localStorage(sd_selected_box)로 정보를 넘깁니다.

v44 변경사항
- 골판지 100 / 칼라박스 100 실제 사진형 스타터셋 스타일 이미지로 assets/box-db 교체
- 구조와 카테고리에 맞춘 대표 사진형 장면으로 재생성
