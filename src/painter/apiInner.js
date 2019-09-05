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

import $apiPlugin from './apiPlugin/apiPlugin.js';

let apiInner = {
    $render,
    $eventHandler,
    $perPaint,
};

if (process.env.NODE_ENV !== 'production') {
    apiInner.$plugin = $apiPlugin();
}

module.exports = apiInner;
