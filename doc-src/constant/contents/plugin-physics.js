module.exports = `
    <article id="物理引擎">
        <h1>物理引擎</h1>

        <p>Easycanvas使用的物理引擎是chipmunk，这个引擎拥有c与js版本，被Cocos2d、Hilo使用。</p>

        <p>这里将介绍如何给Sprite一些物理规则，产生重力、碰撞的效果，以及如何对他们施加力、自定义碰撞的处理等。</p>
        
        <h2>引入方式</h2>

        <code>
            <!-- js文件方式引入 -->
            <!-- 注意放在easycanvas.js后；prod为线上压缩版、dev为开发版；开发版带有调试、警告信息 -->

            <script src="http://your-path/easycanvas.standalone.prod.js"></script>
            <script src="http://your-path/plugin.physics.standalone.prod.js"></script>
        </code>
        <code>
            <!-- node环境引入 -->

            import Easycanvas from easycanvas;
            import EasycanvasPhysics from easycanvas/build/plugin.physics.js;

            Easycanvas.extend(EasycanvasPhysics);
        </code>

        <h2>重力、弹力、摩擦</h2>

        <p>物理引擎插件是对Easycanvas的Sprite类进行扩展。<strong>在创建一个Sprite实例时，指定了physics属性，这个实例才可以使用下列由physics插件提供的物理API</strong>。</p>

        <p>Sprite类的physics对象包含shape（形状）、mass（质量）、friction（摩擦系数，通常0～1之间）、elasticity（弹性系数，通常0～1之间）、collisionType（碰撞类型，后面会详细介绍）、static（是否静态）等。这些属性有的会相互覆盖，例如一个Sprite是静态的物理对象（static为true），那么他的mass（质量）其实没有任何作用。</p>

        <p><strong>拥有物理属性的Sprite并不会一开始就遵循物理规则，需要通过launch或者physicsOn方法来开始运算</strong>。当我们在一个Sprite上调用launch方法，那么这个Sprite将成为一个物理容器（更准确的说，是一个物理空间space），其内部的物理规则才会启用，例如物理计算的时间粒度、内部重力系数。如下例：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.physics.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter();
                    $app.register(document.getElementById('app'), {
                        width: 400,
                        height: 400,
                    });
                    $app.start();

                    var BALL = Easycanvas.ImgLoader('https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png');

                    var $space = new Easycanvas.Sprite({
                        physics: {
                            gravity: 1,
                            accuracy: 1,
                        },
                    });
                    $app.add($space);

                    // 从这个时刻启，$space的物理规则生效
                    $space.launch();

                    var $letterG = new Easycanvas.Sprite({
                        name: 'ball',
                        content: {
                            img: BALL,
                        },
                        physics: {
                            // 形状是一个以(10,10)为圆心的，半径8的圆
                            shape: [
                                [10, 10, 8]
                            ],
                            mass: 0.1, // 质量
                            friction: 0.2, // 摩擦
                            elasticity: 1, // 弹性
                            collisionType: 1,
                        },
                        style: {
                            width: 20, height: 20,
                            left: 200, top: 50,
                        },
                    });
                    $space.add($letterG);

                    // 从这个时刻启，$letterG的物理运算将开启（会开始下落）
                    $letterG.physicsOn();

                    var $border = $space.add(new Easycanvas.Sprite({
                        physics: {
                            shape: [
                                // 这里是由四条线段围成的方框，作为边界
                                [[0, 0], [0, 400]],
                                [[0, 0], [400, 0]],
                                [[400, 400], [400, 0]],
                                [[400, 400], [0, 400]],
                            ],
                            friction: 1,
                            elasticity: 0.9,
                            collisionType: 1,
                            static: true
                        },
                        style: {
                            left: 0, top: 0, width: 400, height: 400,
                            locate: 'lt',
                        },
                    }));

                    // 从这个时刻启，$border的物理运算将开启
                    $border.physicsOn();
                </script>
            </code>
        </section>

        <h2>施加力和速度</h2>

        <p>除了上面的API，每一个物理Sprite对象还拥有physicsApplyForce（施加力）、physicsResetForces（清除力）、physicsSetVelocity（设置速度）、physicsGetVelocity（获取速度）等API，例如：</p>

        <section>
            <div class="code-2-demo bg-demo"></div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.physics.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter();
                    $app.register(document.getElementById('app'), {
                        width: 400,
                        height: 400,
                    });
                    $app.start();

                    var BALL = Easycanvas.ImgLoader('https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png');

                    var $space = new Easycanvas.Sprite({
                        physics: {
                            gravity: 1,
                            accuracy: 2,
                        },
                    });
                    $app.add($space);

                    $space.launch();

                    var $letterG = new Easycanvas.Sprite({
                        name: 'ball',
                        content: {
                            img: BALL,
                        },
                        physics: {
                            // 形状是一个以(10,10)为圆心的，半径8的圆
                            shape: [
                                [10, 10, 8]
                            ],
                            mass: 1, // 质量
                            friction: 0.2, // 摩擦
                            elasticity: 1, // 弹性
                            collisionType: 1,
                        },
                        style: {
                            width: 20, height: 20,
                            left: 200, top: 150,
                        },
                    });
                    $space.add($letterG);

                    $letterG.physicsOn();

                    // 持续施加向右的作用力
                    $letterG.physicsApplyForce({
                        x: 100, y: 0
                    });

                    // 设置对象的初始速度（y为负值代表向上）
                    $letterG.physicsSetVelocity({
                        x: 0, y: -300
                    });

                    // 取消刚才施加的力的作用
                    setTimeout(function () {
                        $letterG.physicsResetForces();
                    }, 1000)

                    var $border = $space.add(new Easycanvas.Sprite({
                        physics: {
                            shape: [
                                [[0, 0], [0, 400]],
                                [[0, 0], [400, 0]],
                                [[400, 400], [400, 0]],
                                [[400, 400], [0, 400]],
                            ],
                            friction: 1,
                            elasticity: 0.9,
                            collisionType: 1,
                            static: true
                        },
                        style: {
                            left: 0, top: 0, width: 400, height: 400,
                            locate: 'lt',
                        },
                    }));
                    $border.physicsOn();
                </script>
            </code>
        </section>

        <p>Easycanvas并没有失重的API，也不支持动态切换物体的static的属性。但是这些功能可以通过基础API的调用实现。例如“失重”这个功能，可以通过给对象施加一个持续向上的作用力来实现。</p>

        <p class="tip">Tips：为了简化运算，物理学中的万有引力G在这里相当于gravity的500倍，而不是“9.8米每平方秒”的那个G。</p>

        <h2>API</h2>

        <p>物理容器和物理对象都通过new Easycanvas.Sprite方法创建，创建时必须含有physics参数。</p>

        <p>创建物理容器时，physics需要以下两个参数，之后可以通过launch方法启动内部物理规则。</p>

        <table>
            <thead>
                <tr>
                    <th align="left">参数</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">gravity</td>
                    <td align="left">Number，重力系数，方向向下为正，默认为2（重力=重力系数*500）</td>
                </tr>
                <tr>
                    <td align="left">accuracy</td>
                    <td align="left">Number，时间流逝速度，默认为2（可以理解为1为慢放、4为二倍速），需要整数</td>
                </tr>
            </tbody>
        </table>

        <p>物理对象拥有如下参数：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">参数</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">static</td>
                    <td align="left">Boolean，是否为静态物体，默认为false；静态物体不会因为受到力的作用而产生位移，当然也不受重力影响，通常代表地面、场景边界等</td>
                </tr>
                <tr>
                    <td align="left">mass</td>
                    <td align="left">Number，质量，static不为true的物体必须拥有质量</td>
                </tr>
                <tr>
                    <td align="left">moment</td>
                    <td align="left">Number，转动惯量，选填；越大代表物体越不容易发生转动，默认会根据物体的形状及质量进行自动估算</td>
                </tr>
                <tr>
                    <td align="left">friction</td>
                    <td align="left">Number/Array，摩擦系数，通常0～1之间，默认为0；使用数组时可以对对应的shape单独设置</td>
                </tr>
                <tr>
                    <td align="left">elasticity</td>
                    <td align="left">Number/Array，弹性系数，通常0～1之间，默认为0；使用数组时可以对对应的shape单独设置</td>
                </tr>
                <tr>
                    <td align="left">collisionType</td>
                    <td align="left">Number/Array，碰撞类型，默认为0；通常用于自定义碰撞事件处理；使用数组时可以对对应的shape单独设置</td>
                </tr>
                <tr>
                    <td align="left">shape</td>
                    <td align="left">Array，形状集合，包含多个子形状。每个子形状也是一个Array类型。对于每个子形状：[a, b, r]代表圆，[[a1, b1], [a2, b2]]代表一条线（此时static必须为true），[[a1, b1], [a2, b2], [a3, b3], [aN, bN]]代表N边形。注意：“线段”只有当static为true时才可以使用。</td>
                </tr>
            </tbody>
        </table>

        <p>物理对象在调用physicsOn之后，会开始物理规则的运算。之后可以使用以下API：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">API</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">physicsOff()</td>
                    <td align="left">停止当前的物理规则运算（可以修改Sprite.physics对象的参数后重新调用physicsOn，）</td>
                </tr>
                <tr>
                    <td align="left">physicsSetVelocity({x: Number, y: Number})</td>
                    <td align="left">设置物体的速度</td>
                </tr>
                <tr>
                    <td align="left">physicsGetVelocity()</td>
                    <td align="left">查询物体的速度，返回 {x: Number, y: Number}</td>
                </tr>
                <tr>
                    <td align="left">physicsSetAngelVelocity(Number)</td>
                    <td align="left">设置物体的角速度</td>
                </tr>
                <tr>
                    <td align="left">physicsGetAngelVelocity()</td>
                    <td align="left">查询物体的角速度，返回 Number</td>
                </tr>
                <tr>
                    <td align="left">physicsApplyImpulse({x, y}, {x, y})</td>
                    <td align="left">给某个物体一个冲量（可以理解为瞬时的力，会立即改变物体的速度），参数分别为冲量矢量及作用点（作用点默认为{x: 0, y: 0}，代表中心）</td>
                </tr>
                <tr>
                    <td align="left">physicsApplyForce({x, y}, {x, y})</td>
                    <td align="left">给某个物体施加一个力（持续施加），参数分别为力矢量及作用点（作用点默认为{x: 0, y: 0}，代表中心）</td>
                </tr>
                <tr>
                    <td align="left">physicsResetForces()</td>
                    <td align="left">移除某个物体受到的全部力（重力除外）</td>
                </tr>
            </tbody>
        </table>

        <p>物理对象拥有以下钩子：</p>

        <table>
            <thead>
                <tr>
                    <th align="left">hook</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">physicsCollisionBegin(b, type, cp, space)</td>
                    <td align="left">碰撞开始的钩子；发生碰撞的两个物体各触发一次（如果其中一个是静态物体，那么静态物体后触发）；任一返回true，都将取消物理计算（即物体将会重叠，弹性、摩擦等不起作用，不会触发physicsCollisionPreSolve和physicsCollisionPostSolve）；物体分离之前不会再次触发这个钩子</td>
                </tr>
                <tr>
                    <td align="left">physicsCollisionPreSolve(b, type, cp, space)</td>
                    <td align="left">碰撞处理前的钩子；发生碰撞的两个物体各触发一次（如果其中一个是静态物体，那么静态物体后触发）；任一返回true，都将取消物理计算（不会触发physicsCollisionPostSolve）；在物体分离前会连续调用（每帧调用accuracy次）</td>
                </tr>
                <tr>
                    <td align="left">physicsCollisionPostSolve(b, type, cp, space)</td>
                    <td align="left">碰撞处理后的钩子；返回值无作用。</td>
                </tr>
                <tr>
                    <td align="left">physicsCollisionSeparate(b, type, cp, space)</td>
                    <td align="left">物体分离的钩子；返回值无作用。</td>
                </tr>
            </tbody>
            <thead>
                <tr>
                    <th align="left">参数</th>
                    <th align="left">描述</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td align="left">this</td>
                    <td align="left">钩子中的this指向当前Sprite对象</td>
                </tr>
                <tr>
                    <td align="left">b</td>
                    <td align="left">指向发生碰撞的另一个Sprite对象</td>
                </tr>
                <tr>
                    <td align="left">type</td>
                    <td align="left">发生碰撞的另一个Sprite对象的碰撞类型，等于b.physics.collisionType</td>
                </tr>
                <tr>
                    <td align="left">cp</td>
                    <td align="left">碰撞的全部细节，是一个chipmunk对象。包括方向、2个shape等，详情参考<a target="_blank" href="http://wingedrobin.github.io/Chipmunk-js/cp.CollisionHandler.html#begin">这里</a></td>
                </tr>
                <tr>
                    <td align="left">space</td>
                    <td align="left">物理空间，是一个chipmunk的Space对象。space.$Sprite将指向物理容器的Sprite实例。更多的API见<a target="_blank" href="http://wingedrobin.github.io/Chipmunk-js/cp.Space.html">这里</a></td>
                </tr>
            </tbody>
        </table>

        <p class="tip">Tips：此外，launch方法也会返回chipmunk物理引擎的Space对象，可以用于<a target="_blank" href="http://wingedrobin.github.io/Chipmunk-js/cp.CollisionHandler.html#begin">设置全局的监听函数</a>、遍历所有<a target="_blank" href="http://wingedrobin.github.io/Chipmunk-js/cp.Space.html#eachBody">物体</a>或者<a target="_blank" href="http://wingedrobin.github.io/Chipmunk-js/cp.Space.html#eachShape">形状</a>等。</p>
    </article>
`;
