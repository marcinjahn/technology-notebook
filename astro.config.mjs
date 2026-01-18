import { defineConfig } from 'astro/config';
import AutoImport from 'astro-auto-import';
import remarkMermaid from 'astro-diagram/remark-mermaid';
import { asideAutoImport, astroAsides } from './integrations/astro-asides';
import mdx from "@astrojs/mdx";
// import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://marcinjahn.com',
  trailingSlash: 'never',
  vite: {
    ssr: {
      external: ['octokit'],
    },
  },
  integrations: [AutoImport({
    imports: [asideAutoImport]
  }), 
  sitemap({
    filter: (page) => !page.startsWith('https://marcinjahn.com/internal'),
  }),
  astroAsides(),
  expressiveCode({
    themes: ['one-dark-pro'],
    styleOverrides: {
      frames: {
        frameBoxShadowCssValue: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        tooltipSuccessBackground: '#035166'
      }
    }
  }), 
  mdx(),
  partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }),
],
  markdown: {
    remarkPlugins: [remarkMermaid],
  }
});