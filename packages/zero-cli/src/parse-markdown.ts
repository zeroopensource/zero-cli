import fs from "node:fs/promises";
import matter from "gray-matter";

export const parseMarkdown = async <T extends object>({
  path,
}: {
  path: string;
}): Promise<T & { body: string }> => {
  const source = await fs.readFile(path, "utf8");

  const { data, content } = matter(source);

  return {
    ...(data as T),
    body: content,
  };
};