/**
 * GUP Input Field - Class-based approach
 *
 * A styled input with label, hint, and error message using native HTML elements.
 * State styling (disabled, error) is driven by native pseudo-classes and a modifier
 * class. No JavaScript required for basic functionality.
 *
 * Excluded from the lite version (compared to the web component):
 * - Input-start / input-end icon slots (calendar, email, phone, password-toggle icons)
 *
 * For date / time values: use type="date" / type="time". The CSS hides the
 * native picker indicator so users type directly into the field segments on
 * desktop. On mobile the native picker will still appear.
 *
 * @example
 * // Basic text input
 * <div class="gup-input-field">
 *   <label class="gup-input-field__label" for="name">Full name</label>
 *   <div class="gup-input-field__wrapper">
 *     <input class="gup-input-field__input" id="name" type="text" name="name">
 *   </div>
 * </div>
 *
 * @example
 * // With hint and error
 * <div class="gup-input-field gup-input-field--error">
 *   <label class="gup-input-field__label" for="email">Email address</label>
 *   <span class="gup-form-hint">We will send a confirmation to this address.</span>
 *   <span class="gup-form-error" role="alert">
 *     <svg ...>...</svg>
 *     Enter a valid email address.
 *   </span>
 *   <div class="gup-input-field__wrapper">
 *     <input class="gup-input-field__input" id="email" type="email" name="email">
 *   </div>
 * </div>
 *
 * @example
 * // With prefix and suffix
 * <div class="gup-input-field">
 *   <label class="gup-input-field__label" for="url">Website</label>
 *   <div class="gup-input-field__wrapper">
 *     <span class="gup-input-field__prefix">https://</span>
 *     <input class="gup-input-field__input" id="url" type="text" name="url">
 *     <span class="gup-input-field__suffix">.com</span>
 *   </div>
 * </div>
 */

export type GupInputFieldType = 'text' | 'email' | 'tel' | 'url' | 'number' | 'password';

export interface GupInputFieldOptions {
  /** Input type */
  type?: GupInputFieldType;
  /** Native name attribute for form submission */
  name?: string;
  /** Explicit id for the input (auto-generated if omitted) */
  id?: string;
  /** Initial value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readonly?: boolean;
  /** Minimum character count */
  minlength?: number;
  /** Maximum character count */
  maxlength?: number;
  /** Minimum value (for number inputs) */
  min?: string | number;
  /** Maximum value (for number inputs) */
  max?: string | number;
  /** Step value (for number inputs) */
  step?: number;
  /** Validation pattern */
  pattern?: string;
  /** Input mode for virtual keyboards */
  inputmode?: string;
}

export const gupInputFieldBaseClass = 'gup-input-field';

export const gupInputFieldClasses = {
  base: gupInputFieldBaseClass,
  /** The <label> element */
  label: `${gupInputFieldBaseClass}__label`,
  /** Flex wrapper that holds prefix, input, and suffix */
  wrapper: `${gupInputFieldBaseClass}__wrapper`,
  /** The <input> element */
  input: `${gupInputFieldBaseClass}__input`,
  /** Optional decorative text before the input (e.g. "https://") */
  prefix: `${gupInputFieldBaseClass}__prefix`,
  /** Optional decorative text after the input (e.g. ".com") */
  suffix: `${gupInputFieldBaseClass}__suffix`,
  /** Add to the base element to show the error state */
  hasError: `${gupInputFieldBaseClass}--error`,
} as const;

export class GupInputField {
  static create(labelText: string, options: GupInputFieldOptions = {}): HTMLDivElement {
    const container = document.createElement('div');
    container.className = gupInputFieldClasses.base;

    const id = options.id || `gup-input-${Math.random().toString(36).slice(2, 9)}`;

    const label = document.createElement('label');
    label.className = gupInputFieldClasses.label;
    label.htmlFor = id;
    label.textContent = labelText;

    const wrapper = document.createElement('div');
    wrapper.className = gupInputFieldClasses.wrapper;

    const input = document.createElement('input');
    input.className = gupInputFieldClasses.input;
    input.id = id;
    input.type = options.type || 'text';
    if (options.name) input.name = options.name;
    if (options.placeholder) input.placeholder = options.placeholder;
    if (options.value) input.value = options.value;
    if (options.required) input.required = true;
    if (options.disabled) input.disabled = true;
    if (options.readonly) input.readOnly = true;
    if (options.minlength !== undefined) input.minLength = options.minlength;
    if (options.maxlength !== undefined) input.maxLength = options.maxlength;
    if (options.min !== undefined) input.min = String(options.min);
    if (options.max !== undefined) input.max = String(options.max);
    if (options.step !== undefined) input.step = String(options.step);
    if (options.pattern) input.pattern = options.pattern;
    if (options.inputmode) input.inputMode = options.inputmode;

    wrapper.appendChild(input);
    container.appendChild(label);
    container.appendChild(wrapper);

    return container;
  }

  static setError(container: HTMLElement, hasError: boolean): void {
    container.classList.toggle(gupInputFieldClasses.hasError, hasError);
  }

  static isGupInputField(element: HTMLElement): boolean {
    return element.classList.contains(gupInputFieldClasses.base);
  }
}

export default GupInputField;
