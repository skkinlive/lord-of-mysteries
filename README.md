# Lord of Mysteries System for Foundry VTT

Lord of Mysteries TRPG를 온라인에서 플레이하기 위한 Foundry VTT 시스템입니다.

## 주요 기능

### 속성 시스템
- 8가지 속성: 힘, 민첩, 의지, 건강, 매력, 영감, 행운, 교육
- 각 속성별 현재 수치와 초기 수치 관리
- 속성 판정 (1d20 + 속성 값)

### 기능 시스템
- 6등급 기능 레벨: 훈련 안됨(-4), 훈련됨(+2), 숙련됨(+4), 진척됨(+5), 정통함(+6), 박학함(+7), 대가(+8)
- 속성별 기능 분류
- 커스터마이징 가능한 기능 이름 (격투, 사격, 예술, 학식, 언어 등)
- 기능 판정 (1d20 + 기능 가산점 + 영향 속성)

### 서열 시스템
- 9서열부터 0서열까지
- 서열에 따른 스탯 자동 계산

### 스탯 시스템
- **영성**: 초기 의지 + 초기 영감 + (현재 영감 × 승급한 서열 수)
- **이성**: 의지 + 10 (이성 판정 버튼 포함)
- **생명력**: 건강 + 10 + (현재 건강 × (승급한 서열 수 - 1))
- **이동**: 힘 + 민첩
- **물리 방어**: 10 + 민첩 + 회피 기능 보너스
- **의지 방어**: 10 + 의지
- **건강 방어**: 10 + 건강

### 행동 시스템
- 행동 종류: 공격, 시전, 이동, 신속, 자유
- 판정 유형: 기능 판정, 속성 판정, 판정 없음
- 행동별 설명 및 굴림 기능

### 기타 기능
- 우선권 굴림 (1d20 + 민첩)
- 물품 관리 (크기별 분류)
- 초월 능력 관리
- 상태 이상 시스템

## 설치 방법

### 방법 1: Manifest URL 사용 (권장)

1. Foundry VTT 실행
2. **Setup** 화면에서 **Game Systems** 탭으로 이동
3. **Install System** 버튼 클릭
4. 하단의 **Manifest URL** 입력란에 다음 URL 붙여넣기:
   ```
   https://raw.githubusercontent.com/skkinlive/lord-of-mysteries/main/system.json
   ```
5. **Install** 클릭
6. 월드 생성 시 "Lord of Mysteries" 선택

### 방법 2: 수동 설치

1. [최신 릴리즈](https://github.com/skkinlive/lord-of-mysteries/releases) 다운로드
2. 압축 해제 후 `lord-of-mysteries` 폴더를 Foundry VTT의 `Data/systems/` 폴더에 복사
3. Foundry VTT 재시작
4. 월드 생성 시 "Lord of Mysteries" 선택

## 사용 방법

### 캐릭터 생성
1. 액터 탭에서 새 캐릭터를 생성합니다.
2. 탐사자 정보를 입력합니다 (이름, 가문, 직업 등).
3. 속성 값을 설정합니다 (현재 값과 초기 값 모두).
4. 서열을 선택합니다.
5. 기능 레벨을 설정합니다.

### 판정하기
- **속성 판정**: 속성 박스의 주사위 아이콘 클릭
- **기능 판정**: 기능 옆의 주사위 아이콘 클릭
- **이성 판정**: 이성 스탯의 주사위 버튼 클릭
- **우선권 굴림**: 속성 섹션 하단의 우선권 굴림 버튼 클릭

### 행동 추가
1. "행동" 탭으로 이동합니다.
2. "행동 추가" 버튼을 클릭합니다.
3. 행동 이름, 종류, 판정 대상을 설정합니다.
4. 행동 설명을 작성합니다.
5. 행동을 사용하려면 주사위 아이콘을 클릭합니다.

### 물품 관리
1. 메인 탭의 "휴대 가능 물품" 섹션에서 "추가" 버튼을 클릭합니다.
2. 물품 이름과 크기를 설정합니다.
3. 물품 설명을 작성합니다.

## 시스템 구조

```
lord-of-mysteries/
├── system.json           # 시스템 메타데이터
├── template.json         # 데이터 템플릿
├── module/
│   ├── lord-of-mysteries.mjs  # 메인 모듈
│   ├── documents/
│   │   ├── actor.mjs    # 액터 문서 클래스
│   │   └── item.mjs     # 아이템 문서 클래스
│   ├── sheets/
│   │   ├── actor-sheet.mjs  # 액터 시트
│   │   └── item-sheet.mjs   # 아이템 시트
│   └── helpers/
│       ├── handlebars.mjs   # Handlebars 헬퍼
│       └── templates.mjs    # 템플릿 프리로드
├── templates/
│   ├── actor/
│   │   └── actor-character-sheet.hbs
│   └── item/
│       ├── item-action-sheet.hbs
│       ├── item-item-sheet.hbs
│       └── item-ability-sheet.hbs
├── css/
│   └── lord-of-mysteries.css   # 스타일시트
└── lang/
    └── ko.json           # 한국어 번역
```

## 라이선스

이 시스템은 자유롭게 수정하고 사용할 수 있습니다.

## 버전

- v1.0.0 - 초기 릴리즈
  - 8가지 속성 시스템
  - 기능 및 서열 시스템
  - 자동 스탯 계산
  - 행동 및 아이템 관리
  - 판정 시스템

## 문의

버그 리포트나 기능 제안은 이슈로 제출해주세요.
