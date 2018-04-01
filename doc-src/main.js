// import Easycanvas from 'src/index.js';
// import EasycanvasPhysics from 'src/plugin.physics.js';
// import Physics from './physics/physics.js';

import Vue from './lib/vue-2.4.0.min.js';
import base64 from './constant/base64.js';
import sidebar from './constant/sidebar.js';
import content from './constant/content.js';

import css from './style.scss';
document.body.appendChild(document.createElement('style')).innerHTML = css;

const DemoableCodeClassName = 'code-2-demo';

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
    window.t = new Vue({
        el: '#docApp',
        template: document.getElementById('docApp-template').innerHTML,
        data: {
            headerImg: base64.headerImg,
            sidebar: sidebar,
            currentTitle: '',
            contentDom: (function () {
                let $section = document.createElement('section');
                $section.innerHTML = content;
                return $section;
            })(),
            $iframe: null,
            $ace: null,
            demoVisible: false,
            hasDemo: false,
        },
        computed: {
            content () {
                if (!this.currentTitle) {
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
            var editor = ace.edit(document.querySelector('.ace'), {
                mode: "ace/mode/html",
                selectionStyle: "text"
            });

            this.$iframe = document.querySelector('#demo-iframe');
            this.$ace = editor;

            // editor.getSession().setMode
            // debugger;
            // that.ACE_editor = ace.edit("codeBox");
            // that.ShortACE_editor = ace.edit("codeBoxShort");
            // that.ACE_editor.getSession().setMode("ace/mode/html");
            // that.ShortACE_editor.getSession().setMode("ace/mode/html");

            // use setOptions method to set several options at once
            // editor.setOptions({
            //     autoScrollEditorIntoView: true,
            //     copyWithEmptySelection: true,
            // });
            // // use setOptions method
            // editor.setOption("mergeUndoDeltas", "always");

            // // some options are also available as methods e.g. 
            // // editor.setTheme("ace/theme/twilight");

            // // to get the value of the option use
            // editor.getOption("optionName");

            document.body.onclick = function (e) {
                if (~e.target.className.indexOf(DemoableCodeClassName)) {
                    let code = e.target.nextElementSibling.innerText;
                    code = code.replace(new RegExp(String.fromCharCode(160), 'g'), String.fromCharCode(32))
                    this.debug(code);
                    this.showDemo();
                }
            }.bind(this);

            setInterval(() => {
                // 反复重绘，绕过部分浏览器sticky元素滚动后渲染位置不再触发事件的bug
                var demos = document.querySelectorAll('.' + DemoableCodeClassName);
                demos.forEach((dom) => {
                    dom.style.width = 20 + Number(Math.random().toFixed(2)) + 'px';
                });
            }, 800);

            let prefetchImg = new Image().src = 'https://github.com/chenzhuo1992/easycanvas/blob/master/demos/G.png?raw=true';

            jQuery("#jquery-accordion-menu").jqueryAccordionMenu();

            let title = decodeURIComponent(window.location.hash.substr(1)) || '概述';
            let folder = sidebar.filter((item) => {
                return item.children.filter((subitem) => {
                    return subitem.name === title;
                }).length;
            });
            this.currentTitle = title;
            if (folder && folder[0]) {
                document.querySelectorAll('.sidebar-text').forEach((dom) => {
                    if (dom.innerText === folder[0].name) {
                        dom.click();
                    }
                });
            }
        },
        methods: {
            chooseTitle (item) {
                if (item.type === 'folder') {
                    return;
                }

                window.location.hash = this.currentTitle = item.name;
                this.$nextTick(() => {
                    document.querySelector('.content').scrollTo(0, 0);
                });
            },

            hideDemo () {
                this.demoVisible = false;
            },

            showDemo () {
                this.demoVisible = this.hasDemo = true;
            },

            updateDemo () {
                this.debug();
            },

            debug (code) {
                if (code) {
                    this.$ace.setValue(String(code));
                } else {
                    code = this.$ace.getValue();
                }
                this.$ace.clearSelection();
                this.$ace.moveCursorTo(0, 0);

                let finalCode = `
                    <script src="./lib/easycanvas.standalone.prod.js"></script>
                    ${code}
                `;

                this.$iframe.contentWindow.document.open();
                this.$iframe.contentWindow.document.write(finalCode);
                this.$iframe.contentWindow.document.close();
            },
        },
        watch: {
            demoVisible (val) {
                if (val) {

                }
            }
        }
    })
})();
