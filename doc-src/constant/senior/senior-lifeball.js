export default `
    <article id="场景中跑动的人物">
        <h1>场景中跑动的人物</h1>

        <p>。</p>

        <h2>示例</h2>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
            <code>
                import { Painter, View, Image } from 'easycanvas';

                const Store = {
                    player: {
                        state: 'stand',
                        speed: 5,
                        x: 0,
                        y: 0,
                        directionX: 0,
                        directionY: 0
                    }
                };

                const playerData = Store.player;

                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();

                const playerImageConfig = {
                    run: {
                        url: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                        width: 166,
                        height: 103,
                    },
                    stand: {
                        url: 'https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png',
                        width: 166,
                        height: 103,
                    },
                };

                class Player {
                    constructor() {
                        return (
                            <View name="player-box">
                                <Sequence
                                    src={() => playerImageConfig[playerData.state].url}
                                    interval={40}
                                    loop={true}
                                    style={{
                                        left: 200,
                                        top: 200,
                                        zIndex: 1,
                                        opacity: 0.1,
                                        cutWidth: () => playerImageConfig[playerData.state].width,
                                        cutHeight: () => playerImageConfig[playerData.state].height,
                                        cutLeft: (sequence) => sequence.index % 6 * playerImageConfig[playerData.state].width,
                                        cutTop: (sequence) => playerImageConfig[playerData.state].height * (sequence.index % 20 >= 10 ? 0.2 : 0.6),
                                    }}
                                    hooks={{
                                        ticked: this.tick,
                                    }}
                                />
                            </View>
                        );
                    }

                    tick() {
                        if (playerData.state === 'run') {
                            playerData.x += playerData.directionX * playerData.speed;
                            playerData.y += playerData.directionY * playerData.speed;
                        }
                    }
                }

                $app.add(<Player />);

                class Letter {
                    constructor(props) {
                        return (
                            <Image
                                src="https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png"
                                style={{
                                    left: () => props.x - playerData.x,
                                    top: () => props.y - playerData.y,
                                    opacity: 0.1,
                                    width: 40,
                                    height: 40,
                                }}
                            />
                        );
                    }
                }

                for (let i = 0; i <= 100; i++) {
                    $app.add(
                        <Letter
                            x={Math.random() * 1000 - 500}
                            y={Math.random() * 1000 - 500}
                        />
                    );
                }

                const bindMouseEvent = () => {
                    const setDirection = (e) => {
                        if (e.canvasX > 250) playerData.directionX = 1
                        else if (e.canvasX < 150) playerData.directionX = -1;
                        else playerData.directionX = 0;

                        if (e.canvasY > 250) playerData.directionY = 1
                        else if (e.canvasY < 150) playerData.directionY = -1;
                        else playerData.directionY = 0;
                    };

                    $app.addEventListener('mousedown', () => playerData.state = 'run');
                    $app.addEventListener('mouseup', () => playerData.state = 'stand');
                    $app.addEventListener('mousedown', setDirection);
                    $app.addEventListener('mousemove', setDirection);
                };
                bindMouseEvent();

            </code>
        </section>

        <h2>API</h2>

        <p></p>

    </article>
`;
