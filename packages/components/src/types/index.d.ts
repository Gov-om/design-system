/// <reference types="vite/client" />

declare module '*.css?inline' {
  import { CSSResultGroup } from 'lit';

  const content: CSSResultGroup;
  export default content;
}
