import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../components/icon/icon';
import '../../components/button/button';
import '../../components/header/header';
import '../../components/track/track';
import '../../components/content-header/content-header';

export default {
  title: 'Templates/Help Service',
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
      <gup-content-header page-title="Get help using our service"></gup-content-header>
      <div style="background-color: var(--gup-color-background-canvas); flex: 1;">
        <div style="max-width: 1024px; margin-inline: auto; padding: 32px; padding-bottom: 80px;">
          <gup-track direction="vertical" gap="9" style="max-width: 632px;">
            <gup-track direction="vertical" gap="4">
              <h2 style="font-size: 20px; font-weight: 700; line-height: 28px; letter-spacing: -0.4px; margin: 0;">
                What types of assistance are available for navigating the Gov.om platform?
              </h2>
              <p style="font-size: 16px; line-height: 24px; margin: 0;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id ipsum et lorem congue pulvinar. Phasellus iaculis id dolor ut porta. Nulla volutpat varius tortor, in scelerisque mi placerat at. Curabitur quis iaculis ex.
              </p>
            </gup-track>
            <gup-track direction="vertical" gap="4">
              <h2 style="font-size: 20px; font-weight: 700; line-height: 28px; letter-spacing: -0.4px; margin: 0;">
                How can users access customer support if they encounter issues while using Gov.om?
              </h2>
              <p style="font-size: 16px; line-height: 24px; margin: 0;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id ipsum et lorem congue pulvinar. Phasellus iaculis id dolor ut porta. Nulla volutpat varius tortor, in scelerisque mi placerat at. Curabitur quis iaculis ex.
              </p>
            </gup-track>
          </gup-track>
        </div>
      </div>
    </div>
  `,
};
