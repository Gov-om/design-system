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

type SignInLabels = {
  cancel: string;
  languageToggle: string;
  pageTitle: string;
  bannerTitle: string;
  bannerIntro: string;
  bannerServices: string[];
  bannerOther: string;
  chooseMethod: string;
  mobilePhone: string;
  mobilePhoneHint: string;
  identityCard: string;
  identityCardHint: string;
  continueLabel: string;
  close: string;
};

const enLabels: SignInLabels = {
  cancel: 'Cancel',
  languageToggle: 'العربية',
  pageTitle: 'Sign in to your account',
  bannerTitle: 'Supported services',
  bannerIntro: 'These login options support only the following services:',
  bannerServices: ['Continue study', 'Certificate attestation and equivalence', 'Appeal application'],
  bannerOther: 'For other services visit:',
  chooseMethod: 'Choose a way to sign in',
  mobilePhone: 'Mobile phone',
  mobilePhoneHint: "You'll need your phone number.",
  identityCard: 'Identity card',
  identityCardHint: "You'll need the card reader.",
  continueLabel: 'Continue',
  close: 'Close',
};

const arLabels: SignInLabels = {
  cancel: 'إلغاء',
  languageToggle: 'English',
  pageTitle: 'تسجيل الدخول إلى حسابك',
  bannerTitle: 'الخدمات المدعومة',
  bannerIntro: 'خيارات تسجيل الدخول هذه تدعم الخدمات التالية فقط:',
  bannerServices: ['مواصلة الدراسة', 'تصديق الشهادات ومعادلتها', 'تقديم استئناف'],
  bannerOther: 'للخدمات الأخرى قم بزيارة:',
  chooseMethod: 'اختر طريقة تسجيل الدخول',
  mobilePhone: 'الهاتف المحمول',
  mobilePhoneHint: 'ستحتاج إلى رقم هاتفك.',
  identityCard: 'البطاقة الشخصية',
  identityCardHint: 'ستحتاج إلى قارئ البطاقة.',
  continueLabel: 'متابعة',
  close: 'إغلاق',
};

const renderSignIn = (t: SignInLabels) => html`
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
    <gup-wizard-main style="flex: 1">
      <gup-track direction="vertical" gap="7">
        <gup-banner hide-icon close-label="${t.close}">
          <span slot="title">${t.bannerTitle}</span>
          <gup-rich-text>
            <p>${t.bannerIntro}</p>
            <ol>
              ${t.bannerServices.map((service) => html`<li>${service}</li>`)}
            </ol>
            <p><br />${t.bannerOther} <gup-link href="https://gov.om/">https://gov.om/</gup-link></p>
          </gup-rich-text>
        </gup-banner>
        <gup-radio-button-group label="${t.chooseMethod}" name="sign-in-method">
          <gup-radio-button name="sign-in-method" value="mobile-phone">
            ${t.mobilePhone}
            <span slot="hint">${t.mobilePhoneHint}</span>
          </gup-radio-button>
          <gup-radio-button name="sign-in-method" value="identity-card">
            ${t.identityCard}
            <span slot="hint">${t.identityCardHint}</span>
          </gup-radio-button>
        </gup-radio-button-group>
      </gup-track>
    </gup-wizard-main>
    <gup-wizard-footer>
      <gup-button slot="end" appearance="primary" disabled>
        ${t.continueLabel}
        <gup-icon slot="icon-end" icon-name="arrow-forward" height="24" width="24" rtl-flip-enabled></gup-icon>
      </gup-button>
    </gup-wizard-footer>
  </div>
`;

export const Default: StoryObj = {
  render: () => renderSignIn(enLabels),
};

export const RTL: StoryObj = {
  render: () => renderSignIn(arLabels),
  parameters: {
    direction: 'rtl',
  },
};
