/** ********** *
 *
 * Sequence Sprite Animation
 *
 * ********** **/

const inBrowser = typeof window !== 'undefined';

let ec;

const component = function (opt) {
    let $sprite = new ec.class.sprite(opt);

    opt.props.index = opt.props.index || 0;

    $sprite.on('beforeTick', function () {
        let _props = this.props;
        let img = ec.utils.funcOrValue(this.content.img, this);

        if (!img || !img.width) return;

        // 确立index
        let index = _props.index || 0;
        if (index < 0) index = 0;

        // 计算每帧的宽高
        let pw, ph;
        if (_props.frameWidth || _props.frameHeight) {
            if (_props.frameWidth < 0) {
                pw = img.width / -_props.frameWidth;
            } else {
                pw = _props.frameWidth;
            }
            if (_props.frameHeight < 0) {
                ph = img.height / -_props.frameHeight;
            } else {
                ph = _props.frameHeight;
            }

            let wTimes = Math.floor(img.width / pw);
            let hTimes = Math.floor(img.height / ph);

            this.style.sx = index % wTimes * pw;
            this.style.sy = Math.floor(index / wTimes) % hTimes * ph;
        }

        // 不循环的精灵动画自动移除
        if (!_props.loop && index > 0 && this.style.sx === 0 && this.style.sy === 0) {
            this.style.img = undefined;
            if (_props.onOver) {
                _props.onOver.call(this);
            } else {
                this.remove();
            }
        }

        // 判断是否应该下一帧
        _props.lastFrameTime = _props.lastFrameTime || 0;
        if (this.$canvas.$nextTickTime - _props.lastFrameTime >= ec.utils.funcOrValue(_props.interval, this)) {
            _props.lastFrameTime = this.$canvas.$nextTickTime;
            _props.index++;
        }

        // 默认的读取和绘制尺寸等于每帧尺寸
        this.style.sw = this.style.sw || pw;
        this.style.sh = this.style.sh || ph;
        this.style.tw = this.style.tw || pw;
        this.style.th = this.style.th || ph;
    });

    return $sprite;
}

const init = function (Easycanvas, namespace) {
    ec = Easycanvas;
    if (namespace) {
        Easycanvas.class[namespace] = component;
    }
    return component;
};

if (inBrowser && window.Easycanvas) {
    ec = Easycanvas;
    Easycanvas.class.sequence = component;
} else {
    module.exports = init;
}
