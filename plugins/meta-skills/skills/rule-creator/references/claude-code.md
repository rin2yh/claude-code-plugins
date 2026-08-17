# Claude Code でルールを書くとき

## 置き場所

SKILL.md の分類表の各行が、この環境ではどこに対応するか。

| SKILL.md の分類 | Claude Code での置き場所 |
|---|---|
| 常時読み込まれる規約ファイル | `CLAUDE.md` |
| 個別のルールファイル | `.claude/rules/*.md` |
| スキル | `.claude/skills/<name>/SKILL.md` |
| フック | PreToolUse フック |

このスキルが作るのは `.claude/rules/*.md`。

## 公式仕様

迷ったら公式ドキュメントで最新仕様を確認する: https://code.claude.com/docs/en/memory （"Organize rules with `.claude/rules/`" 節）。記載時点の要点は以下。

- 置き場所は `.claude/rules/*.md`。サブディレクトリも再帰的に読み込まれる（`frontend/` 等で整理可）
- 1ファイル1トピック。ファイル名は内容が分かるもの（`testing.md`、`api-design.md` 等）
- **パススコープ**はフロントマターの `paths:` キー（YAML 配列）で指定する
  - `paths:` がある → マッチするファイルを Claude が読むときだけコンテキストに載る
  - `paths:` がない → 全セッションで常時読み込まれる（`.claude/CLAUDE.md` と同等の優先度）
- glob 例: `**/*.ts`（全 TS）、`src/**/*`（src 配下全部）、`*.md`（ルート直下の md）、ブレース展開 `src/**/*.{ts,tsx}`

## パススコープ付きルールの最小形

```markdown
---
paths:
  - "**/*.test.ts"
---

# テスト規約

- （ここに規約を箇条書きで書く）
```

## SKILL.md「例」のケースをこの環境で書くと

`.claude/rules/test.md` を作り、SKILL.md の例の本文をそのまま置く。**変えるのは wrapper だけ** —— フロントマターで `paths:` を指定し、見出しは `#` のまま。

```markdown
---
paths:
  - "**/*.test.ts"
---

# テスト規約

（SKILL.md の例の箇条書きをそのまま）
```

## 検証

- `paths:` は必ず YAML 配列。不要なら**キーごと付けない**（空配列にすると意図が読めない）
- 既存の `.claude/rules/*.md` と `CLAUDE.md` に矛盾する記述がないか見直す
