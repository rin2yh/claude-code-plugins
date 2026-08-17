# Codex で実行するとき

## 呼び出し方

プラグインの `bin/` が PATH に載る保証はないので、**フルパスで叩く**。

```
"${CODEX_PLUGIN_ROOT}/bin/install-fav-rules" ts --format agents
```

`CODEX_PLUGIN_ROOT` が未設定なら、このスキルの `SKILL.md` があるディレクトリから2つ上がプラグインルート。

```
<plugin-root>/bin/install-fav-rules
<plugin-root>/skills/install-fav-rules/SKILL.md   ← このスキル
```

スクリプトは環境変数が無くても自身のパスからルールの取得元を逆算するので、フルパスさえ合っていれば動く。

## 既定の出力形式

**`--format agents` を明示する。** Codex は `.claude/rules/` を読まないため、既定値の `claude` のまま実行すると**どこにも効かないファイルが増えるだけ**になる。

| scope | 配置先 |
|---|---|
| `user`（既定） | `~/.codex/AGENTS.md` |
| `project` | `./AGENTS.md` |

## AGENTS.md に書き込むときの挙動

カテゴリごとにマーカーで挟んだブロックを書く。

```markdown
<!-- fav-rules:begin ts -->

## fav-rules: ts

### 命名規則

適用対象: `**/*.{ts,tsx}`

...
<!-- fav-rules:end ts -->
```

- 既にそのカテゴリのブロックがあれば**中身を差し替える**。追記ではないので再実行しても重複しない
- マーカーの外にある手書きの内容には触れない
- 見出しは2段下げて挿入されるので、`AGENTS.md` の `#` タイトルの下に収まる

## パススコープが失われることを伝える

`.claude/rules/` の `paths:` にあたる仕組みが `AGENTS.md` には無い。変換時にフロントマターは剥がされ、代わりに各ルールの見出し直下へ「適用対象: `**/*.{ts,tsx}`」の一行が生成される。

これは**機械的なスコープではなく、読ませて守らせる形**になる。配置後の報告で必ず一言添える。

## 実行例

```
"${CODEX_PLUGIN_ROOT}/bin/install-fav-rules" --list
"${CODEX_PLUGIN_ROOT}/bin/install-fav-rules" ts --format agents
"${CODEX_PLUGIN_ROOT}/bin/install-fav-rules" all project --format agents
```
