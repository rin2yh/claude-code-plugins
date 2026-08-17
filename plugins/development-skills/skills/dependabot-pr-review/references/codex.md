# Codex で実行するとき

## CI green の待機（手順7・9）

`run_in_background` にあたる仕組みは前提にしない。代わりに `gh` の待機コマンドを使う。

```
gh run watch <run_id> --exit-status
```

`gh run watch` は run が終わるまでブロックし、失敗したら非ゼロで終了する。PR 側のチェックを待つなら:

```
gh pr checks <PR番号> --watch --fail-fast
```

これらが使えない場合に限り、`sleep 180` を挟んでからポーリングする。**その場合も1回の待機は200秒程度までにして、状態を再取得してから次を判断する。** 長時間ブロックするとサンドボックスのタイムアウトに当たる。

## GitHub 操作

`mcp__github__*` は Codex では使えない（SKILL.md の `allowed-tools` に並んでいても無視される）。**`gh` CLI を前提にする。**

手順中に MCP と `gh` が併記されている箇所は、すべて `gh` 側を読む。

```
gh pr list --state open --author "app/dependabot" --json number,title,headRefName,labels
gh pr view <PR番号>
gh pr view <PR番号> --json mergeable,mergeStateStatus,statusCheckRollup
gh pr update-branch <PR番号>
gh pr merge <PR番号> --merge
gh run list --workflow=ci.yaml --branch=main
```

`gh auth status` が通らない環境では、このスキルは使えない。その旨を伝えて中断する。

## 文体規約の置き場所

コミットメッセージと報告の文体は `AGENTS.md`（リポジトリルート、および `~/.codex/AGENTS.md`）に従う。`fav-rules` プラグインを `--format agents` で入れているなら、`AGENTS.md` 内の `fav-rules:begin common` ブロックがそれにあたる。
