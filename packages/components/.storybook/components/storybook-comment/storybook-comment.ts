import { css, html } from 'lit';
import { GupComponent } from '../../../src/styles/styles';
import { customElement } from 'lit/decorators.js';
import { storybookGUPLogo } from '../../utils';

/**
 * A Storybook only component to display a comment in the Storybook canvas.
 *
 * @slot - The contents
 */
@customElement('storybook-comment')
export class StorybookComment extends GupComponent {
  render() {
    return html`
      <details class="inner" open>
        <summary class="label">Toggle information</summary>
        <slot></slot>
      </details>
    `;
  }

  static readonly styles = css`
    :host {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: var(--gup-padding-md);
      padding-inline-start: 96px;
      background-color: var(--gup-color-background-overcanvas);
      background-image: url(${storybookGUPLogo});
      background-repeat: no-repeat;
      background-position: var(--gup-padding-md) center;
      background-size: 36px;
      color: var(--gup-color-neutral-high);
      width: 100%;
      direction: ltr;
    }

    .inner {
      max-height: 40vh;
      overflow-y: auto;
    }

    .label {
      cursor: pointer;
    }

    ::slotted(code) {
      background-color: var(--gup-color-border-low);
      padding: 2px;
    }
  `;
}
