module.exports = `
        <section class="demo-box">
            <div class="code-2-demo code-2-demo-jsx bg-demo">JSX+Class进行组件化开发</div>
            <code>
                import { Painter, View, Text, Transition } from 'easycanvas';

                const $app = new Painter({
                    el: "#app",
                    width: "400",
                    height: "400"
                }).start();

                let styleTop = 200;

                class HelloWorld {
                    constructor (props) {
                        const HelloWorld = 'Hello World';
                        const Size = props.fontSize;
                
                        return <View name="root-element">
                            {
                                HelloWorld.split('').map((word, index) => {
                                    return <Text
                                        style={{
                                            left: 50 + 30 * index,
                                            top: Transition.pendulum(120, 240, 3000, {
                                                start: index * 60
                                            }).loop(),
                                            rotate: Transition.pendulum(-20, 20, 3000, {
                                                start: index * 60
                                            }).loop(),
                                            width: 50,
                                            height: 50,
                                            color: "#F00",
                                            locate: "lt",
                                            fontSize: Size
                                        }}
                                        events={{
                                            mousemove: this.changeWordColor
                                        }}
                                    >{word}</Text>
                                })
                            }
                        </View>;
                    }

                    // 鼠标在Text上mousemove后变色
                    changeWordColor () {
                        this.style.color = '#0F0';
                    }
                }

                const $texts = $app.add(<HelloWorld fontSize="30"/>);

            </code>
        </section>
`;
