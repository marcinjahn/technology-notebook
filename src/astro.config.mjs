import { defineConfig } from 'astro/config';
import AutoImport from 'astro-auto-import';
import remarkMermaid from 'astro-diagram/remark-mermaid';
import { asideAutoImport, astroAsides } from './integrations/astro-asides';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://marcinjahn.com',
  integrations: [AutoImport({
    imports: [asideAutoImport]
  }), astroAsides(), mdx()],
  markdown: {
    remarkPlugins: [remarkMermaid]
  },
  experimental: {
    assets: true
  }
});