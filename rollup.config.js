import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'docs/dist/index.js',
    format: 'esm',
    sourcemap: true,
  },
  external: ['three', 'ecsy'],
  plugins: [
    resolve({ extensions: ['.ts', '.js'] }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      rootDir: 'src',
    }),
    copy({
      targets: [
        { src: 'src/assets/fonts/Inter/*', dest: 'dist/assets/fonts/Inter' },
        { src: 'src/assets/fonts/Roboto/*', dest: 'dist/assets/fonts/Roboto' },
        { src: 'src/assets/fonts/Space_Grotesk/*', dest: 'dist/assets/fonts/Space_Grotesk' },
        { src: 'src/assets/audios/*', dest: 'dist/assets/audios/' },
      ]
    }),
    terser(),
  ],
});
