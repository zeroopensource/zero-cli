import { compile, run } from "@mdx-js/mdx";
// biome-ignore lint/performance/noNamespaceImport: @mdx-js/run expects the JSX runtime module.
import * as runtime from "react/jsx-runtime";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const source = `---
title: Hello World
author: John Doe
---

# Hello

This is my post.
`;

const compiled = await compile(source, {
  outputFormat: "function-body",
  remarkPlugins: [
    remarkFrontmatter,
    [remarkMdxFrontmatter, { name: "frontmatter" }],
  ],
});

const { frontmatter } = await run(compiled, runtime);

const body = source.replace(/^---[\s\S]*?---\n?/, "").trim();

const post = {
  ...frontmatter,
  body,
};

console.log(post);

export const parseMarkdown = async ({ path }: { path: string }) => {};
