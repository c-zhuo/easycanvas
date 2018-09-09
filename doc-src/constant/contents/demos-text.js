module.exports = `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">文本渲染，包含水平和垂直对齐方式</div>
            <code>
                <body>
                    <canvas id="app" style="width: 400px; height: 400px;"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.painter({
                        el: '#app',
                        width: 800,
                        height: 800
                    });

                    var $background = $app.add({
                        style: {
                            tx: 400, ty: 400,
                            tw: 400, th: 400,
                            backgroundColor: 'orange',
                        },
                    });

                    var demoString = 'Demo字符串';

                    $app.add({
                        content: {
                            text: demoString + ' 1'
                        },
                        style: {
                            tx: 400, ty: 400,
                            tw: 400, th: 400,
                            color: '#000',
                            textAlign: 'left',
                            textFont: '22px serif',
                        },
                    });

                    $app.add({
                        content: {
                            text: demoString + ' 2'
                        },
                        style: {
                            tx: 400, ty: 400,
                            tw: 400, th: 400,
                            color: 'red',
                            textAlign: 'left',
                            textVerticalAlign: 'top',
                            textFont: '28px serif',
                        },
                    });

                    $app.add({
                        content: {
                            text: demoString + ' 3'
                        },
                        style: {
                            tx: 400, ty: 400,
                            tw: 400, th: 400,
                            color: 'blue',
                            textAlign: 'right',
                            textVerticalAlign: 'top',
                            textFont: '28px serif',
                        },
                    });

                    $app.add({
                        content: {
                            text: demoString + ' 4'
                        },
                        style: {
                            tx: 400, ty: 400,
                            tw: 400, th: 400,
                            color: '#FFF',
                            textAlign: 'left',
                            textVerticalAlign: 'bottom',
                            textFont: '44px serif',
                        },
                    });

                    $app.add({
                        content: {
                            text: demoString + ' 5'
                        },
                        style: {
                            tx: 400, ty: 400,
                            tw: 400, th: 400,
                            color: 'rgb(0, 255, 0)',
                            textAlign: 'right',
                            textVerticalAlign: 'bottom',
                            textFont: '14px serif',
                        },
                    });

                    var getRandomNumberIn16 = function () {
                        return Math.floor(Math.random() * 16).toString(16);
                    };

                    $app.add({
                        content: {
                            text: demoString + ' 6'
                        },
                        style: {
                            tx: 400, ty: 400,
                            tw: 400, th: 400,
                            color: function () {
                                return '#' + getRandomNumberIn16() + getRandomNumberIn16() + getRandomNumberIn16();
                            },
                            textAlign: 'center',
                            textVerticalAlign: 'middle',
                            textFont: '30px serif',
                        },
                    });

                    $app.start();
                </script>
            </code>
        </section>
`;
