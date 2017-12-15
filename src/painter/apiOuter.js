/** ********** *
 *
 * Inner apis of an easycanvas instance
 * - Used for Easycanvas.js and the outsides.
 * - Will be added to Easycanvas instance's prototype.
 *
 * ********** **/

import add from './apiOuter/add.js';
import remove from './apiOuter/remove.js';
import start from './apiOuter/start.js';
import paint from './apiOuter/paint.js';
import clear from './apiOuter/clear.js';
import pause from './apiOuter/pause.js';
import on from './apiOuter/on.js';
import off from './apiOuter/off.js';
import trigger from './apiOuter/trigger.js';
import broadcast from './apiOuter/broadcast.js';
import nextTick from './apiOuter/nextTick.js';
import register from './apiOuter/register.js';
import setFpsHandler from './apiOuter/setFpsHandler.js';
import setMaxFps from './apiOuter/setMaxFps.js';

let apiOuter = {
    start,
    paint,
    add,
    remove,
    register,
    clear,
    setFpsHandler,
    setMaxFps,
    pause,
    on,
    off,
    trigger,
    broadcast,
    nextTick,
};

module.exports = apiOuter;
