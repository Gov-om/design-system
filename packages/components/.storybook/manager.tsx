import React from 'react';
import ResetArgsTool from './addons/reset-args/Tool';
import { addons as managerAddons, type HashEntry } from '@storybook/manager-api';
import { addons, types } from '@storybook/manager-api';
import { create } from '@storybook/theming';

import SidebarTag from './components/sidebar-tag';

managerAddons.setConfig({
  sidebar: {
    renderLabel: (item: HashEntry) => (
      <>
        {item.name}
        <SidebarTag item={item} />
      </>
    ),
  },
});

addons.register('gup/reset-url-args', () => {
  addons.add('gup/reset-url-args', {
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <ResetArgsTool />,
    title: 'Reset URL',
    type: types.TOOL,
  });
});

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Design System',
    brandImage: './logo.svg',
    brandTarget: '_self',
  }),
});
