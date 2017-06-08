import painter from './utils/painter.js';
import tick from './utils/tick.js';
import mirror from './utils/mirror.js';
import utils from './utils/utils.js';
import transition from './utils/transition.js';
import imgLoader from './utils/img-loader.js';
import posCompare from './utils/position-compare.js';

var EasyCanvas = {
    painter,
    imgLoader,
    posCompare,
    transition,
    tick,
    utils,
    mirror,
};

window.EasyCanvas = EasyCanvas;
module.exports = EasyCanvas;