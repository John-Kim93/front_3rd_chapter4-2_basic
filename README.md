## 바닐라 JS 프로젝트 성능 개선

- S3 버킷 웹사이트 엔드포인트:
  http://sparta-s3-demo.s3-website.ap-northeast-2.amazonaws.com
- CloudFront 배포 도메인 이름:
  https://d2rtp82318rfxy.cloudfront.net

## 성능 개선 보고서

### 문제 배경

웹사이트의 LCP 성능이 **14.65초**로 측정되어 사용자 경험에 부정적인 영향을 미치는 상황이 발생했습니다.

LCP는 웹 페이지의 주요 성능 지표 중 하나로, 페이지 로딩 과정에서 사용자가 가장 큰 콘텐츠(이미지, 텍스트 등)를 볼 수 있을 때까지의 시간을 측정합니다.

---

### 개선 방법

#### 1. oversize 이미지 축소

- [iLoveIMG](https://www.iloveimg.com/ko/resize-image/resize-jpg) 사이트를 이용하여 이미지 사이즈를 25% 축소하였습니다.

#### 2. 이미지 확장자 변경 jpg -> webp

- [cloudconvert](https://cloudconvert.com/jpg-to-webp) 사이트를 이용하여 이미지 확장자를 jpg에서 webp로 변경하였습니다.

#### 3. 이미지 압축

- [tinypng](https://tinypng.com/) 사이트를 이용하여 이미지를 압축했습니다.

#### 4. picture 태그 사용

- 스크린 크기에 따른 반응형 UI 구현 방식을 CSS에서 picture 태그 사용 방식으로 변경했습니다.

#### 5. fixed size image 사용

- 이미지의 너비와 높이를 지정하지 않는 경우 브라우저의 layout 단계에서 해당 이미지의 영역이 실제 이미지보다 작게 측정될 수 있습니다.
- paint 단계에서 실제 이미지가 갖고 있는 영역을 차지하게 되면서 주변 요소들이 영향을 받게되고 불필요한 Layout Shift가 발생합니다.
- 이로 인해 CLS 점수가 낮게 측정되는 현상을 fixed size image를 사용하여 개선하였습니다.

#### 6. display none 대신 opacity로 숨기기

- country banner의 숨김 상태를 display none에서 opacity: 0으로 변경하였습니다.
- display none은 layout 단계에서 공간을 점유하지 않기 때문에 layout shifts를 발생시킬 수 있습니다.

#### 7. lazy loading 적용

#### 8. event loop 적용

- 페이지 진입 시 실행되는 무거운 스크립트 작업을 nonblock-async로 처리하도록 개선하였습니다.

#### 9. self-host fonts

- link를 통해서 가져오던 폰트 정보를 자체 호스트하도록 변경하였습니다.

#### 10. defer non-essential services

- 중요하지 않은 스크립트에 defer 옵션을 추가하여 초기 렌더링 시 영향을 주지 않도록 개선하였습니다.

---

### 개선 결과

| 개선 사항                      | LCP (초)   | CLS       |
| ------------------------------ | ---------- | --------- |
| 개선 전                        | **14.65s** | **0.011** |
| oversize 이미지 축소           | **12.91s** | **0.011** |
| 이미지 확장자 변경             | **7.73s**  | **0.011** |
| 이미지 압축                    | **3.30s**  | **0.011** |
| picture 태그 사용              | **2.86s**  | **0.049** |
| fixed size image 사용          | **2.86s**  | **0.049** |
| display none 대신 opacity 사용 | **2.77s**  | **0.003** |
| lazy loading 적용              | **2.82s**  | **0.003** |
| event loop 적용                | **2.75s**  | **0.003** |
| self-host fonts                | **3.05s**  | **0.002** |
| defer non-essential services   | **3.06s**  | **0.002** |
