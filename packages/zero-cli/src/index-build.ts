import path from "node:path";
import fs from "fs-extra";

export const listMarkdownFiles = async () => {
  const markdownFiles: string[] = [];
  const root = process.cwd();

  async function walk(current: string): Promise<void> {
    const entries = await fs.readdir(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (
        entry.isFile() &&
        (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))
      ) {
        markdownFiles.push(fullPath);
      }
    }
  }

  await walk(root);

  console.log(markdownFiles);
};
