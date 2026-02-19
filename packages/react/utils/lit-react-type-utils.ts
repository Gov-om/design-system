// From https://github.com/lit/lit/blob/935697d47e62ed75e3157423400163a8371c62fc/packages/react/src/create-component.ts - somehow the imported ReactWebComponent does not work properly
import type React from 'react';

type EventName<T extends Event = Event> = string & {
  __eventType: T;
};
type EventNames = Record<string, EventName | string>;
type EventListeners<R extends EventNames> = {
  [K in keyof R]?: R[K] extends EventName ? (e: R[K]['__eventType']) => void : (e: Event) => void;
};

type DistributiveOmit<T, K extends string | number | symbol> = T extends any ? (K extends keyof T ? Omit<T, K> : T) : T;
type PropsWithoutRef<T> = DistributiveOmit<T, 'ref'>;

export type ReactWebComponent<I extends HTMLElement, E extends EventNames = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<ComponentProps<I, E>> & React.RefAttributes<I>
>;
type ElementProps<I> = Partial<Omit<I, keyof HTMLElement>>;
type ComponentProps<I, E extends EventNames = {}> = Omit<React.HTMLAttributes<I>, keyof E | keyof ElementProps<I>> & EventListeners<E> & ElementProps<I>;
