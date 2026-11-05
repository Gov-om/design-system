import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../components/input-field/input-field';
import '../../components/icon/icon';
import '../../components/button/button';
import '../../components/form-list/form-list';
import '../../components/form-section/form-section';
import '../../components/header/header';
import '../../components/content-header/content-header';
import '../../components/details/details';
import '../../components/stepper/stepper/stepper';
import '../../components/stepper/stepper-item/stepper-item';
import '../../components/wizard-footer/wizard-footer';
import '../../components/wizard-main/wizard-main';

export default {
  title: 'Templates/Service Start',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

type ServiceStartLabels = {
  saveAndExit: string;
  needHelp: string;
  pageTitle: string;
  currentStep: string;
  steps: string[];
  stepTitle: string;
  stepDescription: string;
  sectionOne: string;
  sectionTwo: string;
  fieldLabel: string;
  back: string;
  continueLabel: string;
};

const enLabels: ServiceStartLabels = {
  saveAndExit: 'Save & exit',
  needHelp: 'Do you need help?',
  pageTitle: 'Service name',
  currentStep: 'Step 2',
  steps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
  stepTitle: 'Step title',
  stepDescription: 'Placeholder for step description. Below is example form.',
  sectionOne: 'Form section title 1',
  sectionTwo: 'Form section title 2',
  fieldLabel: 'Your message',
  back: 'Back',
  continueLabel: 'Continue',
};

const arLabels: ServiceStartLabels = {
  saveAndExit: 'حفظ وخروج',
  needHelp: 'هل تحتاج إلى مساعدة؟',
  pageTitle: 'اسم الخدمة',
  currentStep: 'الخطوة 2',
  steps: ['الخطوة 1', 'الخطوة 2', 'الخطوة 3', 'الخطوة 4'],
  stepTitle: 'عنوان الخطوة',
  stepDescription: 'نص توضيحي لوصف الخطوة. أدناه نموذج كمثال.',
  sectionOne: 'عنوان القسم 1',
  sectionTwo: 'عنوان القسم 2',
  fieldLabel: 'رسالتك',
  back: 'رجوع',
  continueLabel: 'متابعة',
};

const formSection = (title: string, names: string[], t: ServiceStartLabels) => html`
  <gup-form-section>
    <span slot="title">${title}</span>
    <gup-form-list>
      ${names.map((name) => html`<gup-input-field name="${name}" type="text">${t.fieldLabel}</gup-input-field>`)}
    </gup-form-list>
  </gup-form-section>
`;

const renderServiceStart = (t: ServiceStartLabels) => html`
  <style>
    /* Header action labels stay in the DOM but are visually hidden below 750px */
    .header-action-label {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
      border: 0;
    }

    @media (min-width: 750px) {
      .header-action-label {
        position: static;
        width: auto;
        height: auto;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
      }
    }
  </style>
  <div style="display: flex; flex-direction: column; min-height: 100vh">
    <gup-header nav-aria-label="Service Navigation Header">
      <gup-track slot="start">
        <gup-button appearance="text" kind="button" type="button">
          <span class="header-action-label">${t.saveAndExit}</span>
          <gup-icon slot="icon-start" icon-name="close" height="24" width="24"></gup-icon>
        </gup-button>
      </gup-track>
      <gup-track slot="end" horizontal-alignment="right">
        <gup-button appearance="text" kind="button" type="button">
          <span class="header-action-label">${t.needHelp}</span>
          <gup-icon slot="icon-start" icon-name="live-help" height="24" width="24"></gup-icon>
        </gup-button>
      </gup-track>
    </gup-header>
    <gup-content-header page-title="${t.pageTitle}"></gup-content-header>
    <gup-wizard-main style="flex: 1">
      <gup-details open content-appearance="sink" closed-icon="add-circle" open-icon="remove-circle">
        <span slot="label">${t.currentStep}</span>
        <gup-stepper static-mode>
          ${t.steps.map(
            (step, index) => html`
              <gup-stepper-item step-number="${index + 1}" step-type="${index === 0 ? 'done' : index === 1 ? 'selected' : 'default'}">
                <span slot="label">${step}</span>
              </gup-stepper-item>
            `
          )}
        </gup-stepper>
      </gup-details>
      <h2 style="font-size: 28px; font-weight: 700; margin-top: var(--gup-spacing-between-text);">${t.stepTitle}</h2>
      <p style="font-size: 24px;">${t.stepDescription}</p>
      <form>
        ${formSection(t.sectionOne, ['your-message1', 'your-message2', 'your-message3'], t)}
        ${formSection(t.sectionTwo, ['your-message4', 'your-message5', 'your-message6'], t)}
      </form>
    </gup-wizard-main>
    <gup-wizard-footer>
      <gup-button slot="start" appearance="secondary">
        ${t.back}
        <gup-icon slot="icon-start" icon-name="arrow-back" height="24" width="24" rtl-flip-enabled></gup-icon>
      </gup-button>
      <gup-button slot="end" appearance="primary">
        ${t.continueLabel}
        <gup-icon slot="icon-end" icon-name="arrow-forward" height="24" width="24" rtl-flip-enabled></gup-icon>
      </gup-button>
    </gup-wizard-footer>
  </div>
`;

export const Default: StoryObj = {
  render: () => renderServiceStart(enLabels),
};

export const RTL: StoryObj = {
  render: () => renderServiceStart(arLabels),
  parameters: {
    direction: 'rtl',
  },
};
