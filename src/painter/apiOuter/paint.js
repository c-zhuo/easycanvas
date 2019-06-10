/** ********** *
 *
 * Sort the sprite and call inner functions
 * - Will be called in each frame after the 'start' function called.
 *
 * ********** **/

import utils from 'utils/utils.js';

// var c = document.createElement('canvas');
// c.height = 1334;
// c.width = 750;
// var d = c.getContext('2d');

// 新老props相同指针，此处判断不再有意义
// const diffRender = function (olds, news) {//debugger;return news; //TODO!!!
//     if (!olds || olds.length !== news.length) {
//         return news;
//     }

//     for (let i = 0; i < olds.length; i++) {
//         let o = olds[i];
//         let n = news[i];

//         if (o.$id !== n.$id || o.img !== n.img) return news;
//         if (o.props && n.props) {
//             // if (o.props.opacity !== n.props.opacity) return news;
//             // if (o.props.rotate !== n.props.rotate) return news;
//             // if (o.props.sh !== n.props.sh) return news;
//             // if (o.props.sw !== n.props.sw) return news;
//             // if (o.props.sx !== n.props.sx) return news;
//             // if (o.props.sy !== n.props.sy) return news;
//             // if (o.props.th !== n.props.th) return news;
//             // if (o.props.tw !== n.props.tw) return news;
//             // if (o.props.tx !== n.props.tx) return news;
//             // if (o.props.ty !== n.props.ty) return news;
//             // if (o.props.text !== n.props.text) return news;
//             // if (o.props.align !== n.props.align) return news;
//             // if (o.props.baseline !== n.props.baseline) return news;
//             // if (o.props.color !== n.props.color) return news;
//             // if (o.props.type !== n.props.type) return news;
//             // if (o.props.font !== n.props.font) return news;

//             for (let prop in n.props) {
//                 if (n.props[prop] !== o.props[prop]) return news;
//             }
//         }
//     }

//     return false;
// };

module.exports = function () {
    if (this.$pausing || (this.$inBrowser && document.hidden)) return;

    let $canvas = this;

    if (process.env.NODE_ENV !== 'production') {
        $canvas.$plugin.timeCollect($canvas, 'custom', 'START');
    }

    utils.execFuncs($canvas.hooks.beforeTick, $canvas, [$canvas.$rafTime]);
    // $canvas.broadcast('beforeTick', $canvas.$rafTime);

    if (process.env.NODE_ENV !== 'production') {
        $canvas.$plugin.timeCollect($canvas, 'preprocessTimeSpend', 'START');
    }

    $canvas.children.forEach(($sprite) => {
        $sprite.recalculate();
    });

    if (!$canvas.$freezing) {
        $canvas.$lastTickChildren = $canvas.$children;
        $canvas.$children = [];

        this.children.sort(function (a, b) {
            let za = utils.funcOrValue(a.style.zIndex, a);
            let zb = utils.funcOrValue(b.style.zIndex, b);
            if (za === zb) return 0;
            return za > zb ? 1 : -1;
        }).forEach(function (perItem, index) {
            $canvas.$perPaint(perItem, index);
        });
    }

    if (process.env.NODE_ENV !== 'production') {
        $canvas.$plugin.timeCollect($canvas, 'preprocessTimeSpend', 'END');
    }

    if (process.env.NODE_ENV !== 'production') {
        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'START');
    }

    if ($canvas.$paintContext.clearRect) {
        // let diffs = $canvas.$nodiff ? $canvas.$children : diffRender($canvas.$lastTickChildren, $canvas.$children);
        // if (diffs) {
            // d.globalAlpha = 0.3;
            // d.clearRect(0, 0, this.width, this.height);
            // d.globalAlpha = 0.7;
            // d.drawImage($canvas.$dom, 0,0);
            $canvas.$paintContext.clearRect(0, 0, this.width, this.height);
            $canvas.$render();
        // }
    } else {
        $canvas.$render();
    }
        // $canvas.$paintContext.globalAlpha = 0.3;
        // $canvas.$paintContext.drawImage(c,0,0);
        // $canvas.$paintContext.globalAlpha = 1;

    if (process.env.NODE_ENV !== 'production') {
        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'END');
    }

    utils.execFuncs($canvas.hooks.ticked, $canvas, [$canvas.$rafTime]);
    // $canvas.broadcast('ticked', $canvas.$rafTime);

    if ($canvas.hooks.nextTick) {
        utils.execFuncs($canvas.hooks.nextTick, $canvas, [$canvas.$rafTime]);
        delete $canvas.hooks.nextTick;
    }

    if (process.env.NODE_ENV !== 'production') {
        $canvas.$plugin.timeCollect($canvas, 'custom', 'END');
    }
};
