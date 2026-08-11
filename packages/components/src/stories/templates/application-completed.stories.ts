import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import { applyBreakpoint } from '../../../.storybook/utils';

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

type ConfirmationLabels = {
  needHelp: string;
  serviceName: string;
  referenceNumber: string;
  title: string;
  intro: string;
  ownerDetails: string;
  civilId: string;
  ownerName: string;
  ownerNameValue: string;
  phoneNo: string;
  email: string;
  requestDetails: string;
  requestNo: string;
  plateNoAndCode: string;
  goToDashboard: string;
  downloadCertificate: string;
};

const enLabels: ConfirmationLabels = {
  needHelp: 'Do you need help?',
  serviceName: 'Service name',
  referenceNumber: 'Reference Number:',
  title: 'Application Completed',
  intro: 'Your application has been successfully completed. Thank you for your submission.',
  ownerDetails: 'Owner Details',
  civilId: 'Civil ID',
  ownerName: 'Owner Name',
  ownerNameValue: 'Abdullah Al Busaidi',
  phoneNo: 'Phone No.',
  email: 'Email',
  requestDetails: 'Request Details',
  requestNo: 'Request No.',
  plateNoAndCode: 'Plate No. & Code',
  goToDashboard: 'Go to Gov.om Dashboard',
  downloadCertificate: 'Download Certificate',
};

const arLabels: ConfirmationLabels = {
  needHelp: 'هل تحتاج إلى مساعدة؟',
  serviceName: 'اسم الخدمة',
  referenceNumber: 'الرقم المرجعي:',
  title: 'تم إكمال الطلب',
  intro: 'تم إكمال طلبك بنجاح. شكرًا لتقديمك.',
  ownerDetails: 'بيانات المالك',
  civilId: 'الرقم المدني',
  ownerName: 'اسم المالك',
  ownerNameValue: 'عبدالله البوسعيدي',
  phoneNo: 'رقم الهاتف',
  email: 'البريد الإلكتروني',
  requestDetails: 'تفاصيل الطلب',
  requestNo: 'رقم الطلب',
  plateNoAndCode: 'رقم اللوحة والرمز',
  goToDashboard: 'الذهاب إلى لوحة تحكم Gov.om',
  downloadCertificate: 'تحميل الشهادة',
};

const renderConfirmationPage = (t: ConfirmationLabels) => html`
  <style>
    /* Header action labels are visually hidden by default and revealed from 750px up */
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

    @media (max-width: 767.98px) {
      gup-button-group[direction="vertical-on-mobile"] gup-button {
        width: 100%;
      }
    }
  </style>
  <div style="display: flex; flex-direction: column; height: 100%">
    <gup-header nav-aria-label="Service Navigation Header">
      <!-- Empty start slot keeps the header logo centered -->
      <span slot="start"></span>
      <gup-track slot="end" horizontal-alignment="right" direction="horizontal">
        <gup-button appearance="text" kind="button" type="button">
          <span class="header-action-label">${t.needHelp}</span>
          <gup-icon slot="icon-start" icon-name="help-outline" height="24" width="24"></gup-icon>
        </gup-button>
      </gup-track>
    </gup-header>
    <gup-content-header page-title="${t.serviceName}">
      <div slot="page-summary">${t.referenceNumber} <strong>0000000000</strong></div>
    </gup-content-header>
    <gup-wizard-main>
      <gup-track direction="vertical" gap="9">
        <gup-track direction="vertical" gap="4">
          <h2 style="font-size: 28px; font-weight: 700; line-height: 40px; letter-spacing: -0.56px; color: var(--gup-color-content-primary);">${t.title}</h2>
          <p style="  font-size: 24px; line-height: 32px; color: var(--gup-color-content-primary);">${t.intro}</p>
        </gup-track>
        <gup-track direction="vertical" gap="4">
          <h3 style="font-size: 20px; font-weight: 700; line-height: 28px; color: var(--gup-color-content-primary);">${t.ownerDetails}</h3>
          <gup-table>
            <gup-table-row>
              <gup-table-cell type="rowheader">${t.civilId}</gup-table-cell>
              <gup-table-cell>123456</gup-table-cell>
            </gup-table-row>
            <gup-table-row>
              <gup-table-cell type="rowheader">${t.ownerName}</gup-table-cell>
              <gup-table-cell>${t.ownerNameValue}</gup-table-cell>
            </gup-table-row>
            <gup-table-row>
              <gup-table-cell type="rowheader">${t.phoneNo}</gup-table-cell>
              <gup-table-cell>91234567</gup-table-cell>
            </gup-table-row>
            <gup-table-row>
              <gup-table-cell type="rowheader">${t.email}</gup-table-cell>
              <gup-table-cell>abdullah@email.com</gup-table-cell>
            </gup-table-row>
          </gup-table>
        </gup-track>
        <gup-track direction="vertical" gap="4">
          <h3 style="font-size: 20px; font-weight: 700; line-height: 28px; color: var(--gup-color-content-primary);">${t.requestDetails}</h3>
          <gup-table>
            <gup-table-row>
              <gup-table-cell type="rowheader">${t.requestNo}</gup-table-cell>
              <gup-table-cell>150288188</gup-table-cell>
            </gup-table-row>
            <gup-table-row>
              <gup-table-cell type="rowheader">${t.plateNoAndCode}</gup-table-cell>
              <gup-table-cell>123 A B</gup-table-cell>
            </gup-table-row>
          </gup-table>
        </gup-track>
        <gup-button-group direction="vertical-on-mobile">
          <gup-button appearance="primary">${t.goToDashboard}</gup-button>
          <gup-button appearance="secondary">${t.downloadCertificate}</gup-button>
        </gup-button-group>
      </gup-track>
    </gup-wizard-main>
  </div>
`;

export const Default: StoryObj = {
  render: () => renderConfirmationPage(enLabels),
};

export const RTL: StoryObj = {
  render: () => renderConfirmationPage(arLabels),
  parameters: {
    direction: 'rtl',
  },
};

export const Mobile: StoryObj = {
  ...applyBreakpoint('xsmall'),
  render: () => renderConfirmationPage(enLabels),
};
