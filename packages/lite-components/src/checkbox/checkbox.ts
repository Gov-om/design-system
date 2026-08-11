/**
 * GUP Checkbox - Class-based approach
 *
 * A utility class for applying GUP checkbox styles to native HTML elements.
 * State styling (checked, indeterminate, disabled) is driven entirely by the
 * native input's pseudo-classes - no JavaScript needed for basic functionality.
 *
 * @example
 * // Pure HTML/CSS approach - works on click with no JS
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

export const gupCheckboxBaseClass = 'gup-checkbox';

export const gupCheckboxClasses = {
  base: gupCheckboxBaseClass,
  input: `${gupCheckboxBaseClass}__input`,
  checkMark: `${gupCheckboxBaseClass}__check-mark`,
  checkMarkInner: `${gupCheckboxBaseClass}__check-mark-inner`,
  textContainer: `${gupCheckboxBaseClass}__text-container`,
  hint: 'gup-form-hint',
  small: `${gupCheckboxBaseClass}--small`,
  circle: `${gupCheckboxBaseClass}--circle`,
} as const;

export class GupCheckbox {
  static getClassNames(options: GupCheckboxOptions = {}): string[] {
    const classes: string[] = [gupCheckboxClasses.base];

    if (options.size === 's') {
      classes.push(gupCheckboxClasses.small);
    }
    if (options.appearance === 'circle') {
      classes.push(gupCheckboxClasses.circle);
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

    const input = element.querySelector(`.${gupCheckboxClasses.input}`) as HTMLInputElement | null;
    if (input) {
      input.checked = !!options.checked;
      input.indeterminate = !!options.indeterminate;
      input.disabled = !!options.disabled;
    }
  }

  static remove(element: HTMLElement): void {
    element.classList.remove(gupCheckboxClasses.small, gupCheckboxClasses.circle);
  }

  static create(options: GupCheckboxOptions = {}): HTMLLabelElement {
    const label = document.createElement('label');
    label.className = GupCheckbox.getClassName(options);

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = gupCheckboxClasses.input;
    input.checked = !!options.checked;
    input.indeterminate = !!options.indeterminate;
    input.disabled = !!options.disabled;

    const checkMark = document.createElement('div');
    checkMark.className = gupCheckboxClasses.checkMark;

    const checkMarkInner = document.createElement('div');
    checkMarkInner.className = gupCheckboxClasses.checkMarkInner;

    checkMark.appendChild(checkMarkInner);

    const textContainer = document.createElement('div');
    textContainer.className = gupCheckboxClasses.textContainer;

    label.appendChild(input);
    label.appendChild(checkMark);
    label.appendChild(textContainer);

    return label;
  }

  static update(element: HTMLElement, options: GupCheckboxOptions): void {
    GupCheckbox.apply(element, options);
  }

  static isGupCheckbox(element: HTMLElement): boolean {
    return element.classList.contains(gupCheckboxClasses.base);
  }
}

export default GupCheckbox;
