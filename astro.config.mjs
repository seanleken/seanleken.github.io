// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypePrettyCode from "rehype-pretty-code";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

export default defineConfig({
  site: "https://seanleken.github.io",
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        [rehypePrettyCode, { theme: "github-light", keepBackground: false }],
      ],
    }),
  },
});
