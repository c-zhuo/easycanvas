export default `
    <article id="数据绑定-场景中跑动的人物">
        <h1>数据绑定-场景中跑动的人物</h1>

        <p>先看下面的例子。这个例子模仿了一些网游中的人物操作。按下鼠标时，人物会朝着鼠标的方向跑动，松开鼠标后人物停止。并且，<strong>如果按住鼠标滑动到人物身边，人物也会停下来，以防止“操作过于灵敏导致”</strong>。</p>

        <section>
            <div class="code-2-demo code-2-demo-jsx bg-demo"></div>
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

        <p>这个例子有几个注意点： </p>
        
        <p>首先，<strong>人物不动、动的是场景</strong>。无论人物的坐标是多少，我们始终将他放在画布中间的位置，因此人物的坐标与Player的style属性无关，反而场景中各个元素的style都与人物坐标有关。</p>

        <p>其次，<strong>人物的数据不应该放在Player类里，而应该是从Module流向各个View Module</strong>（MVVM形式），即从Store流向各个Sprite实例。同理。Player的tick方法虽然看似是计算Player的坐标变化，其实是在修改Module的数据，在复杂应用中也建议放到外面（例如，Player的坐标变化可能还与场景地图、其它玩家有关）。这里写在Class类中只是为了便于理解。</p>

        <p class="tip">由于我们的Class的constructor方法返回的是Sprite对象，根据constructor的定义，我们将无法直接访问类的实例。这样，即使挂载了一些数据在Class内部，在Class之外我们也不能直接访问到这些属性。</p>

        <h2>其它工作</h2>

        <p>如果要<strong>开发多人网络游戏</strong>，那么通常的做法是，通过Socket将用户的坐标不断发往服务器（例如每0.1秒发送一次），由服务端来判断用户坐标是否合法（是否走到了场景外、是否移动过快等），合法的话再下发给其它用户。如果不合法，可以向当前用户下发最后一个合法的坐标，然后浏览器中控制人物弹回原来的坐标即可。在很多游戏中，网络卡顿会导致客户端和服务器的通讯不是均匀的，于是某一时刻服务器认为用户“移动过快”。这样，<strong>在用户眼里的现象就会是“跑着跑着人物突然弹回去了”</strong>。</p>

        <p>另外，这个例子的人物跑动并不真实，<strong>效果看起来一些“飘”</strong>。这是因为我们的速度是固定的。为了更逼真的效果，可以获取Sequence组件当前播放的帧数，根据不同的帧数来决定人物的速度。例如跑步动画的(6n+1)帧和(6n+4)帧是人物踩地面发力的图像，速度可以多1点，其它帧数速度可以少1点。当然具体逻辑会复杂一些，因为人物每次变换方向时，帧数需要重制。并且，<strong>人物斜向移动时的速度需要比水平和竖直移动时慢一些</strong>，才能保证人物的速度是更真实的。</p>

        <p>因此，才建议通过封装Player类的方式进行设计，而不是粗暴的$app.add(&lt;Sequence ... /&gt;)。</p>

    </article>
`;
