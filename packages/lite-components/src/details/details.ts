/**
 * GUP Details - Class-based approach
 *
 * A disclosure element using native <details>/<summary>.
 * Click the label to reveal or hide the content.
 *
 * @example
 * // Default (quote appearance, arrow icon)
 * <details class="gup-details gup-details--quote">
 *   <summary class="gup-details__label">
 *     <span class="gup-details__icon" aria-hidden="true"></span>
 *     <span class="gup-details__label-inner">Show more</span>
 *   </summary>
 *   <div class="gup-details__content">
 *     <div class="gup-details__content-inner">Content here</div>
 *   </div>
 * </details>
 *
 * @example
 * // Sink appearance with circle icons and close button
 * <details class="gup-details gup-details--sink gup-details--circle-toggle" open>
 *   <summary class="gup-details__label">
 *     <span class="gup-details__icon" aria-hidden="true"></span>
 *     <span class="gup-details__label-inner">Step 1</span>
 *   </summary>
 *   <div class="gup-details__content">
 *     <div class="gup-details__content-inner">
 *       Content here
 *       <button class="gup-details__close-button" aria-label="Close"
 *               onclick="this.closest('details').open = false">
 *         <span class="gup-details__close-icon" aria-hidden="true"></span>
 *       </button>
 *     </div>
 *   </div>
 * </details>
 */

export const gupDetailsBaseClass = 'gup-details';

export const gupDetailsClasses = {
  base: gupDetailsBaseClass,
  /** Content styled as a side-bordered quote block (default) */
  quote: `${gupDetailsBaseClass}--quote`,
  /** Content styled as a full-width sink panel with close button */
  sink: `${gupDetailsBaseClass}--sink`,
  /** No styled content container */
  none: `${gupDetailsBaseClass}--none`,
  /** Add-circle / remove-circle icons instead of the default arrow icons */
  circleToggle: `${gupDetailsBaseClass}--circle-toggle`,
  /** Hide the toggle icon */
  noIcon: `${gupDetailsBaseClass}--no-icon`,
  label: `${gupDetailsBaseClass}__label`,
  icon: `${gupDetailsBaseClass}__icon`,
  labelInner: `${gupDetailsBaseClass}__label-inner`,
  content: `${gupDetailsBaseClass}__content`,
  contentInner: `${gupDetailsBaseClass}__content-inner`,
  closeButton: `${gupDetailsBaseClass}__close-button`,
  closeIcon: `${gupDetailsBaseClass}__close-icon`,
} as const;

export class GupDetails {
  static isGupDetails(element: HTMLElement): boolean {
    return element.classList.contains(gupDetailsClasses.base);
  }
}

export default GupDetails;
