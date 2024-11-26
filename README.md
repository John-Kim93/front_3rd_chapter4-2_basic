## 바닐라 JS 프로젝트 성능 개선

- S3 버킷 웹사이트 엔드포인트:
  http://sparta-s3-demo.s3-website.ap-northeast-2.amazonaws.com
- CloudFront 배포 도메인 이름:
  https://d2rtp82318rfxy.cloudfront.net

## 성능 개선 보고서

### 개요

이 문서는 웹사이트의 **LCP(Largest Contentful Paint)** 성능을 개선 과정을 정리한 보고서입니다.

---

### 문제 배경

웹사이트의 LCP 성능이 **14.65초**로 측정되어 사용자 경험에 부정적인 영향을 미치는 상황이 발생했습니다.

LCP는 웹 페이지의 주요 성능 지표 중 하나로, 페이지 로딩 과정에서 사용자가 가장 큰 콘텐츠(이미지, 텍스트 등)를 볼 수 있을 때까지의 시간을 측정합니다.

---

### 개선 방법

#### 1. oversize 이미지 축소

- [iLoveIMG](https://www.iloveimg.com/ko/resize-image/resize-jpg) 사이트를 이용하여 이미지 사이즈를 25% 축소하였습니다.

#### 2. 이미지 확장자 변경 jpg -> webp

- [cloudconvert](https://cloudconvert.com/jpg-to-webp) 사이트를 이용하여 이미지 확장자를 jpg에서 webp로 변경하였습니다.

---

### 개선 결과

| 개선 사항            | LCP (초)   |
| -------------------- | ---------- |
| 개선 전              | **14.65s** |
| oversize 이미지 축소 | **12.91s** |
| 이미지 확장자 변경   | **7.73s**  |
