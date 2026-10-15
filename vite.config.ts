import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const entries = Object.fromEntries(
  readdirSync('src/entries').filter(file => file.endsWith('.ts'))
    .map(file => [`entries/${file.slice(0,-3)}`, resolve('src/entries',file)])
);

export default defineConfig({
  plugins: [vue(), dts({
    entryRoot:'src',outDirs:['dist/vue'],
    include:['src/**/*.ts','src/**/*.vue'],
    tsconfigPath:'./tsconfig.components.json',
    insertTypesEntry:false
  })],
  build:{
    outDir:'dist/vue',emptyOutDir:false,
    lib:{entry:{index:resolve('src/index.ts'),...entries},formats:['es']},
    rollupOptions:{
      external:['vue','@lucide/vue','libphonenumber-js','sanitize-html'],
      output:{entryFileNames:'[name].js',chunkFileNames:'chunks/[name]-[hash].js'}
    }
  }
});
