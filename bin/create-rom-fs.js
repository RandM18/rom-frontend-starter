#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectNameArg = process.argv[2];
const projectName = projectNameArg && !projectNameArg.startsWith("-") ? projectNameArg : "my-app";

const targetDir = path.resolve(process.cwd(), projectName);
const templateDir = path.resolve(__dirname, "../template");

function log(message) {
  process.stdout.write(`${message}\n`);
}

function error(message) {
  process.stderr.write(`${message}\n`);
}

if (fs.existsSync(targetDir)) {
  error(`❌ Папка "${projectName}" уже существует`);
  process.exit(1);
}

try {
  fs.cpSync(templateDir, targetDir, {
    recursive: true,
    force: false,
  });

  const packageJsonPath = path.join(targetDir, "package.json");

  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    pkg.name = projectName;
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
  }

  const gitignoreFrom = path.join(targetDir, "gitignore");
  const gitignoreTo = path.join(targetDir, ".gitignore");

  if (fs.existsSync(gitignoreFrom) && !fs.existsSync(gitignoreTo)) {
    fs.renameSync(gitignoreFrom, gitignoreTo);
  }

  log(`✅ Проект "${projectName}" создан`);
  log(`📦 Устанавливаю зависимости...`);

  execSync("npm install", {
    cwd: targetDir,
    stdio: "inherit",
  });

  log("");
  log("🚀 Готово");
  log(`cd ${projectName}`);
  log("npm run dev");
} catch (err) {
  error("❌ Не удалось создать проект");
  error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
