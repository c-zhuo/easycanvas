/** ********** *
 *
 * Inner apis of an easycanvas instance
 * - Used for Easycanvas.js and the outsides.
 * - Will be added to Easycanvas instance's prototype.
 *
 * ********** **/

import remove from './apiOuter/remove.js';
import start from './apiOuter/start.js';
import paint from './apiOuter/paint.js';
import clear from './apiOuter/clear.js';
import pause from './apiOuter/pause.js';
import nextTick from './apiOuter/nextTick.js';
import register from './apiOuter/register.js';
import setFpsHandler from './apiOuter/setFpsHandler.js';
import setMaxFps from './apiOuter/setMaxFps.js';
import skeleton from './apiOuter/skeleton.js';

import sprite from 'class/sprite.js';

let apiOuter = {
    start,
    paint,
    add: sprite.prototype.add,
    remove,
    register,
    clear,
    setFpsHandler,
    setMaxFps,
    pause,
    on: sprite.prototype.on,
    off: sprite.prototype.off,
    addEventListener: sprite.prototype.addEventListener,
    removeEventListener: sprite.prototype.removeEventListener,
    off: sprite.prototype.off,
    trigger: sprite.prototype.trigger,
    broadcast: sprite.prototype.broadcast,
    nextTick,
    getAllChildren: sprite.prototype.getAllChildren,
};

if (process.env.NODE_ENV !== 'production') {
    apiOuter.skeleton = skeleton;
}

module.exports = apiOuter;
