import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { userEvent, within } from '@storybook/test';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import '../../track/track';
import '../../button/button';
import '../../table/table/table';
import '../../table/table-row/table-row';
import '../../table/table-cell/table-cell';
import './dropdown-field';
import '../dropdown-menu-item/dropdown-menu-item';
import '../dropdown-menu/dropdown-menu';
// import '../../../../.storybook/components/storybook-comment/storybook-comment';
import { type DropdownField } from './dropdown-field';
import { htmlAddonTransformSourceStripAll, storybookArgAttachment } from '../../../../.storybook/utils';
import { Placement } from '@floating-ui/dom';

const { args, argTypes, template, events } = getWcStorybookHelpers('gup-dropdown-field');
type Story = StoryObj<
  DropdownField &
    typeof args & {
      storybookAttachment: Placement;
    }
>;

export default {
  title: 'Components/Forms/Dropdown/Dropdown field',
  component: 'gup-dropdown-field',
  args: {
    ...args,
    placeholder: 'Select an item',
    'label-slot': 'Label',
    name: 'name-of-the-field',
    storybookAttachment: 'top',
  },
  argTypes: {
    ...argTypes,
    'default-slot': {
      ...argTypes['default-slot'],
      control: false,
    },
    value: {
      table: {
        type: {
          summary: 'string | string[]',
        },
      },
    },
    // Attachment of the activating element in relation to viewport
    storybookAttachment: storybookArgAttachment,
  },
  parameters: {
    actions: {
      handles: events,
    },
    html: {
      transform: (code: string) => htmlAddonTransformSourceStripAll(code).replace(/visible="[^\\"]*"/g, ''),
    },
  },
} as Meta;

const itemsTemplate = html`
  <gup-dropdown-menu-item label="Item number 1" value="item1"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Item number 2, with fallen dream thrown vast note completely settlers forty fall game" value="item2"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Item 3" value="item3"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item
    label="Item number 4, with sünnipäevanädalalõpupeopärastlõunaväsimatus"
    value="item4"
  ></gup-dropdown-menu-item>
  ${[...Array(11)].map(
    (_, i) => html`
    <gup-dropdown-menu-item label="Item number ${i + 5}" value="item${i + 5}"></gup-dropdown-menu-item>
  `
  )}
`;

export const Default: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-dropdown-menu>
          ${itemsTemplate}
        </gup-dropdown-menu>
      `
    ),
};

export const InForm: Story = {
  ...Default,
  render: (args) => html`
    <form novalidate>
      ${template(
        args,
        html`
        <gup-dropdown-menu multiple>
          ${itemsTemplate}
        </gup-dropdown-menu>
      `
      )}
      <button type="submit">Submit</button>
    </form>
    <!-- <storybook-comment>
      The <code>novalidate</code> attribute can be added to the form to disable the default behavior of focusing on invalid input and displaying a native error message, allowing for custom error handling.
    </storybook-comment> -->
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.addEventListener('submit', (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          console.log(Object.fromEntries(formData), 'form data');
          for (const element of event.target.elements) {
            if (element.nodeName !== 'BUTTON') {
              console.log('component', element);
              console.log('component name', element.name);
              console.log('component value', element.value);
            }
          }
        });
      })();
    </script>
  `,
  args: {
    name: 'dropdown',
    clearable: true,
  },
};

export const Required: Story = {
  ...InForm,
  args: {
    ...InForm.args,
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }));
  },
};

export const WithCustomError: Story = {
  ...Required,
  args: {
    ...Required.args,
    'error-message': 'The field is required, do not forget to select an item',
  },
};

export const Multiple: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-dropdown-menu multiple>
          ${itemsTemplate}
        </gup-dropdown-menu>
      `
    )}
    <!-- <storybook-comment>Note that <code>multiple</code> attribute must be set on <code>gup-dropdown-menu</code> instead of <code>gup-dropdown-field</code>.</storybook-comment> -->
  `,
};

export const MultipleWithSearch: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-dropdown-menu search-enabled multiple>
          ${itemsTemplate}
        </gup-dropdown-menu>
      `
    )}
    <!-- <storybook-comment>Note that both <code>multiple</code> and <code>search-enabled</code> attributes must be set on <code>gup-dropdown-menu</code> instead of <code>gup-dropdown-field</code>.</storybook-comment> -->
  `,
};

export const MultipleClearable: Story = {
  ...Multiple,
  args: {
    ...Multiple.args,
    clearable: true,
  },
};

export const SingleWithValue: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-dropdown-menu search-enabled>
          ${itemsTemplate}
        </gup-dropdown-menu>
      `
    )}
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.querySelector('gup-dropdown-field').value = 'item2';
      })();
    </script>
  `,
};

export const SingleWithValueAsArray: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-dropdown-menu search-enabled>
          ${itemsTemplate}
        </gup-dropdown-menu>
      `
    )}
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.querySelector('gup-dropdown-field').value = ['item2'];
      })();
    </script>
  `,
};

export const MultipleWithValue: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-dropdown-menu search-enabled multiple>
          ${itemsTemplate}
        </gup-dropdown-menu>
      `
    )}
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.querySelector('gup-dropdown-field').value = ['item2', 'item4'];
      })();
    </script>
  `,
};

export const WithCustomMenuFooter: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-dropdown-menu>
          ${itemsTemplate}
          <gup-track slot="controls" horizontal-alignment="right">
            <gup-button appearance="text" id="clear-button">Clear</gup-button>
            <gup-button id="apply-button">Apply</gup-button>
          </gup-track>
        </gup-dropdown-menu>
      `
    )}
    <!-- <storybook-comment>
      <p>For a basic custom footer implementation, add a <code>gup-track</code> with at least one "Apply" <code>gup-button</code> to the <code>controls</code> slot of <code>gup-dropdown-menu</code>. Call an <code>applyValue</code> method of the <code>gup-dropdown-field</code> when clicking the "Apply" button to set the selected item(s).</p>
      <p>Note the only way a user is supposed to confirm their selection is through the "Apply" button.</p>
    </storybook-comment> -->
    <script>
    (function() {
      const storyRoot = document.getElementById('${args['data-story-id']}');
        const dropdownField = storyRoot.querySelector('gup-dropdown-field');
        dropdownField.querySelector('#clear-button')?.addEventListener('gup-click', () => {
          dropdownField.querySelector('gup-dropdown-menu').clearSelection();
        });
        dropdownField.querySelector('#apply-button')?.addEventListener('gup-click', () => {
          dropdownField.applyValue().then(() => {
            console.log('component value', dropdownField.value);
          });
        });
      })();
    </script>
    `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Label'));
  },
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
};

export const Empty: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-dropdown-menu>
        </gup-dropdown-menu>
      `
    ),
};

export const TwoDropdowns: Story = {
  ...Default,
  render: (args) => html`
    <gup-track direction="vertical" gap="6">
      ${template(
        args,
        html`
          <gup-dropdown-menu>
            ${itemsTemplate}
          </gup-dropdown-menu>
        `
      )}
      <gup-dropdown-field name="dropdown2" placeholder="Select an item">
        <span slot="label">Dropdown 2</span>
        <gup-dropdown-menu search-enabled>
          ${itemsTemplate}
        </gup-dropdown-menu>
      </gup-dropdown-field>
    </gup-track>
  `,
  args: {
    name: 'dropdown1',
  },
};

export const WithHint: Story = {
  ...Default,
  args: {
    'hint-slot': 'This is the hint message with some <em>custom HTML</em>.',
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  ...Default,
  args: {
    'loading': true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithFewItems: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-dropdown-menu>
          <gup-dropdown-menu-item label="Item number 1" value="item1"></gup-dropdown-menu-item>
          <gup-dropdown-menu-item label="Item 2" value="item2"></gup-dropdown-menu-item>
        </gup-dropdown-menu>
      `
    )}
  `,
};

export const InTable: Story = {
  ...Default,
  render: (args) => html`
    <gup-table>
      <gup-table-cell type="header">Header 1</gup-table-cell>
      <gup-table-cell type="header">Header 2</gup-table-cell>
      <gup-table-row>
        <gup-table-cell>
          ${template(
            args,
            html`
              <gup-dropdown-menu>
                ${itemsTemplate}
              </gup-dropdown-menu>
            `
          )}
        </gup-table-cell>
        <gup-table-cell>Education jet pocket memory stand lose farm parts sea plain grew quarter leaf spoken enter pleasant asleep damage boy all climate but television please box easily every identity disappear behavior baseball snow condition eat job command</gup-table-cell>
      </gup-table-row>
      <gup-table-row>
        <gup-table-cell>Howdy</gup-table-cell>
        <gup-table-cell>Data</gup-table-cell>
      </gup-table-row>
    </gup-table>
  `,
  parameters: {
    layout: 'padded',
  },
};

export const OnDarkerBackground: Story = {
  ...Default,
  parameters: {
    backgrounds: {
      default: 'GUP',
    },
  },
};

export const WithPopupOpeningToTop: Story = {
  ...Default,
  render: (args) => html`
    <div class="sb-attachment-canvas sb-attachment-canvas--position-${args.storybookAttachment}">
      ${template(
        args,
        html`
          <gup-dropdown-menu>
            ${itemsTemplate}
          </gup-dropdown-menu>
        `
      )}
    </div>
    `,
  args: {
    ...Default.args,
    storybookAttachment: 'bottom',
  },
  argTypes: {
    ...Default.argTypes,
    storybookAttachment: storybookArgAttachment,
  },
  parameters: {
    layout: 'fullscreen',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Label'));
  },
};

export const DeprecatedWithItemIds: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-dropdown-menu>
          <gup-dropdown-menu-item label="Item number 1" id="item1"></gup-dropdown-menu-item>
          <gup-dropdown-menu-item label="Item number 2, with fallen dream thrown vast note completely settlers forty fall game" id="item2"></gup-dropdown-menu-item>
          <gup-dropdown-menu-item label="Item 3" id="item3"></gup-dropdown-menu-item>
          <gup-dropdown-menu-item
            label="Item number 4"
            id="item4"
          ></gup-dropdown-menu-item>
        </gup-dropdown-menu>
      `
    ),
};

export const DeprecatedWithItemIdsAndValues: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-dropdown-menu>
          <gup-dropdown-menu-item label="Item number 1" id="item1" value="item1"></gup-dropdown-menu-item>
          <gup-dropdown-menu-item label="Item number 2, with fallen dream thrown vast note completely settlers forty fall game" id="item2" value="item2"></gup-dropdown-menu-item>
          <gup-dropdown-menu-item label="Item 3" id="item3" value="item3"></gup-dropdown-menu-item>
          <gup-dropdown-menu-item
            label="Item number 4"
            id="item4" value="item4"
          ></gup-dropdown-menu-item>
        </gup-dropdown-menu>
      `
    ),
};

export const RTL: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
      <gup-dropdown-menu search-enabled multiple search-placeholder="البحث عن عنصر" items-selected-button-label="تطبيق" no-selection-button-label="منتهي">
        <gup-dropdown-menu-item value="item1" label="الخيار الأول"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item value="item2" label="الخيار الثاني"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item value="item3" label="الخيار الثاني"></gup-dropdown-menu-item>
      </gup-dropdown-menu>
    `
    )}
  `,
  args: {
    'label-slot': 'اسم الحقل',
    placeholder: 'اختر عنصر',
    'multiple-values-label': ' عنصر محدد ',
  },
  parameters: {
    direction: 'rtl',
  },
};

export const WithDataLoadedSynchronously: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-dropdown-menu search-enabled></gup-dropdown-menu>
      `
    )}
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');

        function fetchCatFacts() {
          const popup = storyRoot.querySelector('gup-dropdown-menu');
          const data = [
            'Cats have been domesticated for half as long as dogs have been.',
            'A happy cat holds her tail high and steady.',
            'The chlorine in fresh tap water irritates sensitive parts of cat nose. Let tap water sit for 24 hours before giving it to a cat.',
            'The way you treat kittens in the early stages of its life will render its personality traits later in life.'
          ];
          data.forEach((fact, index) => {
            const item = document.createElement('gup-dropdown-menu-item');
            item.label = fact;
            item.value = 'item' + (index + 1);
            popup?.appendChild(item);
          });
        }
        fetchCatFacts();
      })();
    </script>
  `,
};

export const WithDataLoadedAsynchronously: Story = {
  ...Default,
  render: (args) => html`
    ${template(
      args,
      html`
        <gup-dropdown-menu search-enabled></gup-dropdown-menu>
      `
    )}
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        const dropdownField = storyRoot.querySelector('gup-dropdown-field');

        async function fetchAsyncData() {
          dropdownField.loading = true;
          dropdownField.loadingLabel = 'Loading data...';
          const response = await fetch('https://meowfacts.herokuapp.com/?count=6');
          const catFacts = await response.json();
          console.log('data: ', catFacts);
          const dropdown = dropdownField.querySelector('gup-dropdown-menu');
          catFacts.data.forEach((fact, index) => {
            const item = document.createElement('gup-dropdown-menu-item');
            item.label = fact;
            item.value = 'item' + (index + 1);
            dropdown?.appendChild(item);
          });
          dropdownField.loading = false;
        }

        fetchAsyncData();
      })();
    </script>
  `,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
