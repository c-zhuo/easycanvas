import Easycanvas from 'src/index';
import constants from 'karma/case.constant.js';

var $canvas = document.createElement('canvas');
$canvas.width = 888;
$canvas.height = 888;
document.body.appendChild($canvas);

var $Painter = new Easycanvas.Painter();
$Painter.register($canvas);
$Painter.start();

var shouldBeJumped = [];
var shouldBePrinted = [];

Easycanvas.ImgLoader(constants.jpg100px, function (img) {
    shouldBeJumped.push($Painter.add({
        name: '画在外部',
        content: {
            img: img,
        },
        style: {
            left: -110, top: 200,
            width: 100, height: 200,
            zIndex: 1, locate: 'lt',
        },
    }));

    shouldBePrinted.push($Painter.add({
        name: '部分在外部',
        content: {
            img: img,
        },
        style: {
            left: -100, top: 200,
            width: 110, height: 200,
            zIndex: 1, locate: 'lt',
        },
    }));

    shouldBePrinted.push($Painter.add({
        name: '在内部',
        content: {
            img: img,
        },
        style: {
            left: 0, top: 200,
            width: 110, height: 200,
            zIndex: 1, locate: 'lt',
        },
    }));

    shouldBePrinted.push($Painter.add({
        name: 'sw溢出，但是仍有一部分在内部',
        content: {
            img: img,
        },
        style: {
            left: -100, top: 200,
            width: 110, height: 200,
            cutLeft: 10, cutWidth: 95,
            zIndex: 1, locate: 'lt',
        },
    }));

    // 不再判断这种case
    // shouldBeJumped.push($Painter.add({
    //     name: '看起来部分在内部，但是其实都在外部，因为sw溢出',
    //     content: {
    //         img: img,
    //     },
    //     style: {
    //         left: -100, top: 200,
    //         width: 110, height: 200,
    //         cutLeft: 10, cutWidth: 120,
    //         zIndex: 1, locate: 'lt',
    //     },
    // }));

    shouldBePrinted.push($Painter.add({
        name: '画在外部，但是有旋转，导致有一部分画在内部',
        content: {
            img: img,
        },
        style: {
            left: -100, top: 200,
            width: 100, height: 200,
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
                return $sprite.$render.$insight === true;
            });
            var shouldBePrintedButJumped = shouldBePrinted.filter(($sprite) => {
                return $sprite.$render.$insight === false;
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
