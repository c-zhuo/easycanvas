import Easycanvas from 'src/index.js';
import constants from 'karma/case.constant.js';

var $canvas = document.createElement('canvas');
$canvas.width = 888;
$canvas.height = 888;
document.body.appendChild($canvas);

var $Painter = new Easycanvas.painter();
$Painter.register($canvas);
$Painter.start();

Easycanvas.imgLoader.cacheCanvas = false;

var $sp1 = $Painter.add({
    content: {
        // 异步加载，这里取到的cacheCanvas应该是true
        // 便于项目中“按需加载”
        img: constants.png10px,
    },
    style: {
        tx: 10, ty: 0,
        locate: 'lt',
    },
});

var $sp2 = $Painter.add({
    content: {
        img: $Painter.imgLoader(constants.png10px + '   ', null, {canvas: true}),
    },
    style: {
        tx: 20, ty: 0,
        locate: 'lt',
    },
});

var $sp3;
Easycanvas.imgLoader(constants.png30px, function (img) {
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

// 最后改成canvas，并不影响之前$sp1的类型为<img>，$sp3用的还是<img>标签
// 需要注意的是，$sp1是在add阶段进行string2img的替换，此时已经替换完毕
Easycanvas.imgLoader.cacheCanvas = true;

describe('Feature.load-img Test.', function () {
    it('All images loaded correctly.', function (done) {
        setTimeout(() => {
            expect($Painter.$children.length).toBe(3);
            expect($Painter.$children[0].type).toBe('img');
            expect($Painter.$children[1].type).toBe('img');
            expect($Painter.$children[2].type).toBe('img');
            expect($sp1.content.img.tagName).toBe('CANVAS');
            expect($sp2.content.img.tagName).toBe('CANVAS');
            expect($sp3.content.img.tagName).toBe('IMG');
            done();
        }, constants.waitForUpdateTime);
    });
});
