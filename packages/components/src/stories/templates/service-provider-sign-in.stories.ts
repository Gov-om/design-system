import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../components/icon/icon';
import '../../components/button/button';
import '../../components/banner/banner';
import '../../components/rich-text/rich-text';
import '../../components/link/link';
import '../../components/radio-button/radio-button';
import '../../components/radio-button-group/radio-button-group';
import '../../components/content-header/content-header';
import '../../components/header/header';
import '../../components/track/track';
import '../../components/wizard-footer/wizard-footer';
import '../../components/wizard-main/wizard-main';

export default {
  title: 'Templates/Service Provider Sign In',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: StoryObj = {
  render: () => html`
    <div style="display: flex; flex-direction: column; height: 100%">
      <gup-header nav-aria-label="Service Navigation Header">
        <gup-track slot="start" direction="horizontal">
          <gup-button appearance="text" kind="button" type="button">
            Cancel
            <gup-icon slot="icon-start" icon-name="close" height="24" width="24"></gup-icon>
          </gup-button>
        </gup-track>
        <gup-track slot="end" horizontal-alignment="right" direction="horizontal">
          <gup-button appearance="text" kind="button" type="button">
            العربية
            <gup-icon slot="icon-start" icon-name="language" height="24" width="24"></gup-icon>
          </gup-button>
        </gup-track>
      </gup-header>
      <gup-content-header page-title="Sign in to your account"></gup-content-header>
      <gup-wizard-main>
        <gup-track direction="vertical" gap="7">
          <gup-banner hide-icon close-label="Close">
            <span slot="title">Supported services</span>
            <gup-rich-text>
              <p>These login options support only the following services:</p>
              <ol>
                <li>Continue study</li>
                <li>Certificate attestation and equivalence</li>
                <li>Appeal application</li>
              </ol>
              <p><br/> For other services visit: <gup-link href="https://gov.om/">https://gov.om/</gup-link></p>
            </gup-rich-text>
          </gup-banner>
          <gup-radio-button-group label="Choose a way to sign in" name="sign-in-method">
            <gup-radio-button name="sign-in-method" value="mobile-phone">
              Mobile phone
              <span slot="hint">You'll need your phone number.</span>
            </gup-radio-button>
            <gup-radio-button name="sign-in-method" value="identity-card">
              Identity card
              <span slot="hint">You'll need the card reader.</span>
            </gup-radio-button>
          </gup-radio-button-group>
        </gup-track>
      </gup-wizard-main>
      <gup-wizard-footer>
        <gup-button slot="end" appearance="primary" disabled>
          Continue
          <gup-icon slot="icon-end" icon-name="arrow-forward" height="24" width="24"></gup-icon>
        </gup-button>
      </gup-wizard-footer>
    </div>
  `,
};
