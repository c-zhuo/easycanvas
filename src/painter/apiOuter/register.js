/** ********** *
 *
 * Create an Easycanvas instance on current dom
 * - Start the 'hold' event judging interval(may includes a memory waste after destroyed).
 *
 * ********** **/

import $protoData from './register.protoData.js';
import eventScroll from '../apiInner/eventHandler.scroll.js';

module.exports = function (dom, option) {
    for (let i in $protoData) {
        // this[i] = JSON.parse(JSON.stringify($protoData[i]));
        this[i] = $protoData[i];
    }

    let _option = option || {};

    this.$dom = dom;
    this.$paintContext = dom.getContext('2d');
    this.width = this.contextWidth = _option.width || dom.width;
    this.height = this.contextHeight = _option.height || dom.height;

    if (process.env.NODE_ENV !== 'production') {
        this.$plugin.hook.register(this);
    }

    this.events = _option.events || {};


    // this.scroll = _option.scroll || {};
    this.hooks = _option.hooks || {};

    let eventList = ['contextmenu', 'mousewheel', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove'];
    eventList.forEach((e) => {
        dom.addEventListener(e, this.$eventHandler.bind(this));
    });

    eventScroll.tick();
    // this.$bindScroll.bind(_this);

    setInterval(() => {
        if (this.eHoldingFlag) {
            let e = this.eHoldingFlag;
            this.$eventHandler.call(this, {
                layerX: e.layerX,
                layerY: e.layerY,
                screenX: e.screenX || e.layerX,
                screenY: e.screenY || e.layerY,
                type: 'hold',
            });
        }
    }, 40); // TODO
};
