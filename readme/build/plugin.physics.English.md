#### Easycanvas > plugin > physics

### Physics

This brings a physics engine, 'Chipmunk-js', to easycanvas.

```
    import Easycanvas from 'easycanvas';
    import EasycanvasPhysics from 'easycanvas/build/plugin.physics.js';
```

This plugin supports gravity, friction, mass, elasticity for sprites, by creating `physics` class. This example creates an empty container which has gravity inside.

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

If it contains other sprites, they will fall down because of the gravity. Now we create a physical ball into the box:

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

`shape` means shapes of a sprite, used to checking impacts. `shape` is an array, containing key points or lines. Describing a circle needs only one value, includes left and top position, and the radius. In the last example, it means the physical center is (10, 10) of the 20x20 size sprite, with 10 radius.

`shape` can describe polygons. For example, '[[0, 0], [61, 0], [61, 38], [0, 38], [0, 0]]' means a rectangle(the last point can be omitted). Notice, points need to be described in a clockwise direction.

`mass` means mass :), `friction` and `elasticity` set from 0 to 1. If two sprite with zero friction impact each other, the speed never slow down. If elasticities are zero, they will not separate after a face-to-face collision. `moment` is also supported. If not declared, a default value will be set by calculating the shapes and mass.

Ater `launch` and `physicsOn`, calculating of physic starts and the ball falls down. `launch` is used to a container, and `physicsOn` to a sprite which is in a physical container. `physicsOff` is used to temporarily remove the physics.
