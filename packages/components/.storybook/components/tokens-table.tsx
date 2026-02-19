import React from 'react';

type ColorValue = { r: number; g: number; b: number; a: number };
type TokenValue = number | ColorValue;

export const TokensTable = ({ data, type }: { type: 'float' | 'color'; data: { [key: string]: { value: TokenValue } } }) => {
  const generateHtmlTableFromJson = (): string => {
    let tableHtml = `<table><caption>${type === 'float' ? 'Sizes, spacing, and typography' : 'Colors'}</caption><thead><tr><th>Property Name</th><th>Value</th></tr></thead><tbody>`;

    const sortingFnFloat = (a, b) => {
      if (type === 'float') {
        const hasNumericSuffix = /(?<=-)\d+$/g;
        const hasSameBase = /^\D+(?=-\d+)/g;
        return a[0].match(hasSameBase) && b[0].match(hasSameBase) && a[0].match(hasSameBase)![0] === b[0].match(hasSameBase)![0]
          ? parseInt(a[0].match(hasNumericSuffix)![0]) - parseInt(b[0].match(hasNumericSuffix)![0])
          : a[0].localeCompare(b[0]);
      } else {
        return a[0].localeCompare(b[0]);
      }
    };

    const sortedKeys = Object.fromEntries(Object.entries(data).sort(sortingFnFloat));

    const renderColor = (colorVal: number, type: 'rgb' | 'hex'): string => {
      const value = Math.round(colorVal * 255);
      if (type === 'hex') {
        return value.toString(16);
      }
      return `${value}`;
    };

    const roundNumber = (num: number): string => num.toFixed(2);

    for (const [key, value] of Object.entries(sortedKeys)) {
      if (key.startsWith('gup/')) {
        const kebabProperty = key.replace(/\//g, '-');
        let val = '';
        if (type === 'float') {
          val = `${value.value as number}px`;
        }
        if (type === 'color') {
          const endValue = value.value as ColorValue;
          const colorLabel = `#${renderColor(endValue.r, 'hex')}${renderColor(endValue.g, 'hex')}${renderColor(endValue.b, 'hex')}${endValue.a < 1 ? ' / ' + roundNumber(endValue.a) : ''}`;
          const colorStyle = `rgba(${renderColor(endValue.r, 'rgb')} ${renderColor(endValue.g, 'rgb')} ${renderColor(endValue.b, 'rgb')} / ${endValue.a})`;
          val = `${colorLabel} <span style="border: 1px solid var(--gup-color-states-base-border); border-radius: 51%; height: 14px; aspect-ratio: 1/1; display: inline-block; vertical-align: middle; margin-left: 0.4em; background-color: ${colorStyle}"></span>`;
        }
        tableHtml += `<tr><td><code>--${kebabProperty}</code></td><td>${val}</td></tr>`;
      }
    }

    tableHtml += '</tbody></table>';
    return tableHtml;
  };

  return <div dangerouslySetInnerHTML={{ __html: generateHtmlTableFromJson() }} />;
};
