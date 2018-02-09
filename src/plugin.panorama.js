let _ec;

let panorama = (opt) => {
    const $Painter = opt.painter;
    // dx 每帧移动距离
    let { img, dx = 0.5 } = opt;

    const sprite = new Easycanvas.class.sprite(opt);
    sprite.dx = dx;

    const xSize = opt.style.tw;
    const ySize = opt.style.th;
    const imgW = opt.style.sw;
    const imgH = opt.style.sh;

    let x = 0;

    const img1 = new Easycanvas.class.sprite({
        content: {
            img,
        },
        style: {
            locate: 'left',
            sw: xSize,
            th: ySize,
        }
    });
    const img2 = new Easycanvas.class.sprite({
        content: {
            img,
        },
        style: {
            locate: 'left',
            sw: xSize,
            th: ySize,
            sx: -xSize,
            opacity: 0,
        }
    });
    sprite.add(img1);
    sprite.add(img2);
    const draw = () => {
        if (x > imgW) {
            x = -imgW;
        }
        if (x >= 0) {
            img2.style.sx = -imgW + x + 1;
            if (x < imgW - xSize) {
                img2.style.opacity = 0;
            } else {
                if (imgW - x >= 0 && imgW - x <= 5) {
                    img1.style.sw = 0;
                } else {
                    img1.style.sw = imgW - x;
                }
                img2.style.opacity = 1;
                img2.style.sw = xSize - img1.style.sw;
            }
        } else if (x >= -imgW) {
            img2.style.sx = imgW + x - 1;
            if (x < -xSize) {
                img1.style.opacity = 0;
            } else {
                img1.style.opacity = 1;
                img1.style.sw = xSize + x;
                img2.style.sw = -x;
            }
        }
        img1.style.sx = x;
        x += sprite.dx;
    };

    sprite.start = () => {
        sprite.on('ticked', draw);
    };
    sprite.stop = () => {
        sprite.off('ticked', draw)
    };
    sprite.changeSpeed = (newDx) => {
        dx = newDx;
    };

    return sprite;
};

if (window && window.Easycanvas) {
	_ec = window.Easycanvas;
	_ec.class.panorama = panorama;
}

module.exports = function (ec) {
	_ec = ec;
	ec.class.panorama = panorama;
};