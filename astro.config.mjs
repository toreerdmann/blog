// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
    site: "https://toreerdmann.github.io",
    base: "/blog",
	integrations: [mdx(), sitemap()],
});
