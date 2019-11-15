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
    $lastPaintTime: 0, // 只有当maxFps位于1～59时才不为0
    $pausing: false,
    $freezing: false,

    name: '',
    fps: 0,
    lastFps: 0,
    fpsCalculateTime: 0,
    fpsHandler: null,
    width: 0,
    height: 0,
    events: {
        click: null,
    },
    children: [],
    eHoldingFlag: false,
    eLastMouseHover: null,

    maxFps: -1,
};

if (process.env.NODE_ENV !== 'production') {
    PROTOS.$flags = {
        // dragging: false
    }
}

export default PROTOS;
