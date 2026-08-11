# @govom/lite-components

Class-based styling for native HTML elements, using the GUP design system - for platforms that cannot use web components.

Instead of custom elements like `<gup-button>`, you apply CSS classes to plain HTML like `<button>` and `<a>`, and they pick up the same styling as the equivalent GUP web components: colors, spacing, typography, and interactive states (focus, validation, responsive layout). No JavaScript is required for static styling.

> **Beta.** Lite Components are a work in progress and released for real-world testing. Class names and markup may still change between releases. Please use them in a live service only after agreeing on scope with the Nortal design system team. Pagination and dropdown are not part of this release yet.

## When to use these

- Your platform does not support custom elements or shadow DOM (for example some .NET, low-code, or no-code stacks).
- You want a lighter-weight integration with minimal JavaScript.
- You prefer working with standard HTML elements.

If your stack supports web components, prefer [`@govom/components`](https://www.npmjs.com/package/@govom/components) instead.

## Install

```bash
npm install @govom/lite-components
```

## Use

1. Import the design tokens once (colors, spacing, typography, fonts):

```js
import '@govom/lite-components/tokens';
```

2. Import the CSS for each component you use:

```js
import '@govom/lite-components/button/button.css';
import '@govom/lite-components/checkbox/checkbox.css';
```

3. Apply the classes to native elements:

```html
<button class="gup-button gup-button--primary">Submit</button>
<a class="gup-button gup-button--secondary" href="#">Cancel</a>
```

That is all you need for styling. The optional TypeScript helpers are only for applying or toggling classes programmatically:

```js
import { GupButton } from '@govom/lite-components';
```

### Without a bundler

The package is on npm, so you can load the files from a CDN that mirrors npm (for example jsDelivr) instead of hosting them:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@govom/lite-components/dist/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@govom/lite-components/dist/button/button.css">
```

## What is included

Accordion, Badge, Banner, Button, Checkbox, Details, File Upload, Input Field, Link, Radio Button, Select Field, Stepper, Table, Textarea, Toggle, plus shared form and utility styles and a service-start template.

## Documentation

Full usage, examples, and per-component API are in the [Storybook](https://storybook.service.gov.om/) under the Lite Components section (start with Getting Started, then Installation).

## Feedback

We want to hear how this works for your platform - email `gup_designlibrary_support@mtcit.gov.om`.
