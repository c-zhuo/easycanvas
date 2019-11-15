#!/bin/bash
set -e

# 删除之前构建的文件
EASYCANVASFILE=./build/easycanvas.common.js
if test -f "$EASYCANVASFILE"; then
    rm ${EASYCANVASFILE}
fi

# 删除之前构建的文件
INDEXFILE=./build/index.common.js
if test -f "$INDEXFILE"; then
    rm ${INDEXFILE}
fi

# 删除之前构建的文件
LOADERFILE=./build/loader.js
if test -f "$LOADERFILE"; then
    rm ${LOADERFILE}
fi

# 增加动态选择common的入口
echo "if (process.env.NODE_ENV === 'production') {
  module.exports = require('./easycanvas.common.prod.js')
} else {
  module.exports = require('./easycanvas.common.dev.js')
}" >> ./build/easycanvas.common.js

echo "
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
    var \$extendList = Easycanvas.Painter.prototype.\$extendList;

    if (\$extendList.indexOf(pluginHook) >= 0) return;

    if (pluginHook.onUse) {
        pluginHook.onUse(Easycanvas);
    }

    \$extendList.push(pluginHook);
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
" >> ./build/index.common.js

# ./src/components.js里的//过滤掉，node下需要export，浏览器下不需要export（否则挂到window上了）
cat ./src/components.js | sed "s/\/\///g" >> ./build/index.common.js

# for ComponentName in $(ls ./src/components/)
# do
# 	echo ${ComponentName}
# done
