import path from "node:path";
import fs from "fs-extra";

export const getMarkdownPaths = async () => {
  const paths: string[] = [];
  const root = process.cwd();
  const ignoredDirs = [
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage",
  ];
  const includeExtensions = [".md", ".mdx"];
  async function walk(current: string): Promise<void> {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (ignoredDirs.includes(entry.name)) {
          continue;
        }
        await walk(fullPath);
      } else if (
        entry.isFile() &&
        includeExtensions.some((ext) => entry.name.endsWith(ext))
      ) {
        paths.push(fullPath);
      }
    }
  }
  await walk(root);
  return paths;
};