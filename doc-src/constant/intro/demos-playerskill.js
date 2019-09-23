export default `
        <section class="demo-box">
            <div class="code-2-demo code-2-demo-jsx bg-demo">场景中跑动的人物</div>
            <code>
                import { Painter, ImgPretreat, View, Text, Sequence } from 'easycanvas';

                // 存放数据
                const Store = {
                    player: {               // 人物信息
                        state: 'stand',     // 状态
                        x: 0,               // x坐标
                        y: 0,               // y坐标
                        directionX: 0,      // 人物在x轴的朝向方向
                        directionY: 0,      // 人物在y轴的朝向方向
                        skillCooldown: 500, // 人物使用技能的动作时长
                        $playerImage: null, // $sprite
                    },
                    control: {              // 操作信息
                        mouseX: 0,          // 鼠标x坐标
                        mouseY: 0,          // 鼠标y坐标
                        keyboarding: -1,    // 键盘处于按下状态时记录keyCode
                    }
                };
                
                const playerData = Store.player;
                const controlData = Store.control;
                
                // 初始化
                const $app = new Painter({
                    el: "#app",
                    width: 400,
                    height: 400
                }).start();
                
                // 人物图像资源的配置
                const playerImageConfig = {
                    skill: {
                        url: '../resource/image/skill.png',
                        width: 152,
                        height: 100,
                        interval: [50, 50, 50, 50, 150, 150],
                    },
                    stand: {
                        url: '../resource/image/stand.png',
                        width: 158,
                        height: 96,
                        interval: [200, 200, 200, 200, 200, 200],
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
                                    ref={$ => playerData.$playerImage = $}
                                    src={() => playerImageConfig[playerData.state].url}
                                    interval={() => playerImageConfig[playerData.state].interval}
                                    loop={true}
                                    frameWidth={() => playerImageConfig[playerData.state].width}
                                    style={{
                                        left: 200,
                                        top: 200,
                                        zIndex: 200,
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
                }
                
                // 将人物添加到场景
                $app.add(<Player />);
                
                // 效果
                class Effect1 {
                    constructor(props) {
                        const { start, end } = props;
                
                        const $container = <View style={{ zIndex: end.y }} />;
                
                        const changeImage = () => {
                            $container.add(
                                <Sequence
                                    src={'../resource/image/Fire.png'}
                                    interval={60}
                                    loop={false}
                                    frameWidth={-9}
                                    style={{
                                        left: end.x,
                                        top: end.y,
                                        width: 100,
                                        height: 110
                                    }}
                                />
                            );
                        };
                
                        $container.add(
                            <Sequence
                                src={'../resource/image/fireFlys.png'}
                                interval={60}
                                loop={false}
                                frameWidth={-7}
                                style={{
                                    left: Transition.linear(start.x, end.x, 420),
                                    top: Transition.linear(start.y, end.y, 420),
                                    rotate: Transition.linear(0, 720, 420),
                                    width: 72,
                                    height: 70
                                }}
                                onOver={changeImage}
                            />
                        );
                
                        return $container;
                    }
                }
                
                // 生成3种色彩效果
                const Effect2ImgCache = new Array(3).fill(0).map((undefined, index) => {
                    const transform = [100, 0, -100];
                
                    return ImgPretreat('../resource/image/effect.jpg', {
                        conversion: function (pixel) {
                            return {
                                r: pixel.r + transform[index],
                                g: pixel.g + transform[(index + 1) % 3],
                                b: pixel.b + transform[(index + 2) % 3],
                                // jpg图像底色为黑色，因此原图颜色越接近黑色的像素点，认为透明度越高
                                a: pixel.r + pixel.g + pixel.b - 60,
                            };
                        }
                    });
                });
                
                class Effect2 {
                    constructor(props) {
                        const { end } = props;
                
                        const $container = <View style={{ zIndex: end.y }} />;
                
                        $container.add(
                            <Sequence
                                src={Effect2ImgCache[Math.floor(Math.random() * 3)]}
                                interval={60}
                                loop={false}
                                frameWidth={-18}
                                style={{
                                    left: end.x,
                                    top: end.y,
                                }}
                            />
                        );
                
                        return $container;
                    }
                }
                
                // 根据鼠标位置计算人物朝向
                const setDirection = (e) => {
                    if (e.canvasX > 250) playerData.directionX = 1
                    else if (e.canvasX < 150) playerData.directionX = -1;
                    else playerData.directionX = 0;
                
                    if (e.canvasY > 275) playerData.directionY = 1
                    else if (e.canvasY < 175) playerData.directionY = -1;
                    else playerData.directionY = 0;
                };
                
                // 鼠标事件绑定
                const bindMouseEvent = () => {
                    $app.addEventListener('mousemove', (e) => {
                        setDirection(e);
                
                        controlData.mouseX = e.canvasX;
                        controlData.mouseY = e.canvasY;
                    });
                };
                bindMouseEvent();
                
                // 键盘事件绑定
                const bindKeyboardEvent = () => {
                    let keyboardHandlerInterval = null;
                
                    const keyboardHandler = () => {
                        if (controlData.keyboarding === -1) return;
                
                        if (controlData.keyboarding === 49 || controlData.keyboarding === 50) {
                            const canAttackNow = playerData.state === 'stand';
                
                            if (canAttackNow) {
                                playerData.state = 'skill';
                                playerData.$playerImage.restart();
                
                                setTimeout(() => {
                                    playerData.state = 'stand';
                                }, playerData.skillCooldown);
                
                                setLineFromDirection();
                
                                const keyboarding = controlData.keyboarding;
                
                                setTimeout(() => {
                                    if (keyboarding === 49) {
                                        $app.add(
                                            <Effect1
                                                start={{ x: 200, y: 200 }}
                                                end={{ x: controlData.mouseX, y: controlData.mouseY }}
                                            />
                                        );
                                    } else if (keyboarding === 50) {
                                        $app.add(
                                            <Effect2
                                                end={{ x: controlData.mouseX, y: controlData.mouseY }}
                                            />
                                        );
                                    }
                                }, playerData.skillCooldown / 2); // 动作进行一半的时候展示效果更真实
                            }
                        }
                    };
                
                    document.addEventListener("keydown", event => {
                        controlData.keyboarding = event.keyCode;
                
                        keyboardHandlerInterval = setInterval(keyboardHandler, 100);
                    });
                
                    document.addEventListener("keyup", event => {
                        controlData.keyboarding = -1;
                
                        clearInterval(keyboardHandler, 100);
                        keyboardHandlerInterval = null;
                    });
                };
                bindKeyboardEvent();
                
                $app.add(<Text>请先点击场景，使焦点在iframe中，然后敲击数字键1和2</Text>);

            </code>
        </section>
`;
