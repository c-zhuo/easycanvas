export default `
    <article id="嵌套与继承">
        <h1>嵌套与继承</h1>

        <p>这里将介绍父子Sprite之间的嵌套关系及属性继承。将一些具有方法、事件绑定的Sprite抽离出来，便于被其它项目或者模块嵌套，可以显著提升开发效率。</p>
        
        <h2>嵌套</h2>

        <p>嵌套让树型结构更加清晰，既便于大型动画的设计，又可以更方便地在开发者工具中找到要调试的特定Sprite。嵌套的父、子级Sprite之间有属性的继承规则，类似HTML和CSS一样。</p>

        <p>下面是一个例子，最顶层是一个字母G，它又含有两个children。两个children的位置是继承父级Sprite的。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    // 父级Sprite
                    var $parent = new Easycanvas.Sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            width: 50, height: 50,
                            top: 50, left: Easycanvas.Transition.pendulum(50, 150, 4000).loop(),
                        },
                        // 可以通过children属性来指定它的子节点Sprite
                        children: [{
                            content: {
                                img: G,
                            },
                            style: {
                                left: 50, top: 0,
                                width: 20, height: 20,
                            }
                        }],
                    });

                    $app.add($parent);
                    $app.start();

                    // 也可以通过add来动态增加子节点Sprite
                    $parent.add(new Easycanvas.Sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            width: 20, height: 20,
                            left: 50, top: 50,
                        }
                    }));
                </script>
            </code>
        </section>

        <p>第一个child是放在了children属性里，直接挂载在parent上面的。<strong>当创建一个Sprite类的时候，children中的每一个object都会被转化为Sprite类.</strong>因此，这两个child的添加方式本质上没有任何区别。</p>

        <p>可以通过remove方法来移除某一个Sprite，还是上面这个例子：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>点击小的字母G时调用remove方法</p>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var $parent = new Easycanvas.Sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            width: 50, height: 50,
                            top: 50, left: Easycanvas.Transition.pendulum(50, 150, 4000).loop(),
                        },
                        // 这里通过children增加第一个子Sprite
                        children: [{
                            content: {
                                img: G,
                            },
                            style: {
                                width: 20, height: 20,
                                left: 100, top: 0,
                            },
                            events: {
                                click: function () {
                                    this.remove();
                                }
                            }
                        }],
                    });

                    // 这里通过add增加第二个子Sprite
                    $parent.add(new Easycanvas.Sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            width: 20, height: 20,
                            left: 100, top: 80,
                        },
                        events: {
                            click: function () {
                                this.remove();
                            }
                        }
                    }));

                    $app.add($parent);
                    $app.start();
                </script>
            </code>
        </section>

        <p>关于events的具体用法将在后续介绍。</p>

        <p><strong>每一个子Sprite都有一个$parent属性，指向它的父级Sprite</strong>。根实例没有$parent属性。例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <script>
                    var $a = new Easycanvas.Sprite();
                    var $b = new Easycanvas.Sprite();
                    $b.add($a);

                    document.write($a.$parent === $b); // true

                    var c = {};
                    var $c = new Easycanvas.Sprite(c);
                    $c.add($b);

                    document.write($b.$parent === $c); // true
                    document.write($b.$parent === c); // false

                    document.write($c.$parent); // undefined
                </script>
            </code>
        </section>

        <h2>继承</h2>

        <p>子Sprite的最终位置left、top由它自身属性和父级Sprite相加得来，透明度opacity、缩放scale将相乘处理。在上面的例子中，children之所以左右摇摆，就是因为parent节点的left在左右移动。</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <body>
                    <canvas id="app"></canvas>
                    <p>看起来就像左上角源源不断地出现新的字母G</p>
                </body>

                <script>
                    var G = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png';

                    var $app = new Easycanvas.Painter({
                        el: '#app',
                        width: 400,
                        height: 400
                    });

                    var $parent = new Easycanvas.Sprite({
                        content: {
                            img: G,
                        },
                        style: {
                            width: 50, height: 50,
                            // 这里让x和y坐标从30线性变化到50，并循环（到50之后会立即变为30，开始下一次线性过度）
                            left: Easycanvas.Transition.linear(30, 50, 1000).loop(),
                            top: Easycanvas.Transition.linear(30, 50, 1000).loop(),
                        },
                    });

                    var $lastChild = $parent;

                    for (var i = 0; i < 10; i++) {
                        // 创建10个Sprite，连续嵌套10层。每一层的透明度都是上一层的0.7倍
                        var $newChild = new Easycanvas.Sprite({
                            content: {
                                img: G,
                            },
                            style: {
                                width: 50, height: 50,
                                top: 20, left: 20,
                                opacity: 0.7,
                                // 让子Sprite被父Sprite遮挡
                                zIndex: -1
                            },
                        });

                        $lastChild.add($newChild);

                        $lastChild = $newChild;
                    }

                    $app.add($parent);
                    $app.start();
                </script>
            </code>
        </section>
    </article>
`;
