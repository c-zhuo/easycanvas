export default `
    <article id="1">
        <h1>1</h1>

        <p>。</p>

        <h2>示例</h2>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, View, Image, Sequence } from 'easycanvas';

                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();

                const imageProps = {
                    run: {
                        url: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/human.png',
                        width: 166,
                        height: 103,
                    },
                    stand: {
                        url: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/human.png',
                        width: 166,
                        height: 103,
                    },
                };

                class Player {
                    state = 'stand'

                    constructor (props) {
                        return (
                            <View name="player-box">
                                <Sequence
                                    src={() => imageProps[this.state].url}
                                    interval=40
                                    loop=true
                                    style={{
                                        left: 200,
                                        top: 200,
                                        locate: 'center',
                                        cutWidth: () => imageProps[this.state].width,
                                        cutHeight: () => imageProps[this.state].height,
                                        cutLeft: () => this.index % 6 * imageProps[this.state].width,
                                        cutTop: () => imageProps[this.state].height * (this.index % 20 >= 10 ? 2 : 6,
                                    }}
                                />
                            </View>;
                        );
                    }
                
                    setRun () {
                        
                    }
                }

                const $texts = $app.add(<HelloWorld fontSize="30"/>);
            </code>
        </section>

        <h2>API</h2>

        <p>View组件的API与Easycanvas.Sprite基类完全相同，请参考Sprite API部分。</p>

    </article>
`;
