# Claude Code で実行するとき

## 呼び出し方

プラグインの `bin/` が PATH に載るので、ベア名でそのまま叩ける。

```
install-fav-rules ts
install-fav-rules --list
```

`CLAUDE_PLUGIN_ROOT` はホスト側が設定するため、ルールの取得元は自動で解決される。

## 既定の出力形式

**`--format claude`（省略可）。** Claude Code は `.claude/rules/*.md` を読むので、こちらが本来の形式。

| scope | 配置先 |
|---|---|
| `user`（既定） | `~/.claude/rules/<category>/` |
| `project` | `./.claude/rules/<category>/` |

この形式では各ルールの `paths:` フロントマターがそのまま保たれる。TypeScript のルールは `.ts` / `.tsx` を読むときだけ、テスト規約は `*.test.ts` を読むときだけコンテキストに載る。**スコープが機械的に効くのはこちらだけ。**

## 実行例

```
install-fav-rules ts
install-fav-rules common project
install-fav-rules all
```

## Codex と併用する場合

同じマシンで Codex も使っているなら、`--format agents` で `~/.codex/AGENTS.md` にも配置しておくと両方で同じ規約が効く。二重に配置しても互いに干渉しない。

```
install-fav-rules all
install-fav-rules all --format agents
```
