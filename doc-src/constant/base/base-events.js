export default `
    <article id="事件">
        <h1>事件</h1>

        <p>这里包括事件的监听处理和顺序控制。</p>
        
        <h2>如何监听事件</h2>

        <p>Easycanvas支持几乎全部的浏览器DOM支持的事件。下面的例子简单介绍了如何监听某一个元素的事件：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p id="eventName">鼠标移上去看看</p>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var handler = function (e) {
                        document.getElementById('eventName').innerHTML = JSON.stringify({
                            type: e.type,
                            x: e.canvasX,
                            y: e.canvasY,
                        }) + '<br>' + document.getElementById('eventName').innerHTML;
                    };

                    var $foo = new Easycanvas.Sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            width: 100, height: 100,
                            left: 100, top: 100,
                        },
                        events: {
                            contextmenu: function (e) {
                                alert('禁止鼠标右键菜单');
                                e.stopPropagation();
                                e.preventDefault();
                            },
                            click: handler,
                            mousedown: handler,
                            mouseup: handler,
                            mousemove: handler,
                        },
                    });

                    $app.add($foo);
                    $app.start();
                </script>
            </code>
        </section>

        <p><strong>目前支持的事件包括"click", "touchstart", "touchmove", "touchend", "mousedown", "mousemove", "mouseup", "mouseout", "mousewheel", "contextmenu"</strong>。</p>

        <p>Easycanvas支持事件的“浏览器端-移动端”转换。例如一个元素绑定了mousedown事件，那么在移动端进行touchstart的时候，这个事件也会触发。反之亦然。但是如果一个元素同时绑定了mousedown和touchstart事件，那么将只触发一个。</p>

        <h2>事件的触发顺序</h2>

        <p><strong>事件的触发顺序和HTML中的顺序相同</strong>，即事件在层次（Sprite.style.zIndex）最高的Sprite上触发，并沿着parent逐一冒泡，直到某一个监听函数调用了stopPropagation()。例如下面这个例子：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>小的字母G是Sprite3，Sprite3位于Sprite1的Sprite2中；大的是Sprite4</p>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 200,
                        height: 200
                    });

                    var Sprite1 = $app.add({
                        style: {
                            zIndex: 2,
                        },
                        events: {
                            click: function () {
                                alert('pass to Sprite1.');
                            }
                        },
                    });

                    var Sprite2 = Sprite1.add({
                        style: {
                            width: 10, height: 20
                        },
                        events: {
                            click: function (e) {
                                alert('pass to Sprite2.');
                                e.stopPropagation();
                            }
                        },
                    });

                    var Sprite3 = Sprite2.add({
                        name: 'Sprite3',
                        content: {
                            img: G,
                        },
                        style: {
                            left: 100, top: 100,
                            width: 50, height: 50,
                        },
                        events: {
                            click: function () {
                                alert('Sprite3 trigger.');
                            }
                        },
                    });

                    var Sprite4 = $app.add({
                        name: 'Sprite4',
                        content: {
                            img: G,
                        },
                        style: {
                            left: 100, top: 100,
                            width: 150, height: 150,
                            zIndex: 1,
                        },
                        events: {
                            click: function () {
                                alert('Sprite4 trigger.');
                            }
                        },
                    });

                    $app.start();
                </script>
            </code>
        </section>

        <p><strong>preventDefault</strong>这个API也同样生效，并且可以在<strong>e.event</strong>属性中找到浏览器原生的Event对象，但Event对象的stopPropagation方法不会停止事件在Easycanvas中的冒泡，但它会阻止事件从canvas向上冒泡。</p>

        <p><strong>如果需要自定义事件的触发顺序，可以在events中指定eIndex。</strong>这样事件的先后判定将不使用zIndex，可能会与看到的层次不同，所以不建议大量使用这个API，以免降低调试的效率。例如下面这个例子，zIndex大的、eIndex小，反而后响应到事件：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>点击中间重叠的部分，会发现下层的Sprite先捕捉到了事件</p>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 200,
                        height: 200
                    });

                    $app.add(new Easycanvas.Sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            width: 100, height: 100, top: 100,
                            left: 100, rotate: 0, zIndex: 1,
                        },
                        events: {
                            click: function () {
                                this.style.rotate += 180;
                                return true;
                            },
                        },
                    }));
                    $app.add(new Easycanvas.Sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            width: 100, height: 100, top: 100,
                            left: 150, rotate: 0, zIndex: 2,
                        },
                        events: {
                            eIndex: -1,
                            click: function () {
                                this.style.rotate += 180;
                                return true;
                            },
                        },
                    }));

                    $app.start();
                </script>
            </code>
        </section>

        <p class="tip">Tips：如果有eIndex属性，那么无论zIndex是多少都不影响事件的顺序。</p>
    </article>
`;
