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
import { headerTemplate } from '../../components/header/header.stories';

export default {
  title: 'Templates/Service Start',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: StoryObj = {
  render: () => html`
      <div style="display: flex; flex-direction: column; height: 100%">
        <gup-header>
          ${headerTemplate}
        </gup-header>
        <gup-content-header page-title="Service name"></gup-content-header>
        <gup-wizard-main>
          <gup-details open content-appearance="sink" closed-icon="add-circle" open-icon="remove-circle">
            <span slot="label">Step 2</span>
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
              <gup-stepper-item step-number="4">
                <span slot="label">Step 4</span>
              </gup-stepper-item>
            </gup-stepper>
          </gup-details>
          <h2 style="font-size: 28px; font-weight: 700; margin-top: var(--gup-spacing-between-text);">Step title</h2>
          <p style="font-size: 24px;">Placeholder for step description. Below is example form.</p>
          <form>
            <gup-form-section>
              <span slot="title">Form section title 1</span>
              <gup-form-list>
                <gup-input-field name="your-message1" type="text">Your message</gup-input-field>
                <gup-input-field name="your-message2" type="text">Your message</gup-input-field>
                <gup-input-field name="your-message3" type="text">Your message</gup-input-field>
              </gup-form-list>
            </gup-form-section>
            <gup-form-section>
              <span slot="title">Form section title 2</span>
              <gup-form-list>
                <gup-input-field name="your-message4" type="text">Your message</gup-input-field>
                <gup-input-field name="your-message5" type="text">Your message</gup-input-field>
                <gup-input-field name="your-message6" type="text">Your message</gup-input-field>
              </gup-form-list>
            </gup-form-section>
          </form>
        </gup-wizard-main>
        <gup-wizard-footer>
          <gup-button slot="start" appearance="secondary">
            Back
            <gup-icon slot="icon-start" icon-name="arrow-back" height="24" width="24"></gup-icon>
          </gup-button>
          <gup-button slot="end" appearance="primary">
            Continue
            <gup-icon slot="icon-end" icon-name="arrow-forward" height="24" width="24"></gup-icon>
          </gup-button>
        </gup-wizard-footer>
      </div>
    `,
};
