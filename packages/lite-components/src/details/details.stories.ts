import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { gupDetailsClasses } from './details';

import './details.css';

type Story = StoryObj;

export default {
  title: 'Lite Components - WIP/Details',
  tags: ['autodocs', 'BETA'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Details

A disclosure element using native \`<details>\`/\`<summary>\` - no JavaScript required to open or close.

The close button in the sink appearance uses a minimal inline \`onclick\` to close the panel.

### Usage

\`\`\`html
<details class="gup-details gup-details--quote">
  <summary class="gup-details__label">
    <span class="gup-details__icon" aria-hidden="true"></span>
    <span class="gup-details__label-inner">Show more</span>
  </summary>
  <div class="gup-details__content">
    <div class="gup-details__content-inner">Content here</div>
  </div>
</details>
\`\`\`

### Available classes

| Class | Description |
|---|---|
| \`.gup-details\` | Base class on the \`<details>\` element (required) |
| \`.gup-details--quote\` | Bordered quote block, max-width 328 px (default appearance) |
| \`.gup-details--sink\` | Full-width panel with background; add a close button inside \`.gup-details__content-inner\` |
| \`.gup-details--none\` | No styled content wrapper |
| \`.gup-details--circle-toggle\` | Add-circle / remove-circle icons instead of default arrows |
| \`.gup-details--no-icon\` | Hides the toggle icon |
| \`.gup-details__label\` | The \`<summary>\` element |
| \`.gup-details__icon\` | Toggle icon (add \`aria-hidden="true"\`) |
| \`.gup-details__label-inner\` | Label text |
| \`.gup-details__content\` | Content wrapper |
| \`.gup-details__content-inner\` | Inner content wrapper (use \`position: relative\` context for close button) |
| \`.gup-details__close-button\` | Close button (sink only); use \`onclick="this.closest('details').open = false"\` |
| \`.gup-details__close-icon\` | Close icon inside the button (add \`aria-hidden="true"\`) |
        `,
      },
    },
  },
} as Meta;

const CONTENT = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';

export const Default: Story = {
  render: () => html`
    <details class="${gupDetailsClasses.base} ${gupDetailsClasses.quote}">
      <summary class="${gupDetailsClasses.label}">
        <span class="${gupDetailsClasses.icon}" aria-hidden="true"></span>
        <span class="${gupDetailsClasses.labelInner}">I am a label for the button</span>
      </summary>
      <div class="${gupDetailsClasses.content}">
        <div class="${gupDetailsClasses.contentInner}">${CONTENT}</div>
      </div>
    </details>
  `,
};

export const Open: Story = {
  render: () => html`
    <details class="${gupDetailsClasses.base} ${gupDetailsClasses.quote}" open>
      <summary class="${gupDetailsClasses.label}">
        <span class="${gupDetailsClasses.icon}" aria-hidden="true"></span>
        <span class="${gupDetailsClasses.labelInner}">I am a label for the button</span>
      </summary>
      <div class="${gupDetailsClasses.content}">
        <div class="${gupDetailsClasses.contentInner}">${CONTENT}</div>
      </div>
    </details>
  `,
};

export const WithCircleIcons: Story = {
  render: () => html`
    <details class="${gupDetailsClasses.base} ${gupDetailsClasses.quote} ${gupDetailsClasses.circleToggle}">
      <summary class="${gupDetailsClasses.label}">
        <span class="${gupDetailsClasses.icon}" aria-hidden="true"></span>
        <span class="${gupDetailsClasses.labelInner}">I am a label for the button</span>
      </summary>
      <div class="${gupDetailsClasses.content}">
        <div class="${gupDetailsClasses.contentInner}">${CONTENT}</div>
      </div>
    </details>
  `,
};

export const WithoutIcon: Story = {
  render: () => html`
    <details class="${gupDetailsClasses.base} ${gupDetailsClasses.quote} ${gupDetailsClasses.noIcon}">
      <summary class="${gupDetailsClasses.label}">
        <span class="${gupDetailsClasses.icon}" aria-hidden="true"></span>
        <span class="${gupDetailsClasses.labelInner}">Click me to toggle the content</span>
      </summary>
      <div class="${gupDetailsClasses.content}">
        <div class="${gupDetailsClasses.contentInner}">${CONTENT}</div>
      </div>
    </details>
  `,
};

export const SinkAppearance: Story = {
  render: () => html`
    <details class="${gupDetailsClasses.base} ${gupDetailsClasses.sink}" open>
      <summary class="${gupDetailsClasses.label}">
        <span class="${gupDetailsClasses.icon}" aria-hidden="true"></span>
        <span class="${gupDetailsClasses.labelInner}">I am a label for the button</span>
      </summary>
      <div class="${gupDetailsClasses.content}">
        <div class="${gupDetailsClasses.contentInner}">
          ${CONTENT}
          <button
            class="${gupDetailsClasses.closeButton}"
            aria-label="Close"
            onclick="this.closest('details').open = false"
          >
            <span class="${gupDetailsClasses.closeIcon}" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </details>
  `,
};

export const NoneAppearance: Story = {
  render: () => html`
    <details class="${gupDetailsClasses.base} ${gupDetailsClasses.none}" open>
      <summary class="${gupDetailsClasses.label}">
        <span class="${gupDetailsClasses.icon}" aria-hidden="true"></span>
        <span class="${gupDetailsClasses.labelInner}">I am a label for the button</span>
      </summary>
      <div class="${gupDetailsClasses.content}">
        <div class="${gupDetailsClasses.contentInner}">${CONTENT}</div>
      </div>
    </details>
  `,
};
