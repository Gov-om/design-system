/**
 * GUP Stepper - Class-based approach
 *
 * A utility class for applying GUP stepper styles to native HTML elements.
 * Uses a semantic <ol> list with <li> items, aria-current="step" on the
 * active item, and CSS-driven state styling.
 *
 * For expandable step content, use a native <details>/<summary> inside the item
 * body - no JavaScript required.
 *
 * @example
 * // Static progress indicator
 * <ol class="gup-stepper" aria-label="Application progress">
 *   <li class="gup-stepper__item gup-stepper__item--done">
 *     <div class="gup-stepper__marker"><div class="gup-stepper__marker-inner"></div></div>
 *     <div class="gup-stepper__body">
 *       <span class="gup-stepper__label">Personal details</span>
 *     </div>
 *   </li>
 *   <li class="gup-stepper__item gup-stepper__item--selected" aria-current="step">
 *     <div class="gup-stepper__marker"><div class="gup-stepper__marker-inner">2</div></div>
 *     <div class="gup-stepper__body">
 *       <span class="gup-stepper__label">Contact information</span>
 *     </div>
 *   </li>
 *   <li class="gup-stepper__item">
 *     <div class="gup-stepper__marker"><div class="gup-stepper__marker-inner">3</div></div>
 *     <div class="gup-stepper__body">
 *       <span class="gup-stepper__label">Review</span>
 *     </div>
 *   </li>
 * </ol>
 *
 * @example
 * // Expandable content using native <details>
 * <li class="gup-stepper__item gup-stepper__item--selected" aria-current="step">
 *   <div class="gup-stepper__marker"><div class="gup-stepper__marker-inner">2</div></div>
 *   <details class="gup-stepper__body" open>
 *     <summary class="gup-stepper__label">Contact information</summary>
 *     <div class="gup-stepper__content">Step content here...</div>
 *   </details>
 * </li>
 */

export type StepType = 'default' | 'selected' | 'done';

export interface GupStepperItemOptions {
  /** Visual state of the step */
  stepType?: StepType;
  /** Step number to display inside the marker circle */
  stepNumber?: string | number;
}

export const gupStepperBaseClass = 'gup-stepper';

export const gupStepperClasses = {
  base: gupStepperBaseClass,
  expandable: `${gupStepperBaseClass}--expandable`,
  wizard: `${gupStepperBaseClass}--wizard`,
  item: `${gupStepperBaseClass}__item`,
  itemDone: `${gupStepperBaseClass}__item--done`,
  itemSelected: `${gupStepperBaseClass}__item--selected`,
  marker: `${gupStepperBaseClass}__marker`,
  markerInner: `${gupStepperBaseClass}__marker-inner`,
  body: `${gupStepperBaseClass}__body`,
  label: `${gupStepperBaseClass}__label`,
  toggle: `${gupStepperBaseClass}__toggle`,
  content: `${gupStepperBaseClass}__content`,
} as const;

export class GupStepper {
  /** Returns the class string for a stepper item <li> based on its step type. */
  static getItemClassName(options: GupStepperItemOptions = {}): string {
    const classes: string[] = [gupStepperClasses.item];

    if (options.stepType === 'done') classes.push(gupStepperClasses.itemDone);
    if (options.stepType === 'selected') classes.push(gupStepperClasses.itemSelected);

    return classes.join(' ');
  }

  static isGupStepper(element: HTMLElement): boolean {
    return element.classList.contains(gupStepperClasses.base);
  }
}

export default GupStepper;
