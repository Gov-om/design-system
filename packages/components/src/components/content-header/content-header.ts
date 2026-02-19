import { html, unsafeCSS } from 'lit';
import { GupComponent } from '../../styles/styles';
import { customElement, property } from 'lit/decorators.js';
import styles from './content-header.css?inline';
import { HasSlotController } from '../../utils/slot-controller';
import { classMap } from 'lit/directives/class-map.js';

/**
 * A content header that gives a title to a page
 *
 * @cssprop --gup-content-header--background - The background of the component
 *
 * @slot - Content below the title
 * @slot breadcrumbs - A slot for `gup-breadcrumbs`. Do not insert anything else in this slot
 * @slot page-title - A slot for a page title. If not provided, the `page-title` prop will be used. Note it is internally wrapped into a heading tag, so only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content) is allowed
 * @slot page-subtitle - A slot for a page subtitle (located above the title). If not provided, the `page-subtitle` prop will be used. Note it is internally wrapped into a heading tag, so only [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content) is allowed
 * @slot page-summary - A slot for a textual content appearing below the title
 */
@customElement('gup-content-header')
export class ContentHeader extends GupComponent {
  /** The name of the page */
  @property({ attribute: 'page-title' }) pageTitle = '';
  /** The subtitle of the page */
  @property({ attribute: 'page-subtitle' }) pageSubtitle = '';

  private readonly hasSlotController = new HasSlotController(this, 'page-subtitle', 'page-title', 'page-summary', 'breadcrumbs', '[default]');

  render() {
    const slotClasses = {
      'has-page-subtitle': this.hasSlotController.test('page-subtitle') || this.pageSubtitle,
      'has-page-title': this.hasSlotController.test('page-title') || this.pageTitle,
      'has-page-summary': this.hasSlotController.test('page-summary'),
      'has-breadcrumbs': this.hasSlotController.test('breadcrumbs'),
      'has-default-slot': this.hasSlotController.test('[default]'),
    };
    return html`
      <div class="inner-wrapper ${classMap(slotClasses)}">
        <div class="inner">
          <slot name="breadcrumbs"></slot>
          <div class="header">
            ${this.pageSubtitle || this.hasSlotController.test('page-subtitle') ? html`<h2 class="subtitle"><slot name="page-subtitle">${this.pageSubtitle}</slot></h2>` : ''}
            ${this.pageTitle || this.hasSlotController.test('page-title') ? html`<h1 class="title"><slot name="page-title">${this.pageTitle}</slot></h1>` : ''}
            <slot name="page-summary"></slot>
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }

  static readonly styles = unsafeCSS(styles);
}
