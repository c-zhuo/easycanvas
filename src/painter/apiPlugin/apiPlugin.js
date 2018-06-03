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

        const MaskCanvasBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==';

        let $selectMask = null;

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

                $canvas.$perf.$paintArea += _props[7] * _props[8];
                $canvas.$perf.$loadArea += _props[3] * _props[4];
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
                $canvas.$perf['$' + type] += (startOrEnd === 'START' ? -1 : 1) * Date.now();
            },

            selectSprite (isChoosing, $canvas, $sprite) {
                if (!$sprite || !window[constants.devFlag].selectMode) {
                    ApiPlugin.cancelSelectSprite($canvas);
                    return false;
                }

                if (!$selectMask) {
                    $selectMask = $canvas.add({
                        name: constants.devFlag,
                        content: {
                            img: $canvas.imgLoader(MaskCanvasBase64),
                        },
                        style: {
                        }
                    });
                }

                ['tx', 'ty', 'tw', 'th', 'rotate', 'rx', 'ry'].forEach(function (key) {
                    (function (_key) {
                        $selectMask.style[_key] = function () {
                            return $sprite.$cache && $sprite.$cache[_key];
                        };
                    })(key);
                });

                // mask of webgl
                $selectMask.webgl = $sprite.webgl ? {} : false;
                if ($selectMask.webgl) {
                    for (var key in $sprite.webgl) {
                        $selectMask.webgl[key] = $sprite.webgl[key];
                    }
                    $selectMask.webgl.img = $canvas.imgLoader(MaskCanvasBase64);
                }

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
                if (!$selectMask) return;

                $canvas.remove($selectMask);
                $selectMask = null;
            },
        };

        return ApiPlugin;
    }
};
