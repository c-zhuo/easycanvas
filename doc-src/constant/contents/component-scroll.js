module.exports = `
    <article id="滚动组件scroll">
        <h1>滚动组件scroll</h1>

        <p>scroll提供了类似css中<strong>overflow: scroll;</strong>的功能。</p>

        <p class="tip">其原理是创建一个容器Sprite，监听touch和wheel（鼠标滚轮）事件，调整内部的元素位置。</p>

        <h2>引入方式</h2>

        <code>
            <!-- js文件方式引入 -->
            <!-- 注意放在easycanvas.js后；prod为线上压缩版、dev为开发版；开发版带有调试、警告信息 -->

            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/components.standalone.prod.js"></script>

            <!-- node环境引入 -->

            import Easycanvas from 'easycanvas';
            import EasycanvasComponentScroll from 'easycanvas/build/components.js';

            // node环境中引入，可以指定组件名称，作为“命名空间”，防止多个组件重复
            Easycanvas.component(EasycanvasComponentScroll.scroll, 'scroll');
        </code>

        <h2>使用</h2>

        <p>创建组件时，需要用Easycanvas.Scroll来创建一个Sprite。<strong>将style中的overflow设置为scroll可以指定允许滚动，也可以用overflowX和overflowY设置单个方向是否允许滚动</strong>，Demo如下：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/components.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                    <p id="eventName">中间的黑色框内的内容可以上下滚动</p>
                </body>

                <script>
                    var $app = new Easycanvas.Painter();
                    $app.register(document.getElementById('app'), {
                        width: 400,
                        height: 400,
                    });
                    $app.start();

                    var $ScrollBox = $app.add(Easycanvas.Scroll({
                        name: 'ScrollBox',
                        style: {
                            left: 50,
                            top: 0,
                            width: $app.width - 100,
                            height: $app.height,
                            locate: 'lt',
                            border: '1 #000',
                            backgroundColor: '#ddd',
                            overflowY: 'scroll',
                            overflowX: 'hidden', // 因为默认值为hidden，可以不设置
                            zIndex: 2
                        },
                    }));

                    var imgSrc = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png';

                    for (var i = 0; i < 10; i++) {
                        $ScrollBox.add({
                            content: {
                                img: imgSrc
                            },
                            style: {
                                left: $app.width / 2 - 50, top: 100 + i * 200,
                                width: 100 + i * 10, height: 100 + i * 10,
                            },
                            events: {
                                click: function () {
                                    this.style.opacity = this.style.opacity === 1 ? 0.5 : 1;
                                },
                            }
                        });
                    }

                    $app.add({
                        content: {
                            img: imgSrc
                        },
                        style: {
                            left: 0, top: $app.height / 2,
                            width: $app.width / 2, height: $app.width / 2,
                            zIndex: 1,
                        },
                    });
                    $app.add({
                        content: {
                            img: imgSrc
                        },
                        style: {
                            left: $app.width, top: $app.height / 2,
                            width: $app.width / 2, height: $app.width / 2,
                            zIndex: 1,
                        },
                        scroll: {
                            smooth: 0.9
                        }
                    });

                    $ScrollBox.trigger('scrollTo', 0, 500, 300, () => {
                        $ScrollBox.trigger('scrollTo', 0, 0, 300);
                    });
                </script>
            </code>
        </section>

        <p>scroll组件拥有如下属性，例如<strong>创建对象时Sprite.scroll.scrollY为0可以立即调整滚动位置到顶部</strong>。所有的API如下：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">API</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">scrollX / scrollY</td>
                    <td align="left">横、纵向滚动距离</td>
                </tr>
                <tr>
                    <td align="left">minScrollX / minScrollY</td>
                    <td align="left">横、纵向最小滚动距离，默认为0</td>
                </tr>
                <tr>
                    <td align="left">maxScrollX / maxScrollY</td>
                    <td align="left">横、纵向最大滚动距离，默认自适应，一旦赋值将取消自适应</td>
                </tr>
                <tr>
                    <td align="left">flexible / flexibleX / flexibleY</td>
                    <td align="left">是否开启弹性拉伸效果，默认为false</td>
                </tr>
                <tr>
                    <td align="left">smooth</td>
                    <td align="left">速度衰减系数，默认0.9，设置0代表立即停止，1代表不减速</td>
                </tr>
                <tr>
                    <td align="left">capture</td>
                    <td align="left">捕获内部的事件，默认false，为true时会阻止touchstart、touchmove、wheel等滚动相关事件在内部传递，在移动端可以提升滚动性能；注意：多个scroll嵌套时，外层设置为capture将阻止内部scroll的功能</td>
                </tr>
            </tbody>
        </table>

        <p>scroll组件有一些事件，例如 Sprite.trigger('scrollTo', 0, 100, 500) 可以让容器在0.5秒的时间内滚动至100：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">API</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">scrollTo(left, top, [duration])[.then(callback)]</td>
                    <td align="left">纵向滚动至position位置，耗时duration（默认200毫秒），执行完成后触发callback回调</td>
                </tr>
            </tbody>
        </table>
    </article>
`;
