/** ********** *
 *
 * Sprite Structure
 * {
 *     style: {
 *         left, top, width, height,
 *         zIndex, opacity, scale, rotate, rx, ry,
 *         cutLeft, cutTop, cutWidth, cutHeight, locate, // useless for content.text
 *         fh, fv, fx, fy, // transform
 *         textAlign, fontSize/fontFamily, color, // useless for content.img
 *         visible, // visible false equals inexistence
 *         mirrX, mirrY,
 *     },
 *     content: {
 *         img,
 *         text,
 *         sequence: {} // for animate sprite
 *     },
 *     events: {
 *         eIndex,
 *         click / touchstart / contextmenu / ... / hold / touchout,
 *         through,
 *     },
 *     children: [
 *         { Sprite }, { Sprite } ...
 *     ],
 *     hooks: {
 *         created, mounted, painted, ticked
 *     },
 *
 *     $parent: { Sprite },
 *
 * }
 *
 * ********** **/
interface TStyle {
    left?: any;
    top?: any;
    width?: any;
    height?: any;
    right?: any;
    bottom?: any;
}
declare class sprite {
    private $cache;
    content: any;
    style: any;
    events: any;
    hooks: any;
    $parent: any;
    $canvas: any;
    $style: any;
    $extendList: any[];
    $combine: any;
    children: any[];
    constructor(opt: any);
    add(child: any): any;
    getImage(): any;
    getRect(fromCache: any): TStyle;
    getSelfStyle(key: any): any;
    getStyle(key: any, fromCache?: boolean): TStyle | String | Number | Boolean;
    remove(child: any): void;
    update(opt: any): this;
    getAllChildren(includeSelf: any): this[];
    getAllVisibleChildren(includeSelf: any): this[];
    getOuterRect: any;
    combine: any;
    uncombine: any;
    recalculate: any;
    nextTick: any;
    on: any;
    off: any;
    addEventListener: any;
    removeEventListener: any;
    clear: any;
    trigger: any;
    broadcast: any;
    distribute: any;
    combineAsync(): this;
}
export default sprite;
