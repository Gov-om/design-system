import { CSSResultGroup, LitElement, unsafeCSS } from 'lit';
import normalizeCSS from './global/normalize-index.css?inline';

export class GupComponent extends LitElement {
  private static _styles: CSSResultGroup;

  static get styles(): CSSResultGroup {
    const derivedStyles = this._styles || [];
    return [unsafeCSS(normalizeCSS), ...(Array.isArray(derivedStyles) ? derivedStyles : [derivedStyles])];
  }

  static set styles(styles: CSSResultGroup) {
    this._styles = styles;
  }
}
