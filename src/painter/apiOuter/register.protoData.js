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
    contextWidth: 0,
    contextHeight: 0,
    events: {
        click: null
    },
    paintList: [],
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

if (process.env.NODE_ENV !== 'production') {
    PROTOS.fpsHandler = function (fps) {
        if (this.maxFps > 0 && fps < this.maxFps * 0.5) {
            console.warn(`Low FPS detected(${fps}), max FPS in settings is ${this.maxFps}.`);
        }
    };
}

module.exports = PROTOS;
