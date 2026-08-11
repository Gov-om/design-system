import { defineConfig, Plugin } from 'vite';
import path from 'path';
import { promises as fs } from 'fs';
import { sync } from 'glob';
import dts from 'vite-plugin-dts';

// glob() expects posix-style separators; path.resolve() emits backslash-joined
// paths on Windows, which silently matches zero files there.
const globPath = (...segments: string[]) =>
  path
    .resolve(__dirname, ...segments)
    .split(path.sep)
    .join('/');
const srcRoot = globPath('src') + '/';

function componentCssPlugin(): Plugin {
  const files = sync(srcRoot + '**/*.css', { ignore: [srcRoot + 'styles/**'] });
  return {
    name: 'gup-lite-component-css',
    apply: 'build',
    async closeBundle() {
      // Loaded dynamically (rather than statically imported) so Vite's esbuild-based config bundler
      // doesn't try to inline postcss's ESM build into this CJS-style require chain.
      const { default: postcss } = await import('postcss');
      const { createRequire } = await import('module');
      const nodeRequire = createRequire(import.meta.url);
      const postcssConfig = nodeRequire('./postcss.config.cjs');
      const processor = postcss(postcssConfig.plugins);
      await Promise.all(
        files.map(async (absPath) => {
          const source = await fs.readFile(absPath, 'utf-8');
          const result = await processor.process(source, { from: absPath, to: absPath });
          const relPath = absPath.split(path.sep).join('/').slice(srcRoot.length);
          const outPath = path.resolve(__dirname, 'dist', relPath);
          await fs.mkdir(path.dirname(outPath), { recursive: true });
          await fs.writeFile(outPath, result.css, 'utf-8');
        })
      );

      // postcss-import resolves the token @import layers; each referenced @fontsource
      // woff2 is copied into dist/fonts/ and its url() rewritten, so tokens.css stays small and the fonts
      // ship as separate cacheable files (the browser fetches only the unicode-range subsets a page uses).
      const postcssImport = nodeRequire('postcss-import');
      const tokensSrc = path.resolve(__dirname, 'src/styles/tokens.css');
      const tokensRaw = await fs.readFile(tokensSrc, 'utf-8');
      const tokensOut = await postcss([postcssImport(), ...postcssConfig.plugins]).process(tokensRaw, { from: tokensSrc, to: tokensSrc });
      let tokensCss = tokensOut.css;

      const fontsOutDir = path.resolve(__dirname, 'dist/fonts');
      await fs.mkdir(fontsOutDir, { recursive: true });
      const fontRefs = new Set([...tokensCss.matchAll(/url\(['"]?(@fontsource\/[^'")]+\.woff2)['"]?\)/g)].map((m) => m[1]));
      for (const ref of fontRefs) {
        const outName = path.basename(ref);
        await fs.copyFile(nodeRequire.resolve(ref), path.resolve(fontsOutDir, outName));
        tokensCss = tokensCss.split(ref).join('./fonts/' + outName);
      }
      await fs.writeFile(path.resolve(__dirname, 'dist/tokens.css'), tokensCss, 'utf-8');
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    componentCssPlugin(),
    dts({
      rollupTypes: true,
      include: [globPath('src/**/*.ts')],
      exclude: [globPath('src/**/*.stories.ts')],
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: [
        ...sync(globPath('src/**/*.ts'), {
          ignore: [globPath('src/**/*.stories.ts'), globPath('src/**/*.type.ts'), globPath('src/**/*.d.ts'), globPath('src/*/index.ts')],
        }),
      ],
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId?.split(path.sep).join('/');
          if (facadeModuleId && facadeModuleId.startsWith(srcRoot) && facadeModuleId.endsWith('.ts')) {
            return facadeModuleId.slice(srcRoot.length).replace(/\.ts$/, '.js');
          }
          return '[name].js';
        },
      },
    },
  },
});
