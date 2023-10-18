import typescript from '@rollup/plugin-typescript';

export default {
	external: [
		'detect-newline',
		'node:os'
	],
	input: 'src/main.ts',
	output: {
		file: 'dist/index.mjs',
		format: 'esm',
		sourcemap: true
	},
	plugins: [
		typescript()
	]
};
