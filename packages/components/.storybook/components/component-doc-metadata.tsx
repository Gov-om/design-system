import React from 'react';
import { Markdown } from '@storybook/blocks';

const ComponentDocMetadata = ({
  heading,
  items,
}: {
  heading: string;
  items: {
    name?: string;
    description: string;
    kind?: 'method' | 'field';
    type?: { text: string };
    parameters?: { name: string; description?: string; type?: { text: string } }[];
    return?: { type: { text: string } };
  }[];
}) => (
  <>
    <h3 className="toc-ignore">{heading}</h3>
    <ul>
      {items.map(function (item, i) {
        return (
          <li key={i}>
            {item.name && (
              <code>
                {item.name}
                {item.kind === 'method' ? '()' : ''}
                {item.return ? ': ' + item.return.type.text : item.type ? ': ' + item.type.text : null}
              </code>
            )}
            <div>
              <Markdown>{item.description ? `${item.description}` : ''}</Markdown>
            </div>
            {item.parameters
              ? item.parameters.map(function (param, j) {
                  return (
                    <Markdown key={j}>
                      {'- `' + param.name + (param.type ? ': ' + param.type.text : '') + '`' + (param.description ? ' — ' + param.description : '')}
                    </Markdown>
                  );
                })
              : null}
          </li>
        );
      })}
    </ul>
  </>
);

export default ComponentDocMetadata;
