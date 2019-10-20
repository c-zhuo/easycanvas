// 图层合并，原理：
// 取出要合并的sprite的所有children，新建一个<canvas>在上面render，然后截图放到sprite的$combine里

import utils from 'utils/utils.js';

// const COMBINE_ING = 9;
// const COMBINE_FAIL = 2;
// const COMBINE_DELAY = 3;

module.exports = function () {//return;
    let $sprite = this;

    if ($sprite.getStyle('visible') === false) {
        return false;
    }

    let $canvas = this.$canvas;

    let rect = $sprite.getRect(true);

    if (rect.tw > $canvas.width || rect.th > $canvas.height) {
        return false;
    }

    let allChildrenInCombine = $sprite.getAllChildren(true);

    for (let i = 0; i < allChildrenInCombine.length; i++) {
        let $child = allChildrenInCombine[i];
        // if ($child.content.img && !$child.$render._imgWidth) {
        //     // 存在未加载完的子对象，不进行合并
        //     // TODO: 功能由staticView封装，此处可以考虑删除
        //     return false;
        // }
        if ($child.getStyle('scale') !== 1) {
            // todo，可能有问题，先不合并
            return false;
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

        // // if (!force) {
        //     if (outerRect.width > $canvas.width) return;// COMBINE_FAIL;
        //     if (outerRect.height > $canvas.height) return;// COMBINE_FAIL;
        // // }
    } else {
        outerRect = rect;
    }

    $sprite.off('ticked', this.combine);

    let $renders = $canvas.$children.filter(($child) => {
        for (let i = 0; i < allChildrenInCombine.length; i++) {
            if (allChildrenInCombine[i].$id === $child.$id) return true;
        } 
    });

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

    $canvas.$render(combineCtx, $renders, true/* renderAll */);

    $renders.forEach(($render) => {
        if(!$render.settings) return;

        // sprite的透明度可能受到parent的影响，这里恢复
        $render.settings.globalAlpha = $render.settings.$combineGlobalAlpha;
    });

    // 合并之后的img对象
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

    $sprite.$combine = {
        content: $sprite.content,
        children: $sprite.children,
        style: Object.assign({}, $sprite.$style), // style有的属性被代理，assign这个API拿不到
    };

    $sprite.children = [];

    const $combineImageSprite = {
        content: {
            img: canvas,
        },
        style: {
            locate: 'lt',
            left: outerRect.left - $sprite.getStyle('left'),
            top: outerRect.top - $sprite.getStyle('top'),
            width: outerRect.width,
            height: outerRect.height,
        },
    };
    $sprite.add($combineImageSprite);

    Object.assign($sprite.style, {
        scale: 1,
        backgroundColor: undefined,
        locate: 'lt',
    });

    return true;
};
