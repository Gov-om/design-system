# Gov.om Component Library

A framework-agnostic web component library for Oman government digital services, built with [Lit](https://lit.dev/) and PostCSS.

[Storybook](https://storybook.service.gov.om/) · [Wiki](<!-- link to be added -->)

## Packages

| Package | Description | Version |
|---|---|---|
| [`@govom/components`](https://www.npmjs.com/package/@govom/components) | Core web components library | [![npm](https://img.shields.io/npm/v/@govom/components)](https://www.npmjs.com/package/@govom/components) |
| [`@govom/react`](https://www.npmjs.com/package/@govom/react) | React wrapper components (for React <19) | [![npm](https://img.shields.io/npm/v/@govom/react)](https://www.npmjs.com/package/@govom/react) |
| [`@govom/angular`](https://www.npmjs.com/package/@govom/angular) | Angular Forms compatibility layer | [![npm](https://img.shields.io/npm/v/@govom/angular)](https://www.npmjs.com/package/@govom/angular) |
| [`@govom/tokens`](https://www.npmjs.com/package/@govom/tokens) | Design tokens (colors, typography, spacing) | [![npm](https://img.shields.io/npm/v/@govom/tokens)](https://www.npmjs.com/package/@govom/tokens) |
| [`@govom/icons`](https://www.npmjs.com/package/@govom/icons) | Icon library (Material Design + flags) | [![npm](https://img.shields.io/npm/v/@govom/icons)](https://www.npmjs.com/package/@govom/icons) |

## Installation

### Web components

```bash
npm install @govom/components
```

Add the styles to your HTML:

```html
<link rel="stylesheet" href="/node_modules/@govom/components/dist/styles.css">
```

Or import in CSS/PostCSS:

```css
@import "@govom/components/styles";
```

Then use components directly in your markup:

```html
<gup-button variant="primary">Submit</gup-button>
```

### React

React 19+ has full support for web components - use `@govom/components` directly.

For React <19, use the wrapper package:

```bash
npm install @govom/react
```

```jsx
import { Button } from '@govom/react';
```

### Angular

```bash
npm install @govom/angular
```

Import the compatibility module for form components (`gup-dropdown-field`, `gup-checkbox`, `gup-radio-button-group`, `gup-file-upload`, `gup-toggle`):

```typescript
import { GupFormsCompatModule } from '@govom/angular';
```

For `gup-input-field` and `gup-textarea-field`, add the `ngDefaultControl` directive.

### Using without a bundler

Three approaches are supported when loading components directly in the browser:

```html
<!-- 1. Import only the components you need -->
<script type="module" src="https://myurl.com/gup-components/dist/button.js"></script>

<!-- 2. Import all components at once (not recommended for performance) -->
<script type="module" src="https://myurl.com/gup-components/dist/components.js"></script>

<!-- 3. Experimental autoloader - lazy-loads components as they appear on the page -->
<script>const GUP_AUTOLOADER_SOURCE_DIR = "https://myurl.com/gup-components/dist/";</script>
<script src="https://myurl.com/gup-components/dist/autoloader.js" defer></script>
```

See the [Storybook documentation](https://storybook.service.gov.om/?path=/docs/using-without-bundler--documentation) for details.

## Components

Accordion, Avatar, Badge, Banner, Breadcrumbs, Button, Button Group, Callout, Checkbox, Content Header, Data Sheet, Data Table, Details, Dialog, Divider, Dropdown, File Item, File Upload, Filter Chip, Flag, Form Hint, Form List, Form Section, Form Validation Message, Generic Popup, Header, Icon, Image, Input Field, Labelled Item, Link, Logo, Page Status, Pagination, Radio Button, Rich Text, Screenreader Text, Search, Skip Link, Spinner, Stepper, Table, Tabs, Textarea Field, Toasts, Toggle, Tooltip, Track, Wizard Footer, Wizard Main

Browse all components and their API in the [Storybook](https://storybook.service.gov.om/).

## Development

### Prerequisites

- Node.js 18 (see `.node-version`)

### Getting started

```bash
npm install
npx nx run @govom/icons:build
npx nx run @govom/components:storybook
```

### Quality control

Run all linters before committing:

```bash
npx nx run @govom/components:lint:all
```

Individual lint commands:

| Command | Tool | Purpose |
|---|---|---|
| `lint:css` | Stylelint | CSS style issues |
| `lint:ts` | TypeScript | Type checking |
| `lint:lit` | lit-analyzer | Lit-specific issues |
| `lint:eslint` | ESLint | JS/TS code quality |
| `lint:a11y` | Axe | Accessibility (WCAG) |
| `lint:prettier` | Prettier | Code formatting |

Git hooks (`husky`) run CSS, Prettier, ESLint, and TypeScript checks automatically before each commit. Commit messages follow the [Angular commit format](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#type):

```
<type>(<package>): <description>
```

Example: `feat(components): added Arabic language support`

### Visual regression testing

```bash
npm run chromatic
```

Uses [Chromatic](https://www.chromatic.com/) for visual comparison of components before and after changes.

### Generating React wrappers

After adding a new component, renaming one, or changing event names:

```bash
npm run generate-react-components
```

## Framework integration guides

- [React](https://react.dev/reference/react-dom/components#custom-html-elements) (v19+ has native web component support)
- [Angular](https://angular.dev/guide/elements)
- [Vue](https://vuejs.org/guide/extras/web-components)

### Playgrounds

- [React <19](https://codesandbox.io/p/sandbox/gup-components-react-l62tqd)
- [Angular](https://github.com/ekateriinal/gup-components-angular)
- [AngularJS](https://codesandbox.io/p/github/ekateriinal/gup-components-in-angulajs)
- [Raw HTML](https://codepen.io/certainlyakey/pen/LYKxrjw?editors=1000)

## CI/CD

This project uses GitHub Actions for continuous integration:

- **Lint & Test** - runs on every push and pull request
- **Chromatic** - visual regression testing on pushes to `main` and pull requests
- **Publish** - publishes packages to npm (manual trigger)
- **Storybook Deploy** - builds and deploys Storybook on pushes to `main`

## Feedback

- Email: gup_designlibrary_support@mtcit.gov.om 
- [WhatsApp group](https://chat.whatsapp.com/KqN9RuWxKaW1nTXUXm8I6p)
- Report bugs by reproducing in the [Storybook](https://storybook.service.gov.om/) or by forking the [Codepen playground](https://codepen.io/certainlyakey/pen/LYKxrjw)
