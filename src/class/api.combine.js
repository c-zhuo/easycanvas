// 图层合并，原理：
// 取出要合并的sprite的所有children，新建一个<canvas>在上面render，然后截图放到sprite的$combine里

import utils from 'utils/utils.js';

const COMBINE_ING = 9;
const COMBINE_DONE = 1;
const COMBINE_FAIL = 2;
const COMBINE_DELAY = 3;

module.exports = function () {//return;
    let $sprite = this;

    if ($sprite.$combine !== COMBINE_ING) {
        return COMBINE_DONE;
    }

    setTimeout(() => {
        if ($sprite.$combine !== COMBINE_ING) {
            // 日历组件会走到这里，原因未知，做一下兜底
            // TODO
            return;// COMBINE_DONE;
        }

        if ($sprite.getStyle('visible') === false) return;// COMBINE_DELAY;

        let $canvas = this.$canvas;

        let rect = $sprite.getRect(false, true);

        if (rect.tw > $canvas.width) return;// COMBINE_FAIL;
        if (rect.th > $canvas.height) return;// COMBINE_FAIL;

        let allChildrenInCombine = $sprite.getAllChildren(true);

        for (let i = 0; i < allChildrenInCombine.length; i++) {
            let $child = allChildrenInCombine[i];
            if ($child.content.img && !$child.$render._imgWidth) {
                // 存在未加载完的子对象，不进行合并
                return;// COMBINE_DELAY;
            }
            if ($child.getStyle('scale') !== 1) {
                return;// COMBINE_DELAY;
            }
        }

        let outerRect;
        if (utils.funcOrValue($sprite.style.overflow, $sprite) !== 'hidden') {
            outerRect = $sprite.getOuterRect(false, true);

            outerRect.left = Math.floor(outerRect.left);
            outerRect.top = Math.floor(outerRect.top);
            outerRect.width = Math.round(outerRect.width);
            outerRect.height = Math.round(outerRect.height);
            outerRect.right = Math.round(outerRect.right);
            outerRect.bottom = Math.round(outerRect.bottom);

            // if (!force) {
                if (outerRect.width > $canvas.width) return;// COMBINE_FAIL;
                if (outerRect.height > $canvas.height) return;// COMBINE_FAIL;
            // }
        } else {
            outerRect = rect;
        }

        $sprite.off('ticked', this.combine);

        let $renders = $canvas.$children.filter(($child) => {
            for (let i = 0; i < allChildrenInCombine.length; i++) {
                if (allChildrenInCombine[i].$id === $child.$id) return true;
            } 
        });
        // if ($sprite.name === 'intro') {
        //     console.warn('length', $renders.length);
        // }

        let spriteOpacity = $sprite.getStyle('opacity');
        $renders.forEach(($render) => {
            if(!$render.settings) return;

            // sprite的透明度可能受到parent的影响，截图时需要还原opacity，先备份一下
            $render.settings.$combineGlobalAlpha = $render.settings.globalAlpha;
            $render.settings.globalAlpha = spriteOpacity > 0 ? $render.settings.globalAlpha / spriteOpacity : 1;

            if (!$render.props.$moved) {
                // 渲染之前先位移，便于裁剪
                // 多个渲染对象来自同一个$sprite，那么在perPaint里计算出来的props是同一份引用
                // 所以这里打一个标记，避免重复位移(hard code，硬编码)
                $render.props.$moved = true;
                $render.props.left -= outerRect.left;
                $render.props.top -= outerRect.top;
            }
        });

        let combinerCanvas = $canvas.$combinerCanvas;
        if (!combinerCanvas) {
            combinerCanvas = $canvas.$combinerCanvas = document.createElement('canvas');
            combinerCanvas.width = $canvas.width;
            combinerCanvas.height = $canvas.height;
            // document.body.prepend(canvas);
        }
        let combineCtx = combinerCanvas.getContext('2d');
        combineCtx.clearRect(0, 0, $canvas.width, $canvas.height);
        // combineCtx.translate(outerRect.tx, outerRect.ty);

        $canvas.$render(combineCtx, $renders, true/* renderAll */);

        $renders.forEach(($render) => {
            if(!$render.settings) return;

            // sprite的透明度可能受到parent的影响，这里恢复
            $render.settings.globalAlpha = $render.settings.$combineGlobalAlpha;
        });
        // combineCtx.translate(-outerRect.tx, -outerRect.ty);

        let canvas = document.createElement('canvas');
        // document.body.prepend(canvas);
        canvas.width = outerRect.width;
        canvas.height = outerRect.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(
            combinerCanvas,
            0,
            0,
            outerRect.width,
            outerRect.height,
            0,
            0,
            outerRect.width,
            outerRect.height,
        );

        // $sprite.children.forEach((child) => {
        //     // 清空$cache，以免后续使用时（如事件处理）拿到了老的坐标
        //     // [RISK]但是可能导致一些transition的变量有偏差
        //     child.$cache = {};
        // });

        $sprite.$combine = {
            content: $sprite.content,
            children: $sprite.children,
            style: Object.assign({}, $sprite.style),
        };
        $sprite.children = [];
        $sprite.content = {
            img: canvas,
        };

        let newLeft = $sprite.getSelfStyle('left') - (Math.floor(rect.left) - outerRect.left);
        let newTop = $sprite.getSelfStyle('top') - (Math.floor(rect.top) - outerRect.top);

        Object.assign($sprite.style, {
            // opacity: 1,
            scale: 1,
            left: newLeft,
            top: newTop,
            width: canvas.width,
            height: canvas.height,
            backgroundColor: undefined,
        });

        return;// COMBINE_DONE;
    });

    return this;
};
