module.exports = `
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
                    var G = 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var handler = function ($e) {
                        document.getElementById('eventName').innerHTML = JSON.stringify({
                            type: $e.type,
                            x: $e.canvasX,
                            y: $e.canvasY,
                        }) + '<br>' + document.getElementById('eventName').innerHTML;
                    };

                    var $foo = new Easycanvas.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100,
                            tx: 100, ty: 100,
                        },
                        events: {
                            contextmenu: function ($e) {
                                alert('禁止鼠标右键菜单');
                                $e.event.preventDefault();
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

        <p><strong>目前支持的事件包括"click", "touchstart", "touchmove", "touchend", "mousedown", "mousemove", "mouseup", "mouseout", "mousewheel", "contextmenu"</strong>，此外还扩展了<strong>"hold"</strong>事件，长按时会连续触发（无论是鼠标还是触屏）。以及<strong>"touchout"</strong>事件，当手指划出某个sprite时触发。</p>

        <p>Easycanvas支持事件的“浏览器端-移动端”转换。例如一个元素绑定了mousedown事件，那么在移动端进行touchstart的时候，这个事件也会触发。反之亦然。但是如果一个元素同时绑定了mousedown和touchstart事件，那么将只触发一个。</p>

        <h2>事件的触发顺序</h2>

        <p><strong>默认情况下，事件将按照渲染层次（sprite类的style.zIndex属性）的顺序，从高到低依次触发，直到某一个监听函数返回了true。</strong>例如下面这个例子：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>这里重叠了三个字母G</p>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 200,
                        height: 200
                    });

                    $app.add(new Easycanvas.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100,
                            tx: 100, ty: 100,
                            zIndex: 3,
                        },
                        events: {
                            click: function () {
                                alert('zIndex 3 received');
                            },
                        },
                    }));
                    $app.add(new Easycanvas.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100,
                            tx: 100, ty: 100,
                            zIndex: 1,
                        },
                        events: {
                            click: function () {
                                alert('zIndex 1 received');
                            },
                        },
                    }));
                    $app.add(new Easycanvas.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100,
                            tx: 100, ty: 100,
                            zIndex: 2,
                        },
                        events: {
                            click: function () {
                                alert('zIndex 2 received');
                                // 返回true，将事件结束，这样下层的元素将不再触发事件
                                return true;
                            },
                        },
                    }));

                    $app.start();
                </script>
            </code>
        </section>

        <p><strong>如果需要自定义事件的触发顺序，可以在events中指定eIndex。</strong>这样事件的先后判定将不使用zIndex，可能会与看到的层次不同，所以不建议大量使用这个API，以免降低调试的效率。例如下面这个例子，zIndex大的、eIndex小，反而后响应到事件：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>点击中间重叠的部分，会发现下层的sprite先捕捉到了事件</p>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 200,
                        height: 200
                    });

                    $app.add(new Easycanvas.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100, ty: 100,
                            tx: 100, rotate: 0, zIndex: 1,
                        },
                        events: {
                            click: function () {
                                this.style.rotate += 180;
                                return true;
                            },
                        },
                    }));
                    $app.add(new Easycanvas.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100, ty: 100,
                            tx: 150, rotate: 0, zIndex: 2,
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

        <p>嵌套的元素不会进行事件的冒泡传递，例如一个sprite的child触发了事件，那么这个sprite不一定会触发这个事件，取决于父元素的实际范围。这点与javascript在dom上的事件传递规则不同。</p>

        <p>当存在sprite的嵌套时，<strong>sprite触发事件的顺序会受到parent层级的影响</strong>，例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/chenzhuo1992/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 200,
                        height: 200
                    });

                    var $parent1 = $app.add(new Easycanvas.sprite({
                        style: {
                            tx: 100, ty: 100
                        },
                        events: {
                            eIndex: 1,
                            click: function () {
                                alert('parent 1 received');
                            }
                        }
                    }));
                    var $parent2 = $app.add(new Easycanvas.sprite({
                        style: {
                            tx: 100, ty: 100,
                            tw: 100, th: 100,
                            locate: 'lt',
                        },
                        events: {
                            eIndex: 2,
                            click: function () {
                                alert('parent 2 received');
                            }
                        }
                    }));

                    $parent1.add(new Easycanvas.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100,
                            locate: 'lt',
                        },
                        events: {
                            eIndex: 200,
                            click: function () {
                                alert('child of parent 1 received');
                            },
                        },
                    }));
                    $parent2.add(new Easycanvas.sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            tw: 100, th: 100,
                            locate: 'lt',
                        },
                        events: {
                            eIndex: 100,
                            click: function () {
                                alert('child of parent 2 received');
                            },
                        },
                    }));

                    $app.start();
                </script>
            </code>
        </section>

        <p>在这个例子中，$parent2的eIndex比$parent1高，因此$parent2以及它的child都会比$parent1先触发事件。而$parent1没有宽高（只是一个点），不会被点击到，所以无法触发事件（这一点与HTML的事件不同）。</p>

        <p class="tip">Tips：如果有eIndex属性，那么无论zIndex是多少都不影响事件的顺序。例如，如果这里$parent2的child的eIndex是负值，那么触发顺序将是$parent2、$parent2的child、$parent1的child.触发顺序和javascript在DOM上的规则是一致的。</p>
    </article>
`;
