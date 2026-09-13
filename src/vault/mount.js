/** Registers window.TQ.mountVault — the seam app.js renders into. */
import { CommanderVault } from './vault.js';

export function install() {
  const roots = new WeakMap();
  window.TQ = window.TQ || {};
  window.TQ.CommanderVault = CommanderVault;
  window.TQ.mountVault = function (el) {
    if (!el || roots.has(el)) return;
    const React = window.React;
    const ReactDOM = window.ReactDOM;
    if (!React || !ReactDOM) return;
    const root = ReactDOM.createRoot
      ? ReactDOM.createRoot(el)
      : { render: (node) => ReactDOM.render(node, el) };
    roots.set(el, root);
    root.render(React.createElement(CommanderVault, null));
  };
}
