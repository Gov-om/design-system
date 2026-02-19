import { nothing } from 'lit';

export const isEmpty = (str?: string): boolean => {
  if (!str) {
    return true;
  }
  return str.trim() === '';
};

/**
 * Assumes the ids used for the hint and error message in the consuming component are 'hint' and 'error-message' respectively.
 */
export const getAriaDescribedBy = (hasHint: boolean, hasErrorMessage: boolean): string | typeof nothing => {
  if (!hasErrorMessage && !hasHint) {
    return nothing;
  }

  let value = '';

  if (hasErrorMessage) {
    value = ' error-message';
  }

  if (hasHint) {
    value += ' hint';
  }

  return value.trim();
};
