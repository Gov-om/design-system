/**
 * GUP Button - Class-based approach
 *
 * A utility class for applying GUP button styles to native HTML elements.
 * This is an alternative to the <gup-button> web component for cases where
 * users prefer to work with native elements.
 *
 * @example
 * // Apply to existing button
 * const button = document.querySelector('button');
 * GupButton.apply(button, { appearance: 'primary' });
 *
 * @example
 * // Create a new styled button
 * const button = GupButton.create({ appearance: 'secondary', disabled: true });
 * button.textContent = 'Click me';
 * document.body.appendChild(button);
 */

export type ButtonAppearance = 'primary' | 'secondary' | 'text' | 'danger';

export interface GupButtonOptions {
  /** The visual appearance of the button */
  appearance?: ButtonAppearance;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button uses inverted colors (for dark backgrounds) */
  inverted?: boolean;
  /** Whether the button displays only an icon (circular shape) */
  iconOnly?: boolean;
}

export const GUP_BUTTON_BASE_CLASS = 'gup-button';

export const GUP_BUTTON_CLASSES = {
  base: GUP_BUTTON_BASE_CLASS,
  primary: `${GUP_BUTTON_BASE_CLASS}--primary`,
  secondary: `${GUP_BUTTON_BASE_CLASS}--secondary`,
  text: `${GUP_BUTTON_BASE_CLASS}--text`,
  danger: `${GUP_BUTTON_BASE_CLASS}--danger`,
  disabled: `${GUP_BUTTON_BASE_CLASS}--disabled`,
  inverted: `${GUP_BUTTON_BASE_CLASS}--inverted`,
  iconOnly: `${GUP_BUTTON_BASE_CLASS}--icon-only`,
  icon: `${GUP_BUTTON_BASE_CLASS}__icon`,
  labelSrOnly: `${GUP_BUTTON_BASE_CLASS}__label--sr-only`,
} as const;

/**
 * Utility class for creating and managing GUP-styled buttons using native elements.
 */
export class GupButton {
  /**
   * Get the CSS class names for a button based on options.
   */
  static getClassNames(options: GupButtonOptions = {}): string[] {
    const classes: string[] = [GUP_BUTTON_CLASSES.base];

    const appearance = options.appearance || 'primary';
    classes.push(GUP_BUTTON_CLASSES[appearance]);

    if (options.disabled) {
      classes.push(GUP_BUTTON_CLASSES.disabled);
    }
    if (options.inverted) {
      classes.push(GUP_BUTTON_CLASSES.inverted);
    }
    if (options.iconOnly) {
      classes.push(GUP_BUTTON_CLASSES.iconOnly);
    }

    return classes;
  }

  static getClassName(options: GupButtonOptions = {}): string {
    return GupButton.getClassNames(options).join(' ');
  }

  static apply(element: HTMLElement, options: GupButtonOptions = {}): void {
    GupButton.remove(element);

    const classes = GupButton.getClassNames(options);
    element.classList.add(...classes);

    if (element instanceof HTMLButtonElement && options.disabled) {
      element.disabled = true;
    }
  }

  static remove(element: HTMLElement): void {
    const allClasses = Object.values(GUP_BUTTON_CLASSES);
    element.classList.remove(...allClasses);
  }

  static create(options: GupButtonOptions = {}): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    GupButton.apply(button, options);
    return button;
  }

  static createLink(href: string, options: GupButtonOptions = {}): HTMLAnchorElement {
    const link = document.createElement('a');
    link.href = href;
    GupButton.apply(link, options);
    return link;
  }

  static update(element: HTMLElement, options: GupButtonOptions): void {
    GupButton.apply(element, options);
  }

  static isGupButton(element: HTMLElement): boolean {
    return element.classList.contains(GUP_BUTTON_CLASSES.base);
  }
}

export default GupButton;
