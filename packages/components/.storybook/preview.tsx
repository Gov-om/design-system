import { setCustomElementsManifest } from '@storybook/web-components';
import type { Preview, WebComponentsRenderer } from '@storybook/web-components';
import * as format from 'js-beautify';
import customElements from '../custom-elements.json';
import { breakpointViewports, htmlAddonTransformSource, htmlAddonTransformSourceStripAll } from './utils';
import { withActions } from '@storybook/addon-actions/decorator';
import { setWcStorybookHelpersConfig } from 'wc-storybook-helpers';
import { Title, Subtitle, Description, Primary, Controls, Stories, DocsContext, DocsContextProps } from '@storybook/blocks';
import React, { useContext } from 'react';
import { getComponentsMetaCEM } from './get-components-meta-cem';
import ComponentDocMetadata from './components/component-doc-metadata';

const isDropdownMenuOpen = (): boolean => {
  const dropdowns = document.querySelectorAll('gup-dropdown-field');
  for (const dropdown of dropdowns) {
    const popupWrapper = dropdown.shadowRoot?.querySelector('.dropdown-menu') as HTMLElement;
    if (popupWrapper && window.getComputedStyle(popupWrapper).display !== 'none') {
      return true;
    }
  }
  return false;
};

const sendHeight = () => {
  let height = document.body.scrollHeight;
  const url = window.location.href;
  const dropdownOpen = isDropdownMenuOpen();

  if (height < 100) {
    if (url.includes('components-dialogs-dialog')) {
      height = 350;
    } else if (url.includes('components-tooltip')) {
      height = 200;
    }
  }

  if (url.includes('dropdown-dropdown-field')) {
    if (dropdownOpen) {
      height = 520;
    } else {
      height = 120;
    }
  }

  window.parent.postMessage({ type: 'setHeight', height }, '*');
};

if (typeof window !== 'undefined') {
  sendHeight();

  const resizeObserver = new ResizeObserver(sendHeight);
  resizeObserver.observe(document.body);

  const mutationObserver = new MutationObserver(sendHeight);
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });

  document.addEventListener(
    'click',
    () => {
      // Delay to allow dropdown state to update
      setTimeout(sendHeight, 50);
    },
    true
  );
}

setWcStorybookHelpersConfig({ typeRef: 'expandedType' });
setCustomElementsManifest(customElements);

import '../src/styles/styles.css';
import './styles.css';

const allComponentsCEMMeta = getComponentsMetaCEM();

const backgrounds = [
  {
    name: 'light',
    value: '#ffffff',
  },
  {
    name: 'dark',
    value: 'var(--gup-color-content-primary)',
  },
  {
    name: 'GUP',
    value: 'var(--gup-color-background-canvas)',
  },
];

const preview: Preview = {
  parameters: {
    axe: {
      // Disable aria-prohibited-attr rule globally to handle flag icons with decorative aria-labels
      disabledRules: ['aria-prohibited-attr'],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      disableSaveFromUI: true,
    },
    backgrounds: {
      default: 'light',
      values: backgrounds,
      grid: {
        disable: true,
      },
    },
    html: {
      root: '#root-inner',
      removeComments: true,
      prettier: {
        htmlWhitespaceSensitivity: 'ignore',
        bracketSameLine: true,
        singleAttributePerLine: false,
        printWidth: 140,
      },
      transform: (code: string) =>
        `<!-- Attention! This code snippet lacks any Javascript that might be necessary for the example to work. \nCheck the full code snippet out on the Documentation page for this component. --> ${htmlAddonTransformSourceStripAll(code)}`,
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Installation',
          'Using without bundler',
          'Using with frameworks',
          'Using with React',
          'Using with Angular',
          'Usage',
          'Changelog',
          'Versions',
          'Design tokens',
          'Components',
          ['Layout', ['Header'], 'Forms', ['Form list']],
          'Lite Components',
          ['Installation'],
        ],
      },
    },
    viewport: {
      // For Storybook itself, because we are using viewportStoryGlobals: true
      options: {
        ...breakpointViewports,
      },
      // For Chromatic, since it is not yet compatible with viewportStoryGlobals
      viewports: {
        ...breakpointViewports,
        /* xsmall: {
          name: 'xsmall',
          styles: {
            width: '360px',
            height: '900px',
          },
        }, */
      },
    },
    layout: 'centered',
    chromatic: { ignoreSelectors: ['storybook-comment'] },
    docs: {
      toc: {
        ignoreSelector: 'h3.toc-ignore',
        title: 'Jump to',
      },
      source: {
        transform: (code: string) => {
          return format.html(htmlAddonTransformSource(code), { indent_size: 2 });
        },
      },
      page: () => {
        const context: DocsContextProps = useContext(DocsContext);
        const attachedCSFFile = (context as any).attachedCSFFiles.values().next().value;
        const componentName = attachedCSFFile?.meta.component;
        const componentCEMMeta = attachedCSFFile && allComponentsCEMMeta.find((c) => c.tagName === componentName);

        const publicMethods = componentCEMMeta?.members.filter((m: any) => ['method', 'field'].includes(m.kind) && m.privacy === 'public');
        return (
          <>
            <Title />
            <Subtitle />
            <Description />
            {componentCEMMeta && (
              <ComponentDocMetadata
                heading={'General'}
                items={[
                  { description: 'Tag name: ' + '<code>' + componentCEMMeta.tagName + '</code>' },
                  { description: 'Class name: ' + '<code>' + componentCEMMeta.name + '</code>' },
                ]}
              />
            )}
            {componentCEMMeta?.dependencies.length > 0 && <ComponentDocMetadata heading={'Depends on'} items={componentCEMMeta.dependencies} />}
            {publicMethods && publicMethods.length > 0 && <ComponentDocMetadata heading={'Public API'} items={publicMethods} />}
            <Primary />
            <Controls />
            <Stories />
          </>
        );
      },
    },
  },

  decorators: [
    withActions<WebComponentsRenderer>,
    (Story, context) => {
      const direction = context.parameters?.direction || 'ltr';
      document.documentElement.dir = direction;

      const updatedArgs = {
        ...context.args,
        // the main purpose of this extra arg is to pass a unique story id to each story so that we could use it in story-specific demo scripts. Note it is added as an attribute to the component host element (as a side effect of wc-storybook-helpers functionality), but it does no useful job there
        // 'storybook-root' in dedicated canvas mode, story ID in Documentation mode
        'data-story-id': context.canvasElement.id,
      };

      // Pass the updated args to the story
      return Story({
        ...context,
        args: updatedArgs,
      });
    },
  ],
  tags: ['autodocs'],
};

export default preview;
