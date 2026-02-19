# Angular Forms directives for the GUP component library

This package contains directives meant as a compatibility layer for the form-based web components exported by `@gup-ds/components` package to go along with Angular forms API.

Upon importing the directives via `import { GupFormsCompatModule } from '@gup-ds/angular';` these web components can be used with both Reactive Forms API and template-driven forms:

- `gup-dropdown-field`
- `gup-checkbox`
- `gup-radio-button-group`
- `gup-file-upload`
- `gup-toggle`

`gup-input-field` and `gup-textarea-field` can be made compatible with Reactive Forms by attaching a core `ngDefaultControl` directive to them (see [the Angular docs](https://angular.dev/api/forms/DefaultValueAccessor)).

## Demo app

~~The functionality of the compatibility layer can be verified by running a test Angular app with `ng serve` or `npm start` in the package folder or `npx nx run @gup-ds/angular:start` in the project root.~~

The demo app has been removed, please use a separate application to test (see the respective Storybook page).
