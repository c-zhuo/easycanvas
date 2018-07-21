module.exports = `
    <section class="demo-box">
        <div class="code-2-demo bg-demo">WebGL3D + 物理效果 + 骨骼动画 + 事件监听</div>
        <code>
            <head>
                <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                <script src="./lib/easycanvas/plugin.webgl.mmd.standalone.prod.js"></script>
                <script src='./lib/ammo.js'></script>
            </head>
            <body>
                <canvas id="app"></canvas>
            </body>

            <script>
                var $app = new Easycanvas.painter({
                    el: '#app',
                    width: 400,
                    height: 400,
                    webgl: {
                        light: true,
                    }
                });

                var miku = $app.add(new Easycanvas.class.sprite({
                    style: {
                        tx: 180, ty: 350,
                    },
                    webgl: {
                        imgPath: '../resource/mmd/model/mokou/',
                        pmd: '../resource/mmd/model/default/miku_v2.pmd',
                        rz: 180, ry: 180,
                        scale: 15,
                    }
                }));

                miku.vmdStart('../resource/mmd/vmd/wavefile_v2.vmd');

                miku.on('webgl-mmd-loaded', function () {
                    $app.events.mousemove = function (e) {
                        miku.children[3].updateWebglStyle('colors', [e.canvasX,e.canvasY,e.canvasX + e.canvasY]);
                        miku.children[1].updateWebglStyle('colors', [e.canvasY,e.canvasX,e.canvasX + e.canvasY]);
                        miku.webgl.ry = Math.floor((e.canvasX - 200) / 4);
                    };
                });

                $app.start();
            </script>
        </code>
    </section>
`;
