// import Easycanvas from 'src/index.js';
// import EasycanvasPhysics from 'src/plugin.physics.js';
// import Physics from './physics/physics.js';

import Vue from './lib/vue-2.4.0.min.js';
import sidebar from './constant/sidebar.js';
import content from './constant/content.js';

import css from './style.scss';
document.body.appendChild(document.createElement('style')).innerHTML = css;

const DefaultPage = '一些demo';
const DemoableCodeClassName = 'code-2-demo';
const JSXDemoableCodeClassName = 'code-2-demo-jsx';

const Analyze = function (str) {
    if (window.location.port) return;

    var img = new Image();
    img.src = 'http://122.114.162.204:8001/point?title=' + str;
};

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
            isDebuggingJSX: false,
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
                mode: 'ace/mode/html',
                selectionStyle: 'text'
            });
            window.editor = editor;

            this.$iframe = document.querySelector('#demo-iframe');
            this.$ace = editor;

            document.body.onclick = function (e) {
                if (e.target.className.indexOf(DemoableCodeClassName) !== -1) {
                    let demoCode = e.target.nextElementSibling.innerText;
                    demoCode = demoCode.replace(new RegExp(String.fromCharCode(160), 'g'), String.fromCharCode(32))

                    this.isDebuggingJSX = e.target.className.indexOf(JSXDemoableCodeClassName) !== -1;

                    this.debug(demoCode);
                    this.showDemo();
                }
            }.bind(this);

            setInterval(() => {
                // 反复重绘，绕过部分浏览器sticky元素滚动后渲染位置不再触发事件的bug
                var demos = document.querySelectorAll('.' + DemoableCodeClassName);
                if (!document.hidden) {
                    demos.forEach((dom) => {
                        dom.style.width = 20 + Number(Math.random().toFixed(2)) + 'px';
                    });
                }
            }, 800);

            let prefetchImg = new Image().src = 'https://github.com/c-zhuo/easycanvas/blob/master/demos/G.png?raw=true';

            jQuery("#jquery-accordion-menu").jqueryAccordionMenu();

            let title = decodeURIComponent(window.location.hash.substr(1)) || DefaultPage;
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

            Analyze(title);
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

                Analyze(item.name);
            },

            hideDemo () {
                this.demoVisible = false;
            },

            showDemo () {
                this.demoVisible = this.hasDemo = true;
            },

            updateDemo () {
                this.debug();

                Analyze('updateDemo');
            },

            debug (code) {
                if (code) {
                    this.$ace.setValue(String(code));
                } else {
                    code = this.$ace.getValue();
                }

                this.$ace.clearSelection();
                this.$ace.moveCursorTo(0, 0);

                const JavaScriptMode = ace.require(this.isDebuggingJSX ? 'ace/mode/jsx' : 'ace/mode/html').Mode;
                this.$ace.session.setMode(new JavaScriptMode());

                let iframeHtmlCodes;

                if (this.isDebuggingJSX) {
                    // todo: 检测window.EasycanvasJSXTransformer等是否被js文件初始化完

                    // transform jsx to js in browser
                    // code = code.replace(/\<script>([\s\S]*)\<\/script\>/gm, function (outer, inner) {
                    //     console.log(inner);
                    //     const result = '<script>\n' + window.EasycanvasJSXTransformer(inner) + '\n</script>';
                    //     console.log(result);

                    //     return result;
                    // });
                    code = window.EasycanvasJSXTransformer(code);
                    code = code.replace(/import/g, 'const').replace(/from\ [\'|\"]easycanvas[\'|\"]/g, '= Easycanvas');
                    code = Babel.transform(code, { presets: ['es2015'] }).code;

                    iframeHtmlCodes = `
                        <html>
                        <head>
                            <style>body {margin: 0;} canvas {border:1px solid #ddd;}</style>
                            <script src="./lib/easycanvas/easycanvas.standalone.prod.js"></script>
                            <script src="./lib/easycanvas/components.standalone.prod.js"></script>
                        </head>
                        <body>
                            <canvas id="app"></canvas>
                            <script>
                                ${code}
                            </script>
                        </body>
                        </html>
                    `;
                } else {
                    iframeHtmlCodes = `
                        <html>
                        <head>
                            <style>body {margin: 0;} canvas {border:1px solid #ddd;}</style>
                            <script src="./lib/easycanvas/easycanvas.standalone.prod.js"></script>
                        </head>
                        <body>
                            ${code}
                        </body>
                        </html>
                    `;
                }

                // 清除之前的interval等
                this.$iframe.contentWindow.location.href = 'about:blank';

                // 不延迟的话上面的那行不生效
                setTimeout(() => {
                    this.$iframe.contentWindow.document.open();
                    this.$iframe.contentWindow.document.write(iframeHtmlCodes);
                    this.$iframe.contentWindow.document.close();
                }, 100);

                // console.log(iframeHtmlCodes);
                Analyze('debug');
            },
        },
    })
})();
