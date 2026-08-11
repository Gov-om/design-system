import { html, nothing } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { gupLinkClasses, type GupLinkOptions } from './link';

import './link.css';
import '../../../components/src/components/link/link';

interface LinkStoryArgs extends GupLinkOptions {
  label: string;
  href: string;
}

type Story = StoryObj<LinkStoryArgs>;

const link = (args: LinkStoryArgs) => {
  const cls = [
    gupLinkClasses.base,
    args.severity === 'secondary' ? gupLinkClasses.secondary : '',
    args.severity === 'danger' ? gupLinkClasses.danger : '',
    args.size === 's' ? gupLinkClasses.sm : '',
    args.size === 'l' ? gupLinkClasses.lg : '',
    args.disabled ? gupLinkClasses.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  // A disabled anchor must also be removed from the tab order and expose its
  // state to assistive tech - pointer-events alone leaves it keyboard operable.
  return html`<a
    href="${args.href}"
    class="${cls}"
    aria-disabled="${args.disabled ? 'true' : nothing}"
    tabindex="${args.disabled ? '-1' : nothing}"
    >${args.label}</a
  >`;
};

export default {
  title: 'Lite Components - WIP/Link',
  tags: ['autodocs', 'BETA'],
  argTypes: {
    label: { control: 'text', description: 'Link text' },
    href: { control: 'text', description: 'href attribute' },
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual colour',
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Font size variant',
    },
    disabled: { control: 'boolean', description: 'Visually disabled (for <a> elements)' },
  },
  args: {
    label: 'Visit page',
    href: '#',
    severity: 'primary',
    size: 'm',
    disabled: false,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Link

An alternative to the \`<gup-link>\` web component. Apply \`gup-link\` directly to a native \`<a>\` or \`<button>\` element.

Use \`<a>\` for navigation and \`<button type="button">\` for in-page actions.

### Usage

\`\`\`html
<!-- Anchor -->
<a href="/page" class="gup-link">Visit page</a>

<!-- Button (in-page action) -->
<button type="button" class="gup-link gup-link--danger">Delete record</button>

<!-- Opens in new tab -->
<a href="/doc.pdf" class="gup-link" target="_blank" rel="noreferrer">
  Download (PDF)
</a>
\`\`\`

### Available classes

| Class | Description |
|---|---|
| \`.gup-link\` | Base class - required |
| \`.gup-link--secondary\` | Grey colour for non-primary actions |
| \`.gup-link--danger\` | Red colour for destructive actions |
| \`.gup-link--sm\` | Smaller font size |
| \`.gup-link--lg\` | Larger font size |
| \`.gup-link--disabled\` | Visually disabled (for \`<a>\` - buttons use the native \`disabled\` attribute) |

Override the default link colour with the \`--gup-link-color\` CSS custom property.
        `,
      },
    },
  },
} as Meta<LinkStoryArgs>;

export const Default: Story = {
  render: (args) => link(args),
};

export const Secondary: Story = {
  render: (args) => link(args),
  args: { severity: 'secondary' },
};

export const Danger: Story = {
  render: (args) => link(args),
  args: { severity: 'danger', label: 'Delete record' },
};

export const Small: Story = {
  render: (args) => link(args),
  args: { size: 's' },
};

export const Large: Story = {
  render: (args) => link(args),
  args: { size: 'l' },
};

/** Disabled state on an `<a>` element - requires the modifier class since anchors have no native :disabled. */
export const Disabled: Story = {
  render: (args) => link(args),
  args: { disabled: true },
};

/** Disabled on a `<button>` - uses the native `disabled` attribute instead of the modifier class. */
export const DisabledButton: Story = {
  render: (args) => html`<button type="button" class="${gupLinkClasses.base}" ?disabled=${args.disabled}>${args.label}</button>`,
  args: { disabled: true, label: 'Remove attachment' },
};

export const OpenInNewTab: Story = {
  render: (args) =>
    html`<a href="${args.href}" class="${gupLinkClasses.base}" target="_blank" rel="noreferrer">
      ${args.label}
    </a>`,
  args: { label: 'Open in new tab' },
};

/** All three severities in context. */
export const AllSeverities: Story = {
  render: () => html`
    <p style="font-size: var(--font-size-400);">
      This application is subject to
      <a href="#" class="${gupLinkClasses.base}">terms and conditions</a>.
      To go back, use the
      <a href="#" class="${gupLinkClasses.base} ${gupLinkClasses.secondary}">Back to list</a> link.
      To remove your submission,
      <button type="button" class="${gupLinkClasses.base} ${gupLinkClasses.danger}">delete this record</button>.
    </p>
  `,
};

export const RTL: Story = {
  render: (args) => link(args),
  args: { label: 'زيارة الصفحة' },
  parameters: { direction: 'rtl' },
};

export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Class-based (lite)</p>
        <a href="#" class="${gupLinkClasses.base}">Primary link</a>
        &nbsp;&nbsp;
        <a href="#" class="${gupLinkClasses.base} ${gupLinkClasses.secondary}">Secondary</a>
        &nbsp;&nbsp;
        <a href="#" class="${gupLinkClasses.base} ${gupLinkClasses.danger}">Danger</a>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Web Component</p>
        <gup-link href="#">Primary link</gup-link>
        &nbsp;&nbsp;
        <gup-link href="#" severity="secondary">Secondary</gup-link>
        &nbsp;&nbsp;
        <gup-link href="#" severity="danger">Danger</gup-link>
      </div>
    </div>
  `,
};
