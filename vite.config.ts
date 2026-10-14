
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      outDirs: ['dist/vue'],
      include: [
        'src/**/*.ts',
        'src/**/*.vue'
      ],
      tsconfigPath: './tsconfig.components.json',
      insertTypesEntry: true,
      copyDtsFiles: true
    })
  ],

  build: {
    outDir: 'dist/vue',
    emptyOutDir: false,
    sourcemap: true,

    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js'
    },

    rollupOptions: {
      external: ['vue']
    }
  }
});
