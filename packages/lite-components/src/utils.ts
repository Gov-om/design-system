/**
 * GUP Utils - Shared layout and accessibility class constants
 *
 * Import the corresponding utils.css alongside any component that uses these.
 */

/** CSS class names for the `.gup-track` flex layout utility. */
export const gupTrackClasses = {
  /** Base flex container */
  base: 'gup-track',
  /** Stack children vertically (flex-direction: column) */
  vertical: 'gup-track--vertical',
  /** Allow children to wrap onto multiple lines */
  wrap: 'gup-track--wrap',
  /** Horizontally center children (justify-content: center) */
  hCenter: 'gup-track--h-center',
  /** Push children to the end (justify-content: flex-end) */
  hEnd: 'gup-track--h-end',
  /** Space children evenly (justify-content: space-between) */
  hBetween: 'gup-track--h-between',
  /** Vertically align children to center (align-items: center) */
  vCenter: 'gup-track--v-center',
  /** Vertically align children to bottom (align-items: flex-end) */
  vEnd: 'gup-track--v-end',
  /** Vertically align children to top (align-items: flex-start) */
  vStart: 'gup-track--v-start',
  /** Give all children equal width (flex: 1 0 0) */
  itemsEqual: 'gup-track--items-equal',
} as const;

/** CSS class name for visually-hidden but screen-reader-accessible text. */
export const gupSrOnlyClass = 'gup-sr-only';
