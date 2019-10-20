import sidebar from './constant/sidebar.js';
import loadContent from './constant/content.js';

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


(function initDocInstance () {
    window.t = new Vue({
        el: '#docApp',
        template: document.getElementById('docApp-template').innerHTML,
        data: {
            sidebar: sidebar,
            currentTitle: '',
            content: '',
            contentDom: (function () {
                let $section = document.createElement('section');
                // $section.innerHTML = content;
                return $section;
            })(),
            $iframe: null,
            $ace: null,
            demoVisible: false,
            hasDemo: false,
            isDebuggingJSX: false,
        },
        mounted () {
            loadContent(content => {
                this.contentDom.innerHTML += content;

                // 当前内容为空，说明懒加载的文档内容可能是正在查看的，触发内容更新方法
                if (this.content === '') {
                    this.updateContent();
                }
            });

            var editor = ace.edit(document.querySelector('.ace'), {
                mode: 'ace/mode/html',
                selectionStyle: 'text',
            });
            window.editor = editor;

            this.$iframe = document.querySelector('#demo-iframe');
            this.$ace = editor;

            document.body.onclick = function (e) {
                if (e.target.className.indexOf(DemoableCodeClassName) !== -1) {
                    let demoCode = e.target.nextElementSibling.$ace ?
                        e.target.nextElementSibling.$ace.getValue() :
                        e.target.nextElementSibling.innerText;
                    demoCode = demoCode.replace(new RegExp(String.fromCharCode(160), 'g'), String.fromCharCode(32));

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

            this.updateContent();

            Analyze(title);
        },
        methods: {
            updateACEInContent (dom, code) {
                let $ace = dom.$ace;

                // 还没加载完ace或者babel
                let isDebuggingJSX = dom.previousElementSibling.className.indexOf(JSXDemoableCodeClassName) !== -1;
                const acePlugin = ace.require(isDebuggingJSX ? 'ace/mode/jsx' : 'ace/mode/html');
                if (!acePlugin) {
                    $ace.setValue('// Babel初始化中，请稍后');
                    dom.style.height = '20px';
                    setTimeout(() => {
                        this.updateACEInContent(dom, code);
                    }, 500);
                    return;
                } else {
                    $ace.renderer.$size.height = code.split('\n').length * 16;
                    dom.style.height = code.split('\n').length * 16 + 'px';
                    $ace.renderer.updateText();

                    const JavaScriptMode = acePlugin.Mode;
                    $ace.session.setMode(new JavaScriptMode());
    
                    $ace.setValue(code);
                }
                
                $ace.clearSelection();
                $ace.moveCursorTo(0, 0);
                $ace.scrollToLine(0)
            },

            updateContent () {
                if (!this.currentTitle) {
                    this.content = '';
                    return;
                }

                let $content = this.contentDom.querySelector('#' + this.currentTitle);
                if ($content) {
                    this.content = $content.innerHTML;

                    this.$nextTick(() => {
                        document.querySelectorAll('img').forEach(dom => {
                            if (!dom.src && dom.attributes.presrc && dom.attributes.presrc.value) {
                                dom.src = dom.attributes.presrc.value;
                            }
                        });

                        document.querySelectorAll('code').forEach(dom => {
                            if (dom.parentElement.className.indexOf('demo-box') > -1) return;
                            if (!dom.previousElementSibling || dom.innerText.split('\n').length < 10) return;

                            let code = dom.innerText;
                            code = code.replace(new RegExp(String.fromCharCode(160), 'g'), String.fromCharCode(32));

                            dom.style.height = code.split('\n').length * 16 + 'px';
                            dom.innerText = '';
                            dom.$ace = ace.edit(dom, {
                                mode: 'ace/mode/html',
                                selectionStyle: 'line',
                                readOnly: true,
                            });

                            this.updateACEInContent(dom, code);
                        });
                    });
                    return;
                }

                this.content = '';
            },

            chooseTitle (item) {
                if (item.type === 'folder') {
                    return;
                }

                if (this.currentTitle === item.name) {
                    return;
                }

                window.location.hash = this.currentTitle = item.name;
                this.$nextTick(() => {
                    document.querySelector('.content').scrollTo(0, 0);
                });

                this.updateContent();

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
                // 还没加载完ace或者babel
                const acePlugin = ace.require(this.isDebuggingJSX ? 'ace/mode/jsx' : 'ace/mode/html');
                if (!acePlugin) {
                    this.$ace.setValue('// Babel初始化中，请稍后');
                    setTimeout(() => {
                        this.debug(code);
                    }, 500);
                    return;
                }

                if (code) {
                    this.$ace.setValue(String(code));
                } else {
                    code = this.$ace.getValue();
                }

                const JavaScriptMode = acePlugin.Mode;
                this.$ace.session.setMode(new JavaScriptMode());

                this.$ace.clearSelection();
                this.$ace.moveCursorTo(0, 0);
                this.$ace.scrollToLine(0)

                let iframeHtmlCodes;

                if (this.isDebuggingJSX) {
                    // todo: 检测window.EasycanvasJSXTransformer等是否被js文件初始化完

                    // import 'xx' ====> const {} = xxx;
                    code = code.replace(/import/g, 'const').replace(/from\ [\'|\"]easycanvas[\'|\"]/g, '= Easycanvas');

                    const result = window.Babel.transform(code, {
                        plugins: [
                            EasycanvasBabelPlugin,
                            require('@babel/plugin-proposal-class-properties')
                        ]
                    });
                    code = result.code;

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
                            <script src="./lib/easycanvas/components.standalone.prod.js"></script>
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
