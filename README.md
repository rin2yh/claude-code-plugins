# rin2yh/claude-code-plugins

rin2yh の汎用 Claude Code スキル・ルールをまとめた [プラグイン marketplace](https://code.claude.com/docs/en/plugin-marketplaces) です。

## インストール

```
/plugin marketplace add rin2yh/claude-code-plugins
/plugin install development-skills@rin2yh-plugins
/plugin install meta-skills@rin2yh-plugins
/plugin install fav-rules@rin2yh-plugins
/plugin install general-skills@rin2yh-plugins
```

## 収録プラグイン

| プラグイン | 内容 |
|---|---|
| `development-skills` | 開発ワークフロー系スキル集 |
| `meta-skills` | Claude Code のスキルやルールを作成・保守するメタスキル集 |
| `fav-rules` | 言語・領域別 `.claude/rules/` パック。`/fav-rules:install <category>` で配置 |
| `general-skills` | 領域を問わず使える汎用スキル集 |

## スキル呼び出し

スキルは `/plugin-name:skill-name` の形式で呼び出せます。Claude が文脈から判断して自動起動することもあります。

## fav-rules の使い方

```
/fav-rules:install ts          # ~/.claude/rules/ts/ に TypeScript 系ルールを配置
/fav-rules:install common      # 共通ルール (develop/response/github-actions/github-review)
/fav-rules:install all         # 全カテゴリ
/fav-rules:install ts project  # 現在のリポジトリの .claude/rules/ts/ に配置
```

カテゴリ一覧は `install-fav-rules --list` で確認できます。

## ディレクトリ構成

プラグインの詳細は各ディレクトリを参照してください。

```
.
├── .claude-plugin/
│   └── marketplace.json
└── plugins/
    ├── development-skills/
    ├── fav-rules/
    ├── general-skills/
    └── meta-skills/
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
