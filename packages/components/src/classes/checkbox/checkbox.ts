/**
 * GUP Checkbox - Class-based approach
 *
 * A utility class for applying GUP checkbox styles to native HTML elements.
 * State styling (checked, indeterminate, disabled) is driven entirely by the
 * native input's pseudo-classes — no JavaScript needed for basic functionality.
 *
 * @example
 * // Pure HTML/CSS approach — works on click with no JS
 * <label class="gup-checkbox">
 *   <input type="checkbox" class="gup-checkbox__input" />
 *   <div class="gup-checkbox__check-mark">
 *     <div class="gup-checkbox__check-mark-inner"></div>
 *   </div>
 *   <div class="gup-checkbox__text-container">Label text</div>
 * </label>
 *
 * @example
 * // Create a new styled checkbox programmatically
 * const checkbox = GupCheckbox.create({ checked: true });
 * document.body.appendChild(checkbox);
 */

export type CheckboxSize = 's' | 'm';
export type CheckboxAppearance = 'default' | 'circle';

export interface GupCheckboxOptions {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Whether the checkbox is in indeterminate state (can only be set via JS) */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** The size of the checkbox */
  size?: CheckboxSize;
  /** The appearance of the checkbox (default square or circle) */
  appearance?: CheckboxAppearance;
}

export const GUP_CHECKBOX_BASE_CLASS = 'gup-checkbox';

export const GUP_CHECKBOX_CLASSES = {
  base: GUP_CHECKBOX_BASE_CLASS,
  input: `${GUP_CHECKBOX_BASE_CLASS}__input`,
  checkMark: `${GUP_CHECKBOX_BASE_CLASS}__check-mark`,
  checkMarkInner: `${GUP_CHECKBOX_BASE_CLASS}__check-mark-inner`,
  textContainer: `${GUP_CHECKBOX_BASE_CLASS}__text-container`,
  hint: `${GUP_CHECKBOX_BASE_CLASS}__hint`,
  small: `${GUP_CHECKBOX_BASE_CLASS}--small`,
  circle: `${GUP_CHECKBOX_BASE_CLASS}--circle`,
} as const;

export class GupCheckbox {
  static getClassNames(options: GupCheckboxOptions = {}): string[] {
    const classes: string[] = [GUP_CHECKBOX_CLASSES.base];

    if (options.size === 's') {
      classes.push(GUP_CHECKBOX_CLASSES.small);
    }
    if (options.appearance === 'circle') {
      classes.push(GUP_CHECKBOX_CLASSES.circle);
    }

    return classes;
  }

  static getClassName(options: GupCheckboxOptions = {}): string {
    return GupCheckbox.getClassNames(options).join(' ');
  }

  static apply(element: HTMLElement, options: GupCheckboxOptions = {}): void {
    GupCheckbox.remove(element);

    const classes = GupCheckbox.getClassNames(options);
    element.classList.add(...classes);

    const input = element.querySelector(`.${GUP_CHECKBOX_CLASSES.input}`) as HTMLInputElement | null;
    if (input) {
      input.checked = !!options.checked;
      input.indeterminate = !!options.indeterminate;
      input.disabled = !!options.disabled;
    }
  }

  static remove(element: HTMLElement): void {
    element.classList.remove(GUP_CHECKBOX_CLASSES.small, GUP_CHECKBOX_CLASSES.circle);
  }

  static create(options: GupCheckboxOptions = {}): HTMLLabelElement {
    const label = document.createElement('label');
    label.className = GupCheckbox.getClassName(options);

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = GUP_CHECKBOX_CLASSES.input;
    input.checked = !!options.checked;
    input.indeterminate = !!options.indeterminate;
    input.disabled = !!options.disabled;

    const checkMark = document.createElement('div');
    checkMark.className = GUP_CHECKBOX_CLASSES.checkMark;

    const checkMarkInner = document.createElement('div');
    checkMarkInner.className = GUP_CHECKBOX_CLASSES.checkMarkInner;

    checkMark.appendChild(checkMarkInner);

    const textContainer = document.createElement('div');
    textContainer.className = GUP_CHECKBOX_CLASSES.textContainer;

    label.appendChild(input);
    label.appendChild(checkMark);
    label.appendChild(textContainer);

    return label;
  }

  static update(element: HTMLElement, options: GupCheckboxOptions): void {
    GupCheckbox.apply(element, options);
  }

  static isGupCheckbox(element: HTMLElement): boolean {
    return element.classList.contains(GUP_CHECKBOX_CLASSES.base);
  }
}

export default GupCheckbox;
