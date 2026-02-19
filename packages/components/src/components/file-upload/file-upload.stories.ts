import { Meta, StoryObj } from '@storybook/web-components';
import { useArgs } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import './file-upload';
import '../button/button';
import '../file-item/file-item';
// import '../../../.storybook/components/storybook-comment/storybook-comment';
import { type FileUpload } from './file-upload';

const { argTypes, args, template, events } = getWcStorybookHelpers('gup-file-upload');
type Story = StoryObj<FileUpload & typeof args>;

const logSubmit = () => html`
  storyRoot.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData), 'form data');
    for (const child of event.target.children) {
      if (child.tagName === 'GUP-FILE-UPLOAD') {
        console.log('element value', child.value);
        console.log('element files', child.uploadedFiles);
        console.log('element name', child.name);
      }
    }
  });
`;

const valueComment = html`
  <!-- <storybook-comment>You can programmatically set the files list with either <code>value</code> property of the component or <code>uploadedFiles</code>. Keep in mind that only the latter allows to set rich attributes for a file such as thumbnail. </storybook-comment> -->
`;

export default {
  title: 'Components/Forms/File upload',
  component: 'gup-file-upload',
  argTypes,
  args: {
    ...args,
    name: 'file-upload',
    'default-slot': 'Upload a file',
  },
  parameters: {
    layout: 'padded',
    actions: {
      handles: events,
    },
  },
} as Meta;

export const Default: Story = {
  render: (args) => template(args),
};

export const InForm: Story = {
  ...Default,
  render: (args) => html`
    <form>
      ${template(args)}
      <gup-button style="margin-top: var(--gup-spacing-text-to-component);" @gup-click="${(e: CustomEvent) => (e.target as HTMLElement).closest('form')?.requestSubmit()}">Submit</gup-button>
    </form>
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        ${logSubmit()}
      })();
    </script>
  `,
};

export const UploadMultipleFiles: Story = {
  ...InForm,
  args: {
    multiple: true,
  },
};

export const WithError: Story = {
  ...InForm,
  args: {
    'error-message': 'File is too large',
  },
};

export const WithHint: Story = {
  ...Default,
  args: {
    'hint-slot': 'Only .pdf .jpg or .png files at <strong>5 MB</strong> or less.',
  },
};

export const WithErrorAndHint: Story = {
  ...InForm,
  args: {
    'error-message': 'File is too large',
    'hint-slot': 'Select files up to 5 MB',
  },
};

export const WithSizeValidationError: Story = {
  ...Default,
  args: {
    'size-validation-message': 'File exceeds maximum size limit',
    'max-file-size': '5',
    'hint-slot': 'Select files up to 5 MB',
  },
};

export const Required: Story = {
  ...InForm,
  args: {
    'required': true,
  },
};

export const WithCustomErrorAndSizeValidationAndRequired: Story = {
  ...InForm,
  args: {
    'error-message': 'Error Occured',
    'hint-slot': 'Select files up to 5 MB',
    'size-validation-message': 'File exceeds maximum size limit',
    'max-file-size': '5',
    'required': true,
  },
};

export const FullWidth: Story = {
  ...InForm,
  args: {
    'full-width': true,
  },
};

export const WithValue: Story = {
  ...Default,
  render: (args) => html`
    ${valueComment}
    <form>
      ${template(args)}
      <gup-button style="margin-top: var(--gup-spacing-text-to-component);" @gup-click="${(e: CustomEvent) => (e.target as HTMLElement).closest('form')?.requestSubmit()}">Submit</gup-button>
    </form>
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.querySelector('gup-file-upload').value = [
          new File([''], 'file.png', { lastModified: new Date(2017, 1, 26) })
        ];
        ${logSubmit()}
      })();
    </script>
  `,
};

export const WithFiles: Story = {
  ...Default,
  render: (args) => html`
    ${valueComment}
    <form>
      ${template(args)}
      <gup-button style="margin-top: var(--gup-spacing-text-to-component);" @gup-click="${(e: CustomEvent) => (e.target as HTMLElement).closest('form')?.requestSubmit()}">Submit</gup-button>
    </form>
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.querySelector('gup-file-upload').uploadedFiles = [
          {
            file: new File([''], 'another-file.png', { lastModified: new Date(2025, 8, 10)}),
            thumbnail: {
              src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
              'alt': 'Thumbnail',
            },
          },
        ];
        ${logSubmit()}
      })();
    </script>
  `,
};

export const WithMultipleFiles: Story = {
  ...Default,
  render: (args) => html`
    <form>
      ${template(args)}
      <gup-button style="margin-top: var(--gup-spacing-text-to-component);" @gup-click="${(e: CustomEvent) => (e.target as HTMLElement).closest('form')?.requestSubmit()}">Submit</gup-button>
    </form>
    <script>
      (function() {
        const storyRoot = document.getElementById('${args['data-story-id']}');
        storyRoot.querySelector('gup-file-upload').uploadedFiles = [
          {
            file: new File([''], 'file.png', { lastModified: new Date(2017, 1, 26) }),
            thumbnail: {
              src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADveWkH6oAAAAAElFTkSuQmCC',
              'alt': 'Thumbnail',
            },
          },
          {
            file: new File([''], 'file.pdf', { lastModified: new Date(2017, 1, 26) }),
            thumbnail: {
              src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAwCAMAAACG9cLxAAABOFBMVEUVGyOOFRnw9vx+54deqGg0V0AyVT9yz3vu8/l6gIcZIycWHSTg5uzP1dt0eoEuNDwqRTckODHL0dfLoaaOlJu+g4h85IV64IN424F01X5txXZqwHRUl2BSkl1EdlA/bkukRkubMzcmPTMhMi6XKi4eKSzt7/Xq7fPo4+jc4ujl3eLR193i1dvM0tjezdPYvsTQrbLEkZa6en9y0Hxtc3pwy3m3cndqcHe0bHFktm5grWqxZGlaoWRXnGJQj1tNiFhIflNFS1OnTVI7ZUc3XkQ0OkIxUj6eOj4pLzcZHyeUISaQGR3o5Oro5Onn4ujaw8jVuL7Utbqgpq3Imp/CjJGAhYx+hIt43YG5eH1vdXxrwnVnunFhrmtdp2daYGesWV6pUlZGe1I+akqgPkKYLDCVJioXICWRGx8YnADUAAABiElEQVRIx+2WZ1PCQBCGjztAkgDSq/SOdKRLB1Gx997L//8HSm5GcwHO5IMzzsj7ZWd232cuu5sPC/63GJ22O6fkWlc7NmZWtjQ6/XAOtaRUIfXMyjJkxCl20PSoCOpUaxFTejG1gmpXSCWkVqGWtKzBSzFVvAZcqz/BvQZlcJI5SxBvDdPQtCmmlKj2aAQUddNQF5nqq+1CtidAUwVWxClDCBidbqINE/PTNN6Kpb7PXhem8DTok1e7ka1ONGaJHU1tmZmaR4QVJTixQ29K3IGFZEsxX79DVXcDfAzHCzKoTHLMRyv0S6f80Ip9yYyMLzRrwrztHpalU6/RHLYdxrYFUI9OFWCPtwU0x8Kn8nQqlcK2E/gspKpU6gFe8K5xfF/GvnJR3E0DNghoRKNeNGbsyu68E5SZQn1tdgTzCkJhGnWQxabyXkBB6o/88wtJkwoHmUeBEge5R4EkKtS+7QQ/I+tregZSqYgTlew2I+BukPMcdajI91HgRT4QsreAAXk41u3gAPgACc4ljWLtDUwAAAAASUVORK5CYII=',
              'alt': 'Thumbnail',
            },
          },
          {
            file: new File(
              [''],
              'file2 bet slide where she measure happened parts enjoy whose stream brave angry watch fighting late brush exist smaller carefully society vegetable sit writer simplest.pdf',
              { lastModified: new Date(2017, 1, 26) }
            ),
            thumbnail: null,
          },
        ];
        ${logSubmit()}
      })();
    </script>
  `,
  args: {
    multiple: true,
    'hint-slot': 'Try selecting an image file',
  },
};

export const WithThumbnails: Story = {
  ...WithMultipleFiles,
  args: {
    ...WithMultipleFiles.args,
    'allow-thumbnails': true,
    'hint-slot': 'Try selecting an image file',
  },
};

export const WithExtraButton: Story = {
  ...Default,
  args: {
    'extra-action-slot': '<gup-button appearance="text">Saved files</gup-button>',
  },
};

export const FileLibrary: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    const toggleSavedFiles = () => updateArgs({ ...args, savedFilesDisplayed: !args.savedFilesDisplayed });
    return html`
      ${template(
        args,
        html`
          <gup-button slot="extra-action" @gup-click="${toggleSavedFiles}" appearance="text">${args.savedFilesDisplayed ? 'Cancel' : 'Saved files'}</gup-button>
      `
      )}
      ${
        args.savedFilesDisplayed
          ? html`
          <div style="margin-top: var(--gup-spacing-text-to-component);">
            <gup-file-item file-name="file.png" subtitle="09.02.2021, 2 MB" url="/file.png">
              <gup-button @gup-click="${(e: CustomEvent) => console.log(e)}" appearance="text">Select</gup-button>
            </gup-file-item>
            <gup-file-item file-name="file2.png" subtitle="09.02.2021, 2 MB" url="/file2.png">
              <gup-button @gup-click="${(e: CustomEvent) => console.log(e)}" appearance="text">Select</gup-button>
            </gup-file-item>
          </div>
      `
          : nothing
      }
      <!-- <storybook-comment>
        <p>This example shows how <code>extra-action</code> slot and <code>gup-file-item</code> component can be employed to display files loaded by the system and offered to the user, in addition to files uploaded from the device.</p>
      </storybook-comment> -->
    `;
  },
  args: {
    savedFilesDisplayed: true,
    multiple: true,
  },
  argTypes: {
    savedFilesDisplayed: {
      table: { disable: true },
    },
  },
};
