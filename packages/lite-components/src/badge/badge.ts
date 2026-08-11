/**
 * GUP Badge - Class-based approach
 *
 * A small circular status indicator conveying one of four states: neutral, positive, negative, or offline.
 * All visual variants are driven by explicit modifier classes - there are no native pseudo-class states.
 *
 * @example
 * // Pure HTML/CSS approach - works with no JavaScript
 * <span class="gup-badge gup-badge--positive"></span>
 *
 * @example
 * // With TypeScript utility
 * const el = GupBadge.create({ type: 'positive' });
 * document.body.appendChild(el);
 */

export type BadgeType = 'neutral' | 'positive' | 'negative' | 'offline';

export interface GupBadgeOptions {
  /** The status type of the badge, controls background color */
  type?: BadgeType;
}

export const gupBadgeBaseClass = 'gup-badge';

export const gupBadgeClasses = {
  base: gupBadgeBaseClass,
  neutral: `${gupBadgeBaseClass}--neutral`,
  positive: `${gupBadgeBaseClass}--positive`,
  negative: `${gupBadgeBaseClass}--negative`,
  offline: `${gupBadgeBaseClass}--offline`,
} as const;

export class GupBadge {
  static getClassNames(options: GupBadgeOptions = {}): string[] {
    const classes: string[] = [gupBadgeClasses.base];
    const type = options.type ?? 'neutral';
    classes.push(gupBadgeClasses[type]);
    return classes;
  }

  static getClassName(options: GupBadgeOptions = {}): string {
    return GupBadge.getClassNames(options).join(' ');
  }

  static apply(element: HTMLElement, options: GupBadgeOptions = {}): void {
    GupBadge.remove(element);
    element.classList.add(...GupBadge.getClassNames(options));
  }

  static remove(element: HTMLElement): void {
    const modifiers = [gupBadgeClasses.neutral, gupBadgeClasses.positive, gupBadgeClasses.negative, gupBadgeClasses.offline];
    element.classList.remove(...modifiers);
  }

  static create(options: GupBadgeOptions = {}): HTMLSpanElement {
    const span = document.createElement('span');
    GupBadge.apply(span, options);
    return span;
  }

  static update(element: HTMLElement, options: GupBadgeOptions): void {
    GupBadge.apply(element, options);
  }

  static isGupBadge(element: HTMLElement): boolean {
    return element.classList.contains(gupBadgeClasses.base);
  }
}

export default GupBadge;
