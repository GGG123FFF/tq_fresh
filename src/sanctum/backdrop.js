/**
 * Sanctum backdrop: a slow drift of motes behind the panel, so the Sanctum
 * reads as somewhere you've gone rather than a modal over the life tracker.
 *
 * Static SVG as a data URI — a canvas here would fight the backdrop-filter
 * blur the panel already uses, and cost battery for something you look at for
 * thirty seconds.
 */
function motes() {
  const g = '#c9a961';
  const out = [];
  // Deterministic, so it doesn't reshuffle on every render.
  let seed = 7;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  for (let i = 0; i < 46; i++) {
    const x = (rnd() * 400).toFixed(1);
    const y = (rnd() * 700).toFixed(1);
    const r = (0.6 + rnd() * 1.8).toFixed(2);
    const o = (0.12 + rnd() * 0.4).toFixed(2);
    out.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${g}" opacity="${o}"/>`);
  }
  return out.join('');
}

export function sanctumBackdropSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 700" width="400" height="700" preserveAspectRatio="xMidYMin slice">
  <defs>
    <radialGradient id="halo" cx="50%" cy="8%" r="62%">
      <stop offset="0%" stop-color="#c9a961" stop-opacity="0.13"/>
      <stop offset="100%" stop-color="#c9a961" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="700" fill="url(#halo)"/>
  <g opacity="0.55">
    <path d="M40,660 L40,300 A160,160 0 0 1 360,300 L360,660"
          fill="none" stroke="#c9a961" stroke-width="1" opacity="0.10"/>
    <path d="M78,660 L78,314 A122,122 0 0 1 322,314 L322,660"
          fill="none" stroke="#c9a961" stroke-width="0.7" opacity="0.07"/>
  </g>
  ${motes()}
</svg>`;
}

export function sanctumBackdropUrl() {
  return `url("data:image/svg+xml,${encodeURIComponent(sanctumBackdropSvg())}")`;
}

export function install() {
  window.TQ = window.TQ || {};
  window.TQ.sanctumBackdrop = sanctumBackdropUrl;
}
