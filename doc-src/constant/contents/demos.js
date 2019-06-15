import miku from './demos-miku.js';
import mikuCamera from './demos-miku-camera.js';
import mikuFbxdds from './demos-fbxdds.js';
import ball3d from './demos-ball3d.js';
import ball2d from './demos-ball2d.js';
import sequence from './demos-sequence.js';
import text from './demos-text.js';
import components from './demos-components.js';

import perfBall from './demos-perf-ball.js';
import perf2000 from './demos-perf-2000.js';
import perf3d from './demos-perf-3d.js';
import perf3ds from './demos-perf-3ds.js';

import browser from './demos-style-browser.js';
import jsx from './demos-style-jsx.js';

module.exports = `
    <article id="一些demo">
        <h1>一些demo</h1>

        <p>点击<strong>蓝色小箭头</strong>可以查看演示，支持<strong>在线修改代码实时预览</strong>。其中涉及3D效果的Demo需要你的浏览器支持WebGL。</p>

        <style>
            .demos-card {
                display: inline-block;
                margin: 1%;
                box-shadow: 0px 2px 7px 1px #d8d0d0;
                width: 30%;
                overflow: hidden;
            }
            .demos-screenshoot {
                width: 100%;
                padding-bottom: 100%;
                height: 0;
                border-bottom: 2px solid #eee;
                background-size: 100%;
                background-position: 50%;
            }
            .demos-screenshoot:hover {
                opacity: 0.8;
            }

            .demos-card > .demo-box {
                padding: 10px 20px 40px;
            }
            .demos-card > .demo-box > .code-2-demo {
                font-weight: bold;
            }
            .demos-card > .demo-box > .code-2-demo:hover {
                color: #019fa0;
            }
        </style>

        <h2>Code Stucture</h2>
        <p></p>

        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/style1.jpg)"></div>
            ${browser}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/style2.jpg)"></div>
            ${jsx}
        </div>

        <h2>3D Webgl Demos</h2>
        <p></p>

        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/1.jpg)"></div>
            ${miku}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/2.jpg)"></div>
            ${mikuCamera}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/3.jpg)"></div>
            ${mikuFbxdds}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/4.jpg)"></div>
            ${ball3d}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/5.jpg)"></div>
            ${perf3d}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/6.jpg)"></div>
            ${perf3ds}
        </div>

        <h2>2D Canvas Demos</h2>
        <p></p>

        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/7.jpg)"></div>
            ${ball2d}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/8.jpg)"></div>
            ${sequence}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/9.jpg)"></div>
            ${text}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/10.jpg)"></div>
            ${perfBall}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/11.jpg)"></div>
            ${perf2000}
        </div>
        <div class="demos-card">
            <div class="demos-screenshoot" style="background-image:url(../resource/doc/12.jpg)"></div>
            ${components}
        </div>

        <h2>微信小游戏</h2>
        <p></p>

        <p>微信小游戏《弹一弹》2D版的Demo可以在[<a href="https://github.com/c-zhuo/easycanvas/tree/master/wxgame" target="_blank">这里</a>]找到，将wxgame目录绑定为项目目录即可。</p>

        <h2>微信小程序</h2>
        <p></p>

        <p>微信小程序的示例Demo可以在[<a href="https://github.com/c-zhuo/easycanvas/tree/master/wxapp" target="_blank">这里</a>]找到，将wxapp目录绑定为项目目录即可。</p>

        <p class="tip">其它Demo后续补充。</p>

    </article>
`;
