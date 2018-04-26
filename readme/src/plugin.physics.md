#### Easycanvas > plugin > physics

[Chinese]### 物理引擎
[English]### Physics

[Chinese]为Easycanvas引入了Chipmunk-js作为物理引擎。
[English]This brings a physics engine, 'Chipmunk-js', to easycanvas.

```
    import Easycanvas from 'easycanvas';
    import EasycanvasPhysics from 'easycanvas/build/plugin.physics.js';
```

[Chinese]这个扩展为每个Easycanvas的sprite提供了重力、摩擦、弹力等扩展属性，使用时需要创建`physics`对象。下例创建了一个空的容器，并指定了容器的重力。
[English]This plugin supports gravity, friction, mass, elasticity for sprites, by creating `physics` class. This example creates an empty container which has gravity inside.

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

[Chinese]当box中包含其它元素时，元素将受到重力的影响向下坠落。下例创建了一个球形物理对象并扔入box中：
[English]If it contains other sprites, they will fall down because of the gravity. Now we create a physical ball into the box:

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

[Chinese]其中，`shape`代表对象的“物理性状”，将用于碰撞检测中。`shape`是一个Array，包含一系列的关键路径。如果是圆形，那么只需要一个值，三个参数分别为圆心的left、top坐标（同css，以图片左上角为原点）以及半径。如上例，元素的宽高（tw与th）为20，则shape是以(10,10)的位置绘制一个半径为10的圆，用于碰撞检测。
[English]`shape` means shapes of a sprite, used to checking impacts. `shape` is an array, containing key points or lines. Describing a circle needs only one value, includes left and top position, and the radius. In the last example, it means the physical center is (10, 10) of the 20x20 size sprite, with 10 radius.

[Chinese]`shape`支持多边形。例如'[[0, 0], [61, 0], [61, 38], [0, 38], [0, 0]]'代表了几个点依次连接所围成的一个矩形（最后一个0,0坐标可以省略）。但是要注意的是，坐标点必须顺时针进行描述。
[English]`shape` can describe polygons. For example, '[[0, 0], [61, 0], [61, 38], [0, 38], [0, 0]]' means a rectangle(the last point can be omitted). Notice, points need to be described in a clockwise direction.

[Chinese]`mass`代表一个对象的质量，`friction`代表摩擦系数（0至1，两个摩擦系数都为0的物体相互摩擦将不会减速），`elasticity`代表弹性系数（0至1，两个弹性为0的物体迎面碰撞后将不分离）。此外，还支持`moment`参数，用于描述物体的转动惯量，不设置时会根据形状，将质量均摊来得出一个默认值。
[English]`mass` means mass :), `friction` and `elasticity` set from 0 to 1. If two sprite with zero friction impact each other, the speed never slow down. If elasticities are zero, they will not separate after a face-to-face collision. `moment` is also supported. If not declared, a default value will be set by calculating the shapes and mass.

[Chinese]调用`launch`和`physicsOn`之后，box中的元素将开始按物理学进行运动：ball将落下。其中，`launch`代表对某个“物理容器”进行初始化；`physicsOn`代表某个“物理对象”开始在容器中运动，必须在上游的某个节点执行过`launch`之后才可以使用。通过`physicsOff`可以暂时关闭它的物理特性。
[English]Ater `launch` and `physicsOn`, calculating of physic starts and the ball falls down. `launch` is used for a container, and `physicsOn` for a sprite which is in a physical container. `physicsOff` is used for temporarily removing the physics effect of a sprite.
