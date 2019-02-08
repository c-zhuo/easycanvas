module.exports = `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">加载fbx模型和dds图像的3D人物模型</div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                    <script src="./lib/easycanvas/plugin.webgl.mmd.standalone.prod.js"></script>
                    <script src="./lib/easycanvas/plugin.webgl.loaders.standalone.prod.js"></script>
                    <script src='./lib/zlib.min.js'></script>
                </head>
                <body>
                    <canvas id="app" style="width: 400px; height: 400px;"></canvas>
                    <p id="content">资源较大，可能加载较慢，请稍等</p>
                </body>

                <script>
                    var $app = new Easycanvas.painter();
                    $app.register(document.getElementById('app'), {
                        width: 800,
                        height: 800,
                        webgl: true,
                    });
                    $app.start();

                    var $box = $app.add({
                        style: {
                            left: 400, top: 700,
                        },
                    });

                    var imgs = [
                        $app.ddsLoader('../resource/fbxdds/mingxiu_yanzhao_D.dds'),
                        $app.ddsLoader('../resource/fbxdds/mingxiu_body_D.dds'),
                        $app.ddsLoader('../resource/fbxdds/mingxiu_body_D.dds'),
                        $app.ddsLoader('../resource/fbxdds/mingxiu_yanzhao_D.dds'),
                        $app.ddsLoader('../resource/fbxdds/mingxiu_face_D.dds'),
                        $app.ddsLoader('../resource/fbxdds/mingxiu_body_D.dds'),
                        $app.ddsLoader('../resource/fbxdds/mingxiu_body_D.dds'),
                        $app.ddsLoader('../resource/fbxdds/mingxiu_hair_D.dds'),
                        $app.ddsLoader('../resource/fbxdds/mingxiu_body_D.dds'),
                        $app.ddsLoader('../resource/fbxdds/mingxiu_body_D.dds'),
                    ];

                    Easycanvas.loaders.FBXLoader('../resource/fbxdds/mx.fbx', function (data) {
                        var index = 0;

                        for (var i in data.Objects.Geometry) {
                            var item = data.Objects.Geometry[i];

                            $box.add({
                                webgl: window.Easycanvas.webglShapes.custom({
                                    vertices: item.Vertices.a,
                                    indices: item.PolygonVertexIndex.a,
                                    img: imgs[index++],
                                    scale: 400,
                                    normals: item.LayerElementNormal[0].Normals.a,
                                    textures: item.LayerElementUV[0].UV.a,
                                    hasAlpha: true,
                                    rx: 111,
                                    rz: Easycanvas.transition.linear(0, 360, 5000).loop(),
                                }),
                            });
                        }
                    });
                </script>
            </code>
        </section>
`;
