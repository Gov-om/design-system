import { getTsProgram, expandTypesPlugin } from 'cem-plugin-expanded-types';
import { customJSDocTagsPlugin } from 'cem-plugin-custom-jsdoc-tags';

export default {
  globs: ['src/components/**/*.ts'],
  exclude: ['src/components/**/*.stories.ts'],
  litelement: true,
  // dev: true,
  // watch: true,
  overrideModuleCreation: ({ ts, globs }) => {
    const program = getTsProgram(ts, globs, 'tsconfig.json');
    return program.getSourceFiles().filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },
  plugins: [
    expandTypesPlugin({
      hideLogs: true,
    }),
    customJSDocTagsPlugin({
      hideLogs: true,
      tags: {
        dependency: {
          mappedName: 'dependencies',
          isArray: true,
        },
      },
    }),
  ],
};
