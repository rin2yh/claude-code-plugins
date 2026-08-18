---
name: install-fav-rules
description: 言語・領域カテゴリ別のルールパック (common / ts など) を、ユーザー全体またはこのプロジェクトのルールファイルに配置する。「fav-rules を入れて」「ルールパックを入れて」「TypeScript の規約を入れて」などと明示的に頼まれたときに使う。ルールの中身を書く作業ではなく、既にパッケージされたルール一式を配置する作業。
argument-hint: "<category|all> [user|project]  例: ts / common / all"
allowed-tools:
  - Bash(install-fav-rules:*)
  - Bash(ls:*)
  - Read
---

# Install fav-rules

`rules/` にパッケージされたカテゴリ別のルールを、実行環境に合った形で配置するスキル。

配置そのものは `install-fav-rules` スクリプトが行う。このスキルの役目は、**引数を正しく組み立てること**と、**配置後に何がどこへ入ったかを報告すること**。

## 実行環境による違い

`--format` の既定を実行環境に合わせて明示する。

- **Claude Code** → `--format claude`。`.claude/rules/<category>/` に配置される
- **Codex** → `--format agents`。`AGENTS.md` に書き込まれる。Codex は `.claude/rules/` を読まないので、既定のまま実行するとどこにも効かないファイルが増えるだけになる

`install-fav-rules` は plugin の `bin/` が PATH に載っていればベア名で、載っていなければ `${CLAUDE_PLUGIN_ROOT}/bin/install-fav-rules` のようにフルパスで叩く。

## 引数

```
install-fav-rules <category|all> [user|project] [--format claude|agents]
```

- **第1引数（必須）** カテゴリ名。`common` / `ts` / `all`
  - 利用可能なカテゴリは `install-fav-rules --list` で確認できる
- **第2引数（任意、既定 `user`）**
  - `user` → 全プロジェクトで有効な場所へ配置
  - `project` → 現在のリポジトリだけに配置
- **`--format`（任意）** 出力形式。既定値は上記のとおり実行環境で変わる

## 手順

1. 引数が空なら `install-fav-rules --list` でカテゴリ一覧を出し、**どれを入れるかユーザーに尋ねる**。勝手に `all` を入れない
2. カテゴリ名が一覧に無ければ、そのまま実行せず一覧を見せて聞き直す
3. `--format` を明示して実行する（既定に任せない）
4. **コピー先のパスと、配置されたルールの一覧を報告する**

## 注意

- `--format agents` は既存の `AGENTS.md` をマーカーで挟んだブロック単位で置き換える。手書きの内容は保持され、再実行しても重複しない
- `--format agents` ではルールの `paths:` によるスコープが**機械的には効かなくなる**（代わりに「適用対象」の一行が本文に入る）。配置後の報告で必ず伝える
- 両形式を同じマシンに入れても干渉しない。Claude Code と Codex を併用しているなら両方入れておくとよい
- このスキルはルールの中身を書かない。新しいルールを作りたい、既存のルールを直したい、という依頼なら `meta-skills` プラグインの `rule-creator` の領分
