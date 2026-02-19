import * as React from 'react';
import Tool from './Tool';
import { addons, types } from '@storybook/manager-api';

addons.register('gup/reset-url-args', () => {
  addons.add('gup/reset-url-args', {
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <Tool />,
    title: 'Reset URL',
    type: types.TOOL,
  });
});
