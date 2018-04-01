import Easycanvas from 'src/index.js';
import constants from 'karma/case.constant.js';

var $canvas = document.createElement('canvas');
$canvas.width = 888;
$canvas.height = 888;
document.body.appendChild($canvas);

var $Painter = new Easycanvas.painter();
$Painter.register($canvas, {
    events: {
        click: function (e) {
            $Painter.add(createFire(e.canvasX, e.canvasY));
        }
    }
});

var Fire = Easycanvas.imgLoader(constants.fire);
// var Fire = Easycanvas.imgLoader('./Fire.png');

var createFire = function (initX, initY) {
    return {
        content: {
            img: Fire,
            sequence: {
                w: -9,
                h: -1,
                // w: 323,
                // h: 360,
                interval: 500,
                loop: true
            }
        },

        style: {
            tx: initX, ty: initY,
            // tw: 120, th: 120,
        },
    };
};

$Painter.start();

describe('Feature.sequenceDiagram Test.', function () {
    it('SequenceDiagram Renders correctly.', function (done) {
        let posX = 224;
        let posY = 322;
        $Painter.add(createFire(posX, posY));
        setTimeout(() => {
            // 'createEvent' not working as expected
            // var evt = document.createEvent('MouseEvents');
            // evt.initMouseEvent('click', true, true, window, 1, 0, 0, 222, 222, false, false, false, false, 0, null);
            // $Painter.$dom.dispatchEvent(evt);
            expect($Painter.$children.length).toBe(1);
            expect($Painter.$children[0].type).toBe('img');
            expect($Painter.$children[0].props[3]).toBe(Math.round(Fire.width / 9));
            expect($Painter.$children[0].props[4]).toBe(Math.round(Fire.height));
            expect($Painter.$children[0].props[5]).toBe(Math.round(posX - Fire.width / 9 / 2));
            expect($Painter.$children[0].props[6]).toBe(Math.round(posY - Fire.height / 2));
            done();
        }, constants.waitForUpdateTime * 2);
    });
});
