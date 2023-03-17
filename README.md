# 포토리
> Download - https://apps.apple.com/app/id1623724754



## 📄 개발 일정 산정 (*55일 -> 11주)
```
📱 주요 기능
   • 모든 스토어의 위치 제공
   • 셀랙한 스토어의 위치 제공
   • 이미지 저장 / 삭제
   • 이미지 나열 - Grid 1 / 2 / 3
   • 이미지 나열 - 최신 순 / 오래된 순
```
```
📱 페이지 별 기능
💡 Home Tab 기능

[Intro Screen]
└─ Map
└─ Marker
└─ Marker onPress → Store Info Popup
└─ DropBox [지역 & 스토어 선택]

💡 Photo Tab 기능

[Intro Screen]
└─ Grid 1 / 2 / 3
└─ 최신 순 / 오래된 순
└─ **+** Button → Add Image Screen
└─ Image onPress → Image Info Popup

💡 Info Tab 기능

[Intro Screen]
└─ Setting Button → Setting Screen
└─ Edit Button → Profile Edit Screen
```
---

## 📋 기술 스택
```
• [FrontEnd] 
   - React Native (ReactNativeCLI & Functional)
   - TypeScript
   - Axios
   - StyleSheet
   
• [Tool]
   - Git (github, sourceTree)
   - VSCode (prettier, ESLint ..)
   - Notion
   
• [Ect] 
   - Naver Open API
   - Kakao Open API
   - Google Map Open API
```
---

## 🛠 구현 기술 

- CodePush

- Tab Navigation
- Stack Navigation

- Apple Login
- Kakao Login
- Naver Map 추가
- 지도 내 Marker 표시

- QR코드 인식
- 메모 저장 및 삭제
- 사진 저장 및 삭제
- 위치 & 갤러리 접근 권한 설정

- 날짜별 정렬 (오래된순/최신순)
---

## 💻 User Interface





---
## ✏️ 프로젝트 사용 방법

1. cloning
```
git clone https://github.com/dkeka0127/lifeRecordProject.git
```

2. install
```
yarn install
# in ios
cd ios && pod install && cd ..
```

3. Execute 

```
yarn ios
yarn android
```
