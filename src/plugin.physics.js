/** ********** *
 *
 * Connect chipmunk.js physics lib with Easycanvas.js
 * - Standalone, as a plugin.
 *
 * ********** **/

import chipmunk from 'lib/chipmunk.js';

import utils from 'utils/utils.js';
import mathPointRotate from 'utils/math.point-rotate.js';

const or = utils.firstValuable;
const getValueFromArrayOrStatic = function (physics, key, index) {
    return or(physics[key][index], physics[key]);
};

const err = function (msg) {
    console.error('[Easycanvas-physics] ' + msg);
};

let cp = chipmunk;

Easycanvas.extend(function (opt) {
    if (!opt.physics) return;

    let sprite = this;

    sprite.physics = sprite.physics || {};

    // sprite.physics.static = sprite.physics.static; // bool

    sprite.physics.shape = sprite.physics.shape || [];
    sprite.physics.gravity = or(sprite.physics.gravity, 2);
    sprite.physics.accuracy = or(sprite.physics.accuracy, 2);
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
                // num += index % 2 ? sqSprite.getRect().ty : sqSprite.getRect().tx;
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
        if (!sprite.$physics) return this;

        sprite.$physics.inSpace = false;
        if (sprite.$physics.body) {
            sprite.$physics.space.removeBody(sprite.$physics.body);
        }
        sprite.$physics.shape.forEach((s) => {
            sprite.$physics.space.removeShape(s);
        });

        sprite.$physics = null;

        return this;
    };

    sprite.physicsOn = function () {
        if (!this.$physics) {
            spritePhysicsOn(this);
        }

        // 可能不是物理对象
        if (!this.$physics) return this;

        this.$physics.inSpace = true;

        if (this.$physics.body) {
            this.$physics.body.setPos(new cp.Vect(
                this.getRect().tx + this.getRect().tw / 2,
                -this.getRect().ty - this.getRect().th / 2
            ));
        }

        this.$physics.body && this.$physics.space.addBody(this.$physics.body);
        this.$physics.shape && this.$physics.shape.forEach((s) => {
            this.$physics.space[this.physics.static ? 'addStaticShape' : 'addShape'](s);
        });

        // debug TODO !
        this.children.forEach((child) => {
            this.physicsOn.call(child);
        });

        return this;
    };

    sprite.physicsSetVelocity = function (v) {
        if (!sprite.$physics) return;

        if (!sprite.$physics.body) {
            if (process.env.NODE_ENV !== 'production') {
                err('Can not set velocity to static sprite.');
            }
            return this;
        }

        sprite.$physics.body.setVel({
            x: v.x,
            y: -v.y,
        });

        return this;
    };

    sprite.physicsGetVelocity = function () {
        if (!sprite.$physics) return;

        if (!sprite.$physics.body) {
            if (process.env.NODE_ENV !== 'production') {
                err('Can not get velocity of static sprite.');
            }
            return this;
        }

        let result = sprite.$physics.body.getVel();
        result.y = -result.y;
        return result;
    };

    sprite.physicsApplyImpulse = function (j = {x: 0, y: 0}, r = {x: 0, y: 0}) {
        if (!sprite.$physics) return;

        if (!sprite.$physics.body) {
            if (process.env.NODE_ENV !== 'production') {
                err('Can not apply impulse to static sprite.');
            }
            return this;
        }

        j.y = -j.y;
        r.y = -r.y;

        sprite.$physics.body.applyImpulse(j, r);
        return this;
    };

    sprite.physicsGetAngelVelocity = function () {
        if (!sprite.$physics) return;

        if (!sprite.$physics.body) {
            if (process.env.NODE_ENV !== 'production') {
                err('Can not get angel velocity of static sprite.');
            }
            return this;
        }

        return sprite.$physics.body.getAngVel();
    };

    sprite.physicsSetAngelVelocity = function (w) {
        if (!sprite.$physics) return;

        if (!sprite.$physics.body) {
            if (process.env.NODE_ENV !== 'production') {
                err('Can not set angel velocity to static sprite.');
            }
            return this;
        }

        sprite.$physics.body.setVel(w);

        return this;
    };

    sprite.physicsApplyForce = function (f, p = {x: 0, y: 0}) {
        if (!sprite.$physics) return this;

        if (!sprite.$physics.body) return this;

        sprite.$physics.body.applyForce({
            x: f.x,
            y: -f.y
        }, {
            x: f.x,
            y: f.y
        });

        return this;
    };

    sprite.physicsResetForces = function () {
        sprite.$physics.body.resetForces();

        return this;
    };

    sprite.on('beforeTick', function (_time) {
        if (!sprite.$physics || !sprite.physics) return;
        if (sprite.physics.static) return;
        if (sprite.$physics.inSpace === false) return;

        sprite.$physics.body && cp2ec(sprite.$physics.body, sprite);
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

let cp2ec = function (body, sprite) {
    let pos = body.getPos();
    let vel = body.getVel();

    sprite.style.rotate = body.a * 180 / Math.PI;
    sprite.style.tx = pos.x;
    sprite.style.ty = -pos.y;

    if (sprite.style.locate === 'lt') {
        sprite.style.tx -= sprite.getRect().tw / 2;
        sprite.style.ty -= sprite.getRect().th / 2;
    } else if (sprite.style.locate === 'ld') {
        sprite.style.tx -= sprite.getRect().tw / 2;
        sprite.style.ty += sprite.getRect().th / 2;
    } else if (sprite.style.locate === 'rd') {
        sprite.style.tx += sprite.getRect().tw / 2;
        sprite.style.ty += sprite.getRect().th / 2;
    } else if (sprite.style.locate === 'rt') {
        sprite.style.tx += sprite.getRect().tw / 2;
        sprite.style.ty -= sprite.getRect().th / 2;
    }
};

function launch () {
    let space = new cp.Space();

    space.gravity = new cp.Vect(0, this.physics.gravity * -500);

    if (process.env.NODE_ENV !== 'production') {
        if (!this.$canvas) {
            err('Sprite must be added to an instance before lanuching physics.');
        }
    }

    this.on('beforeTick', function (_time) {
        let step = 0.01 * (this.$canvas.maxFps > 0 ? this.$canvas.maxFps : 60) / 60;
        for (var i = 0; i < this.physics.accuracy; i ++) {
            space.step(step);
        }
    });

    this.$physics = {
        space: space
    };

    space.setDefaultCollisionHandler(function (cp) {
        let a = cp.a.$sprite.trigger('physicsCollisionBegin', cp.b.$sprite, cp.b.$sprite.physics.collisionType, cp, space);
        let b = cp.b.$sprite.trigger('physicsCollisionBegin', cp.a.$sprite, cp.a.$sprite.physics.collisionType, cp, space);
        return !(a || b);
    }, function (cp) {
        let a = cp.a.$sprite.trigger('physicsCollisionPreSolve', cp.b.$sprite, cp.b.$sprite.physics.collisionType, cp, space);
        let b = cp.b.$sprite.trigger('physicsCollisionPreSolve', cp.a.$sprite, cp.a.$sprite.physics.collisionType, cp, space);
        return !(a || b);
    }, function (cp) {
        cp.a.$sprite.trigger('physicsCollisionPostSolve', cp.b.$sprite, cp.b.$sprite.physics.collisionType, cp, space);
        cp.b.$sprite.trigger('physicsCollisionPostSolve', cp.a.$sprite, cp.a.$sprite.physics.collisionType, cp, space);
    }, function (cp) {
        cp.a.$sprite.trigger('physicsCollisionSeparate', cp.b.$sprite, cp.b.$sprite.physics.collisionType, cp, space);
        cp.b.$sprite.trigger('physicsCollisionSeparate', cp.a.$sprite, cp.a.$sprite.physics.collisionType, cp, space);
    });

    return space;
};

function getSpacedParent (child) {
    if (child.$parent) {
        if (child.$parent.$physics && child.$parent.$physics.space) {
            return child.$parent;
        }
        return getSpacedParent(child.$parent);
    }
    return null;
}

function spritePhysicsOn ($sprite) {
    let physics = $sprite.physics;
    if (physics) {
        let $space = getSpacedParent($sprite);
        let space = $space.$physics.space;
        if (!space) {
            err('No physics container found launched.');
            return;
        }

        $sprite.$physics = {
            space: space
        };

        if (!physics.shape.length) return;

        let spriteShape = physics.shape;
        let body;
        let shapes = [];

        if (!physics.static) {
            body = new cp.Body(physics.mass, physics.moment);
        }

        spriteShape.forEach((s, index) => {
            let shape;

            let spriteX = $sprite.getStyle('tx'),
                spriteY = $sprite.getStyle('ty'),
                spaceX = $space.getStyle('tx'),
                spaceY = $space.getStyle('ty');

            // [a, b, r]代表一个圆
            // [[a1, b1], [a2, b2], [a3, b4]]代表多边形各个顶点
            // [[a1, b1], [a2, b2]]代表一条线

            if (s.length === 3 && !s[0].length) {
                let offset = body ? cp.vzero : {
                    x: spriteX - spaceX,
                    y: -spriteY + spaceY
                };

                shape = new cp.CircleShape(body || space.staticBody, s[2], offset);
            } else if (s.length >= 3) {
                let verts = s.join(',').split(',').map((_num, _index) => {
                    let num = Number(_num);
                    let res = _index % 2 ? -num : num;
                    return res ? res : 0;
                });

                let offset = body ? cp.vzero : {
                    x: spriteX - spaceX,
                    y: -spriteY + spaceY
                };

                shape = new cp.PolyShape(body || space.staticBody, verts, offset);
            } else if (s.length === 2) {
                // 线段构成
                let rx = $sprite.style.rx || ($sprite.getRect().tx + $sprite.getRect().tw / 2);
                let ry = $sprite.style.ry || ($sprite.getRect().ty + $sprite.getRect().th / 2);

                shape = new cp.SegmentShape(
                    space.staticBody,
                    xy2Vect(mathPointRotate(
                        s[0][0] + spriteX - spaceX,
                        s[0][1] + spriteY + spaceY,
                        rx - spaceX,
                        ry + spaceY,
                        $sprite.style.rotate || 0
                    )),
                    xy2Vect(mathPointRotate(
                        s[1][0] + spriteX - spaceX,
                        s[1][1] + spriteY + spaceY,
                        rx - spaceX,
                        ry + spaceY,
                        $sprite.style.rotate || 0
                    )),
                    0 // width
                );
            }

            shape.setFriction(
                getValueFromArrayOrStatic(physics, 'friction', index)
            );
            shape.setElasticity(
                getValueFromArrayOrStatic(physics, 'elasticity', index)
            );
            shape.setCollisionType(
                getValueFromArrayOrStatic(physics, 'collisionType', index)
            );
            shape.group = getValueFromArrayOrStatic(physics, 'group', index);

            shape.$sprite = $sprite;

            shapes.push(shape);
        });

        $sprite.$physics.body = body;
        $sprite.$physics.shape = shapes;

        if (body) {
            body.$sprite = $sprite;
        }
    }
}
