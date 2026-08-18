---
description: 言語・領域カテゴリ別の rules を配置する (Claude Code は .claude/rules/、Codex は AGENTS.md)
argument-hint: "<category|all> [user|project]  例: ts / common / all"
allowed-tools:
  - Bash(install-fav-rules:*)
  - Bash(ls:*)
  - Read
---

`${CLAUDE_PLUGIN_ROOT}/skills/install-fav-rules/SKILL.md` を読み、その手順に従って引数 `$ARGUMENTS` の内容を配置してください。

引数の意味、既定の配置先、実行後に報告すべきことはすべてそのスキルに書いてあります。このコマンドは Claude Code から短く呼ぶための入り口で、スキルと同じことをします。
