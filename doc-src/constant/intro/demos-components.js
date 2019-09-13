export default `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">Canvas2D UI组件：滚动、按钮、文本组件</div>
            <code>
                <head>
                    <script src="./lib/easycanvas/components.standalone.prod.js"></script>
                </head>
                <body>
                    <canvas id="app" style="width: 400px; height: 400px;"></canvas>
                </body>

                <script>
                    var $app = new Easycanvas.Painter();
                    var dom = document.getElementById('app');

                    $app.register(dom, {
                        width: 800,
                        height: 800,
                    });
                    $app.start();

                    // 滚动

                    var $scroll = $app.add(Easycanvas.Scroll({
                        name: 'scroll-box',
                        style: {
                            left: 50, top: 50,
                            width: 400, height: 700,
                            locate: 'lt',
                            backgroundColor: '#ccc',
                            overflowX: 'hidden',
                            overflowY: 'scroll'
                        },
                    }));

                    $scroll.add({
                        name: 'text',
                        content: {
                            text: 'Scroll Area',
                        },
                        style: {
                            left: 400, top: 0,
                            fontSize: 36,
                            fontFamily: 'Helvetica',
                            textAlign: 'right',
                            textVerticalAlign: 'top',
                            color: '#999'
                        }
                    })

                    var imgTop = 10;
                    for (var i = 0; i < 15; i++) {
                        $scroll.add({
                            name: 'G',
                            content: {
                                img: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                            },
                            style: {
                                width: i * 10 + 50,
                                height: i * 10 + 50,
                                left: Easycanvas.Transition.pendulum(10, i * 20, 2000).loop(),
                                top: imgTop,
                                locate: 'lt',
                                zIndex: 1,
                            }
                        });

                        imgTop += i * 10 + 60;
                    }

                    // 按钮

                    $app.add(new Easycanvas.Button({
                        name: 'button-1',
                        text: 'click',
                        normal: {
                            fontSize: 24,
                            color: '#2eb6a8',
                            border: '4px solid #2eb6a8',
                            family: '"Helvetica Neue",Helvetica,Arial,sans-serif',
                        },
                        pressed: {
                            color: '#FFF',
                            backgroundColor: '#2eb6a8',
                        },
                        style: {
                            locate: 'lt',
                            left: 500, top: 50,
                            width: 100, height: 50,
                        },
                        events: {
                            click () {
                                console.log(this.name);
                            }
                        }
                    }));

                    $app.add(Easycanvas.Button({
                        name: 'button-2',
                        text: 'hover',
                        normal: {
                            fontSize: 24,
                            color: '#2eb6a8',
                            border: '4px solid #2eb6a8',
                            family: '"Helvetica Neue",Helvetica,Arial,sans-serif',
                        },
                        hovered: {
                            color: '#FFF',
                            backgroundColor: '#2eb6a8',
                        },
                        style: {
                            locate: 'lt',
                            left: 620, top: 50,
                            width: 100, height: 50,
                        },
                        events: {
                            click () {
                                console.log(this.name);
                            }
                        }
                    }));

                    $app.add(Easycanvas.Button({
                        name: 'button-3',
                        text: 'hover & click',
                        normal: {
                            fontSize: 24,
                            color: '#2eb6a8',
                            border: '4px solid #2eb6a8',
                            family: '"Helvetica Neue",Helvetica,Arial,sans-serif',
                        },
                        hovered: {
                            color: '#FFF',
                            backgroundColor: '#2eb6a8',
                        },
                        pressed: {
                            color: '#FFF',
                            backgroundColor: '#1a988b',
                        },
                        style: {
                            locate: 'lt',
                            left: 500, top: 120,
                            width: 220, height: 50,
                        },
                        events: {
                            click () {
                                this.update({
                                    text: Date.now()
                                });
                            }
                        }
                    }));

                    // 文本

                    $app.add(Easycanvas.Text({
                        name: 'text-1',
                        props: {
                            text: '这里是一段单行的文本',
                        },
                        style: {
                            locate: 'lt',
                            left: 500, top: 220,
                            width: 240,
                            fontSize: 24,
                        },
                        events: {
                            click () {
                                console.log(this.name);
                            }
                        }
                    }));

                    $app.add(Easycanvas.Text({
                        name: 'text-2',
                        text: '这里是一段很长的单行文本',
                        style: {
                            locate: 'lt',
                            left: 500, top: 270,
                            width: 240,
                            fontSize: 24,
                            textOverflow: 'ellipsis'
                        },
                        events: {
                            click () {
                                console.log(this.name);
                            }
                        }
                    }));

                    $app.add(Easycanvas.Text({
                        name: 'text-3',
                        text: '这里是一段多行文本abcdefg1234567！？：.,?',
                        style: {
                            locate: 'lt',
                            left: 500, top: 320,
                            width: 240,
                            fontSize: 24,
                        },
                        events: {
                            click () {
                                console.log(this.name);
                            }
                        }
                    }));

                    $app.add(Easycanvas.Text({
                        name: 'text-4',
                        text: 'emoji🐶',
                        style: {
                            locate: 'lt',
                            left: 500, top: 420,
                            fontSize: 24,
                        },
                        events: {
                            click () {
                                console.log(this.name);
                            }
                        }
                    }));

                    $app.add(Easycanvas.Text({
                        name: 'text-5',
                        text: 'padding 10px 30px',
                        style: {
                            locate: 'lt',
                            left: 500, top: 470,
                            fontSize: 24,
                            padding: '10px 30px',
                            backgroundColor: '#FFF',
                        },
                        events: {
                            click () {
                                console.log(this.name);
                            }
                        }
                    }));

                    $app.add(Easycanvas.Text({
                        name: 'text-6',
                        text: 'text 24, lineHeight 72, text 24, lineHeight 72',
                        style: {
                            locate: 'lt',
                            left: 500, top: 540,
                            width: 240,
                            fontSize: 24,
                            lineHeight: 72,
                            backgroundColor: '#FFF',
                        },
                        events: {
                            click () {
                                console.log(this.name);
                            }
                        }
                    }));

                    $app.add(Easycanvas.Text({
                        name: 'text-7',
                        text: 'color & font 颜色字体',
                        style: {
                            locate: 'lt',
                            left: 500, top: 700,
                            fontSize: 24,
                            color: '#F00',
                            fontFamily: 'cursive, KaiTi, Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑", Arial, sans-serifsans-serif'
                        },
                        events: {
                            click () {
                                console.log(this.name);
                            }
                        }
                    }));
                </script>
            </code>
        </section>
`;
