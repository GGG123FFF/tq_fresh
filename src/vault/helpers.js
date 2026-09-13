/**
 * The two Babel helpers the extracted Vault code still uses.
 *
 * Both have native equivalents (`{...a, ...b}` and `[...a]`), so these should
 * disappear as the Vault's internals get rewritten. Kept for now so the
 * extraction itself is behaviour-identical and reviewable.
 */
export function _objectSpread(target, ...sources) {
  for (const s of sources) Object.assign(target, s || {});
  return target;
}

export function _toConsumableArray(r) {
  return Array.isArray(r) ? r.slice() : Array.from(r);
}
