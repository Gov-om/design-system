/**
 * GUP Banner - Class-based approach
 *
 * A notification banner with four semantic types and two visual appearances.
 * State is driven entirely by modifier classes - no JavaScript required for
 * display. An optional close button requires a click listener.
 *
 * @example
 * // Basic neutral banner
 * <div class="gup-banner" role="region" aria-label="Notice">
 *   <div class="gup-banner__inner">
 *     <div class="gup-banner__track">
 *       <span class="gup-banner__icon" aria-hidden="true"><svg>...</svg></span>
 *       <p class="gup-banner__title">Important notice</p>
 *       <div class="gup-banner__body">
 *         <div class="gup-banner__message">Your application has been received.</div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * @example
 * // Error banner with close button
 * <div class="gup-banner gup-banner--error" role="alert">
 *   <div class="gup-banner__inner">
 *     <button class="gup-banner__close" type="button" aria-label="Close">
 *       <svg>...</svg>
 *     </button>
 *     <div class="gup-banner__track">
 *       <span class="gup-banner__icon" aria-hidden="true"><svg>...</svg></span>
 *       <p class="gup-banner__title">There is a problem</p>
 *       <div class="gup-banner__body">
 *         <div class="gup-banner__message">Please fix the highlighted fields.</div>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 */

export type GupBannerType = 'neutral' | 'success' | 'warning' | 'error';
export type GupBannerAppearance = 'outline' | 'filled';

export interface GupBannerOptions {
  /** Semantic type - controls colour and default icon */
  type?: GupBannerType;
  /** Visual appearance */
  appearance?: GupBannerAppearance;
  /** Hide the status icon */
  hideIcon?: boolean;
}

export const gupBannerBaseClass = 'gup-banner';

export const gupBannerClasses = {
  base: gupBannerBaseClass,
  /** Inner wrapper */
  inner: `${gupBannerBaseClass}__inner`,
  /** Grid layout container (icon + title + body) */
  track: `${gupBannerBaseClass}__track`,
  /** Status icon container (aria-hidden) */
  icon: `${gupBannerBaseClass}__icon`,
  /** Title element */
  title: `${gupBannerBaseClass}__title`,
  /** Body area holding message and optional actions */
  body: `${gupBannerBaseClass}__body`,
  /** Main message content */
  message: `${gupBannerBaseClass}__message`,
  /** Optional action buttons container */
  actions: `${gupBannerBaseClass}__actions`,
  /** Close button */
  close: `${gupBannerBaseClass}__close`,
  /** Success type modifier */
  success: `${gupBannerBaseClass}--success`,
  /** Warning type modifier */
  warning: `${gupBannerBaseClass}--warning`,
  /** Error type modifier */
  error: `${gupBannerBaseClass}--error`,
  /** Filled appearance modifier */
  filled: `${gupBannerBaseClass}--filled`,
  /** Hides the icon and switches from grid to flex layout */
  noIcon: `${gupBannerBaseClass}--no-icon`,
} as const;

const ICON_PATHS: Record<GupBannerType, string> = {
  neutral: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  success: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  warning: 'M12 2 1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2v-4h2v4z',
  error:
    'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
};

const CLOSE_ICON_PATH = 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z';

function svgIcon(path: string, size = 34): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" aria-hidden="true"><path d="${path}"/></svg>`;
}

export class GupBanner {
  static getClassNames(options: GupBannerOptions = {}): string[] {
    const classes = [gupBannerBaseClass];
    if (options.type === 'success') classes.push(gupBannerClasses.success);
    if (options.type === 'warning') classes.push(gupBannerClasses.warning);
    if (options.type === 'error') classes.push(gupBannerClasses.error);
    if (options.appearance === 'filled') classes.push(gupBannerClasses.filled);
    if (options.hideIcon) classes.push(gupBannerClasses.noIcon);
    return classes;
  }

  static getClassName(options: GupBannerOptions = {}): string {
    return GupBanner.getClassNames(options).join(' ');
  }

  static create(
    title: string,
    message: string,
    options: GupBannerOptions & {
      showCloseButton?: boolean;
      closeLabel?: string;
    } = {}
  ): HTMLDivElement {
    const type = options.type ?? 'neutral';
    const container = document.createElement('div');
    container.className = GupBanner.getClassName(options);
    container.setAttribute('role', type === 'error' ? 'alert' : 'region');
    if (type !== 'error') container.setAttribute('aria-label', title);

    const inner = document.createElement('div');
    inner.className = gupBannerClasses.inner;

    if (options.showCloseButton) {
      const closeBtn = document.createElement('button');
      closeBtn.className = gupBannerClasses.close;
      closeBtn.type = 'button';
      closeBtn.setAttribute('aria-label', options.closeLabel ?? 'Close');
      closeBtn.innerHTML = svgIcon(CLOSE_ICON_PATH, 24);
      inner.appendChild(closeBtn);
    }

    const track = document.createElement('div');
    track.className = gupBannerClasses.track;

    if (!options.hideIcon) {
      const iconEl = document.createElement('span');
      iconEl.className = gupBannerClasses.icon;
      iconEl.setAttribute('aria-hidden', 'true');
      const iconSize = type === 'warning' ? 16 : 34;
      iconEl.innerHTML = svgIcon(ICON_PATHS[type], iconSize);
      track.appendChild(iconEl);
    }

    const titleEl = document.createElement('p');
    titleEl.className = gupBannerClasses.title;
    titleEl.textContent = title;
    track.appendChild(titleEl);

    const body = document.createElement('div');
    body.className = gupBannerClasses.body;
    const messageEl = document.createElement('div');
    messageEl.className = gupBannerClasses.message;
    messageEl.textContent = message;
    body.appendChild(messageEl);
    track.appendChild(body);

    inner.appendChild(track);
    container.appendChild(inner);

    return container;
  }

  static isGupBanner(element: HTMLElement): boolean {
    return element.classList.contains(gupBannerBaseClass);
  }
}

export default GupBanner;
