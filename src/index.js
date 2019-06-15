import constants from 'constants';

import Painter from './painter/index.js';
import tick from 'utils/tick.js';
// import mirror from 'utils/mirror.js';
import utils from 'utils/utils.js';
import Transition from 'utils/transition.js';
import ImgLoader from 'utils/img-loader.js';
import imgPretreat from 'utils/img-pretreat.js';
import multlineText from 'utils/multline-text';
import sprite from './class/sprite.js';
import extend from './class/extend.js';

import './bridge/chrome-devtool.js';

// const $version = constants.version;

const Sprite = sprite;

const Easycanvas = {
    Painter,
    ImgLoader,
    imgPretreat,
    multlineText,
    Transition,
    tick,
    utils,
    extend,
    // mirror,
    // 兼容老版本写法“new Easycanvas.class.sprite(opt);”
    class: {
        sprite: sprite,
    },
    sprite,
    Sprite,
};

const use = Easycanvas.use = function (pluginHook) {
    let $extendList = Easycanvas.Painter.prototype.$extendList;

    if ($extendList.indexOf(pluginHook) >= 0) return;

    if (pluginHook.onUse) {
        pluginHook.onUse(Easycanvas);
    }

    $extendList.push(pluginHook);
};

const inBrowser = typeof window !== 'undefined';

if (inBrowser) {
// if (process.env.UMD === 'true') {
    if (window.Easycanvas) {
        console.warn('[Easycanvas] already loaded, it should be loaded only once.');
    } else {
        if (process.env.NODE_ENV !== 'production') {
            setTimeout(() => {
                console.log(`%c Easycanvas %c You are using the develop version ${constants.version} %c`,
                    "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff",
                    "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff",
                    "background:transparent");
            }, 500);
        }
        window.Easycanvas = Easycanvas;
    }
}

export default Easycanvas;

export {
    Painter,
    ImgLoader,
    imgPretreat,
    multlineText,
    Transition,
    tick,
    utils,
    extend,
    Sprite,
};
