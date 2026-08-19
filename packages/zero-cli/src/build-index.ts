import { getMarkdownPaths } from "./get-markdown-paths";
import { parseMarkdown } from "./parse-markdown";

// const parseMarkdown = async () => {};

// const validateJsonSchema = async () => {};

// const exportSqlite = async () => {};

// const exportCsv = async () => {};

// const exportJson = async () => {};

// add crc to detect changes in index, hash will not be saved on markdown files, but will be added to parsed sqlite file and json file

// generate both complete seed and update seed

export const buildIndex = async () => {
  const markdownPaths: string[] = await getMarkdownPaths();
  for (const path of markdownPaths) {
    const parsedMd = await parseMarkdown({ path });
    console.log(parsedMd);
  }
  // "$schema": https://zero-index.zeroopensource.org/schema.json
  // parse frontmatter with mdxjs
  // filter with zero index json schema
  // validate json schema with zod
  // compile to sqlite and csv and json
  console.log(markdownPaths);
};
