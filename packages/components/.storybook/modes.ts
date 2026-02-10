// see https://www.chromatic.com/docs/modes/#2-define-modes
import breakpoints from '../src/styles/preprocessed/breakpoints.json';

type Modes = {
  [key: string]: { viewport: string };
};

const modes: Modes = breakpoints.reduce((acc: Modes, { name }) => {
  acc[name] = {
    viewport: name,
  };
  return acc;
}, {});

export const allModes: Modes = modes;
