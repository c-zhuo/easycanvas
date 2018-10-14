/** ********** *
 *
 * Plugined to each canvas instance
 * - Will add a 'mask' sprite to show the active sprite.
 * - Only works in develop mode.
 * - The handlers are in /plugin/panel/index.js file.
 *
 * ********** **/

import utils from 'utils/utils.js';
import constants from 'constants';

module.exports = function () {
    if (process.env.NODE_ENV !== 'production') {
        const TO_PANEL_EVENT_NAME = '__EASYCANVAS_BRIDGE_TOPANEL__';

        // 不再通过事件来监听了devTool了，直接从devTool来inspectedWindow.eval
        // window.document.addEventListener('__EASYCANVAS_BRIDGE_TODOC__', function (recieveData) {
        //     let data = recieveData.detail;

        //     if (data.action = 'code') {
        //         // console.log(data.content);
        //         eval(data.content);
        //     }
        // });

        const $emit = function (passData) {
            passData.tabId = window[constants.devFlag].tabId;

            window.document.dispatchEvent(new CustomEvent(
                TO_PANEL_EVENT_NAME, 
                {
                    //  filtering special types
                    detail: JSON.parse(JSON.stringify(passData)),
                    // bubbles: true,
                    // cancelable: true
                }
            ));
        };

        const textFont = '24px san-serif';
        const measureText = function (text, size) {
            var tempCanvas = document.createElement('canvas');
            var tempCtx = tempCanvas.getContext('2d');
            tempCtx.font = size || textFont;
            return tempCtx.measureText(text).width;
        };

        setTimeout(() => {
            $emit({
                name: 'init',
            });
        });

        const MaskCanvasBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==';

        let $selectMask = null;
        let $selectMaskParent = null;

        const PerSecondCollects = [
            'paintArea',
            'paintTimes',
            'paintTimeSpend',
            'preprocessTimeSpend',
            'loadArea',
            'jumpArea',
        ];

        const ApiPlugin = {
            drawImage ($canvas, _props) {
                if (!window[constants.devFlag].isPaintRecording) return;

                if (_props) {
                    $canvas.$perf.$paintArea += _props[7] * _props[8];
                    $canvas.$perf.$loadArea += _props[3] * _props[4];
                }

                $canvas.$perf.$paintTimes++;
            },

            jumpRender ($canvas, _props) {
                $canvas.$perf.$jumpArea += _props[7] * _props[8];
            },

            register ($canvas) {
                $canvas.$id = Math.random().toString(36).substr(2);

                // 性能打点
                // 带$是临时值，否则为每秒的快照值；临时值每秒快照一次
                // 因此开发工具只需要使用快照进行分析即可
                $canvas.$perf = {};
                PerSecondCollects.forEach((key) => {
                    $canvas.$perf[key] = 0;
                    $canvas.$perf['$' + key] = 0;
                });

                setInterval(() => {
                    PerSecondCollects.forEach((key) => {
                        $canvas.$perf[key] = $canvas.$perf['$' + key];
                        $canvas.$perf['$' + key] = 0;
                    });
                }, 1000);

                if (!$canvas.$flags.devtoolHanged) {
                    window[constants.devFlag].$canvas[$canvas.$id] = $canvas;
                    $canvas.$flags.devtoolHanged = true;
                }
            },

            timeCollect ($canvas, type, startOrEnd) {
                // START与END必须在同一个event loop中，且位于相同的微任务队列中
                // 否则会影响指标收集
                $canvas.$perf['$' + type] += ((startOrEnd === 'START' || startOrEnd === 'PAUSE')? -1 : 1) * Date.now();
            },

            selectSprite (isChoosing, $canvas, $sprite) {
                window[constants.devFlag].MaskCanvasBase64 = MaskCanvasBase64;

                if (!$sprite || !window[constants.devFlag].selectMode) {
                    ApiPlugin.cancelSelectSprite($canvas);
                    return false;
                }

                if (!$selectMask) {
                    let tipsWidth = 0;
                    let maskRect = {};

                    $selectMask = $canvas.add({
                        name: constants.devFlag,
                        content: {
                            img: $canvas.imgLoader(MaskCanvasBase64),
                        },
                        style: {
                            border () {
                                if (this.getStyle('tw') < 2 && this.getStyle('th') < 2) {
                                    return '10 rgba(0, 0, 255, 0.5)';
                                }
                                return '1 blue';
                            }
                        },
                        webgl: undefined,
                        children: [{
                            name: constants.devFlag,
                            content: {
                                text: $sprite.name,
                            },
                            inherit: [],
                            style: {
                                visible: this.name !== 'Unnamed Sprite',
                                locate: 'center',
                                tx () {
                                    let res = maskRect.tx + maskRect.tw / 2;

                                    if (res - tipsWidth / 2 < 10) {
                                        res = tipsWidth / 2 + 10;
                                    } else if (res + tipsWidth / 2 > this.$canvas.width - 10) {
                                        res = this.$canvas.width - tipsWidth / 2 - 10;
                                    }

                                    return res;
                                },
                                ty () {
                                    let res = maskRect.ty + maskRect.th + 20;
                                    if (res + 20 > this.$canvas.height) {
                                        res = maskRect.ty - 22;
                                    }

                                    return res;
                                },
                                tw () {
                                    return tipsWidth;
                                },
                                th: 32,
                                backgroundColor: 'black',
                                textVerticalAlign: 'top',
                                textAlign: 'center',
                                textFont: textFont,
                            },
                            hooks: {
                                beforeTick () {
                                    maskRect = this.$parent.getRect();
                                    this.content.text = '<' + $sprite.name + '> | ' + Math.floor(this.$parent.getStyle('tw')) + '×' + Math.floor(this.$parent.getStyle('th'));
                                    tipsWidth = measureText(this.content.text) + 20;
                                },
                            },
                        }]
                    });

                    $selectMaskParent = $canvas.add({
                        name: constants.devFlag,
                        style: {
                            // backgroundColor: 'yellow',
                            locate: 'lt',
                        },
                        children: [{
                            name: constants.devFlag,
                            style: {
                                locate: 'lt',
                                tx: 0, ty: 0,
                                tw () {
                                    return $selectMask.getSelfStyle('tx') - this.$parent.getStyle('tx');
                                },
                                th () {
                                    return $selectMask.getSelfStyle('ty') - this.$parent.getStyle('ty');
                                },
                                backgroundColor: 'rgba(140, 205, 255, 0.1)',
                                border: '1 rgba(80, 120, 200, 0.9)',
                            }
                        }]
                    });
                }

                ['tx', 'ty', 'rotate', 'rx', 'ry', 'scale', 'tw', 'th', 'locate'].forEach(function (key) {
                    (function (_key) {
                        $selectMask.style[_key] = function () {
                            if (_key === 'tw' || _key === 'th') {
                                return $sprite.getStyle(_key) || $sprite.getRect()[_key] || 0.1; // 如果尺寸为0，会使用mask的图片尺寸，变成1
                            }
                            return $sprite.getStyle(_key);
                        };
                    })(key);
                });

                ['tx', 'ty'].forEach(function (key) {
                    (function (_key) {
                        $selectMaskParent.style[_key] = function () {
                            if (!$sprite.$parent) return 0;

                            return $sprite.$parent.getStyle(_key);
                        };
                    })(key);
                });

                $selectMask.style.zIndex = Number.MAX_SAFE_INTEGER;
                $selectMaskParent.style.zIndex = Number.MAX_SAFE_INTEGER - 1;
                $selectMask.style.visible = function () {
                    return window[constants.devFlag].selectMode;
                };
                $selectMaskParent.style.visible = function () {
                    return window[constants.devFlag].selectMode && $sprite.$parent;
                };
                $selectMask.style.opacity = 0.8;

                // mask of webgl
                $selectMask.webgl = $sprite.webgl ? {} : undefined;
                if ($selectMask.webgl) {
                    for (var key in $sprite.webgl) {
                        (function (_key) {
                            $selectMask.webgl[_key] = function () {
                                if (typeof $sprite.webgl[_key] === 'function') {
                                    return $sprite.webgl[_key].call($sprite);
                                }
                                return $sprite.webgl[_key];
                            };
                        })(key);
                    }

                    $selectMask.webgl.img = $canvas.imgLoader(MaskCanvasBase64);
                    $selectMask.webgl.colors = false;
                    $selectMask.style.zIndex = Number.MIN_SAFE_INTEGER;
                }

                if (isChoosing) {
                    $canvas.remove($selectMask);
                    $canvas.remove($selectMaskParent);
                    $selectMask = null;
                    $emit({
                        name: 'selectSprite',
                        id: $canvas.$id,
                        value: {
                            sprite: $sprite.$id,
                            canvas: $canvas.$id
                        },
                    });
                    window[constants.devFlag].current = {
                        $sprite: $sprite,
                        $canvas: $canvas,
                    };
                    window[constants.devFlag].selectMode = false;
                }

                return true;
            },

            cancelSelectSprite ($canvas) {
                if (!$selectMask) return;

                $canvas.remove($selectMask);
                $canvas.remove($selectMaskParent);
                $selectMask = null;
            },
        };

        return ApiPlugin;
    }
};
