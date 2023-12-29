import { defineConfig } from 'tsup';

export default defineConfig({
	target: 'esnext',
  clean: true,
  dts: true,
  entry: ['src/dent.ts'],
	external: ['detect-newline'],
	format: 'esm',
  minify: true,
  treeshake: 'recommended'
});
