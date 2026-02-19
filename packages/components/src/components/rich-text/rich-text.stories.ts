import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';

import './rich-text';
import { type RichText } from './rich-text';

const { args, argTypes, template } = getWcStorybookHelpers('gup-rich-text');
type Story = StoryObj<RichText & typeof args>;

export default {
  title: 'Components/Rich text',
  component: 'gup-rich-text',
  args,
  argTypes,
} as Meta;

export const Default: Story = {
  render: (args) =>
    template(
      args,
      html`
        <h2>Public Services Overview - heading 2</h2>
        <p><strong>Welcome to our digital services portal.</strong> <em>This platform provides access to various government services and information.</em> We are committed to making public services accessible, efficient, and user-friendly for all citizens.</p>
        <h3>Available Services - heading 3</h3>
        <p>Access a wide range of <a href="#">online services</a> from the comfort of your home.</p>
        <h4>Document Services - heading 4</h4>
        <ul>
          <li>Apply for <strong>identity documents</strong> and certificates.</li>
          <li>Request <em>official transcripts</em> and <strong>records</strong>.</li>
          <li>Submit applications for <a href="#">permits and licenses</a>.</li>
        </ul>
        <h5>Service Requirements - heading 5</h5>
        <ol>
          <li><em>Valid identification document</em></li>
          <li>Proof of residence or address</li>
          <li>Completed application form</li>
        </ol>
        <h6>Important Information - heading 6</h6>
        <p>Please ensure all <strong>submitted documents</strong> are current and <em>clearly legible</em>.</p>
        <ul>
          <li>Personal Services</li>
          <li>Business Services
            <ol>
              <li>Registration
                <ul>
                  <li>Company registration</li>
                  <li>Tax identification</li>
                </ul>
              </li>
              <li>Licensing
                <ul>
                  <li>Business permits
                    <ol>
                      <li>Retail licenses</li>
                      <li>Professional licenses</li>
                    </ol>
                  </li>
                  <li>Industry-specific permits</li>
                </ul>
              </li>
            </ol>
          </li>
          <li>Community Services</li>
        </ul>
        <p>Processing times vary depending on the type of service requested.</p>
        <img src="https://gov.om/documents/20117/0/%D9%88%D8%B2%D8%A7%D8%B1%D8%A9+%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85+%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%8A+%D9%88%D8%A7%D9%84%D8%A8%D8%AD%D8%AB+%D8%A7%D9%84%D8%B9%D9%84%D9%85%D9%8A+%D9%88%D8%A7%D9%84%D8%A7%D8%A8%D8%AA%D9%83%D8%A7%D8%B1.png/3a3006f0-eafe-7b2f-e710-f83a98f04dbe?t=1740377810599" alt="Government Building">
        <ol>
          <li>Submit Application
            <ul>
              <li>Online submission
                <ol>
                  <li>Create account</li>
                  <li>Fill out forms</li>
                </ol>
              </li>
              <li>In-person submission</li>
            </ul>
          </li>
          <li>Document Verification</li>
          <li>Processing
            <ul>
              <li>Initial review</li>
              <li>Final approval
                <ol>
                  <li>Quality check</li>
                  <li>Authorization
                    <ul>
                      <li>Supervisor approval</li>
                      <li>Document issuance</li>
                    </ul>
                  </li>
                </ol>
              </li>
            </ul>
          </li>
        </ol>
        <img src="https://gov.om/documents/20117/0/%D8%A7%D9%84%D8%AD%D8%B5%D9%88%D9%84+%D8%B9%D9%84%D9%89+%D8%AA%D8%B1%D8%AE%D9%8A%D8%B5+%D8%A7%D9%84%D8%A7%D9%95%D9%86%D8%AA%D8%A7%D8%AC+%D8%A7%D9%84%D9%81%D9%86%D9%8A+%D9%88%D8%A7%D9%84%D8%AA%D9%88%D8%B2%D9%8A%D8%B9.png/d30bb86e-7ac0-7f1b-4fbd-f75763664e26?t=1740297515949" alt="Public Service Center">
        <p>For assistance, visit our <a href="#">help center</a> or contact support.</p>
        <blockquote>
          <p>We strive to provide efficient, transparent, and accessible public services that meet the needs of all citizens.</p>
        </blockquote>
      `
    ),
};

export const RTL: Story = {
  ...Default,
  parameters: {
    direction: 'rtl',
  },
};
