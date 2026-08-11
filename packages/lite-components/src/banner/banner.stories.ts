import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { gupBannerClasses, type GupBannerOptions } from './banner';

import './banner.css';
import '../link/link.css';
import '../button/button.css';
import '../../../components/src/components/banner/banner';
import '../../../components/src/components/link/link';

interface BannerStoryArgs extends GupBannerOptions {
  title: string;
  message: string;
  showCloseButton: boolean;
}

type Story = StoryObj<BannerStoryArgs>;

const ICON_INFO = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z';
const ICON_SUCCESS = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';
const ICON_WARNING = 'M12 2 1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2v-4h2v4z';
const ICON_ERROR =
  'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z';
const ICON_CLOSE = 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z';

const svgIcon = (path: string, size = 34) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" aria-hidden="true"><path d="${path}"/></svg>`;

const ICONS: Record<string, string> = { neutral: ICON_INFO, success: ICON_SUCCESS, warning: ICON_WARNING, error: ICON_ERROR };
const ICON_SIZES: Record<string, number> = { neutral: 34, success: 34, warning: 16, error: 34 };

const banner = (args: BannerStoryArgs) => {
  const type = args.type ?? 'neutral';
  const cls = [
    gupBannerClasses.base,
    type === 'success' ? gupBannerClasses.success : '',
    type === 'warning' ? gupBannerClasses.warning : '',
    type === 'error' ? gupBannerClasses.error : '',
    args.appearance === 'filled' ? gupBannerClasses.filled : '',
    args.hideIcon ? gupBannerClasses.noIcon : '',
  ]
    .filter(Boolean)
    .join(' ');

  const role = type === 'error' ? 'alert' : 'region';

  return html`
    <div class="${cls}" role="${role}" aria-label="${args.title}">
      <div class="${gupBannerClasses.inner}">
        ${
          args.showCloseButton
            ? html`
          <button class="${gupBannerClasses.close}" type="button" aria-label="Close">
            ${unsafeHTML(svgIcon(ICON_CLOSE, 24))}
          </button>`
            : ''
        }
        <div class="${gupBannerClasses.track}">
          ${
            !args.hideIcon
              ? html`
            <span class="${gupBannerClasses.icon}" aria-hidden="true">
              ${unsafeHTML(svgIcon(ICONS[type], ICON_SIZES[type]))}
            </span>`
              : ''
          }
          <p class="${gupBannerClasses.title}">${args.title}</p>
          <div class="${gupBannerClasses.body}">
            <div class="${gupBannerClasses.message}">${args.message}</div>
          </div>
        </div>
      </div>
    </div>
  `;
};

const LONG_MESSAGE =
  "But couldn't there be a definition of the normal which didn't equate it with the ordinary or uninspiring? Or which wasn't coercive or ridiculously prim?";
const DEFAULT_TITLE = 'Normality is the gentrification of ordinary madness';

export default {
  title: 'Lite Components - WIP/Banner',
  tags: ['autodocs', 'BETA'],
  argTypes: {
    type: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'error'],
      description: 'Semantic type',
    },
    appearance: {
      control: 'select',
      options: ['outline', 'filled'],
      description: 'Visual appearance',
    },
    hideIcon: { control: 'boolean', description: 'Hide the status icon' },
    showCloseButton: { control: 'boolean', description: 'Show close button' },
    title: { control: 'text', description: 'Banner title' },
    message: { control: 'text', description: 'Banner message' },
  },
  args: {
    type: 'neutral',
    appearance: 'outline',
    hideIcon: false,
    showCloseButton: false,
    title: DEFAULT_TITLE,
    message: LONG_MESSAGE,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Banner

An alternative to the \`<gup-banner>\` web component. A notification banner with four semantic types (\`neutral\`, \`success\`, \`warning\`, \`error\`) and two appearances (\`outline\`, \`filled\`).

**ARIA guidance:**
- Use \`role="alert"\` for error banners (live region - screen readers announce immediately).
- Use \`role="region"\` with \`aria-label\` for informational banners.

### Usage

\`\`\`html
<div class="gup-banner gup-banner--error" role="alert">
  <div class="gup-banner__inner">
    <div class="gup-banner__track">
      <span class="gup-banner__icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10..."/>
        </svg>
      </span>
      <p class="gup-banner__title">There is a problem</p>
      <div class="gup-banner__body">
        <div class="gup-banner__message">Please fix the highlighted fields.</div>
        <div class="gup-banner__actions">
          <!-- optional action buttons -->
        </div>
      </div>
    </div>
  </div>
</div>
\`\`\`

### Available classes

| Class | Description |
|---|---|
| \`.gup-banner\` | Base class (required) |
| \`.gup-banner--success\` | Green border and background |
| \`.gup-banner--warning\` | Yellow border and background |
| \`.gup-banner--error\` | Red border and background |
| \`.gup-banner--filled\` | Solid background, inverted text |
| \`.gup-banner--no-icon\` | Remove icon, switch to flex column layout |
| \`.gup-banner__inner\` | Inner wrapper (needed for close button positioning) |
| \`.gup-banner__track\` | Grid layout: icon / title / body |
| \`.gup-banner__icon\` | Status icon container |
| \`.gup-banner__title\` | Title text |
| \`.gup-banner__body\` | Message and actions area |
| \`.gup-banner__message\` | Message text |
| \`.gup-banner__actions\` | Optional action buttons container |
| \`.gup-banner__close\` | Close button |

Set banner width with \`--gup-banner--width\` (default: 600px).
        `,
      },
    },
  },
} as Meta<BannerStoryArgs>;

export const Default: Story = { render: (args) => banner(args) };

export const TypeNeutral: Story = { render: (args) => banner(args) };

export const TypeSuccess: Story = {
  render: (args) => banner(args),
  args: { type: 'success' },
};

export const TypeWarning: Story = {
  render: (args) => banner(args),
  args: { type: 'warning' },
};

export const TypeError: Story = {
  render: (args) => banner(args),
  args: { type: 'error' },
};

export const Filled: Story = {
  render: (args) => banner(args),
  args: { appearance: 'filled' },
};

export const SuccessFilled: Story = {
  render: (args) => banner(args),
  args: { type: 'success', appearance: 'filled' },
};

export const ErrorFilled: Story = {
  render: (args) => banner(args),
  args: { type: 'error', appearance: 'filled' },
};

export const WithoutIcon: Story = {
  render: (args) => banner(args),
  args: { hideIcon: true },
};

export const WithCloseButton: Story = {
  render: (args) => banner(args),
  args: { showCloseButton: true },
};

export const WithActionButtons: Story = {
  render: (args) => html`
    <div class="${gupBannerClasses.base}" role="region" aria-label="${args.title}">
      <div class="${gupBannerClasses.inner}">
        <div class="${gupBannerClasses.track}">
          <span class="${gupBannerClasses.icon}" aria-hidden="true">${unsafeHTML(svgIcon(ICON_INFO))}</span>
          <p class="${gupBannerClasses.title}">${args.title}</p>
          <div class="${gupBannerClasses.body}">
            <div class="${gupBannerClasses.message}">${args.message}</div>
            <div class="${gupBannerClasses.actions}">
              <button class="gup-button gup-button--primary" type="button">Submit</button>
              <button class="gup-button gup-button--text" type="button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const FullWidth: Story = {
  render: (args) => html`
    <div class="${gupBannerClasses.base}" role="region"
         aria-label="${args.title}" style="--gup-banner--width: 100%;">
      <div class="${gupBannerClasses.inner}">
        <div class="${gupBannerClasses.track}">
          <span class="${gupBannerClasses.icon}" aria-hidden="true">${unsafeHTML(svgIcon(ICON_INFO))}</span>
          <p class="${gupBannerClasses.title}">${args.title}</p>
          <div class="${gupBannerClasses.body}">
            <div class="${gupBannerClasses.message}">${args.message}</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const RTL: Story = {
  render: (args) => banner(args),
  args: {
    title: 'العادي هو تجميل الجنون العادي',
    message: 'ولكن هل يمكن أن يكون هناك تعريف للعادي لا يعادله العادي أو الباهت؟',
  },
  parameters: { direction: 'rtl' },
};

export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Class-based (lite)</p>
        <div class="${gupBannerClasses.base} ${gupBannerClasses.success}" role="region" aria-label="Success">
          <div class="${gupBannerClasses.inner}">
            <div class="${gupBannerClasses.track}">
              <span class="${gupBannerClasses.icon}" aria-hidden="true">${unsafeHTML(svgIcon(ICON_SUCCESS))}</span>
              <p class="${gupBannerClasses.title}">Application submitted</p>
              <div class="${gupBannerClasses.body}">
                <div class="${gupBannerClasses.message}">Your application has been received and is under review.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Web Component</p>
        <gup-banner type="success"
          title-slot="Application submitted"
          default-slot="Your application has been received and is under review.">
        </gup-banner>
      </div>
    </div>
  `,
};
