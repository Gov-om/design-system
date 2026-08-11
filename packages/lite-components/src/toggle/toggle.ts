/**
 * GUP Toggle - Class-based approach
 *
 * A utility class for applying GUP toggle (switch) styles to native HTML elements.
 * State styling (checked, disabled) is driven entirely by the native input's
 * pseudo-classes - no JavaScript needed for basic functionality.
 *
 * @example
 * // Pure HTML/CSS approach - works on click with no JS
 * <label class="gup-toggle">
 *   <input type="checkbox" class="gup-toggle__input" name="notifications" />
 *   <div class="gup-toggle__box">
 *     <div class="gup-toggle__knob"></div>
 *   </div>
 *   <div class="gup-toggle__text-container">Enable notifications</div>
 * </label>
 *
 * @example
 * // Create a new styled toggle programmatically
 * const toggle = GupToggle.create('Enable notifications', { checked: true });
 * document.body.appendChild(toggle);
 */

export type ToggleKnobLocation = 'before' | 'after';

export interface GupToggleOptions {
  /** Whether the toggle is checked */
  checked?: boolean;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** The name attribute for form submission */
  name?: string;
  /** Whether to place the knob before or after the label text. Default: 'before' */
  knobLocation?: ToggleKnobLocation;
}

export const gupToggleBaseClass = 'gup-toggle';

export const gupToggleClasses = {
  base: gupToggleBaseClass,
  input: `${gupToggleBaseClass}__input`,
  box: `${gupToggleBaseClass}__box`,
  knob: `${gupToggleBaseClass}__knob`,
  textContainer: `${gupToggleBaseClass}__text-container`,
  labelFirst: `${gupToggleBaseClass}--label-first`,
} as const;

export class GupToggle {
  static getClassNames(options: GupToggleOptions = {}): string[] {
    const classes: string[] = [gupToggleClasses.base];

    if (options.knobLocation === 'after') {
      classes.push(gupToggleClasses.labelFirst);
    }

    return classes;
  }

  static getClassName(options: GupToggleOptions = {}): string {
    return GupToggle.getClassNames(options).join(' ');
  }

  static create(labelText: string, options: GupToggleOptions = {}): HTMLLabelElement {
    const label = document.createElement('label');
    label.className = GupToggle.getClassName(options);

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = gupToggleClasses.input;
    if (options.name) input.name = options.name;
    input.checked = !!options.checked;
    if (options.disabled) input.disabled = true;

    const box = document.createElement('div');
    box.className = gupToggleClasses.box;

    const knob = document.createElement('div');
    knob.className = gupToggleClasses.knob;
    box.appendChild(knob);

    const textContainer = document.createElement('div');
    textContainer.className = gupToggleClasses.textContainer;
    textContainer.textContent = labelText;

    label.appendChild(input);
    label.appendChild(box);
    label.appendChild(textContainer);

    return label;
  }

  static isGupToggle(element: HTMLElement): boolean {
    return element.classList.contains(gupToggleClasses.base);
  }
}

export default GupToggle;
