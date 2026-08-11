import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { GupStepper, gupStepperClasses } from './stepper';

import './stepper.css';

import '../../../components/src/components/stepper/stepper/stepper';
import '../../../components/src/components/stepper/stepper-item/stepper-item';
import '../details/details.css';
import { gupDetailsClasses } from '../details/details';

type Story = StoryObj;

export default {
  title: 'Lite Components - WIP/Stepper',
  tags: ['autodocs', 'BETA'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Class-based Stepper

An accessible step indicator using a semantic \`<ol>\` list - no web components or JavaScript required.

Mark the **active step** with \`aria-current="step"\` on the \`<li>\`. Provide a descriptive \`aria-label\` on the \`<ol>\` so screen readers announce the purpose of the list.

### Step types

| Modifier class | Use when |
|---|---|
| _(none)_ | Step is upcoming / not yet reached |
| \`.gup-stepper__item--selected\` | Step is currently active - also add \`aria-current="step"\` |
| \`.gup-stepper__item--done\` | Step has been completed |

### Usage

#### Static progress indicator:
\`\`\`html
<ol class="gup-stepper" aria-label="Application progress">
  <li class="gup-stepper__item gup-stepper__item--done">
    <div class="gup-stepper__marker">
      <div class="gup-stepper__marker-inner"></div>
    </div>
    <div class="gup-stepper__body">
      <span class="gup-stepper__label">Personal details</span>
    </div>
  </li>
  <li class="gup-stepper__item gup-stepper__item--selected" aria-current="step">
    <div class="gup-stepper__marker">
      <div class="gup-stepper__marker-inner">2</div>
    </div>
    <div class="gup-stepper__body">
      <span class="gup-stepper__label">Contact information</span>
    </div>
  </li>
  <li class="gup-stepper__item">
    <div class="gup-stepper__marker">
      <div class="gup-stepper__marker-inner">3</div>
    </div>
    <div class="gup-stepper__body">
      <span class="gup-stepper__label">Review and submit</span>
    </div>
  </li>
</ol>
\`\`\`

#### With expandable content (native \`<details>\`):
\`\`\`html
<ol class="gup-stepper gup-stepper--expandable" aria-label="Application progress">
  <li class="gup-stepper__item gup-stepper__item--done">
    <div class="gup-stepper__marker">
      <div class="gup-stepper__marker-inner"></div>
    </div>
    <details class="gup-stepper__body">
      <summary class="gup-stepper__label">
        Personal details
        <span class="gup-stepper__toggle" aria-hidden="true"></span>
      </summary>
      <div class="gup-stepper__content">Your name and date of birth.</div>
    </details>
  </li>
  <li class="gup-stepper__item gup-stepper__item--selected" aria-current="step">
    <div class="gup-stepper__marker">
      <div class="gup-stepper__marker-inner">2</div>
    </div>
    <details class="gup-stepper__body" open>
      <summary class="gup-stepper__label">
        Contact information
        <span class="gup-stepper__toggle" aria-hidden="true"></span>
      </summary>
      <div class="gup-stepper__content">Your email and phone number.</div>
    </details>
  </li>
</ol>
\`\`\`

### Available classes

| Class | Description |
|---|---|
| \`.gup-stepper\` | Base class on the \`<ol>\` element (required) |
| \`.gup-stepper--expandable\` | Adds dividers; use with \`<details>\` as body |
| \`.gup-stepper__item\` | Each \`<li>\` step row |
| \`.gup-stepper__item--done\` | Completed step |
| \`.gup-stepper__item--selected\` | Current step - pair with \`aria-current="step"\` |
| \`.gup-stepper__marker\` | Column holding the circle |
| \`.gup-stepper__marker-inner\` | The visible circle (number or icon) |
| \`.gup-stepper__body\` | Right-side content column - use \`<div>\` or \`<details>\` |
| \`.gup-stepper__label\` | Step title text or \`<summary>\` text |
| \`.gup-stepper--wizard\` | Wizard mode - all items open, controls non-interactive; pair with \`gup-stepper--expandable\` |
| \`.gup-stepper__toggle\` | Show/Hide toggle indicator inside \`<summary>\` (add \`aria-hidden="true"\`) |
| \`.gup-stepper__content\` | Step body content (visible inline in static mode, or inside \`<details>\` in expandable mode) |
        `,
      },
    },
  },
} as Meta;

const marker = (text = '') => html`
  <div class="${gupStepperClasses.marker}">
    <div class="${gupStepperClasses.markerInner}">${text}</div>
  </div>
`;

export const Default: Story = {
  render: () => html`
    <ol class="${gupStepperClasses.base}" aria-label="Application progress">
      <li class="${GupStepper.getItemClassName({ stepType: 'done' })}">
        ${marker()}
        <div class="${gupStepperClasses.body}">
          <span class="${gupStepperClasses.label}">Personal details</span>
        </div>
      </li>
      <li class="${GupStepper.getItemClassName({ stepType: 'selected' })}" aria-current="step">
        ${marker('2')}
        <div class="${gupStepperClasses.body}">
          <span class="${gupStepperClasses.label}">Contact information</span>
        </div>
      </li>
      <li class="${GupStepper.getItemClassName()}">
        ${marker('3')}
        <div class="${gupStepperClasses.body}">
          <span class="${gupStepperClasses.label}">Review and submit</span>
        </div>
      </li>
      <li class="${GupStepper.getItemClassName()}">
        ${marker('4')}
        <div class="${gupStepperClasses.body}">
          <span class="${gupStepperClasses.label}">Confirmation</span>
        </div>
      </li>
    </ol>
  `,
};

export const AllStepTypes: Story = {
  render: () => html`
    <ol class="${gupStepperClasses.base}" aria-label="Step states">
      <li class="${GupStepper.getItemClassName({ stepType: 'done' })}">
        ${marker()}
        <div class="${gupStepperClasses.body}">
          <span class="${gupStepperClasses.label}">Done</span>
        </div>
      </li>
      <li class="${GupStepper.getItemClassName({ stepType: 'selected' })}" aria-current="step">
        ${marker('2')}
        <div class="${gupStepperClasses.body}">
          <span class="${gupStepperClasses.label}">Selected (current)</span>
        </div>
      </li>
      <li class="${GupStepper.getItemClassName()}">
        ${marker('3')}
        <div class="${gupStepperClasses.body}">
          <span class="${gupStepperClasses.label}">Default (upcoming)</span>
        </div>
      </li>
    </ol>
  `,
};

const toggle = html`<span class="${gupStepperClasses.toggle}" aria-hidden="true"></span>`;

export const WithExpandableContent: Story = {
  render: () => html`
    <ol class="${gupStepperClasses.base} ${gupStepperClasses.expandable}" aria-label="Application progress">
      <li class="${GupStepper.getItemClassName({ stepType: 'done' })}">
        ${marker()}
        <details class="${gupStepperClasses.body}">
          <summary class="${gupStepperClasses.label}">Personal details ${toggle}</summary>
          <div class="${gupStepperClasses.content}">
            Full name: Jane Smith<br />
            Date of birth: 01 Jan 1990
          </div>
        </details>
      </li>
      <li class="${GupStepper.getItemClassName({ stepType: 'selected' })}" aria-current="step">
        ${marker('2')}
        <details class="${gupStepperClasses.body}" open>
          <summary class="${gupStepperClasses.label}">Contact information ${toggle}</summary>
          <div class="${gupStepperClasses.content}">
            Complete your email address and phone number to continue.
          </div>
        </details>
      </li>
      <li class="${GupStepper.getItemClassName()}">
        ${marker('3')}
        <details class="${gupStepperClasses.body}">
          <summary class="${gupStepperClasses.label}">Review and submit ${toggle}</summary>
          <div class="${gupStepperClasses.content}">
            Check your answers before submitting.
          </div>
        </details>
      </li>
    </ol>
  `,
};

export const WizardMode: Story = {
  render: () => html`
    <ol class="${gupStepperClasses.base} ${gupStepperClasses.expandable} ${gupStepperClasses.wizard}" aria-label="Application progress">
      <li class="${GupStepper.getItemClassName({ stepType: 'done' })}">
        ${marker()}
        <details class="${gupStepperClasses.body}" open>
          <summary class="${gupStepperClasses.label}">Personal details</summary>
          <div class="${gupStepperClasses.content}">
            Full name: Jane Smith<br />
            Date of birth: 01 Jan 1990
          </div>
        </details>
      </li>
      <li class="${GupStepper.getItemClassName({ stepType: 'selected' })}" aria-current="step">
        ${marker('2')}
        <details class="${gupStepperClasses.body}" open>
          <summary class="${gupStepperClasses.label}">Contact information</summary>
          <div class="${gupStepperClasses.content}">
            Complete your email address and phone number to continue.
          </div>
        </details>
      </li>
      <li class="${GupStepper.getItemClassName()}">
        ${marker('3')}
        <details class="${gupStepperClasses.body}" open>
          <summary class="${gupStepperClasses.label}">Review and submit</summary>
          <div class="${gupStepperClasses.content}">
            Check your answers before submitting.
          </div>
        </details>
      </li>
    </ol>
  `,
};

export const StaticModeWithDetails: Story = {
  render: () => html`
    <details class="${gupDetailsClasses.base} ${gupDetailsClasses.sink} ${gupDetailsClasses.circleToggle}" open>
      <summary class="${gupDetailsClasses.label}">
        <span class="${gupDetailsClasses.icon}" aria-hidden="true"></span>
        <span class="${gupDetailsClasses.labelInner}">Step 1</span>
      </summary>
      <div class="${gupDetailsClasses.content}">
        <div class="${gupDetailsClasses.contentInner}">
          <ol class="${gupStepperClasses.base}" aria-label="Application progress">
            <li class="${GupStepper.getItemClassName({ stepType: 'done' })}">
              ${marker()}
              <div class="${gupStepperClasses.body}">
                <span class="${gupStepperClasses.label}">Personal details</span>
              </div>
            </li>
            <li class="${GupStepper.getItemClassName({ stepType: 'selected' })}" aria-current="step">
              ${marker('2')}
              <div class="${gupStepperClasses.body}">
                <span class="${gupStepperClasses.label}">Contact information with some words that can cause the label to span many many many lines</span>
              </div>
            </li>
            <li class="${GupStepper.getItemClassName()}">
              ${marker('3')}
              <div class="${gupStepperClasses.body}">
                <span class="${gupStepperClasses.label}">Review and submit</span>
              </div>
            </li>
            <li class="${GupStepper.getItemClassName()}">
              ${marker('4')}
              <div class="${gupStepperClasses.body}">
                <span class="${gupStepperClasses.label}">Confirmation with some words that can cause the label to span many many many lines</span>
              </div>
            </li>
          </ol>
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

export const ComparisonWithWebComponent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px;">
      <div>
        <h4 style="margin: 0 0 16px 0; font-size: 14px; color: #666;">Class-based</h4>
        <ol class="${gupStepperClasses.base}" aria-label="Progress">
          <li class="${GupStepper.getItemClassName({ stepType: 'done' })}">
            ${marker()}
            <div class="${gupStepperClasses.body}">
              <span class="${gupStepperClasses.label}">Step 1</span>
            </div>
          </li>
          <li class="${GupStepper.getItemClassName({ stepType: 'selected' })}" aria-current="step">
            ${marker('2')}
            <div class="${gupStepperClasses.body}">
              <span class="${gupStepperClasses.label}">Step 2</span>
            </div>
          </li>
          <li class="${GupStepper.getItemClassName()}">
            ${marker('3')}
            <div class="${gupStepperClasses.body}">
              <span class="${gupStepperClasses.label}">Step 3</span>
            </div>
          </li>
        </ol>
      </div>
      <div>
        <h4 style="margin: 0 0 16px 0; font-size: 14px; color: #666;">Web Component</h4>
        <gup-stepper static-mode>
          <gup-stepper-item step-number="1" step-type="done">
            <span slot="label">Step 1</span>
          </gup-stepper-item>
          <gup-stepper-item step-number="2" step-type="selected">
            <span slot="label">Step 2</span>
          </gup-stepper-item>
          <gup-stepper-item step-number="3">
            <span slot="label">Step 3</span>
          </gup-stepper-item>
        </gup-stepper>
      </div>
    </div>
  `,
};
