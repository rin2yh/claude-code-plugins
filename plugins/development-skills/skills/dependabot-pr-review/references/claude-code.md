# Claude Code で実行するとき

## CI green の待機（手順7・9）

**フォアグラウンドの `sleep` は使わない。** セッションを止めてしまううえ、環境によっては禁止されている。

`run_in_background: true` で `sleep`（目安 150〜200秒）を仕掛け、完了通知を受けてから状態を再取得する。

```
Bash(command="sleep 180", run_in_background=true)
```

通知が来たら `pull_request_read`（`method: get_check_runs`）または `gh pr checks <PR番号>` で再取得し、まだ終わっていなければもう一度仕掛ける。

`gh` が使える環境なら `gh run watch <run_id>` をバックグラウンドで走らせる方が待ち時間の無駄が少ない。

## GitHub 操作

GitHub MCP サーバーを設定していれば `mcp__github__*` がそのまま使える。SKILL.md のフロントマターで許可済み。設定していない環境では `gh` CLI にフォールバックする。

## 文体規約の置き場所

コミットメッセージと報告の文体は `CLAUDE.md` および `.claude/rules/*.md` に従う。`fav-rules` プラグインの `common` カテゴリを入れているなら `~/.claude/rules/common/develop.md` と `response.md` がそれにあたる。
