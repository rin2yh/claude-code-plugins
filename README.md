# rin2yh/claude-code-plugins

rin2yh の汎用スキル・ルールをまとめたプラグイン marketplace です。**Claude Code と Codex の両方**からインストールできます。

- Claude Code: [プラグイン marketplace](https://code.claude.com/docs/en/plugin-marketplaces)（`.claude-plugin/`）
- Codex: プラグイン marketplace（`.agents/plugins/marketplace.json` ＋ `.codex-plugin/`）

スキル本体（`SKILL.md`）は 1 本を両者で共有し、実行環境ごとに手順が変わる部分だけ各スキルの `references/` に分けています。

## インストール

### Claude Code

```
/plugin marketplace add rin2yh/claude-code-plugins
/plugin install development-skills@rin2yh-plugins
/plugin install meta-skills@rin2yh-plugins
/plugin install fav-rules@rin2yh-plugins
/plugin install general-skills@rin2yh-plugins
```

### Codex

```
codex plugin marketplace add rin2yh/claude-code-plugins
codex plugin add development-skills@rin2yh-plugins
codex plugin add meta-skills@rin2yh-plugins
codex plugin add fav-rules@rin2yh-plugins
codex plugin add general-skills@rin2yh-plugins
```

インストール後は Codex の再起動が必要です。

## 収録プラグイン

| プラグイン | 内容 |
|---|---|
| `development-skills` | 開発ワークフロー系スキル集。`dependabot-pr-review` / `tdd` |
| `meta-skills` | プロジェクトルールを作るメタスキル集。現状 `rule-creator` |
| `fav-rules` | 言語・領域別のルールパック。`install-fav-rules` スキル（または `/fav-rules:install`）で配置 |
| `general-skills` | 領域を問わず使える汎用スキル集。現状 `proofread` |

## 対応状況

| スキル | Claude Code | Codex | 備考 |
|---|---|---|---|
| `dependabot-pr-review` | ○ | ○ | Codex では `mcp__github__*` が使えないため `gh` CLI が必要 |
| `tdd` | ○ | ○ | Codex では `disable-model-invocation` が効かず自動起動しうる |
| `rule-creator` | ○ | ○ | 出力先が `.claude/rules/` と `AGENTS.md` で変わる |
| `proofread` | ○ | ○ | Codex では5観点を逐次実行する |
| `install-fav-rules` | ○ | ○ | Codex では `--format agents` を使う |
| `/fav-rules:install` | ○ | — | Codex はスラッシュコマンドを読まないため、上記スキルを使う |

## スキル呼び出し

明示的に呼ぶ場合:

```
/development-skills:dependabot-pr-review
/development-skills:tdd
/meta-skills:rule-creator
/general-skills:proofread
/fav-rules:install-fav-rules
```

（`tdd` 以外は model-invoked でもよく、文脈から自動起動します）

## fav-rules の使い方

### Claude Code（`.claude/rules/` へ配置）

```
install-fav-rules ts              # ~/.claude/rules/ts/ に TypeScript 系ルールを配置
install-fav-rules common          # 共通ルール (develop/response/github-actions/github-review)
install-fav-rules all             # 全カテゴリ
install-fav-rules ts project      # 現在のリポジトリの .claude/rules/ts/ に配置
```

`/fav-rules:install <category> [user|project]` からも同じことができます。

### Codex（`AGENTS.md` へ配置）

```
install-fav-rules ts --format agents          # ~/.codex/AGENTS.md に書き込む
install-fav-rules all project --format agents # 現在のリポジトリの ./AGENTS.md に書き込む
```

カテゴリ一覧は `install-fav-rules --list` で確認できます。

`--format agents` は既存の `AGENTS.md` を壊さずに書き込みますが、パススコープは失われます。詳細は [`install-fav-rules` スキルの Codex 向け参照](plugins/fav-rules/skills/install-fav-rules/references/codex.md) をご覧ください。

両形式を同時に配置しても互いに干渉しません。

## ディレクトリ構成

各プラグインが自身の `skills/` を持ち、Claude Code 用と Codex 用のマニフェストを並置する構成です。

```
.
├── .claude-plugin/marketplace.json      # Claude Code 用カタログ（生成の入力）
├── .agents/plugins/marketplace.json     # Codex 用カタログ（生成物）
├── scripts/sync-manifests.mjs           # Codex 用マニフェストの生成 / --check
└── plugins/
    ├── development-skills/
    │   ├── .claude-plugin/plugin.json
    │   ├── .codex-plugin/plugin.json     # 生成物
    │   └── skills/
    │       ├── dependabot-pr-review/{SKILL.md,references/}
    │       └── tdd/SKILL.md
    ├── meta-skills/
    │   └── skills/rule-creator/{SKILL.md,references/}
    ├── general-skills/
    │   └── skills/proofread/{SKILL.md,references/}
    └── fav-rules/
        ├── rules/{common,ts}/
        ├── bin/install-fav-rules
        ├── commands/install.md           # Claude Code 用スラッシュコマンド
        └── skills/install-fav-rules/{SKILL.md,references/}
```

## ローカルでの動作確認

```
# Codex 用マニフェストを再生成する（.claude-plugin/ を編集したら必ず実行）
node scripts/sync-manifests.mjs

# 生成物が最新か確認するだけ（CI と同じ）
node scripts/sync-manifests.mjs --check
```

marketplace の検証:

```
claude plugin validate .                 # Claude Code
codex plugin marketplace add ./          # Codex
```

## ライセンス

MIT
