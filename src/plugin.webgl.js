/** ********** *
 *
 * Support webgl rendering
 * - Usage: set {webgl: true} in config on registering your canvas instance.
 *
 * ********** **/

// import onEvent from './plugin-webgl/webgl-init-onEvent.js';
import onUse from './plugin-webgl/webgl-init-onUse.js';
import onCreate from './plugin-webgl/webgl-init-onCreate.js';
import onPaint from './plugin-webgl/webgl-init-onPaint.js';
import onRender from './plugin-webgl/webgl-init-onRender.js';

const inBrowser = typeof window !== 'undefined';

const plugin = {
    onCreate,
    onPaint,
    onRender,
    onUse,
    // onEvent,
};

if (inBrowser && window.Easycanvas) {
    Easycanvas.use(plugin);
} else {
    module.exports = plugin;
}
