/**
 * GUP Textarea - Class-based approach
 *
 * A utility class for applying GUP textarea styles to native HTML elements.
 * State styling (disabled, error) is driven by native pseudo-classes and
 * a modifier class - no JavaScript needed for basic functionality.
 *
 * @example
 * // Pure HTML/CSS approach
 * <div class="gup-textarea">
 *   <label class="gup-textarea__label" for="msg">Your message</label>
 *   <span class="gup-form-hint">Optional hint text</span>
 *   <span class="gup-form-error">Error message</span>
 *   <div class="gup-textarea__wrapper">
 *     <textarea class="gup-textarea__input" id="msg" name="message" rows="4"></textarea>
 *   </div>
 * </div>
 *
 * @example
 * // Create a new styled textarea programmatically
 * const field = GupTextarea.create('Your message', { name: 'message', rows: 4 });
 * document.body.appendChild(field);
 */

export interface GupTextareaOptions {
  /** Native name attribute for form submission */
  name?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Number of visible text rows */
  rows?: number;
  /** Initial value */
  value?: string;
  /** Whether the textarea is required */
  required?: boolean;
  /** Minimum character count */
  minlength?: number;
  /** Maximum character count */
  maxlength?: number;
  /** Whether the textarea is disabled */
  disabled?: boolean;
}

export const gupTextareaBaseClass = 'gup-textarea';

export const gupTextareaClasses = {
  base: gupTextareaBaseClass,
  label: `${gupTextareaBaseClass}__label`,
  wrapper: `${gupTextareaBaseClass}__wrapper`,
  input: `${gupTextareaBaseClass}__input`,
  hasError: `${gupTextareaBaseClass}--error`,
} as const;

export class GupTextarea {
  static getClassName(): string {
    return gupTextareaClasses.base;
  }

  static create(labelText: string, options: GupTextareaOptions = {}): HTMLDivElement {
    const container = document.createElement('div');
    container.className = gupTextareaClasses.base;

    const id = `gup-textarea-${Math.random().toString(36).slice(2, 9)}`;

    const label = document.createElement('label');
    label.className = gupTextareaClasses.label;
    label.htmlFor = id;
    label.textContent = labelText;

    const wrapper = document.createElement('div');
    wrapper.className = gupTextareaClasses.wrapper;

    const textarea = document.createElement('textarea');
    textarea.className = gupTextareaClasses.input;
    textarea.id = id;
    if (options.name) textarea.name = options.name;
    if (options.placeholder) textarea.placeholder = options.placeholder;
    if (options.rows) textarea.rows = options.rows;
    if (options.value) textarea.value = options.value;
    if (options.required) textarea.required = true;
    if (options.minlength !== undefined) textarea.minLength = options.minlength;
    if (options.maxlength !== undefined) textarea.maxLength = options.maxlength;
    if (options.disabled) textarea.disabled = true;

    wrapper.appendChild(textarea);
    container.appendChild(label);
    container.appendChild(wrapper);

    return container;
  }

  static isGupTextarea(element: HTMLElement): boolean {
    return element.classList.contains(gupTextareaClasses.base);
  }
}

export default GupTextarea;
