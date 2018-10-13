import Vue from 'vue';
window.Vue = Vue;

import vPanelMain from './index.vue';
import constants from 'constants';

const handlers =  {
    init: function () {
        if (window.$app) {
            window.$app.$actions.$init(window.$app);
        }
    },

    // drawImage: function (id, value) {
        
    // },

    selectSprite: function (id, value) {
        window.$app.$actions.setSelectorActive(false);
        window.$app.$actions.setInspectedInstance(value.sprite, value.canvas);
    },
};

window.contentScriptReceiver = (data) => {
    if (data.name !== 'updateTree') {
        console.log(data);        
    }
    if (data.name === 'paintRecording') { // 页面检测不到easy-canvas，关闭监听开关
        window.$app.$state.isPaintRecording = data.easyCanvasDetected === '1';
        window.$app.$actions.getElements();
        return;
    }
    const handler = handlers[data.name];

    if (handler) {
        handler(data.id, data.value);
    }
};

Vue.use(require('easy-vuex'), {
    state: {
        isPaintRecording: true, // 监听
        selectorActive: false, // 元素选择
        menu: 'tree', // 右上角选择了哪个面板
        snapshoot: {}, // 元素快照
        treeElements: {
            expansionMap: [],
            inspectedInstance: {},
        },
        elements: {},
        perf: {}
    },
    getters: {

    },
    actions: {
        $init (app = window.$app) {
            app.$actions.setIsPaintRecording(app.$state.isPaintRecording);
        },
        setIsPaintRecording (status, app = window.$app) {
            app.$state.isPaintRecording = status;
            // app.$actions.orderContent(
            //     `
            //         window.__EASYCANVAS_DEVTOOL__.isPaintRecording = ${app.$state.isPaintRecording};
            //     `
            // );
            window.inspectedWindow.eval(`window.__EASYCANVAS_DEVTOOL__.isPaintRecording = ${app.$state.isPaintRecording};`);
        },
        setSelectorActive (status, app = window.$app) {
            app.$state.selectorActive = status;
            // app.$actions.orderContent(
            //     `
            //         window.__EASYCANVAS_DEVTOOL__.selectMode = ${app.$state.selectorActive};
            //     `
            // );
            window.inspectedWindow.eval(`window.__EASYCANVAS_DEVTOOL__.selectMode = ${app.$state.selectorActive};`);
        },
        // orderContent (code, callback, app = window.$app) {
        //     let command = `
        //         document.dispatchEvent(new CustomEvent(
        //                 '__EASYCANVAS_BRIDGE_TODOC__',
        //                 {
        //                     detail: {
        //                         action: 'code',
        //                         content: \`${code}\`,
        //                     },
        //                 }
        //             ));
        //     `;

        //     if (window.respond) {
        //         window.respond(command, callback);
        //     } else {
        //         // extensionPanel.onShown还未触发，respond未初始化
        //         setTimeout(() => {
        //             app.$actions.orderContent(code, callback);
        //         }, 100);
        //     }
        // },
        getParentIdByChildId (spriteId, canvasId) {
            return $app.$state.elements[canvasId].sprites[spriteId] &&
                $app.$state.elements[canvasId].sprites[spriteId].parent;
        },
        setInspectedInstance (spriteId, canvasId, app = window.$app) {
            // 将选择的sprite的父级都展开，便于调试
            let currentSpriteId = spriteId;
            while (currentSpriteId = window.$app.$actions.getParentIdByChildId(currentSpriteId, canvasId)) {
                if ($app.$state.treeElements.expansionMap.indexOf(currentSpriteId) === -1) {
                    $app.$state.treeElements.expansionMap.push(currentSpriteId);
                }
            }

            app.$state.treeElements.inspectedInstance = {
                id: spriteId,
                canvasId: canvasId,
            };
            // 将元素挂载到window.$ec和window.$es 
            const sendGlobalHookCode = `
                window['${constants.devFlag}'].$plugin.sendGlobalHook('${spriteId}', '${canvasId}');
            `;
            window.inspectedWindow.eval(sendGlobalHookCode);

            let $spriteDomInTree = window.document.getElementById(spriteId);
            // let spriteDomRect = $spriteDomInTree.getBoundingClientRect();
            // let spriteParentDomRect = $spriteDomInTree.parentElement.getBoundingClientRect();

            $spriteDomInTree.scrollIntoViewIfNeeded();
            window.requestAnimationFrame(() => {
                $spriteDomInTree.parentElement.scrollTo(0, $spriteDomInTree.parentElement.scrollTop - 40);
            });
            // $spriteDomInTree.parentElement.scrollTo(
            //     0,
            //     $spriteDomInTree.parentElement.scrollTop + spriteDomRect.y + spriteDomRect.height - spriteParentDomRect.y - spriteParentDomRect.height
            // );
        },
        pause (canvasId, bol) {
            // 将某个canvas暂停（类似debugger; 对某帧进行调试，opt为true/false代表开启/关闭暂停，不传opt会进行toggle）
            const pauseCode = `
                window['${constants.devFlag}'].$plugin.pause('${canvasId}', ${bol});
            `;
            window.inspectedWindow.eval(pauseCode);
        },
        getElements (callback, app = window.$app) {
            if (window.inspectedWindow && app.$state.isPaintRecording) {
                const getIsPaintRecordingCode = `
                    window['${constants.devFlag}'].isPaintRecording;
                `;
                window.inspectedWindow.eval(getIsPaintRecordingCode, (value) => {
                    if (value === false) {
                        app.$actions.setIsPaintRecording(app.$state.isPaintRecording);
                    }
                });

                const getCanvasCode = `
                    (function () {
                        const canvasIdList = Object.keys(window['${constants.devFlag}'].$canvas);
                        const elements = {};
                        for (let canvasId of canvasIdList) {
                            elements[canvasId] = {
                                name: window['${constants.devFlag}'].$canvas[canvasId].name,
                                sprites: window['${constants.devFlag}'].$plugin.getSprite ? window['${constants.devFlag}'].$plugin.getSprite(canvasId) : {},
                            }
                        }
                        return elements;
                    })();
                `;
                window.inspectedWindow.eval(getCanvasCode, (value) => {
                    app.$state.elements = value || {};
                    callback && callback();
                });
            }
        },
        getPerf (callback, app = window.$app) {
            if (window.inspectedWindow && app.$state.isPaintRecording) {
                const getPerfCOde = `
                    (function () {
                        const perfData = window['${constants.devFlag}'].$plugin.getPerf();
                        return perfData;
                    })();
                `;

                window.inspectedWindow.eval(getPerfCOde, (value) => {
                    app.$state.perf = value || {};
                    callback && callback();
                });
            }
        },
    }
});

window.$app = new Vue({
    el: '#main',
    components: {
        vPanelMain,
    },
    created () {
        let timeStamp = 0;

        setInterval(() => {
            if (Date.now() - timeStamp >= 1000) {

                if (this.$state.menu === 'tree') {
                    this.$actions.getElements();
                }
                else if (this.$state.menu === 'graph') {
                    this.$actions.getPerf();
                }

                timeStamp = Date.now();
            }
        }, 1000);
    },
});
