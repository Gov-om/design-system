import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/web-components-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('storybook-addon-rtl'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@whitespace/storybook-addon-html'),
    '@chromatic-com/storybook',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },
  features: {
    viewportStoryGlobals: true,
  },
  docs: {
    defaultName: 'Documentation',
  },
  staticDirs: ['./public'],

  async viteFinal(config) {
    config.server = config.server || {};
    config.server.headers = config.server.headers || {};
    config.server.headers['Content-Security-Policy'] = 'frame-ancestors *';

    return config;
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
