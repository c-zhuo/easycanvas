import Easycanvas from 'src/index.js';
import constants from 'karma/case.constant.js';

var $canvas = document.createElement('canvas');
$canvas.width = 888;
$canvas.height = 888;
document.body.appendChild($canvas);

var $Painter = new Easycanvas.painter();
$Painter.register($canvas);
$Painter.start();

var $sp1 = $Painter.add({
    content: {
        img: constants.img10px,
    },
    style: {
        tx: 10, ty: 0,
        locate: 'lt',
    },
});

var $sp2 = $Painter.add({
    content: {
        img: $Painter.imgLoader(constants.img10px + '   ', null, {canvas: true}),
    },
    style: {
        tx: 20, ty: 0,
        locate: 'lt',
    },
});

var $sp3;
Easycanvas.imgLoader(constants.img30px, function (img) {
    $sp3 = $Painter.add({
        content: {
            img: img,
        },
        style: {
            tx: 30, ty: 0,
            locate: 'lt',
        },
    });
});

describe('Feature.load-img Test.', function () {
    it('All images loaded correctly.', function (done) {
        setTimeout(() => {
            expect($Painter.$paintList.length).toBe(3);
            expect($Painter.$paintList[0].type).toBe('img');
            expect($Painter.$paintList[1].type).toBe('img');
            expect($Painter.$paintList[2].type).toBe('img');
            expect($sp1.content.img.tagName).toBe('IMG');
            expect($sp2.content.img.tagName).toBe('CANVAS');
            expect($sp3.content.img.tagName).toBe('IMG');
            done();
        }, constants.waitForUpdateTime);
    });
});
