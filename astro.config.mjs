// @ts-check
import remarkCallout from "@r4ai/remark-callout";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
  image: {
    responsiveStyles: true,
    layout: "constrained",
    objectFit: "scale-down"
  },
  markdown: {
    remarkPlugins: [
      [remarkGfm, {}],
      [remarkCallout, {}],
      [remarkToc, { heading: "Contents", maxDepth: 3 }],
      [remarkMath, {}],
    ],
    rehypePlugins: [[rehypeKatex, {}]],
  },
});
