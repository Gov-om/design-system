import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { GupBadge, gupBadgeClasses, type GupBadgeOptions } from './badge';

import './badge.css';
import '../../../components/src/components/badge/badge';

interface BadgeStoryArgs extends GupBadgeOptions {}

type Story = StoryObj<BadgeStoryArgs>;

export default {
  title: 'Lite Components - WIP/Badge',
  tags: ['autodocs', 'BETA'],
  argTypes: {
    type: {
      control: 'select',
      options: ['neutral', 'positive', 'negative', 'offline'],
      description: 'The status type of the badge, controls background color',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
  },
  args: {
    type: 'neutral',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Badge

An alternative to the \`<gup-badge>\` web component for users who prefer working with native HTML elements.
It is a small circular status indicator - all visual variants are driven by modifier classes, no JavaScript needed.

### Usage

#### Pure HTML/CSS approach:
\`\`\`html
<span class="gup-badge gup-badge--positive"></span>
\`\`\`

#### With TypeScript utility:
\`\`\`typescript
import { GupBadge } from '@govom/lite-components';

const badge = GupBadge.create({ type: 'positive' });
document.body.appendChild(badge);

// Apply to an existing element
const el = document.querySelector('.my-badge');
GupBadge.apply(el, { type: 'negative' });
\`\`\`

### Available Classes

| Class | Description |
|---|---|
| \`.gup-badge\` | Base class (required) |
| \`.gup-badge--neutral\` | Warning/yellow - default type |
| \`.gup-badge--positive\` | Green - positive/online state |
| \`.gup-badge--negative\` | Red - error/negative state |
| \`.gup-badge--offline\` | Grey - offline/unavailable state |
        `,
      },
    },
  },
} as Meta<BadgeStoryArgs>;

const Template = (args: BadgeStoryArgs) => {
  const className = GupBadge.getClassName({ type: args.type });
  return html`<span class="${className}"></span>`;
};

export const Default: Story = {
  render: Template,
};

export const Neutral: Story = {
  render: Template,
  args: { type: 'neutral' },
};

export const Positive: Story = {
  render: Template,
  args: { type: 'positive' },
};

export const Negative: Story = {
  render: Template,
  args: { type: 'negative' },
};

export const Offline: Story = {
  render: Template,
  args: { type: 'offline' },
};

export const AllTypes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <span class="${gupBadgeClasses.base} ${gupBadgeClasses.neutral}"></span>
        <span style="font-size: 12px; color: #666;">neutral</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <span class="${gupBadgeClasses.base} ${gupBadgeClasses.positive}"></span>
        <span style="font-size: 12px; color: #666;">positive</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <span class="${gupBadgeClasses.base} ${gupBadgeClasses.negative}"></span>
        <span style="font-size: 12px; color: #666;">negative</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <span class="${gupBadgeClasses.base} ${gupBadgeClasses.offline}"></span>
        <span style="font-size: 12px; color: #666;">offline</span>
      </div>
    </div>
  `,
};

export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Class-based (lite)</h4>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span class="${gupBadgeClasses.base} ${gupBadgeClasses.neutral}"></span>
          <span class="${gupBadgeClasses.base} ${gupBadgeClasses.positive}"></span>
          <span class="${gupBadgeClasses.base} ${gupBadgeClasses.negative}"></span>
          <span class="${gupBadgeClasses.base} ${gupBadgeClasses.offline}"></span>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">Web Component</h4>
        <div style="display: flex; gap: 12px; align-items: center;">
          <gup-badge type="neutral"></gup-badge>
          <gup-badge type="positive"></gup-badge>
          <gup-badge type="negative"></gup-badge>
          <gup-badge type="offline"></gup-badge>
        </div>
      </div>
    </div>
  `,
};
