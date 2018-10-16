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
import getComputedStyle from './perPaint.getComputedStyle.js';
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

module.exports = function (i, index) {
    i.$rendered = false;

    utils.execFuncs(i.hooks.beforeTick, i, i.$tickedTimes);

    if (utils.funcOrValue(i.style.visible, i) === false) {
        utils.execFuncs(i.hooks.ticked, i, ++i.$tickedTimes);
        return;
    }

    let $canvas = this;

    extend.call(i);

    let _props = getComputedStyle(i, $canvas);

    let settings = {
        globalAlpha: utils.firstValuable(_props.opacity, 1)
    };

    let _text = _props.text;
    let _img = _props.img;

    let _children = utils.funcOrValue(i.children, i);

    let _imgWidth = _img ? _img.width || 0 : 0;
    let _imgHeight = _img ? _img.height || 0 : 0;

    _props.tw = _props.tw || _props.sw || _imgWidth;
    _props.th = _props.th || _props.sh || _imgHeight;
    _props.sw = _props.sw || _imgWidth;
    _props.sh = _props.sh || _imgHeight;

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

    if (_props.rotate) {
        // 定点旋转
        let transX = utils.firstValuable(_props.rx, _props.tx + 0.5 * _props.tw);
        let transY = utils.firstValuable(_props.ry, _props.ty + 0.5 * _props.th);
        settings.beforeRotate = [transX, transY];
        settings.rotate = -_props.rotate * Math.PI / 180;
        settings.rotate = Number(settings.rotate.toFixed(4));
        settings.afterRotate = [-transX, -transY];
    }

    if (_props.backgroundColor) {
        settings.fillRect = _props.backgroundColor;
    }

    if (_props.border) {
        settings.line = _props.border;
    }

    if (_props.overflow && _props.overflow !== 'visible') {
        settings.clip = true;
    }

    if (_props.scale !== 1) {
        let scale = _props.scale;
        let scaledParent = getScaledParent(i);

        if (scaledParent) {
            let scaleCenterX = scaledParent.getStyle('tx') + (scaledParent.getSelfStyle('tw') || 0) / 2;
            let scaleCenterY = scaledParent.getStyle('ty') + (scaledParent.getSelfStyle('th') || 0) / 2;

            _props.tx -= (scaleCenterX - _props.tx) * (scale - 1);
            _props.ty -= (scaleCenterY - _props.ty) * (scale - 1);

            _props.tw *= scale;
            _props.th *= scale;
        }
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

    /*
     * 性能浪费检测
     * 拿到最大的“绘制/源尺寸”比值，如果这个值过低，那么显然存在资源浪费
     * 由于对象可能处于动画中，因此选用最大的绘制比
     */
    if (process.env.NODE_ENV !== 'production') {
        if (_imgWidth && _imgHeight) {
            let paintRate = _props.tw * _props.th / (_props.sw * _props.sh);
            if (!i.$perf.paintRate || paintRate > i.$perf.paintRate) {
                i.$perf.paintRate = paintRate;
                // i.$perf.paintProps = JSON.stringify(_props);
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
    //     if (!i.$cache.base64 && _img && _img.src) {
    //         i.$cache.base64 = 'processing';
    //         img2base64(_img.src, function (data) {
    //             i.$cache.base64 = data;
    //         });
    //     }
    // }

    let meetResult = rectMeet(_props.tx, _props.ty, _props.tw, _props.th, 0, 0, $canvas.width, $canvas.height, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], _props.rotate);

    if (settings.clip) {
        if (meetResult) {
            let $paintSprite = {
                $id: i.$id,
                type: 'clip',
                settings: settings,
                img: _img,
                props: _props,
            };

            // if (process.env.NODE_ENV !== 'production') {
            //     // 开发环境下，将元素挂载到$children里以供标记
                $paintSprite.$origin = i;
            // };

            $canvas.$children.push($paintSprite);
        }
    }

    deliverChildren($canvas, _children, -1);

    if (settings.fillRect) {
        if (meetResult) {
            i.$rendered = true;

            let $paintSprite = {
                $id: i.$id,
                type: 'fillRect',
                settings: settings,
                img: _img,
                props: _props,
            };

            // if (process.env.NODE_ENV !== 'production') {
            //     // 开发环境下，将元素挂载到$children里以供标记
                $paintSprite.$origin = i;
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
            i.$rendered = true;

            /* Avoid overflow painting (wasting & causing bugs in some iOS webview) */

            let $paintSprite = {
                $id: i.$id,
                type: 'img',
                settings: settings,
                img: _img,
                props: _props,
            };

            // if (process.env.NODE_ENV !== 'production') {
            //     // 开发环境下，将元素挂载到$children里以供标记
                $paintSprite.$origin = i;
            // };

            $canvas.$children.push($paintSprite);
        }
    }

    // TODO: rewrite
    if (_text) {
        i.$rendered = true;

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
                    $id: i.$id,
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
                    $origin: i,
                });
            }
        } else if (_text.length) {
            _text.forEach(function (t) {
                $canvas.$children.push({
                    $id: i.$id,
                    type: 'text',
                    settings: settings,
                    props: {
                        tx: textTx + utils.funcOrValue(t.tx, i),
                        ty: textTy + utils.funcOrValue(t.ty, i),
                        content: utils.funcOrValue(t.content, i),
                        fontsize: textFontsize,
                        baseline: textBaseline,
                        align: textAlign,
                        font: textFont,
                        color: _props.color,
                        type: _props.textType,
                    },
                    $origin: i,
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
                    $id: i.$id,
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
                    $origin: i,
                });
                textTy += textLineHeight || textFontsize;
            });
        }
    }


    if (!_img && !_text) {
        i.$rendered = undefined;
    }

    deliverChildren($canvas, _children, 1);

    if (settings.clip) {
        if (meetResult) {
            let $paintSprite = {
                $id: i.$id,
                type: 'clipOver',
                settings: settings,
                img: _img,
                props: _props,
            };

            // if (process.env.NODE_ENV !== 'production') {
            //     // 开发环境下，将元素挂载到$children里以供标记
                $paintSprite.$origin = i;
            // };

            $canvas.$children.push($paintSprite);
        }
    }

    if (settings.line) {
        if (meetResult) {
            i.$rendered = true;

            let $paintSprite = {
                $id: i.$id,
                type: 'line',
                settings: settings,
                img: _img,
                props: _props,
            };

            // if (process.env.NODE_ENV !== 'production') {
            //     // 开发环境下，将元素挂载到$children里以供标记
                $paintSprite.$origin = i;
            // };

            $canvas.$children.push($paintSprite);
        }
    }

    utils.execFuncs(i.hooks.ticked, i, ++i.$tickedTimes);
};
