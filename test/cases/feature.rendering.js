import Easycanvas from 'src/index.js';
import constants from 'karma/case.constant.js';

var $canvas = document.createElement('canvas');
$canvas.width = 888;
$canvas.height = 888;
document.body.appendChild($canvas);

var $Painter = new Easycanvas.painter();
$Painter.register($canvas);
$Painter.start();

var sprite1;

Easycanvas.imgLoader(constants.img30px, function (img) {
    sprite1 = $Painter.add({
        content: {
            img: img,
        },
        style: {
            tx: 100, ty: 100,
            locate: 'lt',
            opacity: 0.5,
            rotate: 40,
        },
        events: {
            click: function () {
                console.log(3);
            }
        },

        children: [
            {
                content: {
                    img: img,
                },
                inherit: ['opacity'],
                style: {
                    tx: 500, ty: 0,
                    zIndex: 1,
                    opacity: 0.5,
                    locate: 'center',
                },
                events: {
                    eIndex: -3,
                    click: function () {
                        console.log(1);
                    }
                }
            },
            {
                // inherit: ['opacity'],
                content: {
                    img: img,
                },
                style: {
                    tx: 0, ty: 500,
                    opacity: 1,
                    zIndex: 2,
                    locate: 'lt',
                    scale: 5
                },
                events: {
                    eIndex: -31,
                    click: function () {
                        console.log(2);
                    }
                }
            },
            {
                inherit: ['tx', 'ty', 'rotate'],
                content: {
                    img: img,
                },
                style: {
                    tx: 500, ty: 500,
                    opacity: 0.7,
                    zIndex: 3,
                    locate: 'center',
                },
                events: {
                    eIndex: -31,
                    click: function () {
                        console.log(3);
                        this.style.opacity = 0;
                    }
                }
            },
        ],
    });
});

describe('Feature.rendering Test.', function () {
    it('Basic props inherit correctly.', function (done) {
        setTimeout(() => {
            expect($Painter.$children.length).toBe(4);
            expect($Painter.$children[0].type).toBe('img');
            expect($Painter.$children[0].props.slice(1).join(',')).toBe('0,0,30,30,100,100,30,30');
            expect($Painter.$children[3].settings.rotate.toFixed(2)).toBe('-0.70');
            expect($Painter.$children[2].settings.rotate).toBe(undefined);
            expect($Painter.$children[2].props.slice(1).join(',')).toBe('0,0,30,30,40,540,150,150');
            done();
        }, constants.waitForUpdateTime);
    });
});
