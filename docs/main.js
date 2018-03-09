import Easycanvas from 'src/index.js';
import EasycanvasPhysics from 'src/plugin.physics.js';
import Physics from './physics/physics.js';

window.w = document.body.clientWidth;
window.h = document.body.clientHeight;
window.onresize = function () {
	setTimeout(window.location.reload.bind(window.location), 1000);
};

let $app = document.getElementById('app');
$app.style.width = w;
$app.style.height = h;
$app.width = w;
$app.height = h;

window.$Doc = new Easycanvas.painter();

$Doc.register($app, {
	events: {
		contextmenu: function (e) {
			console.log('contextmenu!');
			e.event.stopPropagation();
			e.event.preventDefault();
		}
	}
});
$Doc.setMaxFps(50);
$Doc.start();

// window.__EASYCANVAS_DEVTOOL__ = false;

Physics.start();
