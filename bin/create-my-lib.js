#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const projectName = process.argv[2] || "my-app";
const targetDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
  console.error(`Папка "${projectName}" уже существует`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const packageJson = {
  name: projectName,
  version: "0.1.0",
  private: true,
  scripts: {
    dev: "vite",
    build: "vite build",
  },
};

fs.writeFileSync(
  path.join(targetDir, "package.json"),
  JSON.stringify(packageJson, null, 2),
);

fs.writeFileSync(path.join(targetDir, "README.md"), `# ${projectName}\n`);

console.log(`Проект "${projectName}" создан в ${targetDir}`);
console.log(`\nДальше:\n  cd ${projectName}\n  npm install\n`);
