const Fontsize = 28;

let page = '创建实例';
let $content;

module.exports = {

    start () {
        let $Doc = window.$Doc;

        // create a sprite
        $content = $Doc.add({
            name: 'content',
            content: {
            },
            scroll: {
                scrollable: true,
                minScrollY: 0,
                maxScrollY: 0,
                minScrollX: 0,
                maxScrollX: 0,
            },
            children: [{
                content: {
                    text: function () {
                        if (!Text[page]) return 'Work in progress';
                        return Easycanvas.multlineText(Text[page], {
                            start: '$s'
                        });
                    },
                },
                inherit: ['tx', 'ty', 'opacity'],
                style: {
                    locate: 'lt',
                    textType: 'fillText',
                    color: 'black',
                    font: `${Fontsize}px Arial`,
                    align: 'left',
                    textVerticalAlign: 'top',
                    lineHeight: Fontsize + 14,
                    tw: window.w * 2 - 500, th: 500,
                    sx: 0, sy: 0, // source position, default 0
                    tx: 0, ty: 0,
                    opacity: 1,
                    zIndex: 1, // z-index of this image
                },
            }],
            style: {
                locate: 'lt',
                tx: 400, ty: 100,
                tw: window.w * 2 - 500,
                th: window.h * 2 - 100,
                opacity: 1,
                zIndex: 1, // z-index of this image
            },
            events: {
                eIndex: 2, // event-index of this image
                mousewheel: function () {
                    // console.warn(1);
                },
            },
        });
        window.$content = $content;
    },
};
