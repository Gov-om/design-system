/**
 * GUP Table - Class-based approach
 *
 * A styled data table using native `<table>`, `<thead>`, `<tbody>`, `<tr>`,
 * `<th>`, and `<td>` elements. No JavaScript required.
 *
 * @example
 * // Pure HTML/CSS approach - works with no JavaScript
 * <table class="gup-table">
 *   <thead class="gup-table__head">
 *     <tr class="gup-table__row">
 *       <th class="gup-table__header" scope="col">Name</th>
 *       <th class="gup-table__header" scope="col">Status</th>
 *       <th class="gup-table__header" scope="col">Date</th>
 *     </tr>
 *   </thead>
 *   <tbody class="gup-table__body">
 *     <tr class="gup-table__row">
 *       <td class="gup-table__cell">Ahmed Al-Farsi</td>
 *       <td class="gup-table__cell">Approved</td>
 *       <td class="gup-table__cell">12 Jan 2025</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @example
 * // Build programmatically with TypeScript helpers
 * const table = GupTable.create();
 * const headerRow = GupTable.createRow();
 * headerRow.append(
 *   GupTable.createHeaderCell('Name'),
 *   GupTable.createHeaderCell('Status'),
 * );
 * table.tHead!.appendChild(headerRow);
 *
 * const dataRow = GupTable.createRow();
 * dataRow.append(
 *   GupTable.createCell('Ahmed Al-Farsi'),
 *   GupTable.createCell('Approved'),
 * );
 * table.tBodies[0].appendChild(dataRow);
 * document.body.appendChild(table);
 */

export const gupTableBaseClass = 'gup-table';

export const gupTableClasses = {
  base: gupTableBaseClass,
  /** The <thead> element */
  head: `${gupTableBaseClass}__head`,
  /** The <tbody> element */
  body: `${gupTableBaseClass}__body`,
  /** A <tr> row inside <thead> or <tbody> */
  row: `${gupTableBaseClass}__row`,
  /** A <th> column header or row header */
  header: `${gupTableBaseClass}__header`,
  /** A <td> body data cell */
  cell: `${gupTableBaseClass}__cell`,
} as const;

export class GupTable {
  static getClassName(): string {
    return gupTableClasses.base;
  }

  static apply(element: HTMLElement): void {
    element.classList.add(gupTableClasses.base);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static remove(_element: HTMLElement): void {
    // No modifier classes to remove - table has no visual state modifiers
  }

  /** Creates a `<table>` with an empty `<thead>` and `<tbody>` already appended. */
  static create(): HTMLTableElement {
    const table = document.createElement('table');
    table.className = gupTableClasses.base;

    const thead = document.createElement('thead');
    thead.className = gupTableClasses.head;

    const tbody = document.createElement('tbody');
    tbody.className = gupTableClasses.body;

    table.append(thead, tbody);
    return table;
  }

  /** Creates a `<tr>` with the row class applied. */
  static createRow(): HTMLTableRowElement {
    const tr = document.createElement('tr');
    tr.className = gupTableClasses.row;
    return tr;
  }

  /**
   * Creates a `<th>` header cell. Pass `scope="col"` for column headers and
   * `scope="row"` for row headers (the browser default is `"col"` for `<th>`
   * inside `<thead>`).
   */
  static createHeaderCell(content?: string, scope: 'col' | 'row' = 'col'): HTMLTableCellElement {
    const th = document.createElement('th') as HTMLTableCellElement;
    th.className = gupTableClasses.header;
    th.scope = scope;
    if (content) th.textContent = content;
    return th;
  }

  /** Creates a `<td>` data cell. */
  static createCell(content?: string): HTMLTableCellElement {
    const td = document.createElement('td');
    td.className = gupTableClasses.cell;
    if (content) td.textContent = content;
    return td;
  }

  static update(element: HTMLElement): void {
    GupTable.apply(element);
  }

  static isGupTable(element: HTMLElement): boolean {
    return element.classList.contains(gupTableClasses.base);
  }
}

export default GupTable;
