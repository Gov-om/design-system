/**
 * GUP Select Field - Class-based approach
 *
 * A styled native `<select>` element with label, hint, and error message.
 * State styling is driven by native pseudo-classes (:disabled, :focus-visible)
 * and a modifier class for explicit error state. No JavaScript required.
 *
 * Excluded from this lite version (compared to the web component):
 * - Multiple selection (native <select multiple> is visually different)
 * - Search/filter inside the dropdown
 * - Loading state
 *
 * @example
 * // Pure HTML/CSS - no JavaScript required
 * <div class="gup-select-field">
 *   <label class="gup-select-field__label" for="country">Country</label>
 *   <div class="gup-select-field__wrapper">
 *     <select class="gup-select-field__select" id="country" name="country">
 *       <option value="" disabled selected>Select a country</option>
 *       <option value="om">Oman</option>
 *       <option value="ae">UAE</option>
 *     </select>
 *     <span class="gup-select-field__icon" aria-hidden="true">
 *       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
 *         <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
 *       </svg>
 *     </span>
 *   </div>
 * </div>
 *
 * @example
 * // With TypeScript utility
 * const el = GupSelectField.create('Country', { name: 'country', placeholder: 'Select a country' }, [
 *   { value: 'om', label: 'Oman' },
 *   { value: 'ae', label: 'UAE' },
 * ]);
 * document.body.appendChild(el);
 */

/** A single option entry for the select element */
export type GupSelectFieldOption = {
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
};

export interface GupSelectFieldOptions {
  /** Native name attribute for form submission */
  name?: string;
  /** Explicit id for the select (auto-generated if omitted) */
  id?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Text for the initial empty placeholder option */
  placeholder?: string;
}

export const gupSelectFieldBaseClass = 'gup-select-field';

export const gupSelectFieldClasses = {
  base: gupSelectFieldBaseClass,
  /** The `<label>` element */
  label: `${gupSelectFieldBaseClass}__label`,
  /** Flex wrapper holding the select and icon */
  wrapper: `${gupSelectFieldBaseClass}__wrapper`,
  /** The `<select>` element */
  select: `${gupSelectFieldBaseClass}__select`,
  /** Decorative arrow icon (aria-hidden) */
  icon: `${gupSelectFieldBaseClass}__icon`,
  /** Add to the base element to show the error state */
  hasError: `${gupSelectFieldBaseClass}--error`,
} as const;

const ARROW_ICON_PATH = 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z';

export class GupSelectField {
  static create(labelText: string, options: GupSelectFieldOptions = {}, selectOptions: GupSelectFieldOption[] = []): HTMLDivElement {
    const container = document.createElement('div');
    container.className = gupSelectFieldClasses.base;

    const id = options.id ?? `gup-select-${Math.random().toString(36).slice(2, 9)}`;

    const label = document.createElement('label');
    label.className = gupSelectFieldClasses.label;
    label.htmlFor = id;
    label.textContent = labelText;

    const wrapper = document.createElement('div');
    wrapper.className = gupSelectFieldClasses.wrapper;

    const select = document.createElement('select');
    select.className = gupSelectFieldClasses.select;
    select.id = id;
    if (options.name) select.name = options.name;
    if (options.required) select.required = true;
    if (options.disabled) select.disabled = true;

    if (options.placeholder) {
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = options.placeholder;
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }

    selectOptions.forEach((opt) => {
      select.appendChild(GupSelectField.createOption(opt.value, opt.label, opt));
    });

    const icon = document.createElement('span');
    icon.className = gupSelectFieldClasses.icon;
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="${ARROW_ICON_PATH}"/></svg>`;

    wrapper.appendChild(select);
    wrapper.appendChild(icon);
    container.appendChild(label);
    container.appendChild(wrapper);

    return container;
  }

  static createOption(value: string, label: string, config: { disabled?: boolean; selected?: boolean } = {}): HTMLOptionElement {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    if (config.disabled) option.disabled = true;
    if (config.selected) option.selected = true;
    return option;
  }

  static setError(container: HTMLElement, hasError: boolean): void {
    container.classList.toggle(gupSelectFieldClasses.hasError, hasError);
  }

  static isGupSelectField(element: HTMLElement): boolean {
    return element.classList.contains(gupSelectFieldClasses.base);
  }
}

export default GupSelectField;
