import utils from 'utils/utils.js';
import rectMeet from 'utils/math.rect-meet';
import constants from 'constants';

const blend = utils.blend;

const getScaledParent = function ($sprite) {
    if (!$sprite) return;

    let scale = utils.funcOrValue($sprite.$style.scale, $sprite);

    if (scale !== 1) return $sprite;
    return getScaledParent($sprite.$parent);
};

// 后面可能要拆成计算$cache、触发钩子、生成渲染对象$render，便于将部分逻辑复用于combine等场景
module.exports = function (force) {
    let $sprite = this;

    !force && utils.execFuncs($sprite.hooks.beforeTick, $sprite, [$sprite.$canvas.$rafTime]);

    if (utils.funcOrValue($sprite.style.visible, $sprite) === false) {
        $sprite.$cache.visible = false;

        // 有可能在上面的beforeTick里调用了remove，这样就没有$canvas属性了
        if (!$sprite.$canvas) return;

        // TODO：execFuncs的调用加判断，没有钩子时，没必要构造第三个数组参数，节约性能
        !force && utils.execFuncs($sprite.hooks.ticked, $sprite, [$sprite.$canvas.$rafTime]);
        return;
    }
    $sprite.$cache.visible = true;

    if (force) {
        $sprite.$cache = {};
        constants.styles.forEach((key) => {
            $sprite.$needUpdate[key] = 1;
            $sprite.$cache[key] = undefined;
        });
    }

    let isNeedUpdate = Object.keys($sprite.$needUpdate).length;

    $sprite.$lastUpdate = $sprite.$needUpdate;
    if (isNeedUpdate) {
        let $needUpdate = {};

        for (let key in $sprite.$needUpdate) {
            let cur = $sprite.$cache[key];

            if (typeof $sprite.$style[key] === 'function') {
                $needUpdate[key] = 1;
                $sprite.$cache[key] = $sprite.$style[key].call($sprite);
            } else if (typeof $sprite.$style[key] === 'string' && $sprite.$style[key].indexOf('%') > -1) {
                // 百分比的样式相对于parent计算
                let parentWidth = $sprite.$parent && $sprite.$parent.$cache.width || $sprite.$canvas.width || 0;
                let parentHeight = $sprite.$parent && $sprite.$parent.$cache.width || $sprite.$canvas.width || 0;

                if (key === 'left' || key === 'width') {
                    $sprite.$cache[key] = Math.floor(parseFloat($sprite.$style[key]) / 100 * parentWidth);
                } else if (key === 'top' || key === 'height') {
                    $sprite.$cache[key] = Math.floor(parseFloat($sprite.$style[key]) / 100 * parentHeight);
                } else if (key === 'fontSize') {
                    $sprite.$cache[key] = Math.floor(parseFloat($sprite.$style[key]) / 100 * $sprite.$canvas.width);
                }
            } else {
                $sprite.$cache[key] = $sprite.$style[key];
            }

            // $sprite.$cache[key] = utils.funcOrValue($sprite.$style[key], $sprite);

            if (key === 'left' || key === 'top') {
                let parent = $sprite.$parent;
                if (parent) {
                    $sprite.$cache[key] += parent.$cache[key] || 0;
                }
            } else if (key === 'opacity' || key === 'scale') {
                let parent = $sprite.$parent;
                if (parent) {
                    $sprite.$cache[key] *= utils.firstValuable(parent.$cache[key], 1);
                }
            }

            if (cur === $sprite.$cache[key]) {
                // 一些属性可能本次计算和上次的结果相同，例如return固定值的一些function，不要触发刷新
                delete $sprite.$needUpdate[key];
            } else {
                if (key === 'left' || key === 'top' || key === 'opacity' || key === 'scale') {
                    if (cur !== $sprite.$cache[key]) {
                        // 继承的属性，parent变化时，child也需要update
                        $sprite.children.forEach(($child) => {
                            $child.$needUpdate[key] = 1;
                        });
                    }
                }
            }
        };

        // 重新得出是否需要更新
        isNeedUpdate = Object.keys($sprite.$needUpdate).length;

        // 一些属性是function的，提前标记出来，为下一次循环准备
        $sprite.$needUpdate = $needUpdate;
    }

    !force && utils.execFuncs($sprite.hooks.ticked, $sprite, [$sprite.$canvas.$rafTime]);

    // TODO:这两个属性目前没有通过依赖关系来主动更新，暂时用每帧计算，有优化空间
    // 但是未加载成功的图片要一直触发更新操作，因为不知道什么时候加载成功
    let _text = utils.funcOrValue($sprite.content.text, $sprite);
    let _img = utils.funcOrValue($sprite.content.img, $sprite);

    // $render
    if (isNeedUpdate || ($sprite.$cache.text !== _text) || ($sprite.$cache.img !== _img) || ($sprite.content.img && !$sprite.$render._imgWidth)) {
        let $render = $sprite.$render;

        $sprite.$cache.img = $render.img = _img;
        $sprite.$cache.text = $render.text = _text

        if (typeof $render.img === 'string') {
            $render.img = $sprite.content.img = $sprite.$canvas.imgLoader($render.img);
        }

        // img有宽高，但是没有onload时，仍不能绘制
        if (_img && _img._complete === false) _img = false;

        // 并不是所有属性都要现在挂在$render里，比如color、fontSize就是到perPaint阶段再挂的
        // 可能需要都搬过来，因为这里是每次更新的时候运行一次，perPaint是每次都运行
        $render.backgroundColor = $sprite.$cache.backgroundColor;
        $render.borderWidth = $sprite.$cache.borderWidth;
        $render.borderColor = $sprite.$cache.borderColor;
        $render.overflow = $sprite.$cache.overflow;
        $render.overflowX = $sprite.$cache.overflowX;
        $render.overflowY = $sprite.$cache.overflowY;
        $render.locate = $sprite.$cache.locate;
        $render.rotate = $sprite.$cache.rotate;
        $render.scale = $sprite.$cache.scale;
        $render.opacity = $sprite.$cache.opacity;
        $render.$moved = false; // ugly

        $render.childrenInside = ($render.overflow || $render.overflowX || $render.overflowY) && $render.overflow !== 'visible';

        $render.left = $sprite.$cache.left;
        $render.top = $sprite.$cache.top;
        $render.width = $sprite.$cache.width;
        $render.height = $sprite.$cache.height;

        $render._imgWidth = 0;
        $render._imgHeight = 0;

        if (_img && _img.width) {
            $render._imgWidth = _img.width || 0;
            $render._imgHeight = _img.height || 0;
            $render.cutLeft = $sprite.$cache.cutLeft || 0;
            $render.cutTop = $sprite.$cache.cutTop || 0;
            $render.cutWidth = $sprite.$cache.cutWidth || $render._imgWidth;
            $render.cutHeight = $sprite.$cache.cutHeight || $render._imgHeight;

            // 太小的图其实应该不取整，以免“高1像素的图，在cutLeft和cutWidth均为0.5的情况下渲染不出来”
            $render.cutLeft = Math.round($render.cutLeft);
            $render.cutTop = Math.round($render.cutTop);
            $render.cutWidth = Math.round($render.cutWidth);
            $render.cutHeight = Math.round($render.cutHeight);

            $render.width = $render.width || $render.cutWidth || 0;
            $render.height = $render.height || $render.cutHeight || 0;
        }

        if ($render.locate === 'lt') {
        } else if ($render.locate === 'ld') {
            $render.top -= $render.height;
        } else if ($render.locate === 'rt') {
            $render.left -= $render.width;
        } else if ($render.locate === 'rd') {
            $render.left -= $render.width;
            $render.top -= $render.height;
        } else { // center
            $render.left -= $render.width >> 1;
            $render.top -= $render.height >> 1;
        }

        // 不能干掉，否则combine的时候可能模糊
        $render.left = Math.round($render.left);
        $render.top = Math.round($render.top);
        $render.width = Math.round($render.width);
        $render.height = Math.round($render.height);

        let settings = $render.settings = {};

        settings.globalAlpha = utils.firstValuable($render.opacity, 1);
        if ($render.childrenInside) {
            settings.clip = true;
        }

        if ($sprite.$cache.scale !== 1) {
            let scale = $render.scale;
            let scaledParent = getScaledParent($sprite);

            if (scaledParent) {
                let scaleCenterX = scaledParent.$render.left + scaledParent.$render.width / 2;
                let scaleCenterY = scaledParent.$render.top + scaledParent.$render.height / 2;

                $render.left -= (scaleCenterX - $render.left) * (scale - 1);
                $render.top -= (scaleCenterY - $render.top) * (scale - 1);

                $render.width *= scale;
                $render.height *= scale;
            }
        }

        if ($render.fh || $render.fv) {
            $render.fh = $render.fh || 0;
            $render.fv = $render.fv || 0;
            $render.fx = $render.fx || 0;
            $render.fy = $render.fy || 0;
            settings.transform = {
                fh: $render.fh,
                fv: $render.fv,
                fx: -($render.top + ($render.height >> 1)) * $render.fv + $render.fx,
                fy: -($render.left + ($render.width >> 1)) * $render.fh + $render.fy,
            };
        }

        if ($render.blend) {
            if (typeof $render.blend === 'string') {
                settings.globalCompositeOperation = $render.blend;
            } else {
                settings.globalCompositeOperation = blend[$render.blend];
            }
        }

        if ($render.backgroundColor) {
            settings.fillRect = $render.backgroundColor;
        }

        if ($render.borderWidth) {
            settings.line = $render.borderWidth;
        }

        if ($render.mirrX) {
            settings.translate = [$canvas.width, 0];
            settings.scale = [-1, 1];
            $render.left = $canvas.width - $render.left - $render.width;
            if ($render.mirrY) {
                settings.translate = [$canvas.width, $canvas.height];
                settings.scale = [-1, -1];
                $render.top = $canvas.height - $render.top - $render.height;
            }
        } else if ($render.mirrY) {
            settings.translate = [0, $canvas.height];
            settings.scale = [1, -1];
            $render.top = $canvas.height - $render.top - $render.height;
        }

        if ($render.rotate) {
            // 定点旋转
            $render.rx = utils.firstValuable(utils.funcOrValue($sprite.$cache.rotateOriginLeft, $sprite), $render.left + 0.5 * $render.width);
            $render.ry = utils.firstValuable(utils.funcOrValue($sprite.$cache.rotateOriginTop, $sprite), $render.top + 0.5 * $render.height);

            let transX = utils.firstValuable($render.rx, $render.left + 0.5 * $render.width);
            let transY = utils.firstValuable($render.ry, $render.top + 0.5 * $render.height);

            settings.beforeRotate = [transX, transY];
            settings.rotate = -$render.rotate * Math.PI / 180;
            settings.rotate = Number(settings.rotate.toFixed(4));
            settings.afterRotate = [-transX, -transY];
        }

        if ($sprite.$canvas) {
            if (!$render.borderWidth) {
                $render.$insight = rectMeet($render.left, $render.top, $render.width, $render.height, 0, 0, $sprite.$canvas.width, $sprite.$canvas.height, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], $render.rotate);
            } else {
                $render.$insight = rectMeet($render.left - $render.borderWidth, $render.top - $render.borderWidth, $render.width + $render.borderWidth * 2, $render.height + $render.borderWidth * 2, 0, 0, $sprite.$canvas.width, $sprite.$canvas.height, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], $render.rotate);
            }
        }
    }

    $sprite.children.forEach(($child) => {
        $child.recalculate(force);
    });
};
