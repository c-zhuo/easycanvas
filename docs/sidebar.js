import Content from './content.js';

module.exports = {
	start () {
		const $Doc = window.$Doc;

		const Fontsize = 28;

		const Index = [
			'创建实例',
			'添加图片元素',
			'设置动画',
			'事件响应',
			'状态钩子',
			'基础API',
			'元素嵌套',
			'精灵动画',
			'',
			'扩展——物理引擎',
		];

		let setScrollHeight = function () {
    		setTimeout(() => {
    			let textBottom = Content.getContent().children[0].$cache.textBottom;
    			Content.getContent().scroll.maxScrollY = textBottom - (window.h * 2 - $content.children[0].$cache.ty * 2);
    			if (Content.getContent().scroll.maxScrollY < 0) {
    				Content.getContent().scroll.maxScrollY = 0;
    			}
    		}, 100);
		};

		let changePage = function (index) {
			Content.getContent().style.opacity = Easycanvas.transition.linear(1, 0, 400);
        	Content.getContent().style.ty = Easycanvas.transition.pendulum(
    			Content.getContent().$cache.ty,
    			Content.getContent().$cache.ty + 400,
    			400
			);
        	setTimeout(() => {
    			Content.getContent().scroll.scrollY = 0;
    			Content.getContent().$scroll.speed = 0;
        		Content.getContent().style.opacity = Easycanvas.transition.linear(0, 1, 400);
            	Content.setPage(index);
        		setScrollHeight();
        	}, 400);
		};

		let $Sidebar = $Doc.add({
			name: 'Sidebar'
		});

		Index.forEach(function (item, index) {
		    $Sidebar.add({
				name: 'Index ' + index,
		        content: {
		            text: item
		        },
		        style: {
		            textType: 'fillText',
		            color: 'black',
		            font: function () {
		            	return `${Fontsize}px Courier New`;
		            },
		            align: 'left',
		            textVerticalAlign: 'middle',
		            tw: 200, th: Fontsize * 1.5,
		            sx: 0, sy: 0,
		            tx: 100, rx: 160,
		            ty: 100 + index * Fontsize * 2,
		            rotate: 0,
		            opacity: 1,
		            locate: 'lt',
		            zIndex: 1,
		        },
		        events: {
		            eIndex: 1,
		            mousemove: function (e) {
		            	if (this.$cache.rotate === 0) {
			            	this.style.rotate = Easycanvas.transition.linear(0, Math.random() > 0.5 ? 10 : -10, 200);
		            	}
		            },
		            mouseout: function () {
		            	this.style.rotate = Easycanvas.transition.linear(this.$cache.rotate, 0, 400);
		            },
		            click: function (e) {
		            	if (!item) return;

		            	changePage(item);
		                return true;
		            },
		        },
		    });
		});

    	setScrollHeight();
	},
};
