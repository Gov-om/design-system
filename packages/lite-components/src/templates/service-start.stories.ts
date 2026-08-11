import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { GupButton } from '../button/button';
import { gupCheckboxClasses } from '../checkbox/checkbox';
import { GupStepper, gupStepperClasses } from '../stepper/stepper';
import { gupDetailsClasses } from '../details/details';
import { gupRadioClasses, gupRadioGroupClasses } from '../radio-button/radio-button';
import { gupToggleClasses } from '../toggle/toggle';
import { gupTextareaClasses } from '../textarea-field/textarea-field';

import '../button/button.css';
import '../checkbox/checkbox.css';
import '../stepper/stepper.css';
import '../details/details.css';
import '../radio-button/radio-button.css';
import '../toggle/toggle.css';
import '../textarea-field/textarea-field.css';
import './service-start.css';

const svgIcon = (path: string, size = 24) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" fill="currentColor"><path d="${path}"/></svg>`;

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

const LOGO_ICON_PATH =
  'M0 124H96.9991V58.9726C96.9991 44.6595 90.1315 31.0192 78.6269 22.4855L48.2851 0L18.2141 22.4946C6.80885 31.0282 0 44.6234 0 58.8642V124ZM6.00064 118.004H91.0029V58.9771C91.0029 46.5559 85.0429 34.7171 75.0599 27.3077L48.3031 7.48163L21.8082 27.2987C11.911 34.699 6.00064 46.5062 6.00064 58.8687V118.004ZM41.9052 38.1759L42.131 39.7608C45.3683 38.4468 46.6055 40.7947 47.0796 43.7612C47.3776 45.626 47.3776 47.73 47.3776 49.3284C47.3776 53.4643 42.5644 56.2998 42.5644 56.2998V59.5101H55.9564V56.2998C55.9564 56.2998 51.1432 53.4643 51.1432 49.3284C51.1432 47.73 51.1432 45.626 51.4412 43.7612C51.9153 40.7947 53.1525 38.4468 56.3898 39.7608L56.6156 38.1759C56.6156 38.1759 53.6988 34.1574 49.2604 34.1574C44.822 34.1574 41.9052 38.1759 41.9052 38.1759ZM27.154 86.3659L24.3366 89.7748C29.2175 94.0552 36.4417 97.2158 43.3996 96.5431C49.6621 95.938 54.8861 91.021 55.6898 82.8802C55.7047 82.7258 55.7208 82.5721 55.737 82.4182L55.737 82.4177C55.7946 81.8696 55.8524 81.3196 55.8524 80.731V63.7043H42.5146V85.061C35.2153 87.363 30.5665 86.7854 27.3623 86.3872L27.154 86.3614V86.3659ZM10.1908 113.746C16.5752 108.495 22.788 103.109 28.748 97.3383L28.7435 97.3338C30.0348 98.2369 31.7686 99.0586 33.7147 99.5282C28.6622 104.477 23.3118 109.191 17.8801 113.801H10.1908V113.746ZM58.8007 87.8514C58.4305 89.5852 57.6674 91.5719 56.7012 93.1161C63.4604 100.015 71.0955 107.095 78.9383 113.8H86.7585C76.8658 105.686 67.7091 97.2474 58.8007 87.8469V87.8514ZM60.0605 72.8464L60.0559 72.8521H60.0605V72.8464ZM60.0605 72.8464C67.0445 64.0829 75.5082 51.8769 82.0763 41.4942C81.1598 39.8959 80.1439 38.3607 78.988 36.9159C73.4389 45.8153 65.9708 56.9135 60.0605 64.5487V72.8464ZM38.3066 72.9062V64.6118C32.2382 56.5568 24.3502 44.9709 18.7514 35.9045C17.573 37.2816 16.5119 38.74 15.5637 40.2751C22.2417 50.9535 31.0282 63.6456 38.3066 72.9107V72.9062ZM12.4303 71.2178H29.1724V80.4016H12.4303V71.2178ZM84.6366 71.2178H67.8944V80.4016H84.6366V71.2178Z';

const logoSvg = (heightPx = 45) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 124" height="${heightPx}" aria-label="Logo" style="fill: var(--gup-logo--color); display: block;"><path fill-rule="evenodd" clip-rule="evenodd" d="${LOGO_ICON_PATH}"/></svg>`;

export default {
  title: 'Lite Components - WIP/Templates/Service Start',
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
- Buttons → [\`gup-button\`](../?path=/docs/lite-components-wip-button--documentation)
- Checkboxes → [\`gup-checkbox\`](../?path=/docs/lite-components-wip-forms-checkbox--documentation)

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
          <h2 style="font-size: 28px; font-weight: 700; margin-top: var(--gup-spacing-between-text);">Step title</h2>
          <p style="font-size: 24px;">Placeholder for step description.</p>
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

export const WithData: StoryObj = {
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
                <label class="${gupCheckboxClasses.base}">
                  <input type="checkbox" class="${gupCheckboxClasses.input}" name="agree" />
                  <div class="${gupCheckboxClasses.checkMark}">
                    <div class="${gupCheckboxClasses.checkMarkInner}"></div>
                  </div>
                  <div class="${gupCheckboxClasses.textContainer}">
                    <div>I confirm the information above is correct</div>
                    <div class="${gupCheckboxClasses.hint}">You can change this later</div>
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

export const WithManagedStepper: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: `
A fully functional multi-step form built entirely from Lite Components and native HTML - no web components or framework required.

This story demonstrates how to compose the existing Lite Components into a realistic service journey.
It is the recommended pattern when your project cannot use custom elements or when you need full control over the HTML structure.

**Step navigation is managed with vanilla JS:**
- The Continue button is disabled until the current step's required fields are filled
- Advancing a step marks the previous one as done in the stepper and updates the progress label
- Going back restores the previous step's state
        `,
      },
    },
  },
  render: () => html`
    <div class="gup-page" id="wizard-root">

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
          <h1 class="gup-lite-content-header__title">Renew your driving licence</h1>
        </div>
      </div>

      <!-- Wizard main -->
      <main class="gup-lite-wizard-main" id="wizard-main">
        <div class="gup-lite-wizard-main__inner">

          <!-- Stepper progress indicator (Static Mode with Details) -->
          <details class="${gupDetailsClasses.base} ${gupDetailsClasses.sink} ${gupDetailsClasses.circleToggle}" open style="margin-bottom: var(--gup-component-7);">
            <summary class="${gupDetailsClasses.label}">
              <span class="${gupDetailsClasses.icon}" aria-hidden="true"></span>
              <span class="${gupDetailsClasses.labelInner}" id="wizard-step-label">Step 1 of 3</span>
            </summary>
            <div class="${gupDetailsClasses.content}">
              <div class="${gupDetailsClasses.contentInner}">
                <ol class="${gupStepperClasses.base}" aria-label="Application progress" id="wizard-stepper">
                  <li id="step-indicator-1" class="${GupStepper.getItemClassName({ stepType: 'selected' })}" aria-current="step">
                    <div class="${gupStepperClasses.marker}">
                      <div class="${gupStepperClasses.markerInner}">1</div>
                    </div>
                    <div class="${gupStepperClasses.body}">
                      <span class="${gupStepperClasses.label}">Address details</span>
                    </div>
                  </li>
                  <li id="step-indicator-2" class="${GupStepper.getItemClassName()}">
                    <div class="${gupStepperClasses.marker}">
                      <div class="${gupStepperClasses.markerInner}">2</div>
                    </div>
                    <div class="${gupStepperClasses.body}">
                      <span class="${gupStepperClasses.label}">Contact preferences</span>
                    </div>
                  </li>
                  <li id="step-indicator-3" class="${GupStepper.getItemClassName()}">
                    <div class="${gupStepperClasses.marker}">
                      <div class="${gupStepperClasses.markerInner}">3</div>
                    </div>
                    <div class="${gupStepperClasses.body}">
                      <span class="${gupStepperClasses.label}">Declaration</span>
                    </div>
                  </li>
                </ol>
                <button
                  class="${gupDetailsClasses.closeButton}"
                  aria-label="Close progress indicator"
                  onclick="this.closest('details').open = false"
                >
                  <span class="${gupDetailsClasses.closeIcon}" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </details>

          <!-- Step 1: Address details -->
          <section id="step-panel-1" aria-labelledby="step-heading-1">
            <h2 id="step-heading-1" style="font-size: var(--font-size-700); font-weight: var(--font-weight-base-beta); margin-top: var(--gup-component-8);">Address details</h2>
            <p style="font-size: var(--font-size-500); margin-bottom: var(--gup-component-7);">Provide the address where your renewed licence should be sent.</p>
            <form id="form-step-1" novalidate>
              <div class="${gupTextareaClasses.base}">
                <label class="${gupTextareaClasses.label}" for="licence-address">Full address</label>
                <div class="${gupTextareaClasses.wrapper}">
                  <textarea class="${gupTextareaClasses.input}" id="licence-address" name="address" rows="5" placeholder="Enter your full address including postcode"></textarea>
                </div>
              </div>
            </form>
          </section>

          <!-- Step 2: Contact preferences (hidden initially) -->
          <section id="step-panel-2" aria-labelledby="step-heading-2" hidden>
            <h2 id="step-heading-2" style="font-size: var(--font-size-700); font-weight: var(--font-weight-base-beta); margin-top: var(--gup-component-8);">Contact preferences</h2>
            <p style="font-size: var(--font-size-500); margin-bottom: var(--gup-component-7);">Tell us how you would like to receive updates about your renewal.</p>
            <form id="form-step-2" novalidate>
              <!-- Radio group -->
              <fieldset class="${gupRadioGroupClasses.base}" style="margin-bottom: var(--gup-component-8);">
                <legend class="${gupRadioGroupClasses.label}">How would you like to be contacted?</legend>
                <div class="${gupRadioGroupClasses.options}">
                  <label class="${gupRadioClasses.base}">
                    <input type="radio" class="${gupRadioClasses.input}" name="contact-method" value="email" />
                    <div class="${gupRadioClasses.box}">
                      <div class="${gupRadioClasses.boxInner}">
                        <div class="${gupRadioClasses.pupil}"></div>
                      </div>
                    </div>
                    <div class="${gupRadioClasses.textContainer}">Email</div>
                  </label>
                  <label class="${gupRadioClasses.base}">
                    <input type="radio" class="${gupRadioClasses.input}" name="contact-method" value="phone" />
                    <div class="${gupRadioClasses.box}">
                      <div class="${gupRadioClasses.boxInner}">
                        <div class="${gupRadioClasses.pupil}"></div>
                      </div>
                    </div>
                    <div class="${gupRadioClasses.textContainer}">Phone</div>
                  </label>
                  <label class="${gupRadioClasses.base}">
                    <input type="radio" class="${gupRadioClasses.input}" name="contact-method" value="post" />
                    <div class="${gupRadioClasses.box}">
                      <div class="${gupRadioClasses.boxInner}">
                        <div class="${gupRadioClasses.pupil}"></div>
                      </div>
                    </div>
                    <div class="${gupRadioClasses.textContainer}">Post</div>
                  </label>
                </div>
              </fieldset>
              <!-- Toggle -->
              <label class="${gupToggleClasses.base}">
                <input type="checkbox" class="${gupToggleClasses.input}" name="dvla-updates" />
                <div class="${gupToggleClasses.box}">
                  <div class="${gupToggleClasses.knob}"></div>
                </div>
                <div class="${gupToggleClasses.textContainer}">Receive reminders about future licence renewals</div>
              </label>
            </form>
          </section>

          <!-- Step 3: Declaration (hidden initially) -->
          <section id="step-panel-3" aria-labelledby="step-heading-3" hidden>
            <h2 id="step-heading-3" style="font-size: var(--font-size-700); font-weight: var(--font-weight-base-beta); margin-top: var(--gup-component-8);">Declaration</h2>
            <p style="font-size: var(--font-size-500); margin-bottom: var(--gup-component-7);">Check your answers and confirm the declaration before submitting your renewal.</p>
            <form id="form-step-3" novalidate>
              <label class="${gupCheckboxClasses.base}">
                <input type="checkbox" class="${gupCheckboxClasses.input}" name="declaration" />
                <div class="${gupCheckboxClasses.checkMark}">
                  <div class="${gupCheckboxClasses.checkMarkInner}"></div>
                </div>
                <div class="${gupCheckboxClasses.textContainer}">
                  <div>I declare that the information I have provided is correct and that I am the person named on the licence</div>
                  <div class="${gupCheckboxClasses.hint}">Making a false declaration is an offence</div>
                </div>
              </label>
            </form>
          </section>

        </div>
      </main>

      <!-- Wizard footer -->
      <footer class="gup-lite-wizard-footer">
        <div class="gup-lite-wizard-footer__inner">
          <div class="gup-lite-wizard-footer__track">
            <div class="gup-lite-wizard-footer__start">
              <button
                id="wizard-back"
                class="${GupButton.getClassName({ appearance: 'secondary' })}"
                disabled
              >
                ${unsafeHTML(svgIcon(ICONS.arrowBack))}
                Back
              </button>
            </div>
            <div class="gup-lite-wizard-footer__end">
              <button
                id="wizard-continue"
                class="${GupButton.getClassName({ appearance: 'primary' })}"
                disabled
              >
                <span id="wizard-continue-label">Continue</span>
                ${unsafeHTML(svgIcon(ICONS.arrowForward))}
              </button>
            </div>
          </div>
        </div>
      </footer>

    </div>

    <script>
      (function () {
        const totalSteps = 3;
        let current = 1;

        const doneClass = '${GupStepper.getItemClassName({ stepType: 'done' })}';
        const selectedClass = '${GupStepper.getItemClassName({ stepType: 'selected' })}';
        const defaultClass = '${GupStepper.getItemClassName()}';

        const getIndicator = (n) => document.getElementById('step-indicator-' + n);
        const getPanel = (n) => document.getElementById('step-panel-' + n);

        function isCurrentStepValid() {
          if (current === 1) {
            const ta = document.getElementById('licence-address');
            return ta && ta.value.trim() !== '';
          }
          if (current === 2) {
            return !!document.querySelector('input[name="contact-method"]:checked');
          }
          if (current === 3) {
            const cb = document.querySelector('input[name="declaration"]');
            return cb && cb.checked;
          }
          return true;
        }

        function updateContinueState() {
          const continueBtn = document.getElementById('wizard-continue');
          if (continueBtn) continueBtn.disabled = !isCurrentStepValid();
        }

        function updateStepper() {
          for (let i = 1; i <= totalSteps; i++) {
            const li = getIndicator(i);
            if (!li) continue;
            li.removeAttribute('aria-current');
            if (i < current) {
              li.className = doneClass;
              li.querySelector('.${gupStepperClasses.markerInner}').textContent = '';
            } else if (i === current) {
              li.className = selectedClass;
              li.setAttribute('aria-current', 'step');
              li.querySelector('.${gupStepperClasses.markerInner}').textContent = String(i);
            } else {
              li.className = defaultClass;
              li.querySelector('.${gupStepperClasses.markerInner}').textContent = String(i);
            }
          }

          const stepLabel = document.getElementById('wizard-step-label');
          if (stepLabel) stepLabel.textContent = 'Step ' + current + ' of ' + totalSteps;
        }

        function updatePanels() {
          for (let i = 1; i <= totalSteps; i++) {
            const panel = getPanel(i);
            if (!panel) continue;
            if (i === current) {
              panel.removeAttribute('hidden');
            } else {
              panel.setAttribute('hidden', '');
            }
          }
        }

        function updateButtons() {
          const backBtn = document.getElementById('wizard-back');
          const continueLabel = document.getElementById('wizard-continue-label');
          if (!backBtn || !continueLabel) return;

          backBtn.disabled = current === 1;
          continueLabel.textContent = current === totalSteps ? 'Submit' : 'Continue';
          updateContinueState();
        }

        /* Field-level listeners for reactive validation */
        document.getElementById('licence-address')
          .addEventListener('input', updateContinueState);
        document.querySelectorAll('input[name="contact-method"]')
          .forEach((r) => r.addEventListener('change', updateContinueState));
        document.querySelector('input[name="declaration"]')
          .addEventListener('change', updateContinueState);

        document.getElementById('wizard-continue').addEventListener('click', () => {
          if (current < totalSteps) {
            current++;
            updateStepper();
            updatePanels();
            updateButtons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });

        document.getElementById('wizard-back').addEventListener('click', () => {
          if (current > 1) {
            current--;
            updateStepper();
            updatePanels();
            updateButtons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });

        /* Set initial state */
        updateContinueState();
      })();
    </script>
  `,
};

export const Header: StoryObj = {
  parameters: { layout: 'fullscreen' },
  render: () => html`
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
  `,
};

export const ContentHeader: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => html`
    <div class="gup-lite-content-header">
      <div class="gup-lite-content-header__inner">
        <h1 class="gup-lite-content-header__title">Service name</h1>
      </div>
    </div>
  `,
};

export const WizardMain: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => html`
    <main class="gup-lite-wizard-main">
      <div class="gup-lite-wizard-main__inner">
        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: var(--gup-component-5);">Step title</h2>
        <p style="font-size: var(--font-size-500); margin-bottom: var(--gup-component-7);">Step description goes here.</p>
        <!-- Placeholder for step content -->
        </div>
      </div>
    </main>
  `,
};

export const WizardFooter: StoryObj = {
  parameters: { layout: 'fullscreen' },
  render: () => html`
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
  `,
};
