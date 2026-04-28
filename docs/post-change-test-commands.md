# Post-change test commands

이 문서는 코드 수정 후 사람이 직접 실행할 검증 명령어를 정리한다. 모든 명령은 레포지토리 루트에서 실행한다.

## 기본 원칙

- 웹 코드 변경 후 기본 검증은 `yarn verify:changed:web`를 우선 실행한다.
- 커밋 전 전체 웹 검증이 필요하면 `yarn verify:web`를 실행한다.
- 특정 실패가 플레이키로 보이면 실패한 테스트 파일만 `--runTestsByPath`로 단독 재실행한다.
- UI 변경은 명령어 검증과 별도로 브라우저에서 핵심 화면을 직접 확인한다.

## Web

```bash
yarn verify:changed:web
```

```bash
yarn verify:web
```

```bash
yarn workspace @safe-global/web test --runTestsByPath <test-file-1> <test-file-2>
```

```bash
yarn workspace @safe-global/web dev
```

```bash
yarn workspace @safe-global/web build
```

## Web formatting only

```bash
yarn prettier:fix
```

```bash
yarn workspace @safe-global/web prettier
```

## Theme package

`packages/theme` 토큰, palette, MUI/Tamagui generator를 수정했다면 아래를 실행한다.

```bash
yarn workspace @safe-global/theme type-check
```

```bash
yarn workspace @safe-global/theme test
```

```bash
yarn workspace @safe-global/theme prettier
```

웹 CSS variable 재생성이 필요한 theme 변경이면 아래도 실행한다.

```bash
yarn workspace @safe-global/web css-vars
```

## Storybook and visual checks

컴포넌트 UI나 story를 수정했다면 필요에 따라 실행한다.

```bash
yarn workspace @safe-global/web storybook
```

```bash
yarn workspace @safe-global/web test:storybook
```

```bash
yarn workspace @safe-global/web test:visual
```

## Cypress

웹 주요 플로우를 E2E로 확인할 때 실행한다.

```bash
yarn workspace @safe-global/web cypress:open
```

```bash
yarn workspace @safe-global/web cypress:run
```

## Mobile

모바일 코드를 수정했다면 아래를 실행한다.

```bash
yarn workspace @safe-global/mobile type-check
```

```bash
yarn workspace @safe-global/mobile lint
```

```bash
yarn workspace @safe-global/mobile prettier
```

```bash
yarn workspace @safe-global/mobile test
```

```bash
yarn workspace @safe-global/mobile start
```

## Current Parataxis wallet checks

Parataxis 웹 브랜딩 또는 wallet connect 주변을 수정했다면 최소한 아래 화면을 직접 확인한다.

```bash
yarn workspace @safe-global/web dev
```

- `http://localhost:3000/welcome`
- `Connect wallet` 버튼 클릭 시 wallet 선택 modal 표시
- `Watch any account` 링크 이동
- 상단/사이드바 brand logo와 footer 표기
- light/dark mode에서 주요 색상과 텍스트 가독성
