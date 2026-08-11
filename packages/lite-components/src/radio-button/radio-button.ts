/**
 * GUP Radio Button - Class-based approach
 *
 * A utility class for applying GUP radio button styles to native HTML elements.
 * State styling (checked, disabled) is driven entirely by the native input's
 * pseudo-classes - no JavaScript needed for basic functionality.
 *
 * @example
 * // Pure HTML/CSS approach - works on click with no JS
 * <fieldset class="gup-radio-group">
 *   <legend class="gup-radio-group__label">Pick an option</legend>
 *   <div class="gup-radio-group__options">
 *     <label class="gup-radio">
 *       <input type="radio" class="gup-radio__input" name="choice" value="a" />
 *       <div class="gup-radio__box">
 *         <div class="gup-radio__box-inner">
 *           <div class="gup-radio__pupil"></div>
 *         </div>
 *       </div>
 *       <div class="gup-radio__text-container">Option A</div>
 *     </label>
 *   </div>
 * </fieldset>
 *
 * @example
 * // Create a new styled radio button programmatically
 * const radio = GupRadioButton.create({ name: 'choice', value: 'a' });
 * radio.querySelector('.gup-radio__text-container').textContent = 'Option A';
 * document.querySelector('.gup-radio-group__options').appendChild(radio);
 */

export type RadioSize = 's' | 'm';

export interface GupRadioButtonOptions {
  /** The name attribute shared across all radios in the group */
  name?: string;
  /** The value of this radio button */
  value?: string;
  /** Whether this radio is checked */
  checked?: boolean;
  /** Whether this radio is disabled */
  disabled?: boolean;
  /** The size of the radio button */
  size?: RadioSize;
}

export const gupRadioBaseClass = 'gup-radio';
export const gupRadioGroupBaseClass = 'gup-radio-group';

export const gupRadioClasses = {
  base: gupRadioBaseClass,
  input: `${gupRadioBaseClass}__input`,
  box: `${gupRadioBaseClass}__box`,
  boxInner: `${gupRadioBaseClass}__box-inner`,
  pupil: `${gupRadioBaseClass}__pupil`,
  textContainer: `${gupRadioBaseClass}__text-container`,
  hint: 'gup-form-hint',
  small: `${gupRadioBaseClass}--small`,
} as const;

export const gupRadioGroupClasses = {
  base: gupRadioGroupBaseClass,
  label: `${gupRadioGroupBaseClass}__label`,
  options: `${gupRadioGroupBaseClass}__options`,
  hint: 'gup-form-hint',
  error: 'gup-form-error',
  hasError: `${gupRadioGroupBaseClass}--error`,
} as const;

/**
 * Utility class for creating and managing GUP-styled radio buttons using native elements.
 */
export class GupRadioButton {
  static getClassNames(options: GupRadioButtonOptions = {}): string[] {
    const classes: string[] = [gupRadioClasses.base];

    if (options.size === 's') {
      classes.push(gupRadioClasses.small);
    }

    return classes;
  }

  static getClassName(options: GupRadioButtonOptions = {}): string {
    return GupRadioButton.getClassNames(options).join(' ');
  }

  static apply(element: HTMLElement, options: GupRadioButtonOptions = {}): void {
    GupRadioButton.remove(element);

    const classes = GupRadioButton.getClassNames(options);
    element.classList.add(...classes);

    const input = element.querySelector(`.${gupRadioClasses.input}`) as HTMLInputElement | null;
    if (input) {
      if (options.name !== undefined) input.name = options.name;
      if (options.value !== undefined) input.value = options.value;
      input.checked = !!options.checked;
      input.disabled = !!options.disabled;
    }
  }

  static remove(element: HTMLElement): void {
    element.classList.remove(gupRadioClasses.small);
  }

  static create(options: GupRadioButtonOptions = {}): HTMLLabelElement {
    const label = document.createElement('label');
    label.className = GupRadioButton.getClassName(options);

    const input = document.createElement('input');
    input.type = 'radio';
    input.className = gupRadioClasses.input;
    if (options.name) input.name = options.name;
    if (options.value) input.value = options.value;
    input.checked = !!options.checked;
    input.disabled = !!options.disabled;

    const box = document.createElement('div');
    box.className = gupRadioClasses.box;

    const boxInner = document.createElement('div');
    boxInner.className = gupRadioClasses.boxInner;

    const pupil = document.createElement('div');
    pupil.className = gupRadioClasses.pupil;

    boxInner.appendChild(pupil);
    box.appendChild(boxInner);

    const textContainer = document.createElement('div');
    textContainer.className = gupRadioClasses.textContainer;

    label.appendChild(input);
    label.appendChild(box);
    label.appendChild(textContainer);

    return label;
  }

  static update(element: HTMLElement, options: GupRadioButtonOptions): void {
    GupRadioButton.apply(element, options);
  }

  static isGupRadioButton(element: HTMLElement): boolean {
    return element.classList.contains(gupRadioClasses.base);
  }
}

/**
 * Utility class for creating GUP-styled radio button groups using native fieldset elements.
 */
export class GupRadioGroup {
  static create(label: string): HTMLFieldSetElement {
    const fieldset = document.createElement('fieldset');
    fieldset.className = gupRadioGroupClasses.base;

    const legend = document.createElement('legend');
    legend.className = gupRadioGroupClasses.label;
    legend.textContent = label;

    const options = document.createElement('div');
    options.className = gupRadioGroupClasses.options;

    fieldset.appendChild(legend);
    fieldset.appendChild(options);

    return fieldset;
  }
}

export default GupRadioButton;
