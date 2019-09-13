(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{443:function(n,t,s){"use strict";s.r(t);var r=`\n    <article id="数据绑定-场景中跑动的人物">\n        <h1>数据绑定-场景中跑动的人物</h1>\n\n        <p>先看下面的例子。这个例子模仿了一些网游中的人物操作。按下鼠标时，人物会朝着鼠标的方向跑动，松开鼠标后人物停止。并且，<strong>如果按住鼠标滑动到人物身边，人物也会停下来，以防止“操作过于灵敏导致”</strong>。</p>\n\n        ${s(81).a}\n\n        <p>这个例子有几个注意点： </p>\n        \n        <p>首先，<strong>人物不动、动的是场景</strong>。无论人物的坐标是多少，我们始终将他放在画布中间的位置，因此人物的坐标与Player的style属性无关，反而场景中各个元素的style都与人物坐标有关。</p>\n\n        <p>其次，<strong>人物的数据不应该放在Player类里，而应该是从Module流向各个View Module</strong>（MVVM形式），即从Store流向各个Sprite实例。同理。Player的tick方法虽然看似是计算Player的坐标变化，其实是在修改Module的数据，在复杂应用中也建议放到外面（例如，Player的坐标变化可能还与场景地图、其它玩家有关）。这里写在Class类中只是为了便于理解。</p>\n\n        <p class="tip">由于我们的Class的constructor方法返回的是Sprite对象，根据constructor的定义，我们将无法直接访问类的实例。这样，即使挂载了一些数据在Class内部，在Class之外我们也不能直接访问到这些属性。</p>\n\n        <h2>其它工作</h2>\n\n        <p>如果要<strong>开发多人网络游戏</strong>，那么通常的做法是，通过Socket将用户的坐标不断发往服务器（例如每0.1秒发送一次），由服务端来判断用户坐标是否合法（是否走到了场景外、是否移动过快等），合法的话再下发给其它用户。如果不合法，可以向当前用户下发最后一个合法的坐标，然后浏览器中控制人物弹回原来的坐标即可。在很多游戏中，网络卡顿会导致客户端和服务器的通讯不是均匀的，于是某一时刻服务器认为用户“移动过快”。这样，<strong>在用户眼里的现象就会是“跑着跑着人物突然弹回去了”</strong>。</p>\n\n        <p>另外，这个例子的人物跑动并不真实，<strong>效果看起来一些“飘”</strong>。这是因为我们的速度是固定的。为了更逼真的效果，可以获取Sequence组件当前播放的帧数，根据不同的帧数来决定人物的速度。例如跑步动画的(6n+1)帧和(6n+4)帧是人物踩地面发力的图像，速度可以多1点，其它帧数速度可以少1点。当然具体逻辑会复杂一些，因为人物每次变换方向时，帧数需要重制。并且，<strong>人物斜向移动时的速度需要比水平和竖直移动时慢一些</strong>，才能保证人物的速度是更真实的。</p>\n\n        <p>因此，才建议通过封装Player类的方式进行设计，而不是粗暴的$app.add(&lt;Sequence ... /&gt;)。</p>\n\n    </article>\n`;t["default"]=`\n    ${r}\n`}}]);