module.exports = `
    <article id="Scroll-滑动组件">
        <h1>Scroll-滑动组件</h1>

        <p>scroll提供了类似<strong>overflow: scroll;</strong>的功能。</p>

        <p class="tip">其原理是创建一个容器sprite，监听touch和wheel（鼠标滚轮）事件，调整内部的元素位置。</p>

        <h2>引入方式</h2>

        <code>
            <!-- js文件方式引入 -->
            <!-- 注意放在easycanvas.js后；prod为线上压缩版、dev为开发版；开发版带有调试、警告信息 -->

            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/component.scroll.standalone.prod.js"></script>

            <!-- node环境引入 -->

            import Easycanvas from easycanvas;
            import EasycanvasComponentScroll from easycanvas/build/component.scroll.js;

            // node环境中引入，可以指定组件名称，作为“命名空间”，防止多个组件重复
            Easycanvas.component(EasycanvasComponentScroll, 'scroll');
        </code>

        <h2>使用</h2>

        <p>可以通过为sprite类的webgl追加_3ds属性来导入3DS模型。_3ds属性的值为3DS文件的地址，将在sprite对象创建时发起加载，异步加载成功后进行渲染，如下例：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/component.scroll.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.painter();
                    $app.register(document.getElementById('app'), {
                        fullScreen: true,
                    });
                    $app.start();

                    var $ScrollBox = $app.add(new Easycanvas.class.scroll({
                        name: 'ScrollBox',
                        style: {
                            tx: 0,
                            ty: 0,
                            tw: $app.width,
                            th: $app.height,
                            locate: 'lt',
                        },
                        scroll: {
                            scrollable: true,
                            minScrollX: 0,
                            maxScrollX: 0,
                            minScrollY: 0,
                            maxScrollY: $app.height,
                        },
                    }));

                    var imgSrc = 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png';

                    for (var i = 0; i < 10; i++) {
                        $ScrollBox.add({
                            content: {
                                img: imgSrc
                            },
                            style: {
                                tx: $app.width / 2, ty: 100 + i * 300,
                                tw: 100 + i * 10, th: 100 + i * 10,
                            },
                            events: {
                                click: function () {
                                    this.style.opacity = this.style.opacity === 1 ? 0.5 : 1;
                                },
                            }
                        });
                    }
                </script>
            </code>
        </section>
    </article>
`;
