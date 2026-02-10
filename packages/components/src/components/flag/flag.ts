import { html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GupComponent } from '../../styles/styles';
import styles from './flag.css?inline';
import countries from 'flag-icons/country.json';

// From flag-icons
type FlagCountry = {
  name: string;
  capital?: string;
  continent?: string;
  flag_1x1: string;
  flag_4x3: string;
  code: string;
  iso: boolean;
};

/**
 * Flag component that displays an SVG flag of a country.
 */
@customElement('gup-flag')
export class Flag extends GupComponent {
  /**
   * Human-readable country name (Title Case) or a 2-letter ISO 3166-1-alpha-2 code
   *
   * @see https://www.iso.org/obp/ui/#search/code/
   */
  @property({ type: String, attribute: 'country-name' }) countryName = '';

  /** Shape of the flag. `rectangle` is 4:3 and `circle` is 1:1 */
  @property({ reflect: true }) shape: 'rectangle' | 'circle' = 'rectangle';

  /** Size of the flag - defines the height, width is calculated automatically */
  @property({ type: Number }) size = 20;

  @state() label!: string;

  private svgEl?: SVGElement;

  private flagModules = {
    rectangle: import.meta.glob('@icons/flags/rectangle/build/gup-*.icon.mjs'),
    circle: import.meta.glob('@icons/flags/circle/build/gup-*.icon.mjs'),
  };

  getCountry(countryName: string): FlagCountry | undefined {
    return countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase() || c.code.toLowerCase() === countryName.toLowerCase());
  }

  private async getFlag(countryName: string): Promise<string | undefined> {
    const country = this.getCountry(countryName);
    if (!country) {
      console.warn(`Country not found: ${countryName}`);
      return undefined;
    }

    const flagPath = `${this.shape}/build/gup-${country.code.toLowerCase()}.icon.mjs`;
    const flagModule = Object.entries(this.flagModules[this.shape]).find(([path]) => path.endsWith(flagPath))?.[1];

    if (!flagModule) {
      console.warn(`Flag file not found for country: ${countryName}`);
      return undefined;
    }

    try {
      const flagImport = (await flagModule()) as { [k: string]: { name: string; data: string } };
      return Object.values(flagImport)[0].data;
    } catch (error) {
      console.warn(`Failed to load flag for country: ${countryName}`, error);
      return undefined;
    }
  }

  private svgElementFromString(svgContent: string): SVGElement {
    const div = document.createElement('DIV');
    div.innerHTML = svgContent;
    this.setProperties(div);
    return div.querySelector('svg') || document.createElementNS('http://www.w3.org/2000/svg', 'path');
  }

  private setProperties(el: HTMLElement) {
    const svgEl: SVGElement | null = el.querySelector('svg');
    if (svgEl) {
      svgEl.setAttribute('height', `${this.size}`);
      svgEl.setAttribute('preserveAspectRatio', 'none');
    }
  }

  async renderFlag() {
    if (this.countryName) {
      const flagData = await this.getFlag(this.countryName);
      if (flagData) {
        const iconContainer = this.shadowRoot?.querySelector('.flag');
        if (iconContainer) {
          iconContainer.innerHTML = '';
          this.svgEl = this.svgElementFromString(flagData);
          this.svgEl.classList.add('svg');
          iconContainer.appendChild(this.svgEl);
        }
      }
    }
  }

  updated() {
    const country = this.getCountry(this.countryName);
    if (country) {
      this.label = country.name;
    }

    this.renderFlag();
  }

  render() {
    return html`<div class="flag" title=${this.label}></div>`;
  }

  static readonly styles = unsafeCSS(styles);
}
