
import Easycanvas, {
    Painter,
    ImgLoader,
    ImgPretreat,
    Transition,
    tick,
    utils,
    extend,
    sprite,
} from './easycanvas.common.js';

export var Sprite = sprite;
export var use = Easycanvas.use = function (pluginHook) {
    var $extendList = Easycanvas.Painter.prototype.$extendList;

    if ($extendList.indexOf(pluginHook) >= 0) return;

    if (pluginHook.onUse) {
        pluginHook.onUse(Easycanvas);
    }

    $extendList.push(pluginHook);
};

Easycanvas.createElement = function createElement(Component) {
    var props = arguments.length > 1 && arguments[1] ? arguments[1] : {};

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    props.children = children || [];
    return new Component(props, Easycanvas);
};

export {
    Painter,
    ImgLoader,
    ImgPretreat,
    Transition,
    tick,
    utils,
    extend,
    sprite,
};

module.exports = Easycanvas;

import Button from './components/Button.js';
import Image from './components/Image.js';
import Scroll from './components/Scroll.js';
import Sequence from './components/Sequence.js';
import Text from './components/Text.js';
import View from './components/View.js';
import Input from './components/Input.js';
import MultiLineText from './components/MultiLineText';
import Draggable from './components/Draggable.js';
import StaticView from './components/StaticView.js';

 export {
     Button,
     Image,
     Scroll,
     Sequence,
     Text,
     View,
     Input,
     MultiLineText,
     Draggable,
     StaticView,
 };
