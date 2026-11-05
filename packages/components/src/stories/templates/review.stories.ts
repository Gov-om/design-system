import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';

import '../../components/button/button';
import '../../components/content-header/content-header';
import '../../components/data-sheet/data-sheet';
import '../../components/details/details';
import '../../components/header/header';
import '../../components/icon/icon';
import '../../components/labelled-item/labelled-item';
import '../../components/link/link';
import '../../components/screenreader-text/screenreader-text';
import '../../components/stepper/stepper/stepper';
import '../../components/stepper/stepper-item/stepper-item';
import '../../components/table/table/table';
import '../../components/table/table-cell/table-cell';
import '../../components/table/table-row/table-row';
import '../../components/track/track';
import '../../components/wizard-footer/wizard-footer';
import '../../components/wizard-main/wizard-main';

export default {
  title: 'Templates/Review',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

type ReviewRow = {
  label: string;
  value: string;
};

type ReviewSection = {
  title: string;
  rows: ReviewRow[];
};

type ReviewPayment = {
  serviceLabel: string;
  serviceValue: string;
  amountLabel: string;
  amount: string;
  currency: string;
};

type ReviewLabels = {
  saveAndExit: string;
  needHelp: string;
  serviceName: string;
  stepLabel: string;
  steps: string[];
  title: string;
  intro: string;
  sections: ReviewSection[];
  payment?: ReviewPayment;
  change: string;
  sendHeading: string;
  sendCopy: string;
  back: string;
  acceptAndSend: string;
};

const enLabels: ReviewLabels = {
  saveAndExit: 'Save & exit',
  needHelp: 'Do you need help?',
  serviceName: 'Service name',
  stepLabel: 'Review',
  steps: ['Owner details', 'Request details', 'Documents', 'Review'],
  title: 'Check your answers before sending your application',
  intro: 'Review the details below. You can change any answer before you send the application.',
  sections: [
    {
      title: 'Owner Details',
      rows: [
        { label: 'Civil ID', value: '123456' },
        { label: 'Owner Name', value: 'Abdullah Al Busaidi' },
        { label: 'Phone No.', value: '91234567' },
        { label: 'Email', value: 'abdullah@email.com' },
      ],
    },
    {
      title: 'Request Details',
      rows: [
        { label: 'Request No.', value: '150288188' },
        { label: 'Plate No. & Code', value: '123 A B' },
      ],
    },
  ],
  change: 'Change',
  sendHeading: 'Now send your application',
  sendCopy: 'By submitting this application you are confirming that, to the best of your knowledge, the details you are providing are correct.',
  back: 'Back',
  acceptAndSend: 'Accept and send',
};

const arLabels: ReviewLabels = {
  saveAndExit: 'حفظ وخروج',
  needHelp: 'هل تحتاج إلى مساعدة؟',
  serviceName: 'اسم الخدمة',
  stepLabel: 'المراجعة',
  steps: ['بيانات المالك', 'تفاصيل الطلب', 'المستندات', 'المراجعة'],
  title: 'تحقق من إجاباتك قبل إرسال طلبك',
  intro: 'راجع التفاصيل أدناه. يمكنك تغيير أي إجابة قبل إرسال الطلب.',
  sections: [
    {
      title: 'بيانات المالك',
      rows: [
        { label: 'الرقم المدني', value: '123456' },
        { label: 'اسم المالك', value: 'عبدالله البوسعيدي' },
        { label: 'رقم الهاتف', value: '91234567' },
        { label: 'البريد الإلكتروني', value: 'abdullah@email.com' },
      ],
    },
    {
      title: 'تفاصيل الطلب',
      rows: [
        { label: 'رقم الطلب', value: '150288188' },
        { label: 'رقم اللوحة والرمز', value: '123 A B' },
      ],
    },
  ],
  change: 'تغيير',
  sendHeading: 'أرسل طلبك الآن',
  sendCopy: 'من خلال تقديم هذا الطلب، فإنك تؤكد أن البيانات التي تقدمها صحيحة على حد علمك.',
  back: 'رجوع',
  acceptAndSend: 'الموافقة والإرسال',
};

const enPayment: ReviewPayment = {
  serviceLabel: 'Selected service',
  serviceValue: 'Multi-Entry Visit Visa – 5 year',
  amountLabel: 'Amount to pay',
  amount: '50',
  currency: 'Omani rial',
};

const arPayment: ReviewPayment = {
  serviceLabel: 'الخدمة المختارة',
  serviceValue: 'تأشيرة زيارة متعددة الدخول – 5 سنوات',
  amountLabel: 'المبلغ المستحق',
  amount: '50',
  currency: 'ريال عماني',
};

const rialSymbol = html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 729.6 365.93" width="20" aria-hidden="true">
    <path
      d="M241.67,213.77c-.63-49.2,11.44-95.41,35.76-137.75C313.47,13.28,353.02-6.48,421.55,28.87c10.67,5.5,53.6,35.43,57.81,44.54,5.03,10.87-27.48,103.87-29.11,122.3-34.69-37.51-99.37-98.66-154.85-69.62-45.05,23.58-12.02,62.54,11.46,87.68h409.36l-26.41,47.64h-332.5c-.31,1.8.87,3.3,2.53,4.6,12.44,9.72,80.97,39.54,94.75,39.54h210.71l-26.89,48.94H13.37l26.91-48.94h253.38l-37.11-44.13H64.75l26.41-47.64h150.51Z"
    />
  </svg>
`;

const paymentSheet = (payment: ReviewPayment) => html`
  <gup-data-sheet>
    <gup-labelled-item>
      <span slot="label">${payment.serviceLabel}</span>
      ${payment.serviceValue}
    </gup-labelled-item>
    <gup-labelled-item>
      <span slot="label">${payment.amountLabel}</span>
      <gup-track vertical-alignment="center" gap="1">
        ${rialSymbol} ${payment.amount}
        <gup-screenreader-text>${payment.currency}</gup-screenreader-text>
      </gup-track>
    </gup-labelled-item>
  </gup-data-sheet>
`;

const reviewSection = (section: ReviewSection, t: ReviewLabels) => html`
  <gup-track direction="vertical" gap="4">
    <h3 style="font-size: 20px; font-weight: 700; line-height: 28px; color: var(--gup-color-content-primary);">${section.title}</h3>
    <gup-table class="review-table">
      ${section.rows.map(
        (row) => html`
          <gup-table-row>
            <gup-table-cell type="rowheader">${row.label}</gup-table-cell>
            <gup-table-cell>${row.value}</gup-table-cell>
            <gup-table-cell class="review-table__action">
              <gup-link kind="button">
                ${t.change}
                <gup-screenreader-text> ${row.label}</gup-screenreader-text>
              </gup-link>
            </gup-table-cell>
          </gup-table-row>
        `
      )}
    </gup-table>
  </gup-track>
`;

const renderReviewPage = (t: ReviewLabels) => html`
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

    .review-table gup-table-cell.review-table__action {
      text-align: end;
      white-space: nowrap;
    }

    /* Each review row is label / value / action. Below 600px the three columns cannot
       fit, and a nowrap action column would push the whole page into horizontal scroll,
       so the row stacks and only the last cell keeps a divider. */
    @media (max-width: 599.98px) {
      .review-table gup-table-row {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .review-table gup-table-cell {
        display: block;
        width: 100%;
      }

      .review-table gup-table-cell:not(:last-child) {
        border-bottom: none;
      }

      .review-table gup-table-cell.review-table__action {
        text-align: start;
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
    <gup-content-header page-title="${t.serviceName}"></gup-content-header>
    <gup-wizard-main style="flex: 1">
      <gup-details open content-appearance="sink" closed-icon="add-circle" open-icon="remove-circle">
        <span slot="label">${t.stepLabel}</span>
        <gup-stepper static-mode>
          ${t.steps.map(
            (step, index) => html`
              <gup-stepper-item step-number="${index + 1}" step-type="${index === t.steps.length - 1 ? 'selected' : 'done'}">
                <span slot="label">${step}</span>
              </gup-stepper-item>
            `
          )}
        </gup-stepper>
      </gup-details>
      <gup-track direction="vertical" gap="9" style="margin-top: var(--gup-spacing-between-text);">
        <gup-track direction="vertical" gap="4">
          <h2 style="font-size: 28px; font-weight: 700; line-height: 40px; letter-spacing: -0.56px; color: var(--gup-color-content-primary);">${t.title}</h2>
          <p style="font-size: 24px; line-height: 32px; color: var(--gup-color-content-primary);">${t.intro}</p>
        </gup-track>
        ${t.payment ? paymentSheet(t.payment) : ''}
        ${t.sections.map((section) => reviewSection(section, t))}
        <gup-track direction="vertical" gap="4">
          <h3 style="font-size: 20px; font-weight: 700; line-height: 28px; color: var(--gup-color-content-primary);">${t.sendHeading}</h3>
          <p style="font-size: 16px; line-height: 24px; color: var(--gup-color-content-primary);">${t.sendCopy}</p>
        </gup-track>
      </gup-track>
    </gup-wizard-main>
    <gup-wizard-footer>
      <gup-button slot="start" appearance="secondary">
        ${t.back}
        <gup-icon slot="icon-start" icon-name="arrow-back" height="24" width="24" rtl-flip-enabled></gup-icon>
      </gup-button>
      <gup-button slot="end" appearance="primary">
        ${t.acceptAndSend}
        <gup-icon slot="icon-end" icon-name="arrow-forward" height="24" width="24" rtl-flip-enabled></gup-icon>
      </gup-button>
    </gup-wizard-footer>
  </div>
`;

export const Default: StoryObj = {
  render: () => renderReviewPage(enLabels),
};

export const WithPayment: StoryObj = {
  render: () => renderReviewPage({ ...enLabels, payment: enPayment }),
};

export const RTL: StoryObj = {
  render: () => renderReviewPage({ ...arLabels, payment: arPayment }),
  parameters: {
    direction: 'rtl',
  },
};
