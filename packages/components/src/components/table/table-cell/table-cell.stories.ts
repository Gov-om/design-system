import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import '../table/table';
import '../table-row/table-row';
import './table-cell';
import { type TableCell } from './table-cell';

import '../../icon/icon';
import '../../track/track';

const { args, argTypes, template } = getWcStorybookHelpers('gup-table-cell');
type Story = StoryObj<TableCell & typeof args>;

export default {
  title: 'Components/Table/Table cell',
  component: 'gup-table-cell',
  args: {
    ...args,
    'default-slot': 'I am a single cell',
  },
  argTypes,
} as Meta;

export const Default: Story = {
  render: (args) => html`
    <gup-table>
      <gup-table-cell type="header">Header cell</gup-table-cell>
      <gup-table-row>
        ${template(args)}
      </gup-table-row>
    </gup-table>
  `,
};

export const ApplicationDetails: Story = {
  ...Default,
  args: {
    'default-slot': '',
  },
  render: (args) => html`
  <gup-table>
    <gup-table-cell type="header">Header cell</gup-table-cell>
    <gup-table-row>
      ${template(
        args,
        html`
          <gup-track direction="vertical" gap="2">
            <gup-track>
              <gup-icon icon-name="search" width="20" height="20"></gup-icon>
              <span style="color: var(--gup-color-brand-default); font-weight: 700; text-decoration-line: underline;">
                123456
              </span>
            </gup-track>
            <gup-track direction="vertical" gap="0.5">
              <span style="font-weight: 700;">Application name</span>
              <span style="color: var(--gup-color-text-secondary);">Entity</span>
            </gup-track>
            <span>Description</span>
          </gup-track>
        `
      )}
    </gup-table-row>
  </gup-table>
`,
};

export const ApplicationStatus: Story = {
  ...Default,
  args: {
    'default-slot': '',
    dateUpdated: 'Last update: 2021-09-01',
    dateSubmitted: 'Submitted: 2021-08-01',
  },
  argTypes: {
    dateUpdated: {
      name: 'Date updated',
      control: { type: 'text' },
      table: {
        category: 'Playground',
      },
    },
    dateSubmitted: {
      name: 'Date submitted',
      control: { type: 'text' },
      table: {
        category: 'Playground',
      },
    },
  },
  render: (args) => html`
    <gup-table>
      <gup-table-cell type="header">Header cell</gup-table-cell>
      <gup-table-row>
        ${template(
          args,
          html`
            <gup-track direction="vertical" gap="2" style="color: var(--gup-color-text-secondary);">
              <span style="align-self: end;">Status</span>
              <gup-track direction="vertical" gap="2">
                <span>${args.dateUpdated}</span>
                <span>${args.dateSubmitted}</span>
              </gup-track>
            </gup-track>
          `
        )}
      </gup-table-row>
    </gup-table>
  `,
};
