import painter from './painter/index.js';
import tick from './utils/tick.js';
import mirror from './utils/mirror.js';
import utils from './utils/utils.js';
import transition from './utils/transition.js';
import imgLoader from './utils/img-loader.js';
import posCompare from './utils/position-compare.js';
import multlineText from './utils/multline-text';

import classes from './class/main.js';

import chromeDevtoolBridge from './bridge/chrome-devtool.js';

let Easycanvas = {
    painter,
    imgLoader,
    multlineText,
    posCompare,
    transition,
    tick,
    utils,
    mirror,
    class: classes,
    $version: '0.2.0',
};

if (process.env.NODE_ENV !== 'production') {
    if (window.Easycanvas) {
        console.warn('[Easycanvas] You are importing multiple versions of "Easycanvas".');
    }
}

if (process.env.NODE_ENV !== 'production') {
    console.warn('[Easycanvas] You are using the develop version.');
}

window.Easycanvas = Easycanvas;
module.exports = Easycanvas;
