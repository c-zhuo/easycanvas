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

# loader直接copy过去，用到的依赖在项目中都是有的
cp ./src/loader.js ./build/loader.js

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
    imgPretreat,
    multlineText,
    Transition,
    tick,
    utils,
    extend,
    sprite,
} from './easycanvas.common.js';

export var Sprite = sprite;
export var use = Easycanvas.use;

export {
    Painter,
    ImgLoader,
    imgPretreat,
    multlineText,
    Transition,
    tick,
    utils,
    extend,
    sprite,
};

export default Easycanvas;
" >> ./build/index.common.js

# ./src/components.js里的//过滤掉，node下需要export，浏览器下不需要export（否则挂到window上了）
cat ./src/components.js | sed "s/\/\///g" >> ./build/index.common.js

# for ComponentName in $(ls ./src/components/)
# do
# 	echo ${ComponentName}
# done
