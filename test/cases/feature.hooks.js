import Easycanvas from 'src/index';
import constants from 'karma/case.constant.js';

var $canvas = document.createElement('canvas');
$canvas.width = 888;
$canvas.height = 888;
document.body.appendChild($canvas);

var $Painter = new Easycanvas.Painter();
$Painter.register($canvas);
$Painter.start();

var sprite1 = $Painter.add({
    content: {
        img: constants.png10px,
    },
    style: {
        left: Math.random() * 100, top: Math.random() * 100,
    },
    children: [
        {
            style: {
                left: 0, top: 0,
            },
            hooks: {
                beforeTick () {
                    this.style.left++;
                },
            }
        },
    ],
});

var sprite2 = sprite1.children[0];

var sprite3 = $Painter.add({
    content: {
        img: constants.png10px,
    },
    style: {
        left: 0, top: 0,
    },
});

sprite2.on('custom', (number) => {
    sprite2.style.top = number;
});

sprite3.on('custom', (number) => {
    sprite3.style.top = number;
});

sprite3.on('fromSelf', (number) => {
    sprite3.style.zIndex = 30;
});

$Painter.on('fromSelf', (number) => {
    sprite2.style.zIndex = -30;
});

sprite3.on('fromRoot', () => {
    sprite3.style.opacity = 0.3;
});

describe('Feature.hooks Test.', function () {
    it('Hooks works correctly.', function (done) {
        sprite1.broadcast('custom', 75);
        $Painter.broadcast('fromRoot');
        $Painter.trigger('fromSelf');

        setTimeout(() => {
            expect($Painter.$children.length).toBe(2);
            expect(sprite3.style.opacity).toBe(0.3);
            expect(sprite2.style.top).toBe(75);
            expect(sprite3.style.top).toBe(0);
            expect(sprite2.style.left > 2).toBe(true);
            expect(sprite3.style.zIndex).toBe(0);
            expect(sprite2.style.zIndex).toBe(-30);
            done();
        }, constants.waitForUpdateTime);
    });
});
