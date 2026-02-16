# Changelog

All notable changes to the Lord of Mysteries TRPG System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2025-02-16

### Fixed
- 기능 이름이 표시되지 않던 치명적 버그 수정 (skillNames 컨텍스트 추가)
- 기능 레벨 드롭다운이 너무 작아 클릭할 수 없던 문제 수정
- 드롭다운 크기를 일반 크기(26px)로 증가
- 기능 이름 글자 크기 증가 (11px → 12px)
- 전체 시트 너비 조정 (920px → 960px)

## [1.2.0] - 2025-02-16

### Added
- 물품 사용 버튼: 이름과 설명을 채팅에 출력

### Changed
- 기능 이름을 검정색 굵은 글씨로 명확히 표시
- 빈칸 기능(격투, 사격, 예술 등)의 입력칸 크기를 다른 기능과 동일하게 통일
- 기능 레벨 선택을 "훈련 안됨" 포함 7개 등급 모두 선택 가능하게 수정

### Fixed
- 기능 레벨을 선택할 수 없던 문제 해결
- 기능 이름이 보이지 않던 문제 해결

## [1.1.0] - 2025-02-15

### Added
- 유리점/불리점 시스템 (Alt 키: 유리점, Ctrl 키: 불리점)
- 포트레이트 이미지 업로드 기능
- 기능 이름 명확한 표시 (등반, 투척 등)

### Changed
- 캐릭터 시트 레이아웃 완전 재설계 (3단 레이아웃)
- 포트레이트를 좌측 최상단으로 이동
- 탐사자 정보를 세로 배치로 변경하여 공간 효율 개선
- 기능을 속성별 세로 배치로 변경
- 시트 크기 최적화 (920x720)

### Fixed
- 물품/초월 능력 편집 버튼이 작동하지 않던 문제 수정
- 아이템 삭제 기능 정상화

## [1.0.0] - 2025-02-15

### Added
- 초기 릴리즈
- 8가지 속성 시스템 (힘, 민첩, 의지, 건강, 매력, 영감, 행운, 교육)
- 서열 시스템 (9서열~0서열)
- 자동 스탯 계산 (영성, 이성, 생명력, 이동, 방어)
- 기능 시스템 (6단계 숙련도)
- 판정 시스템 (속성 판정, 기능 판정, 이성 판정)
- 우선권 굴림 시스템
- 행동 관리 시스템 (공격, 시전, 이동, 신속, 자유)
- 물품 관리 시스템 (6단계 크기 분류)
- 초월 능력 관리 시스템
- 한국어 지원
- 캐릭터 시트 UI
- 아이템 시트 UI

### Features
- 속성별 기능 분류 및 자동 가산점 적용
- 커스터마이징 가능한 기능 이름 (격투, 사격, 예술, 학식, 언어 등)
- 서열에 따른 스탯 자동 계산
- 채팅으로 판정 결과 출력
- 다양한 피해 유형 정의 (물리, 저주, 화염, 냉기, 신성, 번개, 독소)
- 14가지 상태 이상 정의

[1.2.1]: https://github.com/skkinlive/lord-of-mysteries/releases/tag/v1.2.1
[1.2.0]: https://github.com/skkinlive/lord-of-mysteries/releases/tag/v1.2.0
[1.1.0]: https://github.com/skkinlive/lord-of-mysteries/releases/tag/v1.1.0
[1.0.0]: https://github.com/skkinlive/lord-of-mysteries/releases/tag/v1.0.0
