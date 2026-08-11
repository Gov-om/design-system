/**
 * GUP Accordion - Class-based approach
 *
 * A disclosure group using native <details>/<summary> elements.
 * State (open/closed) is driven entirely by the native <details> element - no JavaScript needed.
 *
 * @example
 * // Basic accordion group
 * <div class="gup-accordion">
 *   <details class="gup-accordion-item">
 *     <summary class="gup-accordion-item__label">
 *       <span class="gup-accordion-item__label-inner">Label text</span>
 *       <span class="gup-accordion-item__action">
 *         <span class="gup-accordion-item__action-icon" aria-hidden="true"></span>
 *         <span class="gup-accordion-item__action-show">Show</span>
 *         <span class="gup-accordion-item__action-hide">Hide</span>
 *       </span>
 *     </summary>
 *     <div class="gup-accordion-item__content">Content here</div>
 *   </details>
 * </div>
 *
 * @example
 * // Open by default
 * <details class="gup-accordion-item" open>...</details>
 *
 * @example
 * // Without show/hide controls
 * <details class="gup-accordion-item gup-accordion-item--hide-controls">...</details>
 */

export const gupAccordionBaseClass = 'gup-accordion';
export const gupAccordionItemBaseClass = 'gup-accordion-item';

export const gupAccordionClasses = {
  base: gupAccordionBaseClass,
} as const;

export const gupAccordionItemClasses = {
  base: gupAccordionItemBaseClass,
  /** The <summary> element */
  label: `${gupAccordionItemBaseClass}__label`,
  /** Label text (flex-grows to fill available space) */
  labelInner: `${gupAccordionItemBaseClass}__label-inner`,
  /** Contains the icon and show/hide text */
  action: `${gupAccordionItemBaseClass}__action`,
  /** Toggle icon (add-circle-outline / remove-circle-outline) */
  actionIcon: `${gupAccordionItemBaseClass}__action-icon`,
  /** "Show" text - visible when closed */
  actionShow: `${gupAccordionItemBaseClass}__action-show`,
  /** "Hide" text - visible when open */
  actionHide: `${gupAccordionItemBaseClass}__action-hide`,
  /** Content wrapper */
  content: `${gupAccordionItemBaseClass}__content`,
  /** Hides the show/hide action (icon + text) */
  hideControls: `${gupAccordionItemBaseClass}--hide-controls`,
} as const;

export class GupAccordion {
  static isGupAccordion(element: HTMLElement): boolean {
    return element.classList.contains(gupAccordionClasses.base);
  }
}

export class GupAccordionItem {
  static isGupAccordionItem(element: HTMLElement): boolean {
    return element.classList.contains(gupAccordionItemClasses.base);
  }

  static setOpen(element: HTMLDetailsElement, open: boolean): void {
    element.open = open;
  }
}

export default GupAccordion;
