/** ********** *
 *
 * CORE painting function
 * - Calculates props of every sprite in children, then puts to $children.
 * - Includes optimization.
 * - NOT connecting to canvas's prototype functions.
 *
 * ********** **/

import utils from 'utils/utils.js';
import constants from 'constants';
// import getComputedStyle from './perPaint.getComputedStyle.js';
import cutOutside from './perPaint.cutOutside.js';
import deliverChildren from './perPaint.deliverChildren.js';
import rectMeet from 'utils/math.rect-meet';
// import img2base64 from 'utils/img2base64.js';

const blend = utils.blend;

const isChineseChar = function (temp) {
    let re = /[^\u4e00-\u9fa5]/;
    return !re.test(temp);
};

const extend = function () {
    this.$canvas.$extendList.forEach((plugin) => {
        if (plugin.onPaint) {
            plugin.onPaint.call(this);
        }
    });
};

const getScaledParent = function ($sprite) {
    if (!$sprite || !$sprite.style) return;

    let scale = utils.funcOrValue($sprite.style.scale, $sprite);

    if (scale !== 1) return $sprite;
    return getScaledParent($sprite.$parent);
};

module.exports = function ($sprite, index) {
    $sprite.$rendered = false;

    utils.execFuncs($sprite.hooks.beforeTick, $sprite, $sprite.$tickedTimes);

    if (utils.funcOrValue($sprite.style.visible, $sprite) === false) {
        utils.execFuncs($sprite.hooks.ticked, $sprite, ++$sprite.$tickedTimes);
        return;
    }

    let $canvas = this;

    extend.call($sprite);

    // getComputedStyle(i, $canvas);

    let _props = $sprite.$props = {};

    _props.img = utils.funcOrValue($sprite.content.img, $sprite);
    _props.text = utils.funcOrValue($sprite.content.text, $sprite);

    if (typeof _props.img === 'string') {
        _props.img = $sprite.content.img = $canvas.imgLoader(_props.img);
    }

    let _text = _props.text;
    let _img = _props.img;

    _props.tx = utils.funcOrValue($sprite.style.tx, $sprite) || 0;
    if ($sprite.$parent) {
        _props.tx += utils.firstValuable($sprite.$parent.$cache.tx, 0);
    }
    $sprite.$cache.tx = _props.tx;

    _props.ty = utils.funcOrValue($sprite.style.ty, $sprite) || 0;
    if ($sprite.$parent) {
        _props.ty += utils.firstValuable($sprite.$parent.$cache.ty, 0);
    }
    $sprite.$cache.ty = _props.ty;

    // 这块写的比较恶心，原因是forEach等写法的性能开销较大(长列表时每帧能浪费一倍的性能)
    // 一个一个赋值虽然代码烦琐，但是性能最快
    // 后面考虑构建时处理或者初始化时批量动态生成函数

    let _imgWidth = 0;
    let _imgHeight = 0;

    if (_img) {
        _imgWidth = _img.width || 0;
        _imgHeight = _img.height || 0;
        _props.sx = utils.funcOrValue($sprite.style.sx, $sprite) || 0;
        _props.sy = utils.funcOrValue($sprite.style.sy, $sprite) || 0;
        _props.sw = utils.funcOrValue($sprite.style.sw, $sprite) || _imgWidth;
        _props.sh = utils.funcOrValue($sprite.style.sh, $sprite) || _imgHeight;
    }

    _props.tw = utils.funcOrValue($sprite.style.tw, $sprite) || _props.sw || 0;
    _props.th = utils.funcOrValue($sprite.style.th, $sprite) || _props.sh || 0;
    _props.locate = utils.funcOrValue($sprite.style.locate, $sprite); // undefined和'center'效果一样;
    _props.rotate = utils.funcOrValue($sprite.style.rotate, $sprite) || 0;

    _props.overflow = utils.funcOrValue($sprite.style.overflow, $sprite) || 0;
    _props.overflowX = utils.funcOrValue($sprite.style.overflowX, $sprite) || 0;
    _props.overflowY = utils.funcOrValue($sprite.style.overflowY, $sprite) || 0;

    _props.scale = utils.funcOrValue($sprite.style.scale, $sprite) || 1;
    if ($sprite.$parent) {
        _props.scale *= utils.firstValuable($sprite.$parent.$cache.scale, 1);
    }
    $sprite.$cache.scale = _props.scale;

    let _children = $sprite.children;

    if (_props.scale !== 1) {
        let scale = _props.scale;
        let scaledParent = getScaledParent($sprite);

        if (scaledParent) {
            let scaledParentRect = scaledParent.getRect($sprite === scaledParent ? false : true);
            let scaleCenterX = scaledParentRect.tx + scaledParentRect.tw / 2;
            let scaleCenterY = scaledParentRect.ty + scaledParentRect.th / 2;

            _props.tx -= (scaleCenterX - _props.tx) * (scale - 1);
            _props.ty -= (scaleCenterY - _props.ty) * (scale - 1);

            _props.tw *= scale;
            _props.th *= scale;
        }
    }

    if (_props.locate === 'lt') {
        // _props.tx = _props.tx;
        // _props.ty = _props.ty;
    } else if (_props.locate === 'ld') {
        // _props.tx = _props.tx;
        _props.ty -= _props.th;
    } else if (_props.locate === 'rt') {
        _props.tx -= _props.tw;
        // _props.ty = _props.ty;
    } else if (_props.locate === 'rd') {
        _props.tx -= _props.tw;
        _props.ty -= _props.th;
    } else { // center
        _props.tx -= _props.tw >> 1;
        _props.ty -= _props.th >> 1;
    }

    let settings = {};

    if (_props.rotate) {
        // 定点旋转
        let transX = utils.firstValuable(_props.rx, _props.tx + 0.5 * _props.tw);
        let transY = utils.firstValuable(_props.ry, _props.ty + 0.5 * _props.th);
        settings.beforeRotate = [transX, transY];
        settings.rotate = -_props.rotate * Math.PI / 180;
        settings.rotate = Number(settings.rotate.toFixed(4));
        settings.afterRotate = [-transX, -transY];
    }

    let meetResult = rectMeet(_props.tx, _props.ty, _props.tw, _props.th, 0, 0, $canvas.width, $canvas.height, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], _props.rotate);
    let childrenInside = (_props.overflow || _props.overflowX || _props.overflowY) && _props.overflow !== 'visible';

    if (!meetResult && !_text) {
        if (!childrenInside) {
            $sprite.$rendered = undefined;
            _children.length && deliverChildren($canvas, _children, -1);
            _children.length && deliverChildren($canvas, _children, 1);
        }
        utils.execFuncs($sprite.hooks.ticked, $sprite, ++$sprite.$tickedTimes);
    } else {
        _props.opacity = utils.funcOrValue($sprite.style.opacity, $sprite) || 0;
        if ($sprite.$parent) {
            _props.opacity *= utils.firstValuable($sprite.$parent.$cache.opacity, 1);
        }
        $sprite.$cache.opacity = _props.opacity;

        for (let key in $sprite.style) {
            if (_props[key] !== undefined) continue;
            _props[key] = utils.funcOrValue($sprite.style[key], $sprite);
        }

        settings.globalAlpha = utils.firstValuable(_props.opacity, 1);

        if (_props.fh || _props.fv) {
            _props.fh = _props.fh || 0;
            _props.fv = _props.fv || 0;
            _props.fx = _props.fx || 0;
            _props.fy = _props.fy || 0;
            settings.transform = {
                fh: _props.fh,
                fv: _props.fv,
                fx: -(_props.ty + (_props.th >> 1)) * _props.fv + _props.fx,
                fy: -(_props.tx + (_props.tw >> 1)) * _props.fh + _props.fy,
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
            _props.tx = $canvas.width - _props.tx - _props.tw;
            if (_props.mirrY) {
                settings.translate = [$canvas.width, $canvas.height];
                settings.scale = [-1, -1];
                _props.ty = $canvas.height - _props.ty - _props.th;
            }
        } else if (_props.mirrY) {
            settings.translate = [0, $canvas.height];
            settings.scale = [1, -1];
            _props.ty = $canvas.height - _props.ty - _props.th;
        }

        if (childrenInside) {
            settings.clip = true;
        }

        /*
         * 性能浪费检测
         * 拿到最大的“绘制/源尺寸”比值，如果这个值过低，那么显然存在资源浪费
         * 由于对象可能处于动画中，因此选用最大的绘制比
         */
        if (process.env.NODE_ENV !== 'production') {
            if (_imgWidth && _imgHeight) {
                let paintRate = _props.tw * _props.th / (_props.sw * _props.sh);
                if (!$sprite.$perf.paintRate || paintRate > $sprite.$perf.paintRate) {
                    $sprite.$perf.paintRate = paintRate;
                    // $sprite.$perf.paintProps = JSON.stringify(_props);
                }
            }
        }

        // TODO
        // if (_imgWidth > 10 && _imgHeight > 10) {
        //     // 太小的图不取整，以免“高1像素的图，在sx和sw均为0.5的情况下渲染不出来”
        //     constants.xywh.forEach(function (key) {
        //         _props[key] = Math.round(_props[key]);
        //         // _props[key] >>= 0;
        //     });
        // }

        // if (process.env.NODE_ENV !== 'production') {
        //     if (!$sprite.$cache.base64 && _img && _img.src) {
        //         $sprite.$cache.base64 = 'processing';
        //         img2base64(_img.src, function (data) {
        //             $sprite.$cache.base64 = data;
        //         });
        //     }
        // }

        if (settings.clip) {
            if (meetResult) {
                let $paintSprite = {
                    $id: $sprite.$id,
                    type: 'clip',
                    settings: settings,
                    img: _img,
                    props: _props,
                };

                // if (process.env.NODE_ENV !== 'production') {
                //     // 开发环境下，将元素挂载到$children里以供标记
                    $paintSprite.$origin = $sprite;
                // };

                $canvas.$children.push($paintSprite);
            }
        }

        _children.length && deliverChildren($canvas, _children, -1);

        if (settings.fillRect) {
            if (meetResult) {
                $sprite.$rendered = true;

                let $paintSprite = {
                    $id: $sprite.$id,
                    type: 'fillRect',
                    settings: settings,
                    img: _img,
                    props: _props,
                };

                // if (process.env.NODE_ENV !== 'production') {
                //     // 开发环境下，将元素挂载到$children里以供标记
                    $paintSprite.$origin = $sprite;
                // };

                $canvas.$children.push($paintSprite);
            }
        }

        if (_imgWidth && _props.opacity !== 0 && _props.sw && _props.sh) {
            if (!_props.rotate && !_text) {
                cutOutside($canvas, _props, _imgWidth, _imgHeight);
            }

            let meetResultAfterCut = rectMeet(_props.tx, _props.ty, _props.tw, _props.th, 0, 0, $canvas.width - 1, $canvas.height - 1, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], _props.rotate);
            if (meetResultAfterCut) {
                $sprite.$rendered = true;

                /* Avoid overflow painting (wasting & causing bugs in some iOS webview) */

                let $paintSprite = {
                    $id: $sprite.$id,
                    type: 'img',
                    settings: settings,
                    img: _img,
                    props: _props,
                };

                _img.$painted = true;

                // if (process.env.NODE_ENV !== 'production') {
                //     // 开发环境下，将元素挂载到$children里以供标记
                    $paintSprite.$origin = $sprite;
                // };

                $canvas.$children.push($paintSprite);
            }
        }

        // TODO: rewrite
        if (_text) {
            $sprite.$rendered = true;

            let textTx = _props.tx;
            let textTy = _props.ty;
            let textAlign = _props.align || _props.textAlign || 'left';
            let textFont = _props.textFont || '14px Arial';
            let textFontsize = parseInt(textFont);
            let textBaseline;
            // let textFontsize = parseInt(textFont) * _props.scale;
            // textFont = textFontsize + 'px Arial';
            let textLineHeight = _props.lineHeight || textFontsize;

            // Change css-align to canvas-align style
            if (textAlign === 'center') {
                textTx += _props.tw / 2;
            } else if (textAlign === 'right') {
                textTx += _props.tw;
            }

            // Change css-align to canvas-align style
            if (_props.textVerticalAlign === 'top') {
                textBaseline = 'top';
                // textTy += textFontsize + (textLineHeight - textFontsize) / 2;
            } else if (_props.textVerticalAlign === 'bottom') {
                textBaseline = 'bottom';
                textTy += _props.th;
                // textTy += _props.th - (textLineHeight - textFontsize) / 2;
            } else if (_props.textVerticalAlign === 'middle') {
                // textTy += _props.th / 2 + textFontsize / 2;
                textTy += _props.th >> 1;
                textBaseline = 'middle';
            }

            if (typeof _text === 'string' || typeof _text === 'number') {
                if (textTy + textFontsize * 2 > 0 && textTy - textFontsize * 2 < $canvas.height) {
                    $canvas.$children.push({
                        $id: $sprite.$id,
                        type: 'text',
                        settings: settings,
                        props: {
                            tx: textTx,
                            ty: textTy,
                            content: String(_text),
                            fontsize: textFontsize,
                            align: textAlign,
                            baseline: textBaseline,
                            font: textFont,
                            color: _props.color,
                            type: _props.textType,
                        },
                        $origin: $sprite,
                    });
                }
            } else if (_text.length) {
                _text.forEach(function (t) {
                    $canvas.$children.push({
                        $id: $sprite.$id,
                        type: 'text',
                        settings: settings,
                        props: {
                            tx: textTx + utils.funcOrValue(t.tx, $sprite),
                            ty: textTy + utils.funcOrValue(t.ty, $sprite),
                            content: utils.funcOrValue(t.content, $sprite),
                            fontsize: textFontsize,
                            baseline: textBaseline,
                            align: textAlign,
                            font: textFont,
                            color: _props.color,
                            type: _props.textType,
                        },
                        $origin: $sprite,
                    });
                });
            } else if (_text.type === 'multline-text') {
                let textArr = _text.text.split(/\t|\n/);
                let renderArr = [];
                textArr.forEach(function (eachText, textIndex) {
                    eachText = String.prototype.trim.apply(eachText);
                    if (_text.config.start) {
                        eachText = eachText.replace(_text.config.start, '');
                    }
                    let _i = 0;
                    let length = _props.tw;
                    while (eachText.length && _i < eachText.length) {
                        if (length <= 0) {
                            length = _props.tw;
                            renderArr.push(eachText.substr(0, _i));
                            eachText = eachText.substr(_i);
                            _i = 0;
                        }
                        _i++;
                        length -= textFontsize * (isChineseChar(eachText[_i]) ? 1.05 : 0.6);
                    }
                    if (eachText || textIndex) {
                        renderArr.push(eachText);
                    }
                });
                renderArr.forEach(function (r) {
                    $canvas.$children.push({
                        $id: $sprite.$id,
                        type: 'text',
                        settings: settings,
                        props: {
                            tx: textTx,
                            ty: textTy,
                            // tw: _props.tw,
                            // th: _props.th,
                            fontsize: textFontsize,
                            content: r,
                            baseline: textBaseline,
                            align: textAlign,
                            font: textFont,
                            color: _props.color,
                            type: _props.textType,
                        },
                        $origin: $sprite,
                    });
                    textTy += textLineHeight || textFontsize;
                });
            }
        }


        if (!_img && !_text) {
            $sprite.$rendered = undefined;
        }

        _children.length && deliverChildren($canvas, _children, 1);

        if (settings.clip) {
            if (meetResult) {
                let $paintSprite = {
                    $id: $sprite.$id,
                    type: 'clipOver',
                    settings: settings,
                    img: _img,
                    props: _props,
                };

                // if (process.env.NODE_ENV !== 'production') {
                //     // 开发环境下，将元素挂载到$children里以供标记
                    $paintSprite.$origin = $sprite;
                // };

                $canvas.$children.push($paintSprite);
            }
        }

        if (settings.line) {
            if (meetResult) {
                $sprite.$rendered = true;

                let $paintSprite = {
                    $id: $sprite.$id,
                    type: 'line',
                    settings: settings,
                    img: _img,
                    props: _props,
                };

                // if (process.env.NODE_ENV !== 'production') {
                //     // 开发环境下，将元素挂载到$children里以供标记
                    $paintSprite.$origin = $sprite;
                // };

                $canvas.$children.push($paintSprite);
            }
        }

        utils.execFuncs($sprite.hooks.ticked, $sprite, ++$sprite.$tickedTimes);
    }
};
