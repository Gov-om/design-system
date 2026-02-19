import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../components/icon/icon';
import '../../components/button/button';
import '../../components/button-group/button-group';
import '../../components/content-header/content-header';
import '../../components/header/header';
import '../../components/track/track';
import '../../components/wizard-main/wizard-main';
import '../../components/table/table/table';
import '../../components/table/table-row/table-row';
import '../../components/table/table-cell/table-cell';

export default {
  title: 'Templates/Service Provider Confirmation Page',
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
            Do you need help?
            <gup-icon slot="icon-start" icon-name="help-outline" height="24" width="24"></gup-icon>
          </gup-button>
        </gup-track>
      </gup-header>
      <gup-content-header page-title="Service name">
        <div slot="page-summary">Reference Number: <strong>0000000000</strong></div>
      </gup-content-header>
        <gup-wizard-main>
        <gup-track direction="vertical" gap="9">
            <gup-track direction="vertical" gap="4">
              <h2 style="font-size: 28px; font-weight: 700; line-height: 40px; letter-spacing: -0.56px; color: var(--gup-color-content-primary);">Application Completed</h2>
              <p style="  font-size: 24px; line-height: 32px; color: var(--gup-color-content-primary);">Your application has been successfully completed. Thank you for your submission.</p>
            </gup-track>
            <gup-track direction="vertical" gap="4">
              <h3 style="font-size: 20px; font-weight: 700; line-height: 28px; color: var(--gup-color-content-primary);">Owner Details</h3>
              <gup-table>
                <gup-table-row>
                  <gup-table-cell type="rowheader">Civil ID</gup-table-cell>
                  <gup-table-cell>123456</gup-table-cell>
                </gup-table-row>
                <gup-table-row>
                  <gup-table-cell type="rowheader">Owner Name</gup-table-cell>
                  <gup-table-cell>Abdullah Al Busaidi</gup-table-cell>
                </gup-table-row>
                <gup-table-row>
                  <gup-table-cell type="rowheader">Phone No.</gup-table-cell>
                  <gup-table-cell>91234567</gup-table-cell>
                </gup-table-row>
                <gup-table-row>
                  <gup-table-cell type="rowheader">Email</gup-table-cell>
                  <gup-table-cell>abdullah@email.com</gup-table-cell>
                </gup-table-row>
              </gup-table>
            </gup-track>
            <gup-track direction="vertical" gap="4">
              <h3 style="font-size: 20px; font-weight: 700; line-height: 28px; color: var(--gup-color-content-primary);">Request Details</h3>
              <gup-table>
                <gup-table-row>
                  <gup-table-cell type="rowheader">Request No.</gup-table-cell>
                  <gup-table-cell>150288188</gup-table-cell>
                </gup-table-row>
                <gup-table-row>
                  <gup-table-cell type="rowheader">Plate No. & Code</gup-table-cell>
                  <gup-table-cell>123 A B</gup-table-cell>
                </gup-table-row>
              </gup-table>
            </gup-track>
            <gup-button-group>
              <gup-button appearance="primary">Go to Gov.om Dashboard</gup-button>
              <gup-button appearance="secondary">Download Certificate</gup-button>
            </gup-button-group>
          </gup-track>
      </gup-wizard-main>  
    </div>
  `,
};
