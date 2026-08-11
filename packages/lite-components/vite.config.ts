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

// Component CSS (src/<component>/<name>.css) is copied straight into dist,
// preserving each folder, so consumers can `import '@govom/lite-components/button/button.css'`.
// It runs through the same postcss pipeline (nesting, autoprefixer) as the rest of the package but
// bypasses Rollup's asset pipeline: routing CSS through build.lib.entry triggers Rollup's
// name-collision handling and renames files (e.g. button.css -> button2.css).
// src/styles/tokens.css is NOT handled here - it needs @import + font-asset inlining, which Vite's
// own CSS pipeline does, so it goes through build.lib.entry instead.
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
        path.resolve(__dirname, 'src/styles/tokens.css'),
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
