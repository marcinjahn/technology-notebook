import { defineConfig } from 'astro/config';
import AutoImport from 'astro-auto-import';
import remarkMermaid from 'astro-diagram/remark-mermaid';
import { astroCodeSnippets, codeSnippetAutoImport } from './integrations/astro-code-snippets';
import { asideAutoImport, astroAsides } from './integrations/astro-asides';
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://marcinjahn.com',
  integrations: [AutoImport({
    imports: [asideAutoImport, codeSnippetAutoImport]
  }), astroAsides(), astroCodeSnippets(), mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMermaid],
    syntaxHighlight: 'shiki',
  },
  experimental: {
    assets: true
  }
});