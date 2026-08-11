/**
 * GUP Link - Class-based approach
 *
 * A styled inline link or button. The class is applied directly to a native
 * `<a>` or `<button>` element.
 *
 * State styling uses native pseudo-classes (:hover, :focus-visible, :disabled).
 * The disabled state for `<a>` elements requires the `gup-link--disabled`
 * modifier class (anchors have no native :disabled pseudo-class), plus
 * `aria-disabled="true"` and `tabindex="-1"` so the link is genuinely inactive
 * for keyboard and assistive-tech users. `apply()` and `create()` set these.
 *
 * @example
 * // Disabled anchor
 * <a href="/page" class="gup-link gup-link--disabled"
 *    aria-disabled="true" tabindex="-1">Visit page</a>
 *
 * @example
 * // Anchor link
 * <a href="/page" class="gup-link">Visit page</a>
 *
 * @example
 * // Secondary severity (grey)
 * <a href="/page" class="gup-link gup-link--secondary">Back to list</a>
 *
 * @example
 * // Danger (red) - for destructive actions
 * <button type="button" class="gup-link gup-link--danger">Delete record</button>
 *
 * @example
 * // Opens in new tab
 * <a href="/doc.pdf" class="gup-link" target="_blank" rel="noreferrer">
 *   Download (PDF)
 * </a>
 */

export type GupLinkSeverity = 'primary' | 'secondary' | 'danger';
export type GupLinkSize = 's' | 'm' | 'l';

export interface GupLinkOptions {
  /** Visual severity - controls colour */
  severity?: GupLinkSeverity;
  /** Font size variant */
  size?: GupLinkSize;
  /** Visually disabled (use on `<a>` - buttons use the native disabled attribute) */
  disabled?: boolean;
}

export const gupLinkBaseClass = 'gup-link';

export const gupLinkClasses = {
  base: gupLinkBaseClass,
  /** Secondary (grey) severity modifier */
  secondary: `${gupLinkBaseClass}--secondary`,
  /** Danger (red) severity modifier */
  danger: `${gupLinkBaseClass}--danger`,
  /** Small font size */
  sm: `${gupLinkBaseClass}--sm`,
  /** Large font size */
  lg: `${gupLinkBaseClass}--lg`,
  /** Visually disabled - applies to `<a>` (buttons use native disabled) */
  disabled: `${gupLinkBaseClass}--disabled`,
} as const;

export class GupLink {
  static getClassNames(options: GupLinkOptions = {}): string[] {
    const classes = [gupLinkBaseClass];
    if (options.severity === 'secondary') classes.push(gupLinkClasses.secondary);
    if (options.severity === 'danger') classes.push(gupLinkClasses.danger);
    if (options.size === 's') classes.push(gupLinkClasses.sm);
    if (options.size === 'l') classes.push(gupLinkClasses.lg);
    if (options.disabled) classes.push(gupLinkClasses.disabled);
    return classes;
  }

  static getClassName(options: GupLinkOptions = {}): string {
    return GupLink.getClassNames(options).join(' ');
  }

  static apply(element: HTMLElement, options: GupLinkOptions = {}): void {
    GupLink.remove(element);
    element.classList.add(...GupLink.getClassNames(options));
    if (options.disabled && element instanceof HTMLButtonElement) {
      element.disabled = true;
    } else if (options.disabled) {
      GupLink.setAnchorDisabled(element);
    }
  }

  static remove(element: HTMLElement): void {
    element.classList.remove(gupLinkClasses.secondary, gupLinkClasses.danger, gupLinkClasses.sm, gupLinkClasses.lg, gupLinkClasses.disabled);
    element.removeAttribute('aria-disabled');
    element.removeAttribute('tabindex');
  }

  /**
   * Marks a non-button element (typically `<a>`) as disabled for assistive tech.
   * `pointer-events: none` alone still leaves an anchor keyboard focusable and
   * activatable, so the state must also be exposed via aria-disabled and the
   * element removed from the tab order.
   */
  private static setAnchorDisabled(element: HTMLElement): void {
    element.setAttribute('aria-disabled', 'true');
    element.setAttribute('tabindex', '-1');
  }

  /** Creates a styled `<a>` element. */
  static create(labelText: string, href: string, options: GupLinkOptions = {}): HTMLAnchorElement {
    const el = document.createElement('a');
    el.href = href;
    el.textContent = labelText;
    el.className = GupLink.getClassName(options);
    if (options.disabled) GupLink.setAnchorDisabled(el);
    return el;
  }

  /** Creates a styled `<button>` element. */
  static createButton(labelText: string, options: GupLinkOptions = {}): HTMLButtonElement {
    const el = document.createElement('button');
    el.type = 'button';
    el.textContent = labelText;
    el.className = GupLink.getClassName(options);
    if (options.disabled) el.disabled = true;
    return el;
  }

  static isGupLink(element: HTMLElement): boolean {
    return element.classList.contains(gupLinkBaseClass);
  }
}

export default GupLink;
