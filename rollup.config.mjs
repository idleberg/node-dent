import typescript from '@rollup/plugin-typescript';

export default {
  external: [
  ],
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    typescript()
  ]
};
