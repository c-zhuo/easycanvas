/** ********** *
 *
 * CORE painting function
 * - Calculates props of every sprite in paintList, then puts to $paintList.
 * - Includes optimization.
 * - NOT connecting to canvas's prototype functions.
 *
 * ********** **/

import utils from 'utils/utils.js';
import img2base64 from 'utils/img2base64.js';
import constants from 'constants';
import getComputedStyle from './perPaint.getComputedStyle.js';

module.exports = function (i, index) {
    if (utils.funcOrValue(i.style.visible, i) === false) {
        utils.execFuncs(i.hooks.beforeTick, i);
        utils.execFuncs(i.hooks.ticked, i);
        return;
    }
    
    utils.execFuncs(i.hooks.beforeTick, i);

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
            // fx: -_props.fv * _props.fx,
            // fy: -_props.fh * _props.fy,
            fx: (_props.ty + _props.th / 2) * _props.fv * -1 + _props.fx,
            fy: (_props.tx + _props.tw / 2) * _props.fh * -1 + _props.fy,
        };
    }

    if (_props.rotate) {
        // 定点旋转
        let transX = _props.rx !== undefined ? _props.rx : _props.tx + 0.5 * _props.tw;
        let transY = _props.ry !== undefined ? _props.ry : _props.ty + 0.5 * _props.th;
        settings.translateBeforeRotate = [transX, transY];
        settings.rotate = -_props.rotate * Math.PI / 180;
        settings.rotate = Number(settings.rotate.toFixed(4));
        settings.translateAfterRotate = [-transX, -transY];
    }

    if (_props.scale !== 1) {
        _props.tx -= (_props.scale - 1) * _props.tw * 0.5;
        _props.ty -= (_props.scale - 1) * _props.th * 0.5;
        _props.tw *= _props.scale;
        _props.th *= _props.scale;
    }

    if (_props.mirrX) {
        settings.translate = [$canvas.contextWidth, 0];
        settings.scale = [-1, 1];
        _props.tx = $canvas.contextWidth - _props.tx - _props.tw;
        if (_props.mirrY) {
            settings.translate = [$canvas.contextWidth, $canvas.contextHeight];
            settings.scale = [-1, -1];
            _props.ty = $canvas.contextHeight - _props.ty - _props.th;
        }
    } else if (_props.mirrY) {
        settings.translate = [0, $canvas.contextHeight];
        settings.scale = [1, -1];
        _props.ty = $canvas.contextHeight - _props.ty - _props.th;
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

    /* Avoid overflow painting (wasting & causing bugs in some iOS webview) */
    // 判断sw、sh是否存在只是从计算上防止js报错，其实上游决定了参数一定存在
    if (!_props.rotate && !_text && _imgWidth && !_props.fh && !_props.fv) {
        if (_props.sx < 0 && _props.sw) {
            let cutRate = (-_props.sx / _props.sw);
            _props.tx += _props.tw * cutRate;
            _props.sx = 0;
        }
        if (_props.sy < 0 && _props.sh) {
            let cutRate = (-_props.sy / _props.sh);
            _props.ty += _props.th * cutRate;
            _props.sy = 0;
        }
        if (_imgWidth && _props.sx + _props.sw > _imgWidth) {
            let cutRate = (_props.sx + _props.sw - _imgWidth) / _props.sw;
            _props.sw -= _props.sw * cutRate;
            _props.tw -= _props.tw * cutRate;
        }
        if (_imgHeight && _props.sy + _props.sh > _imgHeight) {
            let cutRate = (_props.sy + _props.sh - _imgHeight) / _props.sh;
            _props.sh -= _props.sh * cutRate;
            _props.th -= _props.th * cutRate;
        }

        if (_props.tx < 0 && _props.tw) {
            let cutRate = (-_props.tx / _props.tw);
            _props.sx += _props.sw * cutRate;
            _props.sw -= _props.sw * cutRate;
            _props.tw = _props.tw + _props.tx;
            _props.tx = 0;
        }
        if (_props.ty < 0 && _props.th) {
            let cutRate = (-_props.ty / _props.th);
            _props.sy += _props.sh * cutRate;
            _props.sh -= _props.sh * cutRate;
            _props.th = _props.th + _props.ty;
            _props.ty = 0;
        }
        if (_props.tx + _props.tw > $canvas.contextWidth && _props.tw) {
            let cutRate = (_props.tx + _props.tw - $canvas.contextWidth) / _props.tw;
            _props.tw -= _props.tw * cutRate;
            _props.sw -= _props.sw * cutRate;
        }
        if (_props.ty + _props.th > $canvas.contextHeight && _props.th) {
            let cutRate = (_props.ty + _props.th - $canvas.contextHeight) / _props.th;
            _props.th -= _props.th * cutRate;
            _props.sh -= _props.sh * cutRate;
        }
    }

    constants.xywh.forEach(function (key) {
        _props[key] = _props[key] >> 0;
    });

    for (let key in _props) {
        i.$cache[key] = _props[key];
    }
    delete i.$cache.textBottom;

    if (_img && typeof i.$cache.imgType === 'undefined') {
        if (!_img.src) {
            i.$cache.imgType = 'canvas';
        } else if (_img.src.substr(-3) === 'png') {
            i.$cache.imgType = 'png';
        } else {
            i.$cache.imgType = '*';
        }
    }

    // if (process.env.NODE_ENV !== 'production') {
    //     if (!i.$cache.base64 && _img && _img.src) {
    //         i.$cache.base64 = 'processing';
    //         img2base64(_img.src, function (data) {
    //             i.$cache.base64 = data;
    //         });
    //     }
    // }

    if (_children) {
        _children.filter(function (item) {
            return utils.funcOrValue(item.style.zIndex, item) < 0;
        }).sort(function (a, b) {
            var za = utils.funcOrValue(a.style.zIndex, a);
            var zb = utils.funcOrValue(b.style.zIndex, b);
            if (za === zb) return 0;
            return za > zb ? 1 : -1;
        }).forEach(function (c, _index) {
            $canvas.$perPaint.call($canvas, c, _index);
        });
    }

    if (typeof _props.opacity !== 'undefined') {
        settings.globalAlpha = _props.opacity;
    } else {
        settings.globalAlpha = 1;
    }

    // $canvas.$paintContext.fillRect(_props.tx, _props.ty, _props.tw, _props.th);
    if (_img && _imgWidth && _props.opacity !== 0 && _props.sw && _props.sh && _props.tx < $canvas.contextWidth && _props.ty < $canvas.contextHeight) {
        // // cache computed w/h
        // i.style.tw = i.style.tw || _props.tw || _imgWidth;
        // i.style.th = i.style.th || _props.th || _imgHeight;

        $canvas.$paintList.push({
            $id: i.$id,
            type: 'img',
            settings: settings,
            imgType: i.$cache.imgType,
            props: [_img, _props.sx, _props.sy, _props.sw, _props.sh, _props.tx, _props.ty, _props.tw, _props.th]
        });
    }

    if (_text) {
        let textTx = _props.tx;
        let textTy = _props.ty;
        let textAlign = i.style.align;
        let textFont = utils.funcOrValue(i.style.textFont, i) || '14px Arial';
        let textFontsize = parseInt(textFont);
        let textLineHeight = i.style.lineHeight || textFontsize;

        // Change css-align to canvas-align style
        if (textAlign === 'center') {
            textTx += _props.tw / 2;
        } else if (textAlign === 'right') {
            textTx += _props.tw;
        }

        // Change css-align to canvas-align style
        if (i.style.textVerticalAlign === 'top') {
            textTy += textFontsize + (textLineHeight - textFontsize) / 2;
        } else if (i.style.textVerticalAlign === 'bottom') {
            textTy += _props.th - (textLineHeight - textFontsize) / 2;
        } else if (i.style.textVerticalAlign === 'middle') {
            textTy += _props.th / 2 + textFontsize / 2;
        }

        if (typeof _text === 'string' || typeof _text === 'number') {
            $canvas.$paintList.push({
                $id: i.$id,
                type: 'text',
                settings: settings,
                props: {
                    tx: textTx,
                    ty: textTy,
                    // tw: _props.tw,
                    // th: _props.th,
                    content: _text,
                    align: textAlign || 'left',
                    font: textFont,
                    color: i.style.color || 'white',
                    type: i.style.textType || 'fillText',
                }
            });
        } else if (_text.length) {
            _text.forEach(function (t) {
                $canvas.$paintList.push({
                    $id: i.$id,
                    type: 'text',
                    settings: settings,
                    props: {
                        tx: textTx + utils.funcOrValue(t.tx, i),
                        ty: textTy + utils.funcOrValue(t.ty, i),
                        // tw: _props.tw,
                        // th: _props.th,
                        content: utils.funcOrValue(t.content, i),
                        align: textAlign || 'left',
                        font: textFont,
                        color: i.style.color || 'white',
                        type: i.style.textType || 'fillText',
                    }
                });
            });
        } else if (_text.type === 'multline-text') {
            let textArr = _text.text.split(/\t|\n/);
            let isChinese = function (temp) {
                let re = /[^\u4e00-\u9fa5]/;
                return !re.test(temp);
            };
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
                    length -= textFontsize * (isChinese(eachText[_i]) ? 1.05 : 0.6);
                }
                if (eachText || textIndex) {
                    renderArr.push(eachText);
                }
            });
            renderArr.forEach(function (r) {
                $canvas.$paintList.push({
                    $id: i.$id,
                    type: 'text',
                    settings: settings,
                    props: {
                        tx: textTx,
                        ty: textTy,
                        // tw: _props.tw,
                        // th: _props.th,
                        content: r,
                        align: textAlign || 'left',
                        font: textFont,
                        color: i.style.color || 'white',
                        type: i.style.textType || 'fillText',
                    }
                });
                textTy += textLineHeight || textFontsize;
            });
            // Record last line of this text
            i.$cache.textBottom = textTy;
        }
    }

    if (_children) {
        _children.filter(function (item) {
            return !(utils.funcOrValue(item.style.zIndex, item) < 0);
        }).sort(function (a, b) {
            var za = utils.funcOrValue(a.style.zIndex, a);
            var zb = utils.funcOrValue(b.style.zIndex, b);
            if (za === zb) return 0;
            return za > zb ? 1 : -1;
        }).forEach(function (c, _index) {
            $canvas.$perPaint.call($canvas, c, _index);
        });
    }

    utils.execFuncs(i.hooks.ticked, i);
};
