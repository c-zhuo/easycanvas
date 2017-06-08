import painter from './utils/painter.js';
import tick from './utils/tick.js';
import mirror from './utils/mirror.js';
import imgLoader from './utils/img-loader.js';
import random from './utils/random.js';
import utils from './utils/utils.js';
import transition from './utils/transition.js';
import gif2canvas from './utils/gif2canvas.js';
import posCompare from './utils/position-compare.js';

var EasyCanvas = {
    painter,
    imgLoader,
    gif2canvas,
    posCompare,
    random,
    transition,
    tick,
    utils,
    mirror,
};

window.EasyCanvas = EasyCanvas;
module.exports = EasyCanvas;