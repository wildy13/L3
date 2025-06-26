import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

const outputDir = 'docs/dist';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: `${outputDir}/index.js`,
    format: 'esm',
    sourcemap: true,
  },
  external: ['three', 'ecsy'],
  plugins: [
    resolve({ extensions: ['.ts', '.js'] }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: `${outputDir}/types`, // ✅ keep types in same output
      rootDir: 'src',
    }),
    copy({
      targets: [
        { src: 'src/assets/fonts/Inter/*', dest: `${outputDir}/assets/fonts/Inter` },
        { src: 'src/assets/fonts/Roboto/*', dest: `${outputDir}/assets/fonts/Roboto` },
        { src: 'src/assets/fonts/Space_Grotesk/*', dest: `${outputDir}/assets/fonts/Space_Grotesk` },
        { src: 'src/assets/audios/*', dest: `${outputDir}/assets/audios/` },
      ]
    }),
    terser(),
  ],
});

