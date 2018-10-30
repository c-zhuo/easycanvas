import utils from 'utils/utils.js';

const COMBINE_DONE = 1;
const COMBINE_FAIL = 2;
const COMBINE_DELAY = 3;

module.exports = function () {
// module.exports = function (force) {
    setTimeout(() => {
        let $sprite = this;

        if ($sprite.$combine) return COMBINE_DONE;

        if (utils.funcOrValue($sprite.style.visible, $sprite) === false) return COMBINE_DELAY;

        let $canvas = this.$canvas;

        let rect = $sprite.getRect(false, true);

        if (rect.tx < 0 || rect.tr > $canvas.width) return COMBINE_FAIL;
        if (rect.ty < 0 || rect.tb > $canvas.height) return COMBINE_FAIL;

        let allChildrenInCombine = $sprite.getAllChildren(true);

        for (let i = 0; i < allChildrenInCombine.length; i++) {
            let $child = allChildrenInCombine[i];
            let img = $child.content.img;
            if (img && img.src) {
                // 兼容性TODO
                if (!img.$painted || img.width === 0 || img.complete === false || img.naturalHeight === 0) {
                    // 存在未加载完的子对象，不进行合并
                    return COMBINE_DELAY;
                }
            }
            if ($child.getStyle('scale') !== 1) {
                return COMBINE_DELAY;
            }
        }

        let outerRect = $sprite.getOuterRect(false, true);

        outerRect.tx = Math.floor(outerRect.tx);
        outerRect.ty = Math.floor(outerRect.ty);
        outerRect.tw = Math.round(outerRect.tw);
        outerRect.th = Math.round(outerRect.th);
        outerRect.tr = Math.round(outerRect.tr);
        outerRect.tb = Math.round(outerRect.tb);

        // if (!force) {
            if (outerRect.tx < 0 || outerRect.tr > $canvas.width) return COMBINE_FAIL;
            if (outerRect.ty < 0 || outerRect.tb > $canvas.height) return COMBINE_FAIL;
        // }

        // 修改：这块不能绘制，paint有可能导致位置变动
        // 绘制一帧，清除连续combine时，前一个combine新产生的对象没有进入$canvas.$children，导致下一个combine获取不到的问题
        // $canvas.$lastTickChildren = false;
        // $canvas.paint();

        let $renders = $canvas.$children.filter(($child) => {
            for (let i = 0; i < allChildrenInCombine.length; i++) {
                if (allChildrenInCombine[i].$id === $child.$id) return true;
            } 
        });
        // if ($sprite.name === 'intro') {
        //     console.warn('length', $renders.length);
        // }

        let originChildren = $canvas.$children;
        let spriteOpacity = $sprite.getStyle('opacity');
        $renders.forEach(($render) => {
            $render.settings.$combineGlobalAlpha = $render.settings.globalAlpha;
            $render.settings.globalAlpha = spriteOpacity > 0 ? $render.settings.globalAlpha / spriteOpacity : 1;
        });
        $canvas.$children = $renders;
        $canvas.$paintContext.clearRect(0, 0, $canvas.width, $canvas.height);
        $canvas.$lastTickChildren = false;
        $canvas.$render();

        $renders.forEach(($render) => {
            $render.settings.globalAlpha = $render.settings.$combineGlobalAlpha;
        });

        let canvas = document.createElement('canvas');
        // document.body.prepend(canvas);
        canvas.width = outerRect.tw;
        canvas.height = outerRect.th;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(
            $canvas.$dom,
            outerRect.tx,
            outerRect.ty,
            outerRect.tw,
            outerRect.th,
            0,
            0,
            outerRect.tw,
            outerRect.th,
        );

        $sprite.children.forEach((child) => {
            // 清空$cache，以免后续使用时（如事件处理）拿到了老的坐标
            child.$cache = {};
        });

        $sprite.$combine = {
            content: $sprite.content,
            children: $sprite.children,
            style: $sprite.style,
        };
        $sprite.children = [];
        $sprite.content = {
            img: canvas,
        };

        let newTx = $sprite.getSelfStyle('tx') - (Math.floor(rect.tx) - outerRect.tx);
        let newTy = $sprite.getSelfStyle('ty') - (Math.floor(rect.ty) - outerRect.ty);
        $sprite.style = Object.assign({}, $sprite.style, {
            // opacity: 1,
            scale: 1,
            tx: newTx,
            ty: newTy,
            tw: canvas.width,
            th: canvas.height,
        });

        // $canvas.paint();
        $canvas.$children = originChildren;
        // $canvas.$paintContext.clearRect(0, 0, $canvas.width, $canvas.height);
        // $canvas.$lastTickChildren = false;
        // $canvas.$render();

        // 绘制一帧，清除连续combine时，前一个combine新产生的对象没有进入$canvas.$children，导致下一个combine获取不到的问题
        $canvas.$lastTickChildren = false;
        $canvas.paint();

        // $canvas.$lastTickChildren = false;
        // $canvas.paint();

        $sprite.off('ticked', this.combine);

        return COMBINE_DONE;
    });
};
