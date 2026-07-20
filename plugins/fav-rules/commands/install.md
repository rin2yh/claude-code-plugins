---
description: 言語・領域カテゴリ別の rules を ~/.claude/rules/<category>/ (user) または ./.claude/rules/<category>/ (project) に配置する
argument-hint: "<category|all> [user|project]  例: ts / common / all"
allowed-tools:
  - Bash(install-fav-rules:*)
---

引数 `$ARGUMENTS` を `install-fav-rules` にそのまま渡して実行し、指定カテゴリの rules を配置してください。

- 第 1 引数（必須）: カテゴリ名。例: `common` / `ts` / `all`
  - 利用可能なカテゴリは `install-fav-rules --list` で確認できる
- 第 2 引数（任意、既定 `user`）:
  - `user`   → `~/.claude/rules/<category>/` に配置（全プロジェクトで有効）
  - `project` → 現在のリポジトリの `.claude/rules/<category>/` に配置（そのプロジェクトのみ）

実行後、コピー先パスと配置されたファイル一覧を報告してください。引数が空の場合は `install-fav-rules --list` でカテゴリ一覧を提示し、どれを入れるかユーザーに尋ねてください。
