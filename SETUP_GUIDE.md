# GitHub 설정 가이드

이 문서는 Lord of Mysteries 시스템을 GitHub에 업로드하고 Foundry VTT에서 설치할 수 있도록 설정하는 방법을 안내합니다.

## 1. GitHub 리포지토리 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단의 `+` 버튼 → `New repository` 클릭
3. 리포지토리 정보 입력:
   - **Repository name**: `lord-of-mysteries`
   - **Description**: `Lord of Mysteries TRPG System for Foundry VTT`
   - **Public** 선택 (중요: Manifest URL이 작동하려면 public이어야 함)
   - **Initialize this repository with a README** 체크 해제 (이미 README가 있으므로)
4. `Create repository` 클릭

## 2. 로컬 Git 설정 및 업로드

터미널에서 다음 명령어 실행:

```bash
# lord-of-mysteries 폴더로 이동
cd lord-of-mysteries

# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Lord of Mysteries TRPG System v1.0.0"

# GitHub 리포지토리 연결 (skkinlive을 실제 사용자명으로 변경)
git remote add origin https://github.com/skkinlive/lord-of-mysteries.git

# main 브랜치로 변경 (필요시)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 3. system.json 파일 수정

업로드 후 `system.json` 파일을 열어 다음 URL들을 수정하세요:

```json
"url": "https://github.com/skkinlive/lord-of-mysteries",
"manifest": "https://raw.githubusercontent.com/skkinlive/lord-of-mysteries/main/system.json",
"download": "https://github.com/skkinlive/lord-of-mysteries/archive/refs/heads/main.zip"
```

**skkinlive**을 실제 GitHub 사용자명으로 변경한 후 다시 커밋:

```bash
git add system.json
git commit -m "Update URLs in system.json"
git push
```

## 4. Foundry VTT에서 설치

1. Foundry VTT 실행
2. **Setup** 화면 → **Game Systems** 탭
3. **Install System** 버튼 클릭
4. **Manifest URL**에 입력:
   ```
   https://raw.githubusercontent.com/skkinlive/lord-of-mysteries/main/system.json
   ```
5. **Install** 클릭

## 5. 릴리즈 생성 (선택사항, 권장)

GitHub에서 릴리즈를 생성하면 버전 관리가 쉬워집니다:

1. GitHub 리포지토리 페이지 접속
2. 우측의 **Releases** 클릭
3. **Create a new release** 클릭
4. 정보 입력:
   - **Tag version**: `v1.0.0`
   - **Release title**: `Lord of Mysteries v1.0.0`
   - **Description**: 릴리즈 노트 작성
5. **Publish release** 클릭

릴리즈를 생성한 후 `system.json`의 `download` URL을 다음과 같이 변경할 수 있습니다:

```json
"download": "https://github.com/skkinlive/lord-of-mysteries/releases/download/v1.0.0/lord-of-mysteries.zip"
```

이 경우 릴리즈 페이지에서 `lord-of-mysteries.zip` 파일을 업로드해야 합니다.

## 6. 버전 업데이트 시

버전을 업데이트할 때마다:

1. `system.json`의 `version` 변경
2. 변경사항 커밋 및 푸시
3. 새 릴리즈 생성 (선택사항)

## 문제 해결

### Manifest URL이 작동하지 않을 때

1. 리포지토리가 **Public**인지 확인
2. `system.json` 파일이 리포지토리 루트에 있는지 확인
3. Raw URL이 올바른지 확인:
   - 올바름: `https://raw.githubusercontent.com/...`
   - 잘못됨: `https://github.com/...`

### 다운로드가 실패할 때

1. `download` URL이 올바른지 확인
2. 리포지토리가 Public인지 확인
3. ZIP 파일이 올바른 구조를 가지고 있는지 확인 (압축 해제 시 `lord-of-mysteries/` 폴더가 생성되어야 함)

## 추가 정보

- Foundry VTT 시스템 개발 문서: https://foundryvtt.com/article/system-development/
- GitHub 가이드: https://docs.github.com/
