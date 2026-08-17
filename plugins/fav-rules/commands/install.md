---
description: 言語・領域カテゴリ別の rules を配置する (Claude Code は .claude/rules/、Codex は AGENTS.md)
argument-hint: "<category|all> [user|project]  例: ts / common / all"
allowed-tools:
  - Bash(install-fav-rules:*)
  - Bash(ls:*)
  - Read
---

`install-fav-rules` スキル（`skills/install-fav-rules/SKILL.md`）の手順に従って、引数 `$ARGUMENTS` の内容を配置してください。

引数の意味、既定の配置先、`--format` の使い分け、実行後に報告すべきことはすべてスキル側に書いてあります。このコマンドは Claude Code から明示的に呼ぶための入り口で、スキルと同じことをします。
