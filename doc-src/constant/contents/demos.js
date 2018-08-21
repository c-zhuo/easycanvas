import miku from './demos-miku.js';
import mikuCamera from './demos-miku-camera.js';
import ball3d from './demos-ball3d.js';
import ball2d from './demos-ball2d.js';
import sequence from './demos-sequence.js';
import text from './demos-text.js';

import perfBall from './demos-perf-ball.js';
import perf2000 from './demos-perf-2000.js';
import perf3d from './demos-perf-3d.js';
import perf3ds from './demos-perf-3ds.js';

module.exports = `
    <article id="一些demo">
        <h1>一些demo</h1>

        <p class="tip">点击以下Demo，可以查看演示，支持修改代码之后立即预览。其中涉及3D效果的Demo需要你的浏览器支持WebGL。</p>

        <h2>功能性demo</h2>
        <p></p>

        ${miku}
        ${mikuCamera}
        ${ball3d}
        ${ball2d}
        ${sequence}
        ${text}

        <h2>微信小游戏</h2>
        <p></p>

        <p>微信小游戏《弹一弹》2D版的Demo可以在[<a href="https://github.com/chenzhuo1992/easycanvas/tree/master/wxgame" target="_blank">这里</a>]找到，将wxgame目录绑定为项目目录即可。</p>

        <h2>性能测试demo</h2>
        <p></p>

        ${perfBall}
        ${perf2000}
        ${perf3d}
        ${perf3ds}

        <p class="tip">其它Demo后续补充。</p>

    </article>
`;
