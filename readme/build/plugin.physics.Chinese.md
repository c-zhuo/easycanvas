#### Easycanvas > plugin > physics

### 物理引擎

为Easycanvas引入了Chipmunk-js作为物理引擎。

```
    import Easycanvas from 'easycanvas';
    import EasycanvasPhysics from 'easycanvas/build/plugin.physics.js';
```

这个扩展为每个Easycanvas的sprite提供了重力、摩擦、弹力等扩展属性，使用时需要创建`physics`对象。下例创建了一个空的容器，并指定了容器的重力。

```
    var box = new Easycanvas.class.physics({
        content: {
            img: img,
        },
        style: {
            tx: 200,
            ty: 100,
        },
        physics: {
            gravity: 1,
        },
    });
    $Painter.add(box);
```

当box中包含其它元素时，元素将受到重力的影响向下坠落。下例创建了一个球形物理对象并扔入box中：

```
    var ball = new Easycanvas.class.physics({
        content: {
            img: img,
        },
        style: {
            tx: 200, ty: 100,
            tw: 20, ty: 20,
        },
        physics: {
            shape: [
                [10, 10, 10],
            ],
            mass: 10,
            friction: 0.5,
            elasticity: 0.5,
        },
    });
    box.add(ball);
    box.launch();
    ball.physicsOn();
```

其中，`shape`代表对象的“物理性状”，将用于碰撞检测中。`shape`是一个Array，包含一系列的关键路径。如果是圆形，那么只需要一个值，三个参数分别为圆心的left、top坐标（同css，以图片左上角为原点）以及半径。如上例，元素的宽高（tw与th）为20，则shape是以(10,10)的位置绘制一个半径为10的圆，用于碰撞检测。

`shape`支持多边形。例如'[[0, 0], [61, 0], [61, 38], [0, 38], [0, 0]]'代表了几个点依次连接所围成的一个矩形（最后一个0,0坐标可以省略）。但是要注意的是，坐标点必须顺时针进行描述。

`mass`代表一个对象的质量，`friction`代表摩擦系数（0至1，两个摩擦系数都为0的物体相互摩擦将不会减速），`elasticity`代表弹性系数（0至1，两个弹性为0的物体迎面碰撞后将不分离）。此外，还支持`moment`参数，用于描述物体的转动惯量，不设置时会根据形状，将质量均摊来得出一个默认值。

调用`launch`和`physicsOn`之后，box中的元素将开始按物理学进行运动：ball将落下。其中，`launch`代表对某个“物理容器”进行初始化；`physicsOn`代表某个“物理对象”开始在容器中运动，必须在上游的某个节点执行过`launch`之后才可以使用。通过`physicsOff`可以暂时关闭它的物理特性。
