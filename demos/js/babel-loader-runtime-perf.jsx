import Easycanvas, { Painter } from '../../src/index';
import View from '../../src/components/View';
import Text from '../../src/components/Text';
import StaticView from '../../src/components/StaticView';
import Image from '../../src/components/Image';

const $app = new Painter({
    el: "#app",
    width: 400,
    height: 400
}).start();

const $static = window.s = $app.add(
    <StaticView
        style={{
            left: Easycanvas.Transition.pendulum(0, 200, 5000).loop(),
            top: 0,
        }}
    />
);

const imgUrl = 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png';

$app.imgLoader(imgUrl, function (img) {
    for (let i = 0; i < 5000; i++) {
        $static.add(<Image
            src={img}
            style={{
                left: Math.random() * 400,
                top: Math.random() * 400,
                width: Math.random() * 200,
                height: Math.random() * 200,
                zIndex: Math.random(),
            }}
            events={{
                click () {
                    alert(this.style.zIndex);
                }
            }}
        />);
    }
});