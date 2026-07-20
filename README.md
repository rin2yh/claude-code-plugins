# rin2yh/claude-code-plugins

rin2yh の汎用 Claude Code スキル・ルールをまとめた [プラグイン marketplace](https://code.claude.com/docs/en/plugin-marketplaces) です。

## インストール

```
/plugin marketplace add rin2yh/claude-code-plugins
/plugin install development-skills@rin2yh-plugins
/plugin install meta-skills@rin2yh-plugins
/plugin install fav-rules@rin2yh-plugins
```

## 収録プラグイン

| プラグイン | 内容 |
|---|---|
| `development-skills` | 開発ワークフロー系スキル集。`dependabot-pr-review` / `tdd` |
| `meta-skills` | Claude Code の仕組み (rules / skill 等) を作るメタスキル集。現状 `rule-creator` |
| `fav-rules` | 言語・領域別 `.claude/rules/` パック。`/fav-rules:install <category>` で配置 |

## スキル呼び出し

```
/development-skills:dependabot-pr-review
/development-skills:tdd
/meta-skills:rule-creator
```

（スキルは model-invoked でもよく、Claude が文脈から判断して自動起動する）

## fav-rules の使い方

```
/fav-rules:install ts          # ~/.claude/rules/ts/ に TypeScript 系ルールを配置
/fav-rules:install common      # 共通ルール (develop/response/github-actions/github-review)
/fav-rules:install all         # 全カテゴリ
/fav-rules:install ts project  # 現在のリポジトリの .claude/rules/ts/ に配置
```

カテゴリ一覧は `install-fav-rules --list` で確認できます。

## ディレクトリ構成

各プラグインが自身の `skills/` を持つ、標準的なプラグインごとのディレクトリ構成。

```
.
├── .claude-plugin/marketplace.json
└── plugins/
    ├── development-skills/
    │   ├── .claude-plugin/plugin.json
    │   └── skills/
    │       ├── dependabot-pr-review/
    │       └── tdd/
    ├── meta-skills/
    │   ├── .claude-plugin/plugin.json
    │   └── skills/
    │       └── rule-creator/
    └── fav-rules/
        ├── .claude-plugin/plugin.json
        ├── rules/{common,ts}/
        ├── bin/install-fav-rules
        └── commands/install.md
```

## ローカルでの動作確認

```
/plugin marketplace add ./
/plugin install development-skills@rin2yh-plugins
```

marketplace 検証:

```
claude plugin validate .
```

## ライセンス

MIT
