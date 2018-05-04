/** ********** *
 *
 * Inner apis of an easycanvas instance
 * - Used for Easycanvas.js only normally.
 * - Will be added to Easycanvas instance's prototype.
 *
 * ********** **/

import $perPaint from './apiInner/perPaint.js';
import $render from './apiInner/render.js';
import $eventHandler from './apiInner/eventHandler.js';
import $bindDrag from './apiInner/bindDrag.js';
import $rAFer from './apiInner/rAFer.js';

import $apiPlugin from './apiPlugin/apiPlugin.js';

import utils from 'utils/utils.js';

let apiInner = {
    $render,
    $eventHandler,
    $perPaint,
    $bindDrag,
    $rAFer,
};

if (process.env.NODE_ENV !== 'production') {
    apiInner.$plugin = $apiPlugin();
}

module.exports = apiInner;
