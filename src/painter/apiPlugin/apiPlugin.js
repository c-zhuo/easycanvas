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

        let $selectMask = null;
        let maskCanvas = document.createElement('img');
        maskCanvas.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==';

        return {
            hook: {
                drawImage ($canvas, _props) {
                    if (!window[constants.devFlag].isPaintRecording) return;

                    // $emit({
                    //     name: 'drawImage',
                    //     id: $canvas.$id,
                    //     value: _props
                    // });

                    $canvas.$perf.paintArea += _props.tw * _props.th;
                    $canvas.$perf.paintTimes ++;
                },

                updateTree ($canvas) {
                    if (!window[constants.devFlag].isPaintRecording) return;

                    $emit({
                        name: 'updateTree',
                        id: $canvas.$id,
                    });
                },

                register ($canvas) {
                    $canvas.$id = Math.random().toString(36).substr(2);

                    // 性能打点
                    $canvas.$perf = {
                        paintArea: 0,
                        paintTimes: 0,
                    };
                    setInterval(() => {
                        $canvas.$perf = {
                            paintArea: 0,
                            paintTimes: 0,
                        };
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

                selectSprite (isChoosing, $canvas, $sprite) {
                    if (!$sprite || !window[constants.devFlag].selectMode) return false;

                    if (!$selectMask) {
                        $selectMask = $canvas.add({
                            name: constants.devFlag,
                            content: {
                                img: maskCanvas,
                            },
                            style: {}
                        });
                    }

                    ['tx', 'ty', 'tw', 'th', 'rotate', 'rx', 'ry'].forEach(function (key) {
                        (function (_key) {
                            if (constants.sxywh.indexOf(_key) >= 0) {
                                return;
                            }
                            $selectMask.style[_key] = function () {
                                return $sprite.$cache[_key] || 0;
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
