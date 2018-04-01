/** ********** *
 *
 * Prototype of canvas instance
 * - In develop mode, fps will throw warnings in low performance.
 *
 * ********** **/

const PROTOS = {
    $dom: null,
    $paintContext: null,
    $nextTickTime: 0,
    $lastPaintTime: 0,
    $pausing: false,
    $freezing: false,

    fps: 0,
    lastFps: 0,
    fpsCalculateTime: 0,
    fpsHandler: null,
    width: 0,
    height: 0,
    events: {
        click: null
    },
    children: [],
    eHoldingFlag: false,
    eLastMouseHover: null,

    maxFps: -1,

    /* optimise */
    // optimiser: {
    //     blockSize: 100,
    //     cacheMap: {},
    // },

    /* scroll */
    scroll: {
        scrollable: false,
        scrollY: 0,
        minScrollY: undefined,
        maxScrollY: undefined,
    },

    /* flags */
    $flags: {
        dragging: false
    },
};

module.exports = PROTOS;
