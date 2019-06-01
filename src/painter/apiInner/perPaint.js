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
// import cutOutside from './perPaint.cutOutside.js';
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

module.exports = function ($sprite, index) {
    $sprite.$rendered = false;

    if ($sprite.$cache.visible === false) {
        // utils.execFuncs($sprite.hooks.ticked, $sprite, ++$sprite.$tickedTimes);
        return;
    }

    let $canvas = this;

    extend.call($sprite);

    let _props = $sprite.$render;

    let _text = _props.text;
    let _img = _props.img;

    let childrenInside = _props.childrenInside;

    // 容器提前结束
    if (!_img && !_text && !_props.backgroundColor && !_props.border && !childrenInside) {
        $sprite.$rendered = undefined;
        let _children = $sprite.children;
        if (_children.length) {
            deliverChildren($canvas, _children, -1);
            deliverChildren($canvas, _children, 1);
        }
        // utils.execFuncs($sprite.hooks.ticked, $sprite, ++$sprite.$tickedTimes);
        return;
    }

    let _children = $sprite.children;

    let settings = _props.settings;

    // let meetResult = rectMeet(_props.left, _props.top, _props.width, _props.height, 0, 0, $canvas.width, $canvas.height, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], _props.rotate);
    // let meetResult = true;

    /*
     * 性能浪费检测
     * 拿到最大的“绘制/源尺寸”比值，如果这个值过低，那么显然存在资源浪费
     * 由于对象可能处于动画中，因此选用最大的绘制比
     */
    // if (process.env.NODE_ENV !== 'production') {
    //     if (_props._imgWidth && _props._imgHeight) {
    //         let paintRate = _props.width * _props.height / (_props.height * _props.cutHeight);
    //         if (!$sprite.$perf.paintRate || paintRate > $sprite.$perf.paintRate) {
    //             $sprite.$perf.paintRate = paintRate;
    //             // $sprite.$perf.paintProps = JSON.stringify(_props);
    //         }
    //     }
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
        let $paintSprite = {
            $id: $sprite.$id,
            type: 'clip',
            // settings: settings,
            props: _props,
        };

        // if (process.env.NODE_ENV !== 'production') {
        //     // 开发环境下，将元素挂载到$children里以供标记
            $paintSprite.$origin = $sprite;
        // };

        $canvas.$children.push($paintSprite);
    }

    _children.length && deliverChildren($canvas, _children, -1);

    if (settings.fillRect) {
        $sprite.$rendered = true;

        let $paintSprite = {
            $id: $sprite.$id,
            type: 'fillRect',
            settings: settings,
            props: _props,
        };

        // if (process.env.NODE_ENV !== 'production') {
        //     // 开发环境下，将元素挂载到$children里以供标记
            $paintSprite.$origin = $sprite;
        // };

        $canvas.$children.push($paintSprite);
    }

    if (_props._imgWidth && _props.opacity !== 0 && _props.cutWidth && _props.cutHeight) {
        // if (!_props.rotate && !_text) {
            // cutOutside($canvas, _props, _imgWidth, _imgHeight);
            // cut的结果没有取整，要看是否需要
        // }

        // let meetResultAfterCut = rectMeet(_props.left, _props.top, _props.width, _props.height, 0, 0, $canvas.width - 1, $canvas.height - 1, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], _props.rotate);
        // let meetResultAfterCut = true;

        $sprite.$rendered = true;

        /* Avoid overflow painting (wasting & causing bugs in some iOS webview) */

        let $paintSprite = {
            $id: $sprite.$id,
            type: 'img',
            settings: settings,
            img: _img,
            props: _props,
        };

        // _img.$painted = true;

        // if (process.env.NODE_ENV !== 'production') {
        //     // 开发环境下，将元素挂载到$children里以供标记
            $paintSprite.$origin = $sprite;
        // };

        $canvas.$children.push($paintSprite);
    }

    // TODO: rewrite
    if (_text) {
        _props.textFont = $sprite.$cache.textFont;
        _props.color = $sprite.$cache.color;
        _props.textAlign = $sprite.$cache.textAlign;
        _props.textVerticalAlign = $sprite.$cache.textVerticalAlign;

        $sprite.$rendered = true;

        let textLeft = _props.left;
        let textTop = _props.top;
        let textAlign = _props.align || _props.textAlign || 'left';
        let textFont = _props.textFont || '14px Arial';
        let textFontsize = parseInt(textFont);
        let textBaseline = 'top';
        // let textFontsize = parseInt(textFont) * _props.scale;
        // textFont = textFontsize + 'px Arial';
        let textLineHeight = _props.lineHeight || textFontsize;

        // Change css-align to canvas-align style
        if (textAlign === 'center') {
            textLeft += _props.width / 2;
        } else if (textAlign === 'right') {
            textLeft += _props.width;
        }

        // Change css-align to canvas-align style
        if (_props.textVerticalAlign === 'top') {
            textBaseline = 'top';
        } else if (_props.textVerticalAlign === 'bottom') {
            textBaseline = 'bottom';
            textTop += _props.height;
        } else if (_props.textVerticalAlign === 'middle') {
            textTop += _props.height >> 1;
            textBaseline = 'middle';
        }

        if (typeof _text === 'string' || typeof _text === 'number') {
            // if (textTop + textFontsize * 2 > 0 && textTop - textFontsize * 2 < $canvas.height) {
                $canvas.$children.push({
                    $id: $sprite.$id,
                    type: 'text',
                    settings: settings,
                    props: {
                        left: textLeft,
                        top: textTop,
                        content: String(_text),
                        fontsize: textFontsize,
                        align: textAlign,
                        baseline: textBaseline,
                        font: textFont,
                        color: _props.color,
                        type: _props.textToppe,
                    },
                    $origin: $sprite,
                });
            // }
        } else if (_text.length) {
            _text.forEach(function (t) {
                $canvas.$children.push({
                    $id: $sprite.$id,
                    type: 'text',
                    settings: settings,
                    props: {
                        left: textLeft + utils.funcOrValue(t.left, $sprite),
                        top: textTop + utils.funcOrValue(t.top, $sprite),
                        content: utils.funcOrValue(t.content, $sprite),
                        fontsize: textFontsize,
                        baseline: textBaseline,
                        align: textAlign,
                        font: textFont,
                        color: _props.color,
                        type: _props.textToppe,
                    },
                    $origin: $sprite,
                });
            });
        } else if (_text.toppe === 'multline-text') {
            let textArr = _text.text.split(/\t|\n/);
            let renderArr = [];
            textArr.forEach(function (eachText, textIndex) {
                eachText = String.prototype.trim.apply(eachText);
                if (_text.config.start) {
                    eachText = eachText.replace(_text.config.start, '');
                }
                let _i = 0;
                let length = _props.width;
                while (eachText.length && _i < eachText.length) {
                    if (length <= 0) {
                        length = _props.width;
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
                        left: textLeft,
                        top: textTop,
                        // width: _props.width,
                        // height: _props.height,
                        fontsize: textFontsize,
                        content: r,
                        baseline: textBaseline,
                        align: textAlign,
                        font: textFont,
                        color: _props.color,
                        type: _props.textToppe,
                    },
                    $origin: $sprite,
                });
                textTop += textLineHeight || textFontsize;
            });
        }
    }

    if (!_img && !_text) {
        $sprite.$rendered = undefined;
    }

    _children.length && deliverChildren($canvas, _children, 1);

    if (settings.clip) {
        let $paintSprite = {
            $id: $sprite.$id,
            type: 'clipOver',
            // settings: settings,
            props: _props,
        };

        // if (process.env.NODE_ENV !== 'production') {
        //     // 开发环境下，将元素挂载到$children里以供标记
            $paintSprite.$origin = $sprite;
        // };

        $canvas.$children.push($paintSprite);
    }

    if (settings.line) {
        $sprite.$rendered = true;

        let $paintSprite = {
            $id: $sprite.$id,
            type: 'line',
            settings: settings,
            props: _props,
        };

        // if (process.env.NODE_ENV !== 'production') {
        //     // 开发环境下，将元素挂载到$children里以供标记
            $paintSprite.$origin = $sprite;
        // };

        $canvas.$children.push($paintSprite);
    }
};
