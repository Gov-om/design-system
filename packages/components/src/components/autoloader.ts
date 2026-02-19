// based on https://blog.damato.design/posts/fetching-definitions/
declare const GUP_AUTOLOADER_SOURCE_DIR: string | undefined;

const ANIMATION_NAME = 'undefined-detection';
const animationStyles = `
  :not(:defined) { animation: ${ANIMATION_NAME} }
  @keyframes ${ANIMATION_NAME} { to { visibility: visible } }
`;
const SOURCE_DIR = typeof GUP_AUTOLOADER_SOURCE_DIR !== 'undefined' ? GUP_AUTOLOADER_SOURCE_DIR : 'https://unpkg.com/@govom/components/dist/';

(function registrar() {
  const elements = new Set();

  // Determine the anchor and target to set the resources
  function location(root: HTMLElement | ShadowRoot | null) {
    return root === document.documentElement ? { anchor: document.head, target: document.head.lastChild } : { anchor: root, target: root?.firstChild };
  }

  function observe(root: HTMLElement | ShadowRoot | null) {
    if (!root) return;
    root.addEventListener('animationstart', onAnimationStart as EventListener);
    const styles = Object.assign(document.createElement('style'), {
      type: 'text/css',
      textContent: animationStyles,
    });

    // Here's where we determine where to attach the resources
    const { anchor, target } = location(root);
    anchor?.insertBefore(styles, target as Node);
  }

  function onAnimationStart(event: AnimationEvent) {
    if (event.animationName !== ANIMATION_NAME) return;
    const tagName = (event.target as HTMLElement).tagName.toLowerCase();
    register(tagName);
    window.customElements.whenDefined(tagName).then(() => observe((event.target as HTMLElement).shadowRoot));
  }

  function register(tagName: string) {
    if (elements.has(tagName) || !tagName.startsWith('gup-')) return;
    elements.add(tagName);
    const script = Object.assign(document.createElement('script'), {
      type: 'module',
      defer: true,
      onload: () => script.remove(),
      onerror: () => script.remove(),
      src: new URL(`${tagName}.js`.replace('gup-', ''), SOURCE_DIR),
    });
    document.head.appendChild(script);
  }

  observe(document.documentElement);
})();
