#!/usr/bin/env node
// Claude Code 用マニフェストを入力に、Codex 用マニフェストを生成する。
//
//   node scripts/sync-manifests.mjs           生成して書き出す
//   node scripts/sync-manifests.mjs --check   差分があれば非ゼロ終了（CI 用）
//
// 入力:
//   .claude-plugin/marketplace.json           プラグインの並び順と description
//   plugins/<name>/.claude-plugin/plugin.json 各プラグインのメタデータ
// 出力:
//   .agents/plugins/marketplace.json          Codex 用カタログ
//   plugins/<name>/.codex-plugin/plugin.json  Codex 用マニフェスト
//
// interface ブロックは Claude Code 側に対応するフィールドがなく生成できないため、
// 下の INTERFACE テーブルに直書きする。プラグインは滅多に増えないので、
// ファイルを増やすよりテーブル 1 箇所にまとめた方が追いやすい。

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** marketplace 自体の表示名。marketplace.json の name とは別物なので導出できない。 */
const MARKETPLACE_DISPLAY_NAME = "rin2yh plugins";

/** @type {Record<string, {displayName: string, shortDescription: string, category: string, capabilities: string[]}>} */
const INTERFACE = {
  "development-skills": {
    displayName: "Development Skills",
    shortDescription: "Dependabot PR レビューと t_wada 式 TDD のワークフロー",
    category: "Developer Tools",
    capabilities: ["Read", "Write"],
  },
  "meta-skills": {
    displayName: "Meta Skills",
    shortDescription: "プロジェクトルールを作成・編集するメタスキル",
    category: "Developer Tools",
    capabilities: ["Read", "Write"],
  },
  "fav-rules": {
    displayName: "Fav Rules",
    shortDescription: "言語・領域別のルールパックを配置するインストーラ",
    category: "Developer Tools",
    capabilities: ["Read", "Write"],
  },
  "general-skills": {
    displayName: "General Skills",
    shortDescription: "日本語校正など領域を問わない汎用スキル",
    category: "Productivity",
    capabilities: ["Read", "Write"],
  },
};

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

/** INTERFACE の引き当て。プラグインを足して定義を忘れたら、黙って既定値を出さず落とす。 */
function requireInterface(name) {
  const iface = INTERFACE[name];
  if (!iface) throw new Error(`INTERFACE テーブルに '${name}' の定義がありません`);
  return iface;
}

/** Codex 用プラグインマニフェストを組み立てる。 */
function buildCodexPlugin(name) {
  const src = readJson(join(ROOT, "plugins", name, ".claude-plugin", "plugin.json"));
  const iface = requireInterface(name);

  const manifest = {
    name: src.name,
    version: src.version,
    description: src.description,
    author: src.author,
    homepage: src.homepage,
    repository: src.repository,
    license: src.license,
    keywords: src.keywords,
  };

  // skills/ を持たないプラグインに skills を書くと、Codex 側で空ディレクトリを探しに行く。
  if (existsSync(join(ROOT, "plugins", name, "skills"))) {
    manifest.skills = "./skills/";
  }

  manifest.interface = {
    displayName: iface.displayName,
    shortDescription: iface.shortDescription,
    longDescription: src.description,
    developerName: src.author?.name,
    category: iface.category,
    capabilities: iface.capabilities,
    websiteURL: src.homepage,
  };

  return manifest;
}

/** Codex 用 marketplace カタログを組み立てる。 */
function buildCodexMarketplace(marketplace) {
  return {
    name: marketplace.name,
    description: marketplace.description,
    interface: { displayName: MARKETPLACE_DISPLAY_NAME },
    plugins: marketplace.plugins.map((p) => ({
      name: p.name,
      source: { source: "local", path: p.source },
      description: p.description,
      category: requireInterface(p.name).category,
    })),
  };
}

function main() {
  const check = process.argv.includes("--check");
  const marketplace = readJson(join(ROOT, ".claude-plugin", "marketplace.json"));

  const outputs = [
    [join(ROOT, ".agents", "plugins", "marketplace.json"), buildCodexMarketplace(marketplace)],
    ...marketplace.plugins.map((p) => [
      join(ROOT, "plugins", p.name, ".codex-plugin", "plugin.json"),
      buildCodexPlugin(p.name),
    ]),
  ];

  const stale = [];
  for (const [path, content] of outputs) {
    const text = `${JSON.stringify(content, null, 2)}\n`;
    const current = existsSync(path) ? readFileSync(path, "utf8") : null;
    if (current === text) continue;

    if (check) {
      stale.push(relative(ROOT, path));
      continue;
    }
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, text);
    console.log(`${current === null ? "created" : "updated"} ${relative(ROOT, path)}`);
  }

  if (check && stale.length > 0) {
    console.error("Codex 用マニフェストが古くなっています:");
    for (const path of stale) console.error(`  - ${path}`);
    console.error("\nnode scripts/sync-manifests.mjs を実行して差分をコミットしてください。");
    process.exit(1);
  }
  console.log(check ? "manifests are in sync" : "done");
}

main();
