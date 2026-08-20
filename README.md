# rin2yh/claude-code-plugins

rin2yh の汎用スキル・ルールをまとめたプラグイン marketplace です。**Claude Code と Codex の両方**からインストールできます。

スキル（`SKILL.md`）の形式は両者で共通なので、同じものがそのまま動きます。

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

## Codex で使うときの注意

| | |
|---|---|
| `dependabot-pr-review` | `mcp__github__*` が使えないため `gh` CLI が必要 |
| `rule-creator` | ルールの出力先が `AGENTS.md` になる |
| `install-fav-rules` | `--format agents` を使う（下記） |
| `/fav-rules:install` | スラッシュコマンドは読まれないので `install-fav-rules` スキルを使う |

## スキル呼び出し

明示的に呼ぶ場合:

```
/development-skills:dependabot-pr-review
/development-skills:tdd
/meta-skills:rule-creator
/general-skills:proofread
/fav-rules:install-fav-rules
```

（いずれも model-invoked でもよく、文脈から自動起動します）

## fav-rules の使い方

Claude Code は `.claude/rules/` を読み、Codex は `AGENTS.md` を読むので、配置先を `--format` で切り替えます。

```
install-fav-rules ts                          # ~/.claude/rules/ts/ に配置
install-fav-rules common                      # 共通ルール (develop/response/github-actions/github-review)
install-fav-rules all                         # 全カテゴリ
install-fav-rules ts project                  # 現在のリポジトリの .claude/rules/ts/ に配置

install-fav-rules ts --format agents          # ~/.codex/AGENTS.md に書き込む
install-fav-rules all project --format agents # 現在のリポジトリの ./AGENTS.md に書き込む
```

カテゴリ一覧は `install-fav-rules --list` で確認できます。`/fav-rules:install <category> [user|project]` からも同じことができます。

`--format agents` はカテゴリごとに `<!-- fav-rules:begin <category> -->` 〜 `<!-- fav-rules:end <category> -->` で挟んだブロックとして書き込みます。追記ではなく置換なので、再実行しても重複せず、マーカー外の手書き内容は保持されます。ルールの中身は変換せずそのまま連結します（`paths:` フロントマターは `AGENTS.md` ではフィルタとして機能しませんが、適用範囲を伝える情報としては読まれます）。

両形式を同時に配置しても互いに干渉しません。

## ディレクトリ構成

```
.
├── .claude-plugin/marketplace.json      # Claude Code / Codex 共通のカタログ
└── plugins/
    ├── development-skills/
    │   ├── .claude-plugin/plugin.json
    │   └── skills/{dependabot-pr-review,tdd}/SKILL.md
    ├── meta-skills/
    │   └── skills/rule-creator/SKILL.md
    ├── general-skills/
    │   └── skills/proofread/SKILL.md
    └── fav-rules/
        ├── rules/{common,ts}/
        ├── bin/install-fav-rules
        ├── commands/install.md           # Claude Code 用スラッシュコマンド
        └── skills/install-fav-rules/SKILL.md
```

Codex 専用のマニフェストはありません。Codex は `.claude-plugin/marketplace.json` をそのまま読み、`plugins/<name>/skills/` の `SKILL.md` も規約で見つけます。

## ローカルでの動作確認

```
claude plugin validate .                 # Claude Code

codex plugin marketplace add ./          # Codex
codex plugin add general-skills@rin2yh-plugins
```

`marketplace.json` は `codex plugin marketplace add` が、各 `plugin.json` は `codex plugin add` が検証します（`claude plugin validate` は両方を見ます）。CI もこれを回しています。

## ライセンス

MIT
