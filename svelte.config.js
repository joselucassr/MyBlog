import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';
import { fileURLToPath } from 'url';
import { mdsvex } from 'mdsvex'

const dirname = path.resolve(fileURLToPath(import.meta.url), './')

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
  preprocess: mdsvex({ extensions: ['.svx', '.md'] }),

	kit: {
		adapter: adapter()
	}
};

export default config;
