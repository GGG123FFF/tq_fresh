/**
 * Everything migrated out of www/app.js lives here.
 *
 * Each module registers itself on window.TQ and app.js renders an empty div
 * that calls the mount function — the seam the Reference tab already used.
 * Bundled to www/modules.js by build.js.
 */
import { install as installSimulator } from './simulator/ui.js';
import { install as installVault } from './vault/mount.js';

installSimulator();
installVault();
