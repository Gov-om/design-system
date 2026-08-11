import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { gupAccordionClasses, gupAccordionItemClasses } from './accordion';

import './accordion.css';

type Story = StoryObj;

export default {
  title: 'Lite Components - WIP/Accordion',
  tags: ['autodocs', 'BETA'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Accordion

A disclosure group built on native \`<details>\`/\`<summary>\` elements - no JavaScript required to open or close items.

The show/hide icon and label text switch automatically via CSS using the \`[open]\` attribute on \`<details>\`.

### Usage

\`\`\`html
<div class="gup-accordion">
  <details class="gup-accordion-item">
    <summary class="gup-accordion-item__label">
      <span class="gup-accordion-item__label-inner">What documents do I need?</span>
      <span class="gup-accordion-item__action">
        <span class="gup-accordion-item__action-icon" aria-hidden="true"></span>
        <span class="gup-accordion-item__action-show">Show</span>
        <span class="gup-accordion-item__action-hide">Hide</span>
      </span>
    </summary>
    <div class="gup-accordion-item__content">Content here</div>
  </details>
</div>
\`\`\`

### Available classes

| Class | Description |
|---|---|
| \`.gup-accordion\` | Optional wrapper - scopes the last-item border removal |
| \`.gup-accordion-item\` | Base class on the \`<details>\` element (required) |
| \`.gup-accordion-item--hide-controls\` | Hides the show/hide action (icon + text) |
| \`.gup-accordion-item__label\` | The \`<summary>\` element |
| \`.gup-accordion-item__label-inner\` | Label text |
| \`.gup-accordion-item__action\` | Contains the icon and show/hide text |
| \`.gup-accordion-item__action-icon\` | Toggle icon - add \`aria-hidden="true"\` |
| \`.gup-accordion-item__action-show\` | "Show" label - visible when item is closed |
| \`.gup-accordion-item__action-hide\` | "Hide" label - visible when item is open |
| \`.gup-accordion-item__content\` | Content wrapper |
        `,
      },
    },
  },
} as Meta;

const item = (label: string, content: string, open = false) => html`
  <details class="${gupAccordionItemClasses.base}" ?open=${open}>
    <summary class="${gupAccordionItemClasses.label}">
      <span class="${gupAccordionItemClasses.labelInner}">${label}</span>
      <span class="${gupAccordionItemClasses.action}">
        <span class="${gupAccordionItemClasses.actionIcon}" aria-hidden="true"></span>
        <span class="${gupAccordionItemClasses.actionShow}">Show</span>
        <span class="${gupAccordionItemClasses.actionHide}">Hide</span>
      </span>
    </summary>
    <div class="${gupAccordionItemClasses.content}">${content}</div>
  </details>
`;

const CONTENT =
  'You can apply online, by post, or in person at a service centre. Processing times vary depending on the type of application and current volumes.';

export const Default: Story = {
  render: () => html`
    <div class="${gupAccordionClasses.base}">
      ${item('What documents do I need to apply?', CONTENT)}
      ${item('How long does the process take?', CONTENT)}
      ${item('Can I track my application status?', CONTENT)}
      ${item('What happens after I submit my application?', CONTENT)}
    </div>
  `,
};

export const WithOpenItem: Story = {
  render: () => html`
    <div class="${gupAccordionClasses.base}">
      ${item('What documents do I need to apply?', CONTENT, true)}
      ${item('How long does the process take?', CONTENT)}
      ${item('Can I track my application status?', CONTENT)}
      ${item('What happens after I submit my application?', CONTENT)}
    </div>
  `,
};

export const WithLongLabel: Story = {
  render: () => html`
    <div class="${gupAccordionClasses.base}">
      ${item(
        'I have recently changed my name due to marriage or deed poll - do I need to provide additional documentation alongside my standard application?',
        CONTENT
      )}
      ${item('How long does the process take?', CONTENT)}
      ${item('Can I track my application status?', CONTENT)}
    </div>
  `,
};

export const HideControls: Story = {
  render: () => html`
    <div class="${gupAccordionClasses.base}">
      <details class="${gupAccordionItemClasses.base} ${gupAccordionItemClasses.hideControls}" open>
        <summary class="${gupAccordionItemClasses.label}">
          <span class="${gupAccordionItemClasses.labelInner}">What documents do I need to apply?</span>
          <span class="${gupAccordionItemClasses.action}">
            <span class="${gupAccordionItemClasses.actionIcon}" aria-hidden="true"></span>
            <span class="${gupAccordionItemClasses.actionShow}">Show</span>
            <span class="${gupAccordionItemClasses.actionHide}">Hide</span>
          </span>
        </summary>
        <div class="${gupAccordionItemClasses.content}">${CONTENT}</div>
      </details>
      <details class="${gupAccordionItemClasses.base} ${gupAccordionItemClasses.hideControls}">
        <summary class="${gupAccordionItemClasses.label}">
          <span class="${gupAccordionItemClasses.labelInner}">How long does the process take?</span>
          <span class="${gupAccordionItemClasses.action}">
            <span class="${gupAccordionItemClasses.actionIcon}" aria-hidden="true"></span>
            <span class="${gupAccordionItemClasses.actionShow}">Show</span>
            <span class="${gupAccordionItemClasses.actionHide}">Hide</span>
          </span>
        </summary>
        <div class="${gupAccordionItemClasses.content}">${CONTENT}</div>
      </details>
    </div>
  `,
};

export const RTL: Story = {
  render: () => html`
    <div class="${gupAccordionClasses.base}">
      ${item('ما هي المستندات التي أحتاجها للتقديم؟', CONTENT)}
      ${item('كم من الوقت تستغرق العملية؟', CONTENT)}
      ${item('هل يمكنني تتبع حالة طلبي؟', CONTENT)}
    </div>
  `,
  parameters: {
    direction: 'rtl',
  },
};
