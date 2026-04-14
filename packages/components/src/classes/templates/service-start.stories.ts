import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { GupButton } from '../button/button';
import { GUP_CHECKBOX_CLASSES } from '../checkbox/checkbox';

import '../button/button.css';
import '../checkbox/checkbox.css';
import './service-start.css';

// SVG icon helpers
// Material Design icon paths sourced from @gup-ds/icons

const svgIcon = (path: string, size = 24) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="${path}"/></svg>`;

const ICONS = {
  close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  liveHelp:
    'M19 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm2.07-7.75-.9.92C13.45 11.9 13 12.5 13 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
  addCircle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z',
  checkCircle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  radioButtonChecked:
    'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
  radioButtonUnchecked: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
  arrowBack: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  arrowForward: 'm12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
} as const;

// Logo SVG
// Icon variant of the GUP logo. fill inherits --gup-logo--color set on
// .gup-lite-header (var(--gup-color-neutral-contrast)), so no web component needed.

const LOGO_ICON_PATH =
  'M0 124H96.9991V58.9726C96.9991 44.6595 90.1315 31.0192 78.6269 22.4855L48.2851 0L18.2141 22.4946C6.80885 31.0282 0 44.6234 0 58.8642V124ZM6.00064 118.004H91.0029V58.9771C91.0029 46.5559 85.0429 34.7171 75.0599 27.3077L48.3031 7.48163L21.8082 27.2987C11.911 34.699 6.00064 46.5062 6.00064 58.8687V118.004ZM41.9052 38.1759L42.131 39.7608C45.3683 38.4468 46.6055 40.7947 47.0796 43.7612C47.3776 45.626 47.3776 47.73 47.3776 49.3284C47.3776 53.4643 42.5644 56.2998 42.5644 56.2998V59.5101H55.9564V56.2998C55.9564 56.2998 51.1432 53.4643 51.1432 49.3284C51.1432 47.73 51.1432 45.626 51.4412 43.7612C51.9153 40.7947 53.1525 38.4468 56.3898 39.7608L56.6156 38.1759C56.6156 38.1759 53.6988 34.1574 49.2604 34.1574C44.822 34.1574 41.9052 38.1759 41.9052 38.1759ZM27.154 86.3659L24.3366 89.7748C29.2175 94.0552 36.4417 97.2158 43.3996 96.5431C49.6621 95.938 54.8861 91.021 55.6898 82.8802C55.7047 82.7258 55.7208 82.5721 55.737 82.4182L55.737 82.4177C55.7946 81.8696 55.8524 81.3196 55.8524 80.731V63.7043H42.5146V85.061C35.2153 87.363 30.5665 86.7854 27.3623 86.3872L27.154 86.3614V86.3659ZM10.1908 113.746C16.5752 108.495 22.788 103.109 28.748 97.3383L28.7435 97.3338C30.0348 98.2369 31.7686 99.0586 33.7147 99.5282C28.6622 104.477 23.3118 109.191 17.8801 113.801H10.1908V113.746ZM58.8007 87.8514C58.4305 89.5852 57.6674 91.5719 56.7012 93.1161C63.4604 100.015 71.0955 107.095 78.9383 113.8H86.7585C76.8658 105.686 67.7091 97.2474 58.8007 87.8469V87.8514ZM60.0605 72.8464L60.0559 72.8521H60.0605V72.8464ZM60.0605 72.8464C67.0445 64.0829 75.5082 51.8769 82.0763 41.4942C81.1598 39.8959 80.1439 38.3607 78.988 36.9159C73.4389 45.8153 65.9708 56.9135 60.0605 64.5487V72.8464ZM38.3066 72.9062V64.6118C32.2382 56.5568 24.3502 44.9709 18.7514 35.9045C17.573 37.2816 16.5119 38.74 15.5637 40.2751C22.2417 50.9535 31.0282 63.6456 38.3066 72.9107V72.9062ZM12.4303 71.2178H29.1724V80.4016H12.4303V71.2178ZM84.6366 71.2178H67.8944V80.4016H84.6366V71.2178Z';

const logoSvg = (heightPx = 45) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 124" height="${heightPx}" aria-label="Logo" style="fill: var(--gup-logo--color); display: block;"><path fill-rule="evenodd" clip-rule="evenodd" d="${LOGO_ICON_PATH}"/></svg>`;

export default {
  title: 'Lite Components/Templates/Service Start',
  tags: ['BETA'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Lite Service Start Template

A page-level template built entirely from native HTML elements and CSS classes - no web components required.

Structural layout classes replace the following web components:

| Web component | Lite class |
|---|---|
| \`<gup-header>\` | \`.gup-lite-header\` + \`.gup-lite-header__nav\` |
| \`<gup-content-header>\` | \`.gup-lite-content-header\` |
| \`<gup-wizard-main>\` | \`.gup-lite-wizard-main\` |
| \`<gup-wizard-footer>\` | \`.gup-lite-wizard-footer\` |

Interactive elements use existing lite components:
- Buttons → [\`gup-button\`](../?path=/docs/lite-components-button--docs)
- Checkboxes → [\`gup-checkbox\`](../?path=/docs/lite-components-forms-checkbox--docs)

Icons and the logo are inlined as SVGs. No separate lite logo component is needed -
the icon SVG with \`fill: var(--gup-logo--color)\` is sufficient for this template.

> Complex form elements (input field, form section, stepper) are shown as placeholders
> and will be replaced once their lite versions are available.
        `,
      },
    },
  },
} as Meta;

export const Default: StoryObj = {
  render: () => html`
    <div class="gup-page">

      <!-- Header -->
      <header class="gup-lite-header">
        <nav class="gup-lite-header__nav" aria-label="Service Navigation Header">
          <div class="gup-lite-header__slot">
            <button class="${GupButton.getClassName({ appearance: 'text' })}">
              ${unsafeHTML(svgIcon(ICONS.close))}
              Save &amp; exit
            </button>
          </div>

          <div class="gup-lite-header__logo-wrapper">
            ${unsafeHTML(logoSvg(45))}
          </div>

          <div class="gup-lite-header__slot gup-lite-header__slot--end">
            <button class="${GupButton.getClassName({ appearance: 'text' })}">
              ${unsafeHTML(svgIcon(ICONS.liveHelp))}
              Do you need help?
            </button>
          </div>
        </nav>
      </header>

      <!-- Content header -->
      <div class="gup-lite-content-header">
        <div class="gup-lite-content-header__inner">
          <h1 class="gup-lite-content-header__title">Service name</h1>
        </div>
      </div>

      <!-- Wizard main -->
      <main class="gup-lite-wizard-main">
        <div class="gup-lite-wizard-main__inner">

          <!-- Step progress - placeholder until a lite stepper is available -->
          <details style="margin-bottom: var(--gup-component-7); border: 1px solid var(--gup-color-border-low); border-radius: var(--gup-radius-component-default); padding: var(--gup-component-5);">
            <summary style="cursor: pointer; font-weight: var(--font-weight-base-beta); font-size: var(--font-size-500); list-style: none; display: flex; align-items: center; gap: var(--gup-component-4);">
              ${unsafeHTML(svgIcon(ICONS.addCircle))}
              Step 2
            </summary>
            <div style="margin-top: var(--gup-component-5); display: flex; flex-direction: column; gap: var(--gup-component-4);">
              <div style="display: flex; align-items: center; gap: var(--gup-component-4); color: var(--gup-color-content-secondary); font-size: var(--font-size-400); fill: var(--gup-color-positive-medium);">
                ${unsafeHTML(svgIcon(ICONS.checkCircle, 20))}
                <span>Step 1</span>
              </div>
              <div style="display: flex; align-items: center; gap: var(--gup-component-4); font-size: var(--font-size-400); font-weight: var(--font-weight-base-beta); fill: var(--gup-color-brand-medium);">
                ${unsafeHTML(svgIcon(ICONS.radioButtonChecked, 20))}
                <span>Step 2</span>
              </div>
              <div style="display: flex; align-items: center; gap: var(--gup-component-4); color: var(--gup-color-content-secondary); font-size: var(--font-size-400); fill: var(--gup-color-content-secondary);">
                ${unsafeHTML(svgIcon(ICONS.radioButtonUnchecked, 20))}
                <span>Step 3</span>
              </div>
              <div style="display: flex; align-items: center; gap: var(--gup-component-4); color: var(--gup-color-content-secondary); font-size: var(--font-size-400); fill: var(--gup-color-content-secondary);">
                ${unsafeHTML(svgIcon(ICONS.radioButtonUnchecked, 20))}
                <span>Step 4</span>
              </div>
            </div>
          </details>

          <h2 style="font-size: 28px; font-weight: 700; margin-top: var(--gup-spacing-between-text);">Step title</h2>
          <p style="font-size: 24px;">Placeholder for step description. Below is an example form.</p>

          <form>
            <!-- Form section 1 - complex sub-components are placeholders -->
            <fieldset style="border: none; padding: 0; margin: 0 0 var(--gup-component-8);">
              <legend style="font-size: var(--font-size-600); font-weight: var(--font-weight-base-beta); margin-bottom: var(--gup-component-6); padding: 0;">
                Form section title 1
              </legend>
              <div style="display: flex; flex-direction: column; gap: var(--gup-component-5);">
                <div style="display: flex; flex-direction: column; gap: var(--gup-component-3);">
                  <label style="font-size: var(--font-size-400); font-weight: var(--font-weight-base-beta);" for="field-1">Your message</label>
                  <input id="field-1" type="text" name="your-message1" style="width: 100%; padding: var(--gup-component-4); border: 1px solid var(--gup-color-border-medium); border-radius: var(--gup-radius-component-default); font-size: var(--font-size-400); font-family: inherit;" />
                </div>
                <div style="display: flex; flex-direction: column; gap: var(--gup-component-3);">
                  <label style="font-size: var(--font-size-400); font-weight: var(--font-weight-base-beta);" for="field-2">Your message</label>
                  <input id="field-2" type="text" name="your-message2" style="width: 100%; padding: var(--gup-component-4); border: 1px solid var(--gup-color-border-medium); border-radius: var(--gup-radius-component-default); font-size: var(--font-size-400); font-family: inherit;" />
                </div>
              </div>
            </fieldset>

            <!-- Form section 2 - includes a lite checkbox -->
            <fieldset style="border: none; padding: 0; margin: 0 0 var(--gup-component-8);">
              <legend style="font-size: var(--font-size-600); font-weight: var(--font-weight-base-beta); margin-bottom: var(--gup-component-6); padding: 0;">
                Form section title 2
              </legend>
              <div style="display: flex; flex-direction: column; gap: var(--gup-component-5);">
                <div style="display: flex; flex-direction: column; gap: var(--gup-component-3);">
                  <label style="font-size: var(--font-size-400); font-weight: var(--font-weight-base-beta);" for="field-3">Your message</label>
                  <input id="field-3" type="text" name="your-message3" style="width: 100%; padding: var(--gup-component-4); border: 1px solid var(--gup-color-border-medium); border-radius: var(--gup-radius-component-default); font-size: var(--font-size-400); font-family: inherit;" />
                </div>

                <!-- Lite checkbox -->
                <label class="${GUP_CHECKBOX_CLASSES.base}">
                  <input type="checkbox" class="${GUP_CHECKBOX_CLASSES.input}" name="agree" />
                  <div class="${GUP_CHECKBOX_CLASSES.checkMark}">
                    <div class="${GUP_CHECKBOX_CLASSES.checkMarkInner}"></div>
                  </div>
                  <div class="${GUP_CHECKBOX_CLASSES.textContainer}">
                    <div>I confirm the information above is correct</div>
                    <div class="${GUP_CHECKBOX_CLASSES.hint}">You can change this later</div>
                  </div>
                </label>
              </div>
            </fieldset>
          </form>

        </div>
      </main>

      <!-- ── Wizard footer ──────────────────────────────────────────────── -->
      <footer class="gup-lite-wizard-footer">
        <div class="gup-lite-wizard-footer__inner">
          <div class="gup-lite-wizard-footer__track">
            <div class="gup-lite-wizard-footer__start">
              <button class="${GupButton.getClassName({ appearance: 'secondary' })}">
                ${unsafeHTML(svgIcon(ICONS.arrowBack))}
                Back
              </button>
            </div>
            <div class="gup-lite-wizard-footer__end">
              <button class="${GupButton.getClassName({ appearance: 'primary' })}">
                Continue
                ${unsafeHTML(svgIcon(ICONS.arrowForward))}
              </button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  `,
};
