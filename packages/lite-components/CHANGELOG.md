## 0.1.0 (2026-08-11)

Initial release of the Lite Components as a standalone package, extracted from `@govom/components`,
where these class-based "lite" styles previously shipped. No API changes to the classes themselves -
only the package name and import paths changed (`@govom/components/classes/*` ->
`@govom/lite-components/*`, plus a new `@govom/lite-components/tokens` design-tokens stylesheet that
carries the tokens and `@font-face` rules without the web-component base and reset styles).

Beta: the class names and markup structure may still change. Pagination and Dropdown are not part of
this release.

### 🚀 Features

- **button:** class-based button styles and `GupButton` utility (originally @govom/components 3.27.0)

- **checkbox:** class-based checkbox styles and `GupCheckbox` utility (originally @govom/components 3.27.0)

- **button:** use svg icons instead of gup ones in lite button (originally @govom/components 3.30.0)

- **templates:** introduced service-start template (originally @govom/components 3.30.0)

- **docs:** lite version documentation (originally @govom/components 3.30.0)

- **accordion:** `GupAccordion` and `GupAccordionItem`

- **badge:** `GupBadge`

- **banner:** `GupBanner`

- **details:** `GupDetails`

- **file-upload:** `GupFileUpload`

- **forms:** shared form styles (`gupFormClasses`) for hint and error text

- **input-field:** `GupInputField`

- **link:** `GupLink`

- **radio-button:** `GupRadioButton` and `GupRadioGroup`

- **select-field:** `GupSelectField`

- **stepper:** `GupStepper`

- **table:** `GupTable`

- **textarea-field:** `GupTextarea`

- **toggle:** `GupToggle`

- **utils:** layout and accessibility utilities (`gupTrackClasses`, `gupSrOnlyClass`)

### ❤️  Thank You

- Ekaterina Loginova
