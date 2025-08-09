// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const isProd = process.env.NODE_ENV === "production"

// https://astro.build/config
export default defineConfig({
    site: isProd ? "https://toreerdmann.github.io" : 'https://example.com',
    base: "/blog",
	integrations: [mdx(), sitemap()],
});
