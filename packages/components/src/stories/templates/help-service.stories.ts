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

type HelpQuestion = {
  question: string;
  answer: string;
};

type HelpLabels = {
  cancel: string;
  languageToggle: string;
  pageTitle: string;
  questions: HelpQuestion[];
};

const enLabels: HelpLabels = {
  cancel: 'Cancel',
  languageToggle: 'العربية',
  pageTitle: 'Get help using our service',
  questions: [
    {
      question: 'What types of assistance are available for navigating the Gov.om platform?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id ipsum et lorem congue pulvinar. Phasellus iaculis id dolor ut porta. Nulla volutpat varius tortor, in scelerisque mi placerat at. Curabitur quis iaculis ex.',
    },
    {
      question: 'How can users access customer support if they encounter issues while using Gov.om?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id ipsum et lorem congue pulvinar. Phasellus iaculis id dolor ut porta. Nulla volutpat varius tortor, in scelerisque mi placerat at. Curabitur quis iaculis ex.',
    },
  ],
};

const arLabels: HelpLabels = {
  cancel: 'إلغاء',
  languageToggle: 'English',
  pageTitle: 'احصل على مساعدة في استخدام خدمتنا',
  questions: [
    {
      question: 'ما أنواع المساعدة المتوفرة للتنقل في منصة Gov.om؟',
      answer: 'يمكنك الاطلاع على الأدلة الإرشادية والأسئلة الشائعة داخل المنصة، أو التواصل مع فريق الدعم للحصول على مساعدة مباشرة في إكمال طلبك.',
    },
    {
      question: 'كيف يمكن للمستخدمين الوصول إلى خدمة العملاء إذا واجهوا مشكلات أثناء استخدام Gov.om؟',
      answer: 'يمكنك التواصل مع خدمة العملاء عبر الهاتف أو البريد الإلكتروني، أو استخدام نموذج الدعم المتاح في أسفل كل صفحة خدمة.',
    },
  ],
};

const renderHelpService = (t: HelpLabels) => html`
  <div style="display: flex; flex-direction: column; min-height: 100vh">
    <gup-header nav-aria-label="Service Navigation Header">
      <gup-track slot="start" direction="horizontal">
        <gup-button appearance="text" kind="button" type="button">
          ${t.cancel}
          <gup-icon slot="icon-start" icon-name="close" height="24" width="24"></gup-icon>
        </gup-button>
      </gup-track>
      <gup-track slot="end" horizontal-alignment="right" direction="horizontal">
        <gup-button appearance="text" kind="button" type="button">
          ${t.languageToggle}
          <gup-icon slot="icon-start" icon-name="language" height="24" width="24"></gup-icon>
        </gup-button>
      </gup-track>
    </gup-header>
    <gup-content-header page-title="${t.pageTitle}"></gup-content-header>
    <div style="background-color: var(--gup-color-background-canvas); flex: 1;">
      <div style="max-width: 1024px; margin-inline: auto; padding: 32px; padding-bottom: 80px;">
        <gup-track direction="vertical" gap="9" style="max-width: 632px;">
          ${t.questions.map(
            (item) => html`
              <gup-track direction="vertical" gap="4">
                <h2 style="font-size: 20px; font-weight: 700; line-height: 28px; letter-spacing: -0.4px; margin: 0;">${item.question}</h2>
                <p style="font-size: 16px; line-height: 24px; margin: 0;">${item.answer}</p>
              </gup-track>
            `
          )}
        </gup-track>
      </div>
    </div>
  </div>
`;

export const Default: StoryObj = {
  render: () => renderHelpService(enLabels),
};

export const RTL: StoryObj = {
  render: () => renderHelpService(arLabels),
  parameters: {
    direction: 'rtl',
  },
};
