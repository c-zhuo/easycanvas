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

        <p>其它Demo后续补充。</p>

    </article>
`;
