/** ********** *
 *
 * Send data to devtool.
 *
 * ********** **/

import constants from 'constants';
import utils from 'utils/utils.js';

if (process.env.NODE_ENV !== 'production') {
    if (!window[constants.devFlag]) {
        // init
        const devData = window[constants.devFlag] = {
            isPaintRecording: false,
            selectMode: false,
            current: {},

            $canvas: {},
            $plugin: null,
        };

        const BRIDGE = {
            getSprite: function ($canvasId) {
                if (!devData.isPaintRecording) return [];

                let res = {};

                if ($canvasId) {
                    let children = devData.$canvas[$canvasId].$canvas.children;
                    let $children = devData.$canvas[$canvasId].$canvas.$children;

                    let pusher = function (item) {
                        // Skip $mask in select mode
                        if (item.name === constants.devFlag) return;

                        res[item.$id] = {
                            name: item.name,
                            parent: item.$parent && item.$parent.$id,
                            style: {},
                            children: item.children && item.children.map((child) => {
                                return child.$id;
                            }),
                            rendered: item.$rendered,
                        };

                        // if (item.content.img || item.content.text) {
                        //     res[item.$id].rendered = false;
                        //     for (let i = 0, l = $children.length; i < l; i++) {
                        //         if ($children[i].$id === item.$id) {
                        //             res[item.$id].rendered = true;
                        //             break;
                        //         }
                        //     }
                        // }

                        for (let i in item.style) {
                            res[item.$id].style[i] = utils.funcOrValue(item.style[i], item);
                        }

                        constants.xywh.forEach(function (key) {
                            res[item.$id].style[key] = Math.round(res[item.$id].style[key]);
                        });

                        const attachList = ['blend', 'physics', '$perf'];

                        attachList.forEach((key) => {
                            res[item.$id][key] = item[key];
                        });

                        if (item.children) {
                            item.children.forEach(pusher);
                        }
                    };

                    children.forEach(pusher);

                } else {
                    for (let c in devData.$canvas) {
                        res = Object.assign(res, devData.$plugin.getSprite(c));
                    }
                }

                return res;
            },

            selectSpriteById: function ($spriteId, $canvasId) {
                if (!$canvasId) {
                    for (let i in devData.$canvas) {
                        let res = BRIDGE.selectSpriteById($spriteId, i);
                        if (res) {
                            return {
                                $sprite: res.$sprite || res,
                                $canvas: devData.$canvas[i].$canvas,
                            };
                        }
                    }

                    return false;
                }

                let looper = function (array) {
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].$id === $spriteId) return array[i];

                        let res = looper(array[i].children);
                        if (res) {
                            return {
                                $sprite: res.$sprite || res,
                                $canvas: devData.$canvas[$canvasId].$canvas,
                            };
                        }
                    }

                    return false;
                };

                let children = devData.$canvas[$canvasId].$canvas.children;
                let res = looper(children);
                if (res) {
                    return {
                        $sprite: res.$sprite || res,
                        $canvas: devData.$canvas[$canvasId].$canvas,
                    };
                }
            },

            updateSprite: function ($spriteId, map, $canvasId) {
                let $sprite = BRIDGE.selectSpriteById($spriteId, $canvasId).$sprite;
                if (!$sprite) console.warn(`Sprite ${spriteId} Not Found.`);

                Object.assign($sprite.style, map);
            },

            highlightSprite: function ($spriteId, opt, $canvasId) {
                devData.selectMode = Boolean(opt);

                let tmp = BRIDGE.selectSpriteById($spriteId, $canvasId);
                let $sprite = tmp.$sprite;
                let $canvas = tmp.$canvas;

                if (opt && $canvas && $sprite) {
                    $canvas.$plugin.hook.selectSprite(false, $canvas, $sprite);
                } else if ($canvas) {
                    $canvas.$plugin.hook.cancelSelectSprite($canvas);
                }
            },

            sendGlobalHook: function ($spriteId, $canvasId) {
                let tmp = BRIDGE.selectSpriteById($spriteId, $canvasId);
                let $sprite = tmp.$sprite;
                let $canvas = tmp.$canvas;

                if (window.$ec === $canvas.$id && window.$es === $sprite.$id) return;

                console.warn(`window.$ec = [Easycanvas ${$canvas.$id}], window.$es = [Easycanvas ${$sprite.$id}]`);
                window.$ec = $canvas;
                window.$es = $sprite;
            },

            pause: function ($canvasId, opt) {
                let $canvas = devData.$canvas[$canvasId].$canvas;
                $canvas.$pausing = typeof opt !== 'undefined' ? opt : !$canvas.$pausing;
            },
        };

        devData.$plugin = BRIDGE;
    }
}
