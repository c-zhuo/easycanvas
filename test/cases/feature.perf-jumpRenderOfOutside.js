import Easycanvas from 'src/index.js';
import constants from 'karma/case.constant.js';

var $canvas = document.createElement('canvas');
$canvas.width = 888;
$canvas.height = 888;
document.body.appendChild($canvas);

var $Painter = new Easycanvas.painter();
$Painter.register($canvas);
$Painter.start();

var shouldBeJumped = [];
var shouldBePrinted = [];

Easycanvas.imgLoader(constants.jpg100px, function (img) {
    shouldBeJumped.push($Painter.add({
        name: '画在外部',
        content: {
            img: img,
        },
        style: {
            tx: -110, ty: 200,
            tw: 100, th: 200,
            zIndex: 1, locate: 'lt',
        },
    }));

    shouldBePrinted.push($Painter.add({
        name: '部分在外部',
        content: {
            img: img,
        },
        style: {
            tx: -100, ty: 200,
            tw: 110, th: 200,
            zIndex: 1, locate: 'lt',
        },
    }));

    shouldBePrinted.push($Painter.add({
        name: '在内部',
        content: {
            img: img,
        },
        style: {
            tx: 0, ty: 200,
            tw: 110, th: 200,
            zIndex: 1, locate: 'lt',
        },
    }));

    shouldBePrinted.push($Painter.add({
        name: 'sw溢出，但是仍有一部分在内部',
        content: {
            img: img,
        },
        style: {
            tx: -100, ty: 200,
            tw: 110, th: 200,
            sx: 10, sw: 95,
            zIndex: 1, locate: 'lt',
        },
    }));

    shouldBeJumped.push($Painter.add({
        name: '看起来部分在内部，但是其实都在外部，因为sw溢出',
        content: {
            img: img,
        },
        style: {
            tx: -100, ty: 200,
            tw: 110, th: 200,
            sx: 10, sw: 120,
            zIndex: 1, locate: 'lt',
        },
    }));

    shouldBePrinted.push($Painter.add({
        name: '画在外部，但是有旋转，导致有一部分画在内部',
        content: {
            img: img,
        },
        style: {
            tx: -100, ty: 200,
            tw: 100, th: 200,
            zIndex: 1, locate: 'lt',
            rotate: 1,
        },
    }));
});

// 由于回调里给元素设置的img可能为string，所以会有一个替换为<img>或者<canvas>的过程
// 注意：可能导致延迟1、2帧绘制，所以constants.waitForUpdateTime延长了100毫秒
describe('Featrue.perf-jumpRenderOfOutside Test.', function () {
    it('Cut outside correctly.', function (done) {
        setTimeout(() => {
            var shouldBeJumpedButPrinted = shouldBeJumped.filter(($sprite) => {
                return $sprite.$rendered === true;
            });
            var shouldBePrintedButJumped = shouldBePrinted.filter(($sprite) => {
                return $sprite.$rendered === false;
            });

            expect(shouldBeJumpedButPrinted.length).toBe(0);
            if (shouldBeJumpedButPrinted.length) {
                console.error(shouldBeJumpedButPrinted.map(($sprite) => {
                    return $sprite.name;
                }));
            }

            expect(shouldBePrintedButJumped.length).toBe(0);
            if (shouldBePrintedButJumped.length) {
                console.error(shouldBePrintedButJumped.map(($sprite) => {
                    return $sprite.name;
                }));
            }

            done();
        }, constants.waitForUpdateTime + 100);
    });
});
