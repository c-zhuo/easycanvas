/** ********** *
 *
 * Create an Easycanvas instance on current dom
 * - Start the 'hold' event judging interval(may includes a memory waste after destroyed).
 *
 * ********** **/

const extend = function (opt) {
    this.$extendList.forEach((plugin) => {
        if (plugin.onCreate) {
            plugin.onCreate.call(this, opt);
        }
    });
};

module.exports = function (dom, option) {
    if (process.env.NODE_ENV !== 'production') {
        this.fpsHandler = this.fpsHandler || function (fps) {
            if (this.maxFps > 0 && fps < this.maxFps - 5 && fps < 40) {
                console.warn(`[Easycanvas] Low FPS detected (${fps}/${this.maxFps}).`);
            }
        };
    }

    let _option = option || {};

    dom = this.$dom = dom || this.$dom;

    if (process.env.NODE_ENV !== 'production') {
        if (!dom) {
            console.error('[Easycanvas] Not found <canvas> element in "register" function.');
        }
    }

    // 修复iOS下click时闪烁
    // https://stackoverflow.com/questions/9526719/ipad-canvas-flickers-when-tapped
    // dom.style['webkitTapHighlightColor'] = 'rgba(0,0,0,0);';

    for (var i in _option) {
        this[i] = _option[i];
    }

    this.name = _option.name || dom.id || (dom.classList && dom.classList[0]) || 'Unnamed';
    this.$inBrowser = typeof window !== 'undefined';

    if (_option.fullScreen && typeof document !== 'undefined') {
        dom.width = dom.style.width = document.body.clientWidth || document.documentElement.clientWidth;
        dom.height = dom.style.height = document.body.clientHeight || document.documentElement.clientHeight;
        if (_option.dpr) {
            dom.width *= _option.dpr;
            dom.height *= _option.dpr;
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        if (
            (_option.width && dom.attributes.width && _option.width !== dom.width) ||
            (_option.height && dom.attributes.height && _option.height !== dom.height)
        ) {
            console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
        }
    }

    dom.width = this.width = this.width || _option.width || dom.width;
    dom.height = this.height = this.height || _option.height || dom.height;

    if (process.env.NODE_ENV !== 'production') {
        this.$plugin.register(this);
    }

    this.events = _option.events || {};

    this.hooks = _option.hooks || {};

    if (this.$inBrowser) {
        let eventList = ['contextmenu', 'mousewheel', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove'];
        eventList.forEach((e) => {
            dom.addEventListener(e, this.$eventHandler.bind(this));
        });
    }

    if (process.env.NODE_ENV !== 'production') {
        if (this.$paintContext) {
            console.error(`[Easycanvas] Current instance is already registered.`);
        }
    }

    extend.call(this, _option);

    this.$paintContext = this.$paintContext || dom.getContext('2d');

    return this;
};
