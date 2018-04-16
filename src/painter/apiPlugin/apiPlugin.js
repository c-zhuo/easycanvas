/** ********** *
 *
 * Send message to chrome devtools, by emitting events to the document
 * - Will add a 'mask' sprite to show the active sprite.
 * - Only works in develop mode.
 * - The handlers are in /plugin/index.js file.
 *
 * ********** **/

import utils from 'utils/utils.js';
import constants from 'constants';

module.exports = function () {
    if (process.env.NODE_ENV !== 'production') {
        const TO_PANEL_EVENT_NAME = '__EASYCANVAS_BRIDGE_TOPANEL__';
        window.document.addEventListener('__EASYCANVAS_BRIDGE_TODOC__', function (recieveData) {
            let data = recieveData.detail;

            if (data.action = 'code') {
                console.log(data.content);
                eval(data.content);
            }
        });

        let $emit = function (passData) {
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

        setTimeout(() => {
            $emit({
                name: 'init',
            });
        });

        const MaskCanvas = document.createElement('img');
        MaskCanvas.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==';

        let $selectMask = null;

        const PerSecondCollects = ['paintArea', 'loadArea', 'paintTimes', 'paintTimeSpend'];

        return {
            hook: {
                drawImage ($canvas, _props) {
                    if (!window[constants.devFlag].isPaintRecording) return;

                    // $emit({
                    //     name: 'drawImage',
                    //     id: $canvas.$id,
                    //     value: _props
                    // });

                    $canvas.$perf.$paintArea += _props[7] * _props[8];
                    $canvas.$perf.$loadArea += _props[3] * _props[4];
                    $canvas.$perf.$paintTimes++;
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
                        if (!window[constants.devFlag].$canvas[$canvas.$id]) {
                            window[constants.devFlag].$canvas[$canvas.$id] = {
                                $canvas: $canvas,
                            };
                            $canvas.$flags.devtoolHanged = true;
                        }
                    }
                },

                timeCollect ($canvas, {type, value}) {
                    $canvas.$perf.$paintTimeSpend += value;
                },

                selectSprite (isChoosing, $canvas, $sprite) {
                    if (!$sprite || !window[constants.devFlag].selectMode) return false;

                    if (!$selectMask) {
                        $selectMask = $canvas.add({
                            name: constants.devFlag,
                            content: {
                                img: MaskCanvas,
                            },
                            style: {
                            }
                        });
                    }

                    ['tx', 'ty', 'tw', 'th', 'rotate', 'rx', 'ry'].forEach(function (key) {
                        (function (_key) {
                            if (constants.sxywh.indexOf(_key) >= 0) {
                                return;
                            }
                            $selectMask.style[_key] = function () {
                                return $sprite.$cache[_key];
                            };
                        })(key);
                    });

                    // $sprite.$cache has calculated the 'scale' and 'locate'
                    // Here uses the default values
                    $selectMask.style.scale = 1;
                    $selectMask.style.locate = 'lt';

                    $selectMask.style.zIndex = Number.MAX_SAFE_INTEGER;
                    $selectMask.style.visible = function () {
                        return window[constants.devFlag].selectMode;
                    };
                    $selectMask.style.opacity = 0.8;

                    if (isChoosing) {
                        $canvas.remove($selectMask);
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
                    $canvas.remove($selectMask);
                    $selectMask = null;
                },
            },
        };
    }
};
