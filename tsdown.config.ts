import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
	const isProduction = options.watch !== true;

	return {
		target: 'node20',
		clean: isProduction,
		dts: isProduction,
		entry: ['src/dent.ts'],
		external: ['detect-newline'],
		format: 'esm',
		minify: isProduction,
	};
});
