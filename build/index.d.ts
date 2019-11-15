import Painter from './painter/index.js';
import tick from 'utils/tick.js';
import utils from 'utils/utils.js';
import Transition from 'utils/transition.js';
import ImgLoader from 'utils/img-loader.js';
import ImgPretreat from 'utils/img-pretreat.js';
import sprite from './class/sprite';
import extend from './class/extend.js';
import './bridge/chrome-devtool.js';
interface TEasycanvas {
    use: Function;
    Painter: Function;
    ImgLoader: Function;
    ImgPretreat: Function;
    Transition: Function;
    tick: Function;
    utils: object;
    extend: Function;
    class: {
        sprite: Function;
    };
    sprite: typeof Sprite;
    Sprite: typeof Sprite;
    createElement: Function;
}
declare global {
    interface Window {
        Easycanvas?: TEasycanvas;
    }
}
declare const Sprite: typeof sprite;
declare const Easycanvas: TEasycanvas;
export default Easycanvas;
export { Painter, ImgLoader, ImgPretreat, Transition, tick, utils, extend, Sprite, };
