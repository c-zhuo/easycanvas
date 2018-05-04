/** ********** *
 *
 * Connect chipmunk.js physics lib with Easycanvas.js
 * - Standalone, as a plugin.
 *
 * ********** **/

import chipmunk from 'lib/chipmunk.js';

import utils from 'utils/utils.js';
import mathPointRotate from 'utils/math.point-rotate.js';
window.mathPointRotate = mathPointRotate;
const or = utils.firstValuable;
const PI = 3.141593;

let cp = window.cp = chipmunk;
let _ec;

Easycanvas.extend(function (opt) {
    if (!opt.physics) return

    let sprite = this;

    sprite.physics = sprite.physics || {};

    // sprite.physics.static = sprite.physics.static; // bool

    sprite.physics.shape = sprite.physics.shape || [];
    sprite.physics.gravity = or(sprite.physics.gravity, 1);
    sprite.physics.friction = or(sprite.physics.friction, 0);
    sprite.physics.elasticity = or(sprite.physics.elasticity, 0);
    sprite.physics.group = or(sprite.physics.group, 0);
    sprite.physics.collisionType = or(sprite.physics.collisionType, 0);

    if (!sprite.physics.static && sprite.physics.shape.length) {
        sprite.physics.mass = or(sprite.physics.mass, 0);

        let defaultMoment;
        if (sprite.physics.shape[0].length === 3) {
            // circle shape
            defaultMoment = cp.momentForCircle(
                sprite.physics.mass,
                0, // r1
                sprite.physics.shape[0][2], // r2
                cp.vzero // offset
            );
        } else {
            // poly shape
            let verts = sprite.physics.shape.join(',').split(',').map((_num, index) => {
                let num = Number(_num);
                // num += index % 2 ? sqSprite.$cache.ty : sqSprite.$cache.tx;
                let res = index % 2 ? -num : num;
                return res ? res : 0;
            });

            defaultMoment = cp.momentForPoly(
                sprite.physics.mass,
                verts,
                cp.vzero // offset
            );
        }
        sprite.physics.moment = or(sprite.physics.moment, defaultMoment);
    }

    sprite.launch = launch.bind(sprite);

    sprite.physicsOff = function () {
        if (!sprite.$physics) return;

        sprite.$physics.inSpace = false;
        if (sprite.$physics.body) {
            sprite.$physics.space.removeBody(sprite.$physics.body);
        }
        sprite.$physics.shape.forEach((s) => {
            sprite.$physics.space.removeShape(s);
        });

        sprite.$physics = null;
    };

    sprite.physicsOn = function () {
        sprite.$canvas.nextTick(() => {
            // 第一帧没有$cache
            sprite.$canvas.nextTick(() => {
                if (!sprite.$physics) {
                    spritePhysicsOn(sprite);
                }

                sprite.$physics.inSpace = true;

                if (sprite.$physics.body) {
                    sprite.$physics.body.setPos(new cp.Vect(
                        sprite.$cache.tx + sprite.$cache.tw / 2,
                        -sprite.$cache.ty - sprite.$cache.th / 2
                    ));
                }

                sprite.$physics.body && sprite.$physics.space.addBody(sprite.$physics.body);
                sprite.$physics.shape && sprite.$physics.shape.forEach((s) => {
                    sprite.$physics.space[sprite.physics.static ? 'addStaticShape' : 'addShape'](s);
                });
            });
        });
    };

    // sprite.remove = function () {
    //     this.physicsOff();
    //     this.__proto__.remove.call(this);
    // };

    sprite.on('beforeTick', function (_time) {
        if (!sprite.$physics || !sprite.physics) return;
        if (sprite.physics.static) return;
        if (sprite.$physics.inSpace === false) return;

        sprite.$cache && sprite.$physics.body && chip2ec(sprite.$physics.body, sprite);
    });
});

let xy2Vect = function (pos) {
    // make a mark for debugging
    // $Painter.add({
    //     name: 'tmp1',
    //     content: {
    //         img: G,
    //     },
    //     style: {
    //         tx: pos.x,
    //         ty: pos.y,
    //         tw: 10, th: 10,
    //         zIndex: 999,
    //     },
    // });

    return new cp.Vect(
        pos.x,
        pos.y ? -pos.y : 0
    );
};

let chip2ec = function (body, sprite) {
    let pos = body.getPos();
    let vel = body.getVel();
    // sprite.style.rotate = body.a;
    sprite.style.rotate = body.a * 180 / PI;
    sprite.style.tx = pos.x;
    sprite.style.ty = -pos.y;

    if (sprite.style.locate === 'lt') {
        sprite.style.tx -= sprite.$cache.tw / 2;
        sprite.style.ty -= sprite.$cache.th / 2;
    } else if (sprite.style.locate === 'ld') {
        sprite.style.tx -= sprite.$cache.tw / 2;
        sprite.style.ty += sprite.$cache.th / 2;
    } else if (sprite.style.locate === 'rd') {
        sprite.style.tx += sprite.$cache.tw / 2;
        sprite.style.ty += sprite.$cache.th / 2;
    } else if (sprite.style.locate === 'rt') {
        sprite.style.tx += sprite.$cache.tw / 2;
        sprite.style.ty -= sprite.$cache.th / 2;
    }
};

function physicsStart () {
    let space = new cp.Space();

    this.physics.accuracy = this.physics.accuracy || 1;

    space.gravity = new cp.Vect(0, this.physics.gravity * -500);

    if (process.env.NODE_ENV !== 'production') {
        if (!this.$canvas) {
            console.error('[Easycanvas] sprite must be added to an instance before lanuching physics.');
        }
    }

    var lastPhysicsTime = Date.now();
    this.on('beforeTick', function (_time) {
        let step = this.$canvas.$lastPaintTime - lastPhysicsTime;
        for (var i = 0; i < this.physics.accuracy; i ++) {
            space.step(step / (1000 * this.physics.accuracy));
        }
        lastPhysicsTime = this.$canvas.$lastPaintTime;
    });

    this.$physics = {
        space: space
    };

    return space;
};

function getSpacedParent (child) {
    if (child.$parent) {
        if (child.$parent.$physics && child.$parent.$physics.space) {
            return child.$parent;
        }
        return getSpacedParent(child.$parent)
    }
    return null;
}

function spritePhysicsOn (child) {
    let childPhysics = child.physics;
    if (childPhysics) {
        let space = getSpacedParent(child).$physics.space;
        if (!space) return;

        child.$physics = {
            space: space
        };

        if (!childPhysics.shape.length) return;

        let childShape = childPhysics.shape;
        let body;
        let shapes = [];
        let shape;

        if (!childPhysics.static) {
            if (childShape.length === 1 && childShape[0].length === 3) {
                // circle
                let radius = childShape[0][2];
                body = new cp.Body(childPhysics.mass, childPhysics.moment);
                body.setPos(new cp.Vect(
                    child.$cache.tx + child.$cache.tw / 2,
                    - child.$cache.ty - child.$cache.th / 2
                ));
                shape = new cp.CircleShape(body, radius, cp.vzero);
            } else {
                let verts = childShape.join(',').split(',').map((_num, index) => {
                    let num = Number(_num);
                    let res = index % 2 ? -num : num;
                    return res ? res : 0;
                });
                let offset = {
                    x: -child.$cache.tw / 2,
                    y: child.$cache.th / 2
                };
                // offset = cp.vzero;
                body = new cp.Body(childPhysics.mass, childPhysics.moment);
                body.setPos(new cp.Vect(
                    child.$cache.tx + child.$cache.tw / 2,
                    - child.$cache.ty - child.$cache.th / 2
                ));

                shape = new cp.PolyShape(body, verts, offset);
            }

            shape.setFriction(childPhysics.friction);
            shape.setElasticity(childPhysics.elasticity);
            shape.setCollisionType(childPhysics.collisionType);
            shape.group = childPhysics.group || 0;
            shapes.push(shape);
        } else {
            childShape.forEach((s, i) => {
                // 线段构成
                // debugger;
                let rx = child.style.rx || (child.$cache.tx + child.$cache.tw / 2);
                let ry = child.style.ry || (child.$cache.ty + child.$cache.th / 2);
                let shape = new cp.SegmentShape(
                    space.staticBody,
                    xy2Vect(mathPointRotate(
                        s[0][0] + child.$cache.tx, s[0][1] + child.$cache.ty, rx, ry, child.style.rotate || 0
                    )),
                    xy2Vect(mathPointRotate(
                        s[1][0] + child.$cache.tx, s[1][1] + child.$cache.ty, rx, ry, child.style.rotate || 0
                    )),
                    0 // width
                );
                shape.setFriction(childPhysics.friction);
                shape.setElasticity(childPhysics.elasticity);
                shape.setCollisionType(childPhysics.collisionType);
                shape.group = childPhysics.group || 0;
                shapes.push(shape);
            });
        }

        child.$physics.body = body;
        child.$physics.shape = shapes;

        if (body) {
            body.$sprite = child;
        }
        shapes.forEach((shape) => {
            shape.$sprite = child;
        });
    }

    child.children.forEach(spritePhysicsOn);
}

function launch () {
    return physicsStart.call(this);
}
