import Easycanvas from 'src/index.js';
import constants from 'karma/case.constant.js';

var $canvas = document.createElement('canvas');
$canvas.width = 888;
$canvas.height = 888;

var $Painter = new Easycanvas.painter();
$Painter.register($canvas);
$Painter.start();

Easycanvas.imgLoader(constants.img10px, function (img) {
    var sprite1 = $Painter.add({
        name: 'root',
        content: {
            img: img,
        },
        style: {
            locate: 'lt',
            sx: 0, sy: 0,
            tx: undefined, ty: 77,
        }
    });
});

describe('Api.add Test.', function () {
    it('Default value correctly.', function (done) {
        setTimeout(() => {
            let paintList = $Painter.paintList;
            expect(paintList.length).toBe(1);
            expect(paintList[0].style.tx).toBe(0);
            expect(paintList[0].style.ty).toBe(77);
            expect(paintList[0].style.opacity).toBe(1);
            expect(paintList[0].style.rotate).toBe(undefined);
            expect(paintList[0].style.zIndex).toBe(0);
            expect(paintList[0].events.eIndex).toBe(0);
            expect(paintList[0].inherit.indexOf('tx') >= 0).toBe(true);
            expect(paintList[0].content.img.width).toBe(10);
            done();
        }, constants.waitForUpdateTime);
    });

    it('PaintList to $PaintList fine.', function (done) {
        setTimeout(() => {
            let $paintList = $Painter.$paintList
            expect($paintList.length).toBe(1);
            expect($paintList[0].type).toBe('img');
            expect($paintList[0].props[0].tagName).toBe('IMG');
            expect($paintList[0].props[0].width).toBe(10);
            expect($paintList[0].props[7]).toBe(10);
            expect($paintList[0].props[5]).toBe(0);
            expect($paintList[0].props[6]).toBe(77);
            done();
        }, constants.waitForUpdateTime);
    });
});
