import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './flyout';
import { type Flyout } from './flyout';

import '../button-group/button-group';
import '../button/button';
import '../link/link';
import '../dropdown/dropdown-field/dropdown-field';
import '../dropdown/dropdown-menu-item/dropdown-menu-item';
import '../dropdown/dropdown-menu/dropdown-menu';
import '../input-field/input-field';

const { args, argTypes, template, events } = getWcStorybookHelpers('gup-flyout');
type Story = StoryObj<Flyout & typeof args>;

export default {
  title: 'Components/Flyout',
  component: 'gup-flyout',
  args: {
    ...args,
    heading: 'Title',
    position: 'right',
  },
  argTypes: {
    ...argTypes,
    position: {
      control: false,
    },
  },
  parameters: {
    layout: 'fullscreen',
    actions: {
      handles: events,
    },
  },
} as Meta;

// Right flyout content - Display info + Update fields
const rightContentTemplate = html`
  <div style="display: flex; flex-direction: column; gap: 48px;">
    <!-- Display Info Section -->
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div style="display: flex; flex-direction: column; gap: 4px; color: var(--gup-color-content-primary, #27272a);">
        <span style="font-size: 16px; font-weight: 700; line-height: 24px;">Civil ID</span>
        <span style="font-size: 20px; font-weight: 400; line-height: 28px;">1034580392</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; color: var(--gup-color-content-primary, #27272a);">
        <span style="font-size: 16px; font-weight: 700; line-height: 24px;">Expiry Date</span>
        <span style="font-size: 20px; font-weight: 400; line-height: 28px;">01/02/2028</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; color: var(--gup-color-content-primary, #27272a);">
        <span style="font-size: 16px; font-weight: 700; line-height: 24px;">Full Name</span>
        <span style="font-size: 20px; font-weight: 400; line-height: 28px;">First Name Last Name</span>
      </div>
    </div>
    <!-- Form Section - Update Fields -->
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <gup-input-field label="Update field">Update field</gup-input-field>
      <gup-input-field label="Update field">Update field</gup-input-field>
      <gup-input-field label="Update field">Update field</gup-input-field>
      <gup-input-field label="Update field">Update field</gup-input-field>
    </div>
  </div>
`;

// Left flyout content - Filter dropdowns
const leftContentTemplate = html`
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <gup-dropdown-field placeholder="Select an option">
      <span slot="label">Filter</span>
      <gup-dropdown-menu>
        <gup-dropdown-menu-item label="Option 1" value="1"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="Option 2" value="2"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="Option 3" value="3"></gup-dropdown-menu-item>
      </gup-dropdown-menu>
    </gup-dropdown-field>
    <gup-dropdown-field placeholder="Select an option">
      <span slot="label">Filter</span>
      <gup-dropdown-menu>
        <gup-dropdown-menu-item label="Option 1" value="1"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="Option 2" value="2"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="Option 3" value="3"></gup-dropdown-menu-item>
      </gup-dropdown-menu>
    </gup-dropdown-field>
    <gup-dropdown-field placeholder="Select an option">
      <span slot="label">Filter</span>
      <gup-dropdown-menu>
        <gup-dropdown-menu-item label="Option 1" value="1"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="Option 2" value="2"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="Option 3" value="3"></gup-dropdown-menu-item>
      </gup-dropdown-menu>
    </gup-dropdown-field>
  </div>
`;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 24px; min-height: 100vh;">
      <gup-button
        @gup-click=${(e: Event) => {
          const flyout = (e.target as HTMLElement).parentElement?.querySelector('gup-flyout') as Flyout;
          flyout?.show();
        }}
      >
        Open Flyout
      </gup-button>
      ${template(
        args,
        html`
          ${rightContentTemplate}
          <div slot="footer" style="width: 100%;">
            <div style="display: flex; justify-content: flex-end; gap: 12px; width: 100%;">
              <gup-button
                appearance="secondary"
                @gup-click=${(e: Event) => {
                  const flyout = (e.target as HTMLElement).closest('gup-flyout') as Flyout;
                  flyout?.hide();
                }}
              >Cancel</gup-button>
              <gup-button>Save changes</gup-button>
            </div>
          </div>
        `
      )}
    </div>
  `,
};

export const Left: Story = {
  render: (args) => html`
    <div style="padding: 24px; min-height: 100vh;">
      <gup-button
        @gup-click=${(e: Event) => {
          const flyout = (e.target as HTMLElement).parentElement?.querySelector('gup-flyout') as Flyout;
          flyout?.show();
        }}
      >
        Open Flyout
      </gup-button>
      ${template(
        args,
        html`
          ${leftContentTemplate}
          <div slot="footer" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <gup-link
                href="#"
                @click=${(e: Event) => {
                  e.preventDefault();
                  const flyout = (e.target as HTMLElement).closest('gup-flyout') as HTMLElement;
                  const dropdowns = flyout?.querySelectorAll('gup-dropdown-field') as NodeListOf<HTMLElement & { value: string; clear?: () => void }>;
                  dropdowns?.forEach((dropdown) => {
                    if (dropdown.clear) {
                      dropdown.clear();
                    } else {
                      dropdown.value = '';
                    }
                  });
                }}
              >Clear all</gup-link>
              <gup-button-group>
                <gup-button
                  appearance="secondary"
                  @gup-click=${(e: Event) => {
                    const flyout = (e.target as HTMLElement).closest('gup-flyout') as Flyout;
                    flyout?.hide();
                  }}
                >Cancel</gup-button>
                <gup-button>Apply</gup-button>
              </gup-button-group>
            </div>
          </div>
        `
      )}
    </div>
  `,
  args: {
    position: 'left',
  },
};

export const Top: Story = {
  ...Default,
  args: {
    position: 'top',
  },
};

export const Bottom: Story = {
  ...Default,
  args: {
    position: 'bottom',
  },
};
