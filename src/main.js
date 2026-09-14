/**
 * Everything migrated out of www/app.js lives here.
 *
 * Each module registers itself on window.TQ and app.js renders an empty div
 * that calls the mount function — the seam the Reference tab already used.
 * Bundled to www/modules.js by build.js.
 */
import { install as installTheme } from './theme/tokens.js';
import { install as installSimulator } from './simulator/ui.js';
import { install as installVault } from './vault/mount.js';
import { install as installSeal } from './sanctum/seal.js';
import { install as installHatchery } from './pet/hatchery.js';
import { install as installScanner } from './scan/ui.js';
import { install as installLiveScanner } from './scan/live.js';
import { install as installOrbs } from './sanctum/orbs.js';
import { install as installPetLife } from './pet/life.js';
import { install as installSanctumBackdrop } from './sanctum/backdrop.js';

installTheme();
installSimulator();
installVault();
installSeal();
installHatchery();
installScanner();
installLiveScanner();
installOrbs();
installSanctumBackdrop();
installPetLife();
