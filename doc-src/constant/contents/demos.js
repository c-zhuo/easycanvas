import miku from './demos-miku.js';
import ball3d from './demos-ball3d.js';
import ball2d from './demos-ball2d.js';
import perf from './demos-perf.js';
import sequence from './demos-sequence.js';

module.exports = `
    <article id="一些demo">
        <h1>一些demo</h1>

        <p class="tip">点击以下Demo，可以查看演示，支持修改代码之后立即预览。其中涉及3D效果的Demo需要你的浏览器支持WebGL。</p>

        ${miku}
        ${ball3d}
        ${ball2d}
        ${perf}
        ${sequence}

        <p>微信小游戏《弹一弹》2D版的Demo可以在<a href="https://github.com/chenzhuo1992/easycanvas/tree/master/wxgame" target="_blank">这里</a>找到，将wxgame目录绑定为项目目录即可。</p>

        <p>其它Demo后续补充。</p>

    </article>
`;
