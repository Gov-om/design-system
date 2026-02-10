import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './dropdown-menu';
import '../dropdown-menu-item/dropdown-menu-item';
import '../../track/track';
import '../../button/button';
// import '../../../../.storybook/components/storybook-comment/storybook-comment';
import { type DropdownMenu } from './dropdown-menu';
import { htmlAddonTransformSourceStripAll, randomId } from '../../../../.storybook/utils';

const { args, argTypes, template, events } = getWcStorybookHelpers('gup-dropdown-menu');
type Story = StoryObj<DropdownMenu & typeof args>;

export default {
  title: 'Components/Forms/Dropdown/Dropdown menu',
  component: 'gup-dropdown-menu',
  args,
  argTypes: {
    ...argTypes,
    'default-slot': {
      ...argTypes['default-slot'],
      control: false,
    },
    selectedItems: {
      ...argTypes['selectedItems'],
      control: false,
    },
  },
  parameters: {
    layout: 'padded',
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
  <gup-dropdown-menu-item
    label="Item number 2, with fallen dream thrown vast note completely settlers forty fall game"
    value="item2"
  ></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Item 3" value="item3"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item
    label="Item number 4, with sünnipäevanädalalõpupeopärastlõunaväsimatus"
    value="item4"
  ></gup-dropdown-menu-item>
  <gup-dropdown-menu-item label="Item number 5" value="item5"></gup-dropdown-menu-item>
  <gup-dropdown-menu-item value="item6">
    Item number 6 with some <em>HTML</em>
  </gup-dropdown-menu-item>
`;

export const Default: Story = {
  render: (args) => template(args, itemsTemplate),
};

export const WithSearch: Story = {
  ...Default,
  args: {
    'search-enabled': true,
  },
};

export const WithCustomSearchPlaceholder: Story = {
  ...Default,
  args: {
    'search-enabled': true,
    'search-placeholder': 'Find anything you want',
  },
};

export const WithMultipleSelection: Story = {
  render: (args) => template(args, itemsTemplate),
  args: {
    multiple: true,
  },
};

export const WithCustomExtraControls: Story = {
  render: (args) =>
    template(
      args,
      html`
        ${itemsTemplate}
        <gup-track slot="controls-extra-buttons"><gup-button>Extra action</gup-button></gup-track>
      `
    ),
};

export const Empty: Story = {
  render: (args) => template(args),
};

export const WithCustomFooter: Story = {
  render: (args) =>
    template(
      args,
      html`
        ${itemsTemplate}
        <gup-track slot="controls" horizontal-alignment="right">
          <gup-button appearance="danger">Delete</gup-button>
          <gup-button>Apply</gup-button>
        </gup-track>
      `
    ),
};

export const WithAdvancedCustomFooter: Story = {
  render: (args) => html`
    ${template(
      args,
      html`
        ${itemsTemplate}
        <gup-track slot="controls" horizontal-alignment="right">
          <gup-button appearance="text" id="clear-button" style="display: none">Clear</gup-button>
          <gup-button appearance="text" id="apply-button">Done</gup-button>
        </gup-track>
      `
    )}
    <!-- <storybook-comment>
      <p>For a basic custom footer implementation, add a <code>gup-track</code> with at least one "Apply" <code>gup-button</code> to the <code>controls</code> slot. Call an <code>applyValue</code> method of the <code>gup-dropdown-field</code> when clicking the "Apply" button to set the selected item(s).</p>
      <p>Note the only way a user is supposed to confirm their selection is through the "Apply" button. You can also implement more complex logic to restore the default experience, as seen in the script for this example, eg switching the label to "Done" when nothing is selected or adding a Clear button.</p>
    </storybook-comment> -->
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        const dropdown = storyRoot.querySelector('gup-dropdown-menu');

        const clearButton = dropdown.querySelector('#clear-button');
        clearButton?.addEventListener('gup-click', () => {
          dropdown.clearSelection();
        });

        dropdown.addEventListener('gup-change', (event) => {
          const selectedItems = event.detail;
          const applyButton = dropdown.querySelector('#apply-button');
          if (selectedItems && selectedItems.length > 0) {
            applyButton.innerText = 'Apply (' + selectedItems.length + ')';
            clearButton.style.display = 'inline-block';
            applyButton.setAttribute('appearance', 'primary');
          } else {
            applyButton.innerText = 'Done';
            applyButton.setAttribute('appearance', 'text');
            clearButton.style.display = 'none';
          }
        });
      })();
    </script>
  `,
  args: {
    multiple: true,
  },
};

export const WithSelectedOptionsOutput: Story = {
  render: (args) =>
    html`
      <!-- <storybook-comment><output id="selectedItemsResult">Select some items and click "Get selected items" button<pre></pre></output></storybook-comment> -->
      ${template(
        args,
        html`
          ${itemsTemplate}
          <gup-track slot="controls" horizontal-alignment="right">
            <gup-button appearance="text">Button 1</gup-button>
            <gup-button @gup-click="${() => {
              const dropdown = document.querySelector('gup-dropdown-menu') as DropdownMenu;
              const selectedItems = dropdown.getSelectedItems();
              const resultContainer = document.getElementById('selectedItemsResult')?.querySelector('pre');
              if (resultContainer) {
                resultContainer.textContent = JSON.stringify(
                  selectedItems.map((item) => ({
                    value: item.value,
                    label: item.label,
                    selected: item.selected,
                  })),
                  null,
                  2
                );
              }
            }}">Get Selected Items</gup-button>
          </gup-track>
        `
      )}
    `,
  args: {
    multiple: true,
  },
};

export const DeprecatedWithItemIds: Story = {
  render: (args) =>
    template(
      args,
      html`
        <gup-dropdown-menu-item label="Item number 1" id="item1"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="Item number 2, with fallen dream thrown vast note completely settlers forty fall game" id="item2"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="Item 3" id="item3"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="Item number 4" id="item4"></gup-dropdown-menu-item>
      `
    ),
};

export const DeprecatedWithItemIdsMultiple: Story = {
  ...DeprecatedWithItemIds,
  args: {
    multiple: true,
  },
};

export const RTL: Story = {
  ...Default,
  render: (args) =>
    template(
      args,
      html`
        <gup-dropdown-menu-item label="قيمة رقم ١" value="item1"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="قيمة رقم ٢" value="item2"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="قيمة رقم ٣" value="item3"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item label="قيمة رقم ٤" value="item4"></gup-dropdown-menu-item>
        <gup-dropdown-menu-item value="item5">
          قيمة رقم ٥ مع بعض <em>النصوص</em>
        </gup-dropdown-menu-item>
        <gup-track slot="controls" horizontal-alignment="right">
          <gup-button>إلغاء</gup-button>
          <gup-button>تطبيق</gup-button>
        </gup-track>
      `
    ),
  parameters: {
    direction: 'rtl',
  },
};

export const WithDataLoadedAsynchronously: Story = {
  ...Default,
  render: (args) => {
    // Replacing `component` variable of wc-storybook-helpers with a custom unique reference to current component because it apparently leaks into other components when lint:a11y is run
    const componentId = randomId();
    return html`
      ${template({ ...args, id: componentId })}
      <script>
        (function() {
          const storyRoot = document.getElementById('${args['data-story-id']}');
          const dropdownMenu = storyRoot.querySelector('gup-dropdown-menu');

          async function fetchCatFacts() {
            const response = await fetch('https://meowfacts.herokuapp.com/?count=6');
            const catFacts = await response.json();
            catFacts.data.forEach((fact, index) => {
              const item = document.createElement('gup-dropdown-menu-item');
              item.label = fact;
              item.value = 'item' + (index + 1);
              if (dropdownMenu) {
                dropdownMenu.appendChild(item);
              }
            });
          }

          fetchCatFacts();
        })();
      </script>
    `;
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
