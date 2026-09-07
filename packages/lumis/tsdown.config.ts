import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
	const isProduction = options.watch !== true;

	return {
		target: 'node20',
		clean: isProduction,
		dts: isProduction,
		entry: ['src/index.ts', 'src/language.ts'],
		format: ['cjs', 'esm'],
		minify: isProduction,
	};
});
