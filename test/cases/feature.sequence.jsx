import Easycanvas from 'src/index';
import Sequence from 'src/components/Sequence.js';
import constants from 'karma/case.constant.js';

var $canvas = document.createElement('canvas');
$canvas.width = 888;
$canvas.height = 888;
document.body.appendChild($canvas);

var $Painter = new Easycanvas.Painter();
$Painter.register($canvas, {
    events: {
        click: function (e) {
            var fireConfig = createFire(e.canvasX, e.canvasY);
            $Painter.add(fireConfig);
        }
    }
});

var Fire = Easycanvas.ImgLoader(constants.fire);

var createFire = function (initX, initY) {
    return <Sequence
        src={Fire}
        frameWidth="-9"
        frameHeight="-1"
        interval="200"
        loop="false"
        style={{
            left: initX, top: initY,
            // width: 120, height: 120,
        }}
    />;
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

            // 这个case有时候是0，有时候$children是undefined
            // 可能是图片还没加载完，报错了重新跑试试（按理说本地图片不会这么慢？）
            expect($Painter.$children.length).toBe(1);

            expect($Painter.$children[0].type).toBe('img');
            expect($Painter.$children[0].props.cutWidth).toBe(Math.round(Fire.width / 9));
            expect($Painter.$children[0].props.cutHeight).toBe(Math.round(Fire.height));
            expect($Painter.$children[0].props.left).toBe(Math.round(posX - Fire.width / 9 / 2));
            expect($Painter.$children[0].props.top).toBe(Math.round(posY - Fire.height / 2));
            done();
        }, constants.waitForUpdateTime * 2);
    });
});
