/** ********** *
 *
 * CORE painting function
 * - Calculates props of every sprite in children, then puts to $children.
 * - Includes optimization.
 * - NOT connecting to canvas's prototype functions.
 *
 * ********** **/

import utils from 'utils/utils.js';
import img2base64 from 'utils/img2base64.js';
import constants from 'constants';
import getComputedStyle from './perPaint.getComputedStyle.js';
import cutOutside from './perPaint.cutOutside.js';
import deliverChildren from './perPaint.deliverChildren.js';

const blend = utils.blend;

const isChineseChar = function (temp) {
    let re = /[^\u4e00-\u9fa5]/;
    return !re.test(temp);
};

module.exports = function (i, index) {
    if (utils.funcOrValue(i.style.visible, i) === false) {
        utils.execFuncs(i.hooks.beforeTick, i, i.$tickedTimes);
        utils.execFuncs(i.hooks.ticked, i, ++i.$tickedTimes);
        return;
    }
    
    utils.execFuncs(i.hooks.beforeTick, i, i.$tickedTimes);

    let $canvas = this;

    let settings = {};

    let _props = getComputedStyle(i, $canvas);
    let _text = _props.text;
    let _img = _props.img;

    let _children = utils.funcOrValue(i.children, i);

    let _imgWidth = _img ? _img.width || 0 : 0;
    let _imgHeight = _img ? _img.height || 0 : 0;

    _props.tw = _props.tw || _props.sw || _imgWidth;
    _props.th = _props.th || _props.sh || _imgHeight;
    _props.sw = _props.sw || _imgWidth;
    _props.sh = _props.sh || _imgHeight;

    if (_props.locate === 'center') {
        _props.tx = _props.tx - 0.5 * _props.tw;
        _props.ty = _props.ty - 0.5 * _props.th;
    } else if (_props.locate === 'ld') {
        _props.tx = _props.tx;
        _props.ty = _props.ty - 1 * _props.th;
    } else if (_props.locate === 'rt') {
        _props.tx = _props.tx - 1 * _props.tw;
        _props.ty = _props.ty;
    } else if (_props.locate === 'rd') {
        _props.tx = _props.tx - 1 * _props.tw;
        _props.ty = _props.ty - 1 * _props.th;
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

    let scale = _props.scale;
    if (scale !== 1) {
        _props.tx -= (scale - 1) * _props.tw >> 1;
        _props.ty -= (scale - 1) * _props.th >> 1;
        _props.tw *= scale;
        _props.th *= scale;
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
        if (_imgWidth && _imgHeight && _props.sw && _props.sh) {
            let paintRate = _props.tw * _props.th / (_props.sw * _props.sh);
            if (!i.$perf.paintRate || paintRate > i.$perf.paintRate) {
                i.$perf.paintRate = paintRate;
                // i.$perf.paintProps = JSON.stringify(_props);
            }
        }
    }

    for (let key in _props) {
        i.$cache[key] = _props[key];
    }

    /* Avoid overflow painting (wasting & causing bugs in some iOS webview) */
    // 判断sw、sh是否存在只是从计算上防止js报错，其实上游决定了参数一定存在
    if (!_props.rotate && !_text && _imgWidth && !_props.fh && !_props.fv) {
        cutOutside($canvas, _props, _imgWidth, _imgHeight)
    }

    constants.xywh.forEach(function (key) {
        _props[key] = Math.round(_props[key]);
        // _props[key] >>= 0;
    });

    delete i.$cache.textBottom;

    // if (process.env.NODE_ENV !== 'production') {
    //     if (!i.$cache.base64 && _img && _img.src) {
    //         i.$cache.base64 = 'processing';
    //         img2base64(_img.src, function (data) {
    //             i.$cache.base64 = data;
    //         });
    //     }
    // }

    deliverChildren($canvas, _children, -1);

    settings.globalAlpha = utils.firstValuable(_props.opacity, 1)

    if (_img && _imgWidth && _props.opacity !== 0 && _props.sw && _props.sh && _props.tx < $canvas.width && _props.ty < $canvas.height) {
        i.$rendered = true;

        let $paintSprite = {
            $id: i.$id,
            type: 'img',
            settings: settings,
            props: [_img, _props.sx, _props.sy, _props.sw, _props.sh, _props.tx, _props.ty, _props.tw, _props.th]
        };

        if (process.env.NODE_ENV !== 'production') {
            // 开发环境下，将元素挂载到$children里以供标记
            $paintSprite.$origin = i;
        };

        $canvas.$children.push($paintSprite);
    } else {
        i.$rendered = false;
    }

    // TODO: rewrite
    if (_text) {
        let textTx = _props.tx;
        let textTy = _props.ty;
        let textAlign = _props.align || _props.textAlign || 'left';
        let textFont = _props.textFont || '14px Arial';
        let textFontsize = parseInt(textFont);
        let textLineHeight = _props.lineHeight || textFontsize;

        // Change css-align to canvas-align style
        if (textAlign === 'center') {
            textTx += _props.tw / 2;
        } else if (textAlign === 'right') {
            textTx += _props.tw;
        }

        // Change css-align to canvas-align style
        if (_props.textVerticalAlign === 'top') {
            textTy += textFontsize + (textLineHeight - textFontsize) / 2;
        } else if (_props.textVerticalAlign === 'bottom') {
            textTy += _props.th - (textLineHeight - textFontsize) / 2;
        } else if (_props.textVerticalAlign === 'middle') {
            textTy += _props.th / 2 + textFontsize / 2;
        }

        if (typeof _text === 'string' || typeof _text === 'number') {
            $canvas.$children.push({
                $id: i.$id,
                type: 'text',
                settings: settings,
                props: {
                    tx: textTx,
                    ty: textTy,
                    content: _text,
                    align: textAlign,
                    font: textFont,
                    color: _props.color,
                    type: _props.textType,
                }
            });
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
                        align: textAlign,
                        font: textFont,
                        color: _props.color,
                        type: _props.textType,
                    }
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
                        content: r,
                        align: textAlign,
                        font: textFont,
                        color: _props.color,
                        type: _props.textType,
                    }
                });
                textTy += textLineHeight || textFontsize;
            });
            // Record last line of this text
            i.$cache.textBottom = textTy;
        }
    }

    deliverChildren($canvas, _children, 1);

    utils.execFuncs(i.hooks.ticked, i, ++i.$tickedTimes);
};
