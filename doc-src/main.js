import Easycanvas from 'src/index.js';
import EasycanvasPhysics from 'src/plugin.physics.js';
import Physics from './physics/physics.js';

import Vue from './lib/vue-2.4.0.min.js';
import base64 from './constant/base64.js';
import sidebar from './constant/sidebar.js';
import content from './constant/content.js';

(function initBackgroundPhysics () {
    return;
    window.w = document.body.clientWidth;
    window.h = document.body.clientHeight;
    window.onresize = function () {
        setTimeout(window.location.reload.bind(window.location), 1000);
    };

    let $app = document.getElementById('bgCanvas');
    $app.style.width = w;
    $app.style.height = h;
    $app.width = w;
    $app.height = h;

    window.$Doc = new Easycanvas.painter();

    $Doc.register($app, {
        events: {
            contextmenu: function (e) {
                console.log('contextmenu!');
                e.event.stopPropagation();
                e.event.preventDefault();
            }
        }
    });
    $Doc.setMaxFps(50);
    $Doc.start();

    window.__EASYCANVAS_DEVTOOL__ = false;

    Physics.start();
})();

(function initDocInstance () {
    window.$app = new Vue({
        el: '#docApp',
        template: document.getElementById('docApp-template').innerHTML,
        data: {
            headerImg: base64.headerImg,
            sidebar: sidebar,
            currentTitle: decodeURIComponent(window.location.hash.substr(1)) || '概述',
            contentDom: (function () {
                let $section = document.createElement('section');
                $section.innerHTML = content;
                return $section;
            })(),
        },
        computed: {
            content () {
                if (!this.currentTitle || !sidebar.filter((item) => {
                    return item.name === this.currentTitle;
                }).length) {
                    return;
                }

                let $content = this.contentDom.querySelector('#' + this.currentTitle);
                if ($content) {
                    return $content.innerHTML;
                }
                return '';
            }
        },
        mounted () {

        },
        methods: {
            chooseTitle (item) {
                window.location.hash = this.currentTitle = item.name;
            }
        },
    })
})();
