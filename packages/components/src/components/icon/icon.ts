import { customElement, property } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import { css, html } from 'lit';
import { GupIconName } from '@govom/icons/dist/index.d';

/**
 * Icon component that displays an SVG icon.
 *
 * @cssprop --gup-icon--width - Icon width
 * @cssprop --gup-icon--height - Icon height
 * @cssprop --gup-icon--fill-color - Icon fill color
 */
@customElement('gup-icon')
export class Icon extends GupComponent {
  /** Icon name in kebab-case. Includes [most of Material Design icons](https://marella.me/material-design-icons/demo/svg/) as well some custom ones */
  @property({ attribute: 'icon-name' }) iconName?: GupIconName | string;

  /** Width of the icon. You can also use `--gup-icon--width` CSS variable if you can't set the prop on the element itself. */
  @property() width = '16';

  /** Height of the icon. You can also use `--gup-icon--height` CSS variable if you can't set the prop on the element itself. */
  @property() height = '16';

  /** Flip the icon horizontally when in RTL */
  @property({ type: Boolean, reflect: true, attribute: 'rtl-flip-enabled' }) rtlFlipEnabled = false;

  /** Fill color of the icon in any format [supported by CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). You can also use `--gup-icon--fill-color` CSS variable if you need to set the color several DOM levels higher. */
  @property({ attribute: 'fill-color' }) public fillColor?: string;

  private svgEl?: SVGElement;

  private iconModules = import.meta.glob('@icons/build/gup-*.icon.mjs', {
    eager: false,
  });

  private async getIconData(iconName: string): Promise<string | undefined> {
    const iconFileName = `gup-${iconName.replace(/-/g, '_')}.icon.mjs`;
    const iconModule = Object.entries(this.iconModules).find(([path]) => path.endsWith(iconFileName))?.[1];

    if (!iconModule) {
      console.warn(`We could not find an icon with the icon name ${iconName} and file name ${iconFileName}`);
      return undefined;
    }

    try {
      const iconImport = (await iconModule()) as { [k: string]: { name: string; data: string } };
      return Object.values(iconImport)[0].data;
    } catch (error) {
      console.warn(`Failed to load icon with name: ${iconName}`, error);
      return undefined;
    }
  }

  private svgElementFromString(svgContent: string): SVGElement {
    const div = document.createElement('DIV');
    div.innerHTML = svgContent;
    return div.querySelector('svg') || document.createElementNS('http://www.w3.org/2000/svg', 'path');
  }

  private async rerenderSvg() {
    if (this.iconName) {
      const svgData = await this.getIconData(this.iconName);
      if (svgData) {
        const iconContainer = this.shadowRoot?.querySelector('.icon');
        if (iconContainer) {
          iconContainer.innerHTML = '';
          this.svgEl = this.svgElementFromString(svgData);

          iconContainer.appendChild(this.svgEl);
        }
      }
    }
  }

  updateWidth(): void {
    if (this.width) {
      this.style.setProperty('--width', `${this.width}px`);
    }
  }

  updateHeight(): void {
    if (this.height) {
      this.style.setProperty('--height', `${this.height}px`);
    }
  }

  updateFillColor(): void {
    if (this.fillColor) {
      this.style.setProperty('--fill-color', `${this.fillColor}`);
    }
  }

  firstUpdated() {
    this.updateWidth();
    this.updateHeight();
    this.updateFillColor();
    this.rerenderSvg();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.get('width')) {
      this.updateWidth();
    }
    if (changedProperties.get('height')) {
      this.updateHeight();
    }
    if (changedProperties.get('fillColor')) {
      this.updateFillColor();
    }
    if (changedProperties.get('iconName')) {
      this.rerenderSvg();
    }
  }

  render() {
    return html`<div class="icon"></div>`;
  }

  static readonly styles = css`
    :host {
      display: block;
      width: var(--gup-icon--width, var(--width));
      height: var(--gup-icon--height, var(--height));
      color: var(--gup-icon--fill-color, var(--fill-color));
    }

    :host([rtl-flip-enabled]) {
      transform: scaleX(calc(-1 * (var(--gup--is-ltr) * -1)));
    }

    .icon {
      width: 100%;
      height: 100%;
    }
  `;
}
