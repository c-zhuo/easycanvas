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

Easycanvas.imgLoader(constants.png30px, function (img) {
    sprite1 = $Painter.add({
        // $children[0]
        content: {
            img: img,
        },
        style: {
            tx: 100, ty: 100,
            tw: 30, th: 30,
            locate: 'lt',
            scale: 5,
        },
        children: [
            {
                // $children[1]
                content: {
                    img: img,
                },
                style: {
                    tx: 100, ty: 0,
                    locate: 'lt',
                    zIndex: 3,
                },
            },
            {
                // $children[2]
                inherit: ['tx'],
                content: {
                    img: img,
                },
                style: {
                    tx: 0, ty: 100,
                    locate: 'lt',
                    scale: 2,
                    zIndex: 4,
                },
            },
            {
                // $children[3]
                content: {
                    img: img,
                },
                style: {
                    tx: 100, ty: 100,
                    locate: 'lt',
                    // scale: 5,
                    zIndex: 5,
                },
            },
            {
                // $children[4]
                content: {
                    img: img,
                },
                style: {
                    tx: 100, ty: 100,
                    locate: 'lt',
                    scale: 5,
                    zIndex: 6,
                },
            },
        ],
    });
});

describe('Feature.scale Test.', function () {
    it('Scale inherit correctly.', function (done) {
        setTimeout(() => {
            // tx/ty 100~130  ==>  tx/ty (100+130)/2 - 30*5/2 = 40
            expect($Painter.$children[0].props.slice(5).join(',')).toBe('40,40,150,150');
            expect($Painter.$children[1].props.slice(5).join(',')).toBe('140,40,150,150');

            console.warn(sprite1.children[1].getStyle('scale'));
            console.warn(sprite1.children[1].getStyle('scale'));
            console.warn(sprite1.children[1].getStyle('scale'));
            console.warn(sprite1.children[1].getStyle('scale'));
            console.warn(sprite1.children[1].getStyle('scale'));
            // tx/ty 100~130  ==>  85～145
            expect($Painter.$children[2].props.slice(5).join(',')).toBe('85,85,60,60');

            // if no more scale with last child, result is '140,140,150,150', center is (215,215)
            // scale 5 ==> size 750, 215 - 375 = -160
            // result is -160,-160,750,750 ==> 0,0,590,590
            expect($Painter.$children[3].props.slice(1).join(',')).toBe('0,0,30,30,140,140,150,150');
            // expect($Painter.$children[4].props.slice(1).join(',')).toBe('6.4,6.4,23.6,23.6,0,0,590,590');
            expect($Painter.$children[4].props.slice(1).join(',')).toBe('6,6,24,24,0,0,590,590');
            done();
        }, constants.waitForUpdateTime);
    });
});
