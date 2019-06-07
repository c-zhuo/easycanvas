import utils from 'utils/utils.js';
import rectMeet from 'utils/math.rect-meet';
import constants from 'constants';

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
                delete $sprite.$needUpdate[key];
            } else {
                if (key === 'left' || key === 'top' || key === 'opacity' || key === 'scale') {
                    if (cur !== $sprite.$cache[key]) {
                        $sprite.children.forEach(($child) => {
                            $child.$needUpdate[key] = 1;
                        });
                    }
                }
            }
        };

        isNeedUpdate = Object.keys($sprite.$needUpdate).length;
        $sprite.$needUpdate = $needUpdate;
    }

    !force && utils.execFuncs($sprite.hooks.ticked, $sprite, [$sprite.$canvas.$rafTime]);

    // 这两个属性目前没有通过依赖关系来主动更新，暂时用每帧计算，有优化空间
    // 但是未加载成功的图片要一直触发更新操作，因为不知道什么时候加载成功
    let _text = utils.funcOrValue($sprite.content.text, $sprite);
    let _img = utils.funcOrValue($sprite.content.img, $sprite);

    // $render
    if (isNeedUpdate || ($sprite.$cache.text !== _text) || ($sprite.$cache.img !== _img) || ($sprite.content.img && !$sprite.$render._imgWidth)) {
        let _props = $sprite.$render;

        $sprite.$cache.img = _props.img = _img = utils.funcOrValue($sprite.content.img, $sprite);
        $sprite.$cache.text = _props.text = _text

        if (typeof _props.img === 'string') {
            _props.img = $sprite.content.img = $sprite.$canvas.imgLoader(_props.img);
        }

        // img有宽高，但是没有onload时，仍不能绘制
        if (_img && _img._complete === false) _img = false;

        _props.backgroundColor = $sprite.$cache.backgroundColor;
        _props.border = $sprite.$cache.border;
        _props.overflow = $sprite.$cache.overflow;
        _props.overflowX = $sprite.$cache.overflowX;
        _props.overflowY = $sprite.$cache.overflowY;
        _props.locate = $sprite.$cache.locate;
        _props.rotate = $sprite.$cache.rotate;
        _props.scale = $sprite.$cache.scale;
        _props.opacity = $sprite.$cache.opacity;
        _props.$moved = false; // ugly

        _props.childrenInside = (_props.overflow || _props.overflowX || _props.overflowY) && _props.overflow !== 'visible';

        _props.left = $sprite.$cache.left;
        _props.top = $sprite.$cache.top;
        _props.width = $sprite.$cache.width;
        _props.height = $sprite.$cache.height;

        _props._imgWidth = 0;
        _props._imgHeight = 0;

        if (_img && _img.width) {
            _props._imgWidth = _img.width || 0;
            _props._imgHeight = _img.height || 0;
            _props.cutLeft = $sprite.$cache.cutLeft || 0;
            _props.cutTop = $sprite.$cache.cutTop || 0;
            _props.cutWidth = $sprite.$cache.cutWidth || _props._imgWidth;
            _props.cutHeight = $sprite.$cache.cutHeight || _props._imgHeight;

            // 太小的图其实应该不取整，以免“高1像素的图，在sx和sw均为0.5的情况下渲染不出来”
            _props.cutLeft = Math.round(_props.cutLeft);
            _props.cutTop = Math.round(_props.cutTop);
            _props.cutWidth = Math.round(_props.cutWidth);
            _props.cutHeight = Math.round(_props.cutHeight);

            _props.width = _props.width || _props.cutWidth || 0;
            _props.height = _props.height || _props.cutHeight || 0;
        }

        if (_props.locate === 'lt') {
        } else if (_props.locate === 'ld') {
            _props.top -= _props.height;
        } else if (_props.locate === 'rt') {
            _props.left -= _props.width;
        } else if (_props.locate === 'rd') {
            _props.left -= _props.width;
            _props.top -= _props.height;
        } else { // center
            _props.left -= _props.width >> 1;
            _props.top -= _props.height >> 1;
        }

        // 不能干掉，否则combine的时候可能模糊
        _props.left = Math.round(_props.left);
        _props.top = Math.round(_props.top);
        _props.width = Math.round(_props.width);
        _props.height = Math.round(_props.height);

        let settings = _props.settings = {};

        settings.globalAlpha = utils.firstValuable(_props.opacity, 1);
        if (_props.childrenInside) {
            settings.clip = true;
        }

        if ($sprite.$cache.scale !== 1) {
            let scale = _props.scale;
            let scaledParent = getScaledParent($sprite);

            if (scaledParent) {
                let scaleCenterX = scaledParent.$render.left + scaledParent.$render.width / 2;
                let scaleCenterY = scaledParent.$render.top + scaledParent.$render.height / 2;

                _props.left -= (scaleCenterX - _props.left) * (scale - 1);
                _props.top -= (scaleCenterY - _props.top) * (scale - 1);

                _props.width *= scale;
                _props.height *= scale;
            }
        }

        if (_props.fh || _props.fv) {
            _props.fh = _props.fh || 0;
            _props.fv = _props.fv || 0;
            _props.fx = _props.fx || 0;
            _props.fy = _props.fy || 0;
            settings.transform = {
                fh: _props.fh,
                fv: _props.fv,
                fx: -(_props.top + (_props.height >> 1)) * _props.fv + _props.fx,
                fy: -(_props.left + (_props.width >> 1)) * _props.fh + _props.fy,
            };
        }

        if (_props.blend) {
            if (typeof _props.blend === 'string') {
                settings.globalCompositeOperation = _props.blend;
            } else {
                settings.globalCompositeOperation = blend[_props.blend];
            }
        }

        if (_props.backgroundColor) {
            settings.fillRect = _props.backgroundColor;
        }

        if (_props.border) {
            // TODO：导致width扩大，判断是否超出范围时需要调整算法
            settings.line = _props.border;
        }

        if (_props.mirrX) {
            settings.translate = [$canvas.width, 0];
            settings.scale = [-1, 1];
            _props.left = $canvas.width - _props.left - _props.width;
            if (_props.mirrY) {
                settings.translate = [$canvas.width, $canvas.height];
                settings.scale = [-1, -1];
                _props.top = $canvas.height - _props.top - _props.height;
            }
        } else if (_props.mirrY) {
            settings.translate = [0, $canvas.height];
            settings.scale = [1, -1];
            _props.top = $canvas.height - _props.top - _props.height;
        }

        if (_props.rotate) {
            // 定点旋转
            _props.rx = utils.firstValuable(utils.funcOrValue($sprite.$cache.rx, $sprite), _props.left + 0.5 * _props.width);
            _props.ry = utils.firstValuable(utils.funcOrValue($sprite.$cache.ry, $sprite), _props.top + 0.5 * _props.height);

            let transX = utils.firstValuable(_props.rx, _props.left + 0.5 * _props.width);
            let transY = utils.firstValuable(_props.ry, _props.top + 0.5 * _props.height);

            settings.beforeRotate = [transX, transY];
            settings.rotate = -_props.rotate * Math.PI / 180;
            settings.rotate = Number(settings.rotate.toFixed(4));
            settings.afterRotate = [-transX, -transY];
        }

        _props.$insight = rectMeet(_props.left, _props.top, _props.width, _props.height, 0, 0, $sprite.$canvas.width, $sprite.$canvas.height, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], _props.rotate);
    }

    $sprite.children.forEach(($child) => {
        $child.recalculate(force);
    });
};
