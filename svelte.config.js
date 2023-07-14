import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			mode: "hash",
			directives: { "script-src": ["self"] }
		},
	}
};

export default config;
