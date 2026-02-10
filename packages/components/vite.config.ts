import { defineConfig } from 'vite';
import path from 'path';
import { sync } from 'glob';
import postcssLit from 'rollup-plugin-postcss-lit';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@icons': path.resolve(__dirname, '../icons/dist'),
    },
  },
  plugins: [
    postcssLit(),
    dts({
      rollupTypes: true,
      include: [path.resolve(__dirname, 'src/components/**/*.ts')],
      exclude: [path.resolve(__dirname, 'src/components/**/*.stories.ts'), path.resolve(__dirname, 'src/components/**/index.ts')],
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: [
        ...sync(path.resolve(__dirname, 'src/components/**/*.ts'), {
          ignore: [
            path.resolve(__dirname, 'src/components/**/*.stories.ts'),
            path.resolve(__dirname, 'src/components/**/*.type.ts'),
            path.resolve(__dirname, 'src/components/**/*.d.ts'),
            path.resolve(__dirname, 'src/components/**/index.ts'),
          ],
        }),
        path.resolve(__dirname, 'src/styles/styles.css'),
      ],
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        chunkFileNames: (chunkInfo) => {
          const fileName = '[name]-[hash].js';
          let buildPath = fileName;
          if (chunkInfo.moduleIds && chunkInfo.moduleIds.length > 0) {
            const modulePath = chunkInfo.moduleIds[0];
            if (modulePath.includes('/flags/')) {
              if (modulePath.includes('/rectangle/')) {
                buildPath = 'assets/flags/rectangle/' + fileName;
              }
              if (modulePath.includes('/circle/')) {
                buildPath = 'assets/flags/circle/' + fileName;
              }
            }
            if (modulePath.includes('/icons/dist/build/')) {
              buildPath = 'assets/icons/' + fileName;
            }
          }
          return buildPath;
        },
      },
    },
  },
});
