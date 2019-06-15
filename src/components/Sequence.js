/** ********** *
 *
 * Sequence Sprite Animation
 *
 * ********** **/

import browserRegister from './_browserRegister.js';

const component = function (opt, Easycanvas) {
    const funcOrValue = Easycanvas.utils.funcOrValue;

    let $sprite = new Easycanvas.Sprite(opt);

    opt.props.index = opt.props.index || 0;

    $sprite.on('beforeTick', function () {
        let _props = this.props;
        let img = funcOrValue(this.content.img, this);

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

            this.style.cutLeft = index % wTimes * pw;
            this.style.cutTop = Math.floor(index / wTimes) % hTimes * ph;
        }

        // 不循环的精灵动画自动移除
        if (!_props.loop && index > 0 && this.style.cutLeft === 0 && this.style.cutTop === 0) {
            this.style.img = undefined;
            if (_props.onOver) {
                _props.onOver.call(this);
            } else {
                this.remove();
            }
        }

        // 判断是否应该下一帧
        _props.lastFrameTime = _props.lastFrameTime || 0;
        if (this.$canvas.$nextTickTime - _props.lastFrameTime >= funcOrValue(_props.interval, this)) {
            _props.lastFrameTime = this.$canvas.$nextTickTime;
            _props.index++;
        }

        // 默认的读取和绘制尺寸等于每帧尺寸
        this.style.cutWidth = this.style.cutWidth || pw;
        this.style.cutHeight = this.style.cutHeight || ph;
        this.style.width = this.style.width || pw;
        this.style.height = this.style.height || ph;
    });

    return $sprite;
};

browserRegister(component, 'Sequence');

export default component;
