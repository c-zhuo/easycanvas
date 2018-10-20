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
            scale: 5, // scale中心为115, 115
        },
        children: [
            {
                // $children[1]
                content: {
                    img: img,
                },
                style: {
                    tx: 100, ty: 0, // 200(115 + 85) => 540(115 + 85 * 5)
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
        let getRenderStyle = function (props) {
            return [
                props.sx, props.sy, props.sw, props.sh,
                props.tx, props.ty, props.tw, props.th,
            ].join(',');
        };

        let getRenderTStyle = function (props) {
            return [
                props.tx, props.ty, props.tw, props.th,
            ].join(',');
        };

        setTimeout(() => {
            // tx/ty 100~130  ==>  tx/ty (100+130)/2 - 30*5/2 = 40
            expect(getRenderTStyle($Painter.$children[0].props)).toBe('40,40,150,150');
            expect(getRenderTStyle($Painter.$children[1].props)).toBe('540,40,150,150');

            // tx/ty 100~130  ==>  85～145
            expect(getRenderTStyle($Painter.$children[2].props)).toBe('85,85,60,60');

            // if no more scale with last child, result is '140,140,150,150', center is (215,215)
            // scale 5 ==> size 750, 215 - 375 = -160
            // result is -160,-160,750,750 ==> 0,0,590,590
            expect(getRenderStyle($Painter.$children[3].props)).toBe('0,0,30,30,540,540,150,150');
            expect(getRenderStyle($Painter.$children[4].props)).toBe('6.4,6.4,23.6,23.6,0,0,590,590');
            // expect(getRenderStyle($Painter.$children[4].props)).toBe('6,6,24,24,0,0,590,590');
            done();
        }, constants.waitForUpdateTime);
    });
});
