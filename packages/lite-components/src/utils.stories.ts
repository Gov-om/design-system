import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { gupTrackClasses, gupSrOnlyClass } from './utils';

import './utils.css';

type Story = StoryObj;

/** Helper — a coloured block for track layout demos */
const box = (w = '80px', h = '40px') =>
  `<div style="
    background: var(--gup-color-brand-low);
    border: 1px solid var(--gup-color-brand-medium);
    border-radius: var(--gup-radius-component-default);
    width: ${w};
    height: ${h};
  "></div>`;

export default {
  title: 'Lite Components - WIP/Utils',
  tags: ['autodocs', 'BETA'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Layout and accessibility utilities

Two lightweight utilities — no component markup required, just CSS classes.
Import once anywhere in your application:

\`\`\`css
@import "@govom/lite-components/utils.css";
\`\`\`

---

## Track

A flex layout builder. Mirrors the \`<gup-track>\` web component.

Apply \`gup-track\` to any container, then add modifier classes to control direction and alignment.
Control the gap with the \`--gup-track--gap\` CSS custom property (defaults to \`--gup-spacing-component-default\`).

\`\`\`html
<!-- Horizontal row, vertically centred -->
<div class="gup-track gup-track--v-center">
  <svg aria-hidden="true">...</svg>
  <span>Label</span>
</div>

<!-- Space items to opposite ends -->
<div class="gup-track gup-track--h-between">
  <button>Back</button>
  <button>Continue</button>
</div>

<!-- Custom gap -->
<div class="gup-track" style="--gup-track--gap: var(--gup-component-6)">
  ...
</div>
\`\`\`

### Track classes

| Class | CSS equivalent |
|---|---|
| \`.gup-track\` | \`display: flex\` |
| \`.gup-track--vertical\` | \`flex-direction: column\` |
| \`.gup-track--wrap\` | \`flex-wrap: wrap\` |
| \`.gup-track--h-center\` | \`justify-content: center\` |
| \`.gup-track--h-end\` | \`justify-content: flex-end\` |
| \`.gup-track--h-between\` | \`justify-content: space-between\` |
| \`.gup-track--v-center\` | \`align-items: center\` |
| \`.gup-track--v-end\` | \`align-items: flex-end\` |
| \`.gup-track--v-start\` | \`align-items: flex-start\` |
| \`.gup-track--items-equal\` | \`flex: 1 0 0\` on all children |

---

## Screen reader only

Hides content visually while keeping it accessible to screen readers. Mirrors \`<gup-screenreader-text>\`.

Use it to:
- Label icon-only buttons
- Provide additional context for AT users
- Announce dynamic state changes

\`\`\`html
<!-- Icon-only button with accessible label -->
<button type="button" aria-label="Close">
  <svg aria-hidden="true">...</svg>
  <span class="gup-sr-only">Close</span>
</button>

<!-- Extra context for screen readers -->
<span>Page 3 <span class="gup-sr-only">of 10</span></span>
\`\`\`
        `,
      },
    },
  },
} as Meta;

// ─── Track stories ────────────────────────────────────────────────────────────

/** Default horizontal row. Items are laid out left to right with a standard gap. */
export const TrackDefault: Story = {
  name: 'Track / Default',
  render: () => html`
    <div class="${gupTrackClasses.base}">
      ${unsafeHTML(box())}
      ${unsafeHTML(box())}
      ${unsafeHTML(box())}
    </div>
  `,
};

/** Vertical stack — `gup-track--vertical` */
export const TrackVertical: Story = {
  name: 'Track / Vertical',
  render: () => html`
    <div class="${gupTrackClasses.base} ${gupTrackClasses.vertical}">
      ${unsafeHTML(box())}
      ${unsafeHTML(box())}
      ${unsafeHTML(box())}
    </div>
  `,
};

/** Horizontally centred — `gup-track--h-center` */
export const TrackHCenter: Story = {
  name: 'Track / Horizontal center',
  render: () => html`
    <div class="${gupTrackClasses.base} ${gupTrackClasses.hCenter}">
      ${unsafeHTML(box())}
      ${unsafeHTML(box())}
    </div>
  `,
};

/** Items pushed to opposite ends — `gup-track--h-between`. Typical for footer navigation. */
export const TrackHBetween: Story = {
  name: 'Track / Space between',
  render: () => html`
    <div class="${gupTrackClasses.base} ${gupTrackClasses.hBetween}">
      ${unsafeHTML(box())}
      ${unsafeHTML(box())}
    </div>
  `,
};

/** Vertically centred row — `gup-track--v-center`. Useful for icon + label pairs. */
export const TrackVCenter: Story = {
  name: 'Track / Vertical center',
  render: () => html`
    <div class="${gupTrackClasses.base} ${gupTrackClasses.vCenter}">
      ${unsafeHTML(box())}
      ${unsafeHTML(box('80px', '80px'))}
      ${unsafeHTML(box())}
    </div>
  `,
};

/** Equal-width children — `gup-track--items-equal`. Each child gets the same width. */
export const TrackItemsEqual: Story = {
  name: 'Track / Equal width items',
  render: () => html`
    <div class="${gupTrackClasses.base} ${gupTrackClasses.itemsEqual}">
      ${unsafeHTML(box('100%'))}
      ${unsafeHTML(box('100%'))}
      ${unsafeHTML(box('100%'))}
    </div>
  `,
};

/** Wrapping row — `gup-track--wrap`. Children flow onto the next line when there is not enough space. */
export const TrackWrap: Story = {
  name: 'Track / Wrap',
  render: () => html`
    <div class="${gupTrackClasses.base} ${gupTrackClasses.wrap}" style="max-width: 300px;">
      ${unsafeHTML(box())}
      ${unsafeHTML(box())}
      ${unsafeHTML(box())}
      ${unsafeHTML(box())}
      ${unsafeHTML(box())}
    </div>
  `,
};

/** Custom gap using the `--gup-track--gap` CSS custom property. */
export const TrackCustomGap: Story = {
  name: 'Track / Custom gap',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <p style="margin: 0 0 8px; font-size: var(--font-size-300); color: var(--gup-color-content-secondary);">
          var(--gup-component-2) — tight
        </p>
        <div class="${gupTrackClasses.base}" style="--gup-track--gap: var(--gup-component-2)">
          ${unsafeHTML(box())}
          ${unsafeHTML(box())}
          ${unsafeHTML(box())}
        </div>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: var(--font-size-300); color: var(--gup-color-content-secondary);">
          var(--gup-component-6) — spacious
        </p>
        <div class="${gupTrackClasses.base}" style="--gup-track--gap: var(--gup-component-6)">
          ${unsafeHTML(box())}
          ${unsafeHTML(box())}
          ${unsafeHTML(box())}
        </div>
      </div>
    </div>
  `,
};

// ─── Screen reader only ───────────────────────────────────────────────────────

/**
 * The text is invisible on screen but present in the accessibility tree.
 * Inspect the DOM or use a screen reader to confirm it is announced.
 */
export const ScreenReaderOnly: Story = {
  name: 'Screen reader only',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--gup-component-6);">

      <div>
        <p style="margin: 0 0 8px; font-size: var(--font-size-300); color: var(--gup-color-content-secondary);">
          Icon-only button with visually-hidden label:
        </p>
        <button type="button" style="
          appearance: none; background: none; border: 1px solid var(--gup-color-states-base-border);
          border-radius: var(--gup-radius-component-default); padding: var(--gup-component-3);
          cursor: pointer; display: inline-flex; align-items: center;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
               fill="currentColor" aria-hidden="true">
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
          <span class="${gupSrOnlyClass}">Close dialog</span>
        </button>
      </div>

      <div>
        <p style="margin: 0 0 8px; font-size: var(--font-size-300); color: var(--gup-color-content-secondary);">
          Pagination context for screen readers (only "Page 3" is visible):
        </p>
        <span style="font-size: var(--font-size-400);">
          Page 3
          <span class="${gupSrOnlyClass}"> of 10</span>
        </span>
      </div>

      <div>
        <p style="margin: 0 0 8px; font-size: var(--font-size-300); color: var(--gup-color-content-secondary);">
          Status badge with additional context:
        </p>
        <span style="
          display: inline-flex; align-items: center; gap: var(--gup-component-2);
          padding: var(--gup-component-1) var(--gup-component-3);
          border-radius: var(--gup-radius-component-full);
          background: var(--gup-color-positive-xlow); color: var(--gup-color-positive-high);
          font-size: var(--font-size-300);">
          ● Approved
          <span class="${gupSrOnlyClass}"> — application status</span>
        </span>
      </div>

    </div>
  `,
};
