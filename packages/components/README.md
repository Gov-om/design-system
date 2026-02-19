# Web components for Oman GUP

Web components built using Lit and PostCSS.

## Styling

The library supports two types of component-specific style files: a regular `<component-tag>.css` file and a `<component-tag>.styles.ts` file that should contain a named ES module export.

### Contributing to the library

1. Run `npm install` in the root folder of the repo;
2. Run `npx nx run @govom/icons:build` to build the icons used in the component library and the Storybook;
3. Run `npx nx run @govom/components:storybook` in the root folder or `npm run storybook` in the package folder;
4. Open the Storybook at the given URL and start coding! The UI will refresh automatically.

## Visual regression testing

To perform visual regression testing in this project, you can use the `npm run chromatic` command. This command will run Chromatic, which will compare the visual appearance of your components before and after changes, allowing you to easily identify any visual regressions and ensure the consistency of your UI.

To access Chromatic UI you need to register for free using [this invitation link](https://www.chromatic.com/start?inviteToken=chpi_85cd967d777442249d6c45d4ffa25455&appId=65fb4b8f5bb23c2bc242a39c).

The link to the build will be visible in the command line output once `npm run chromatic` is run.

## Quality control

The library code can be tested for issues and bugs on several levels:

1. (Optional) Manually by running a command from `package.json`. It is recommended to run `npm run lint:all` before each commit to ensure there's no bugs in the incoming code.
   1. `lint:all`: This command runs several linting tools concurrently to check code for issues related to CSS (Stylelint), code formatting (Prettier), JavaScript (ESLint), TypeScript, and web accessibility (axe).

   2. `lint:css`: This command uses Stylelint to check CSS files for style-related issues and conformity to defined coding standards.

   3. `lint:prettier`: This command utilizes Prettier to check code for formatting issues. It ensures that code adheres to the specified coding style and is consistently formatted.

   4. `lint:eslint`: This command uses ESLint to analyze JavaScript code for potential errors, coding style violations, and best practices to maintain code quality and consistency.

   5. `lint:ts`: This command employs the TypeScript compiler to check TypeScript code for type-related issues and potential errors.

   6. `lint:a11y`: This command first builds Storybook documentation and then checks it for web accessibility issues using the Axe library, ensuring that web components are accessible to all users, including those with disabilities.

2. (Mandatory) Before commit via an automatic git hook;
3. (Mandatory) In the CI pipeline (GitHub Actions).

Make sure your editor supports and picks up the configurations of the linters added to the project. Eg. in Visual Studio Code you can install plugins for [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## QA in CI

The CI workflow is implemented using GitHub Actions. Every push and pull request will be checked by running the linter commands above and Chromatic.

### To-do list before committing your code

- [ ] Run `npm run lint:all` and fix any issues.
- [ ] Run `npm run chromatic`, view the build issues listed in the Chromatic UI, accept or deny each of them. This command should be run in your feature branch.
- [ ] When creating a new component, check if it is exported in the exports file (`components.ts`).
- [ ] if a new component has been added, an old one renamed, or an event name changed, the React wrapper generation command must have been run (`npm run generate-react-components` in the root folder).
- [ ] Check the Accessibility panel of the Storybook story for accessibility violations in the Addons panel of your local Storybook (press `A` if it is not visible). Fix any issues.
- [ ] Check if your component has proper documentation, add if missing:
  - [ ] Component description in a block JSDoc tag above `@customElement` decorator;
  - [ ] Description for [each `@slot`, `@cssprop`, `@event`](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/) in the same JSDoc tag;
  - [ ] JSDoc comments above each `@property` which describe its purpose;
  - [ ] `private` or `public` accessibility modifiers added for each method or property in a component class (except for inherited ones – [Lit](https://lit.dev/docs/components/lifecycle/)- or [FormControlMixin](https://github.com/open-wc/form-participation/tree/main/packages/form-control)-related);
  - [ ] library dependencies (other components) used by this component internally, listed with a `@dependency` JSDoc tag, one dependency per tag;
- [ ] Check if every highly likely scenario of component usage is covered with a dedicated story or is easily reproducible in the Storybook;
- [ ] In case your component emits custom events, verify that the event produces an action in the Storybook (Actions panel gets populated with a log item);
- [ ] Storybook story should be appropriately named (Sentence case) and added to a correct folder in the story `title` (usually "Components/...");
- [ ] Default story must always be present;
- [ ] When relying on other library components slotted into a component, always check if those components are defined first (using `eg await customElements.whenDefined('gup-dropdown-menu');`), otherwise relying on their API will not be feasible.

## Miscellaneous

### Importing CSS from a TS file

To avoid a [rollup-plugin-postcss-lit](https://shoelace.style/getting-started/installation) warning: ['Unrecognized default export in file'](https://github.com/umbopepato/rollup-plugin-postcss-lit/blob/e4d31ed5314d160bc6534e5d15cfc7866f12245f/index.ts#L112), when importing CSS from a TS file, avoid using default import. Export/import `{ styles }` as a named import instead: `export const styles = css`` `.
