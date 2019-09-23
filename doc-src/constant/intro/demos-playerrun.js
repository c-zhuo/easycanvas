export default `
        <section class="demo-box">
            <div class="code-2-demo code-2-demo-jsx bg-demo">场景中跑动的人物</div>
            <code>
                import { Painter, View, Image, Sequence } from 'easycanvas';

                // 存放数据
                const Store = {
                    player: {
                        inControl: false,
                        state: 'stand', // 状态
                        speed: 5,       // 速度
                        x: 0,           // x坐标
                        y: 0,           // y坐标
                        directionX: 0,  // 人物在x轴的运动方向
                        directionY: 0   // 人物在y轴的运动方向
                    }
                };
                
                // 人物数据
                const playerData = Store.player;
                
                // 初始化
                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();
                
                // 人物图像资源的配置
                const playerImageConfig = {
                    run: {
                        url: '../resource/image/run.png',
                        width: 166,
                        height: 103,
                    },
                    stand: {
                        url: '../resource/image/stand.png',
                        width: 158,
                        height: 96,
                    },
                    imageLine: 0,
                };
                
                // 根据人物在x、y轴的移动方向，控制展示图像资源的哪一行
                const setLineFromDirection = () => {
                    const { directionX, directionY } = playerData;
                
                    if (directionX === 0 && directionY === 0) return;
                    if (directionX === 0 && directionY === -1) playerImageConfig.imageLine = 0;
                    if (directionX === 1 && directionY === -1) playerImageConfig.imageLine = 1;
                    if (directionX === 1 && directionY === 0) playerImageConfig.imageLine = 2;
                    if (directionX === 1 && directionY === 1) playerImageConfig.imageLine = 3;
                    if (directionX === 0 && directionY === 1) playerImageConfig.imageLine = 4;
                    if (directionX === -1 && directionY === 1) playerImageConfig.imageLine = 5;
                    if (directionX === -1 && directionY === 0) playerImageConfig.imageLine = 6;
                    if (directionX === -1 && directionY === -1) playerImageConfig.imageLine = 7;
                };
                
                // 人物
                class Player {
                    constructor() {
                        return (
                            <View name="player-box">
                                <Sequence
                                    src={() => playerImageConfig[playerData.state].url}
                                    interval={60}
                                    loop={true}
                                    frameWidth={() => playerImageConfig[playerData.state].width}
                                    style={{
                                        left: 200,
                                        top: 200,
                                        cutHeight: () => playerImageConfig[playerData.state].height,
                                        cutTop: () => playerImageConfig[playerData.state].height * playerImageConfig.imageLine,
                                    }}
                                    hooks={{
                                        ticked: this.tick,
                                    }}
                                />
                            </View>
                        );
                    }
                
                    // 每帧改变人物的坐标
                    tick() {
                        if (playerData.state === 'run') {
                            playerData.x += playerData.directionX * playerData.speed;
                            playerData.y += playerData.directionY * playerData.speed;
                        }
                    }
                }
                
                // 将人物添加到场景  
                $app.add(<Player />);
                
                // 场景中的元素，这里用一个字母来举例
                class Letter {
                    constructor(props) {
                        return (
                            <Image
                                src="https://raw.githubusercontent.com/c-zhuo/easycanvas/master/demos/G.png"
                                style={{
                                    left: () => props.x - playerData.x,
                                    top: () => props.y - playerData.y,
                                    width: 40,
                                    height: 40,
                                    zIndex: props.zIndex
                                }}
                            />
                        );
                    }
                }
                
                // 添加100个场景元素，位置随机
                for (let i = 1; i <= 100; i++) {
                    $app.add(
                        <Letter
                            x={Math.random() * 1000 - 500}
                            y={Math.random() * 1000 - 500}
                            zIndex={-i}
                        />
                    );
                }
                
                // 鼠标事件绑定，根据鼠标位置决定人物x、y轴运动方向
                const bindMouseEvent = () => {
                    const setDirection = (e) => {
                        if (!playerData.inControl) return;
                
                        if (e.canvasX > 250) playerData.directionX = 1
                        else if (e.canvasX < 150) playerData.directionX = -1;
                        else playerData.directionX = 0;
                
                        if (e.canvasY > 275) playerData.directionY = 1
                        else if (e.canvasY < 175) playerData.directionY = -1;
                        else playerData.directionY = 0;

                        playerData.state = playerData.directionX || playerData.directionY ? 'run' : 'stand';

                        setLineFromDirection();
                    };
                
                    $app.addEventListener('mousedown', () => {
                        playerData.inControl = true;
                    });
                    $app.addEventListener('mouseup', () => {
                        playerData.inControl = false;
                        playerData.state = 'stand';
                    });
                    $app.addEventListener('mousedown', setDirection);
                    $app.addEventListener('mousemove', setDirection);
                };
                bindMouseEvent();

            </code>
        </section>
`;
