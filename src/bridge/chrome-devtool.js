import constants from 'constants';

if (process.env.NODE_ENV !== 'production') {
	const PLUGIN_BRIDGE = {
		getSprite: function ($canvasId) {
			if (!window[constants.devFlag].isPaintRecording) return [];

            let res = {};

            if ($canvasId) {
                let paintList = window[constants.devFlag].$canvas[$canvasId].$canvas.paintList;
                let $paintList = window[constants.devFlag].$canvas[$canvasId].$canvas.$paintList;

                let pusher = function (item) {
                	// Skip $mask in select mode
                	if (item.name === constants.devFlag) return;

                    res[item.$id] = {
                        name: item.name,
                        parent: item.$parent && item.$parent.$id,
                        style: {},
                        children: item.children && item.children.map(function (child) {
                            return child.$id;
                        }),
                    };

                    if (item.content.img || item.content.text) {
                    	res[item.$id].rendered = false;
	                    for (let i = 0, l = $paintList.length; i < l; i++) {
							if ($paintList[i].$id === item.$id) {
								res[item.$id].rendered = true;
								break;
							}
	                    }
                    } else {
						// res[item.$id].rendered = undefined;
                    }


                    for (let i in item.style) {
                    	if (typeof item.style[i] === 'function') {
                    		res[item.$id].style[i] = item.$cache[i];

                    		if (typeof item.$cache[i] === 'function') {
                    			res[item.$id].style[i] = 'function';
                    		}
                    	} else {
                    		res[item.$id].style[i] = item.style[i];
                    	}
                    }

                    if (item.physics) {
                    	res[item.$id].physics = item.physics;
                    }

                    if (item.children) {
                        item.children.forEach(pusher);
                    }
                };

                paintList.forEach(pusher);

            } else {
                for (let c in window[constants.devFlag].$canvas) {
                    res = Object.assign(res, window[constants.devFlag].$plugin.getSprite(c));
                }
            }

            return res;
        },

		selectSpriteById: function ($spriteId, $canvasId) {
			if (!$canvasId) {
				for (let i in window[constants.devFlag].$canvas) {
					let res = PLUGIN_BRIDGE.selectSpriteById($spriteId, i);
					if (res) return {
						$sprite: res.$sprite || res,
						$canvas: window[constants.devFlag].$canvas[i].$canvas,
					};
				}

				return false;
			}

		    let paintList = window[constants.devFlag].$canvas[$canvasId].$canvas.paintList;

		    let looper = function (array) {
		    	for (let i = 0; i < array.length; i++) {
		    		if (array[i].$id === $spriteId) return array[i];

		    		let res = looper(array[i].children);
		    		if (res) {
		    			return {
							$sprite: res.$sprite || res,
							$canvas: window[constants.devFlag].$canvas[$canvasId].$canvas,
						};
		    		}
		    	}

		    	return false;
		    };

		    let res = looper(paintList);
		    if (res) return {
				$sprite: res.$sprite || res,
				$canvas: window[constants.devFlag].$canvas[$canvasId].$canvas,
			};
		},

		updateSprite: function ($spriteId, map, $canvasId) {
			let $sprite = PLUGIN_BRIDGE.selectSpriteById($spriteId, $canvasId).$sprite;
			if (!$sprite) console.warn(`Sprite ${spriteId} Not Found.`);

			Object.assign($sprite.style, map);
		},

		highlightSprite: function ($spriteId, opt, $canvasId) {
			window[constants.devFlag].selectMode = Boolean(opt);

			let tmp = PLUGIN_BRIDGE.selectSpriteById($spriteId, $canvasId);
			let $sprite = tmp.$sprite;
			let $canvas = tmp.$canvas;

			if (opt && $canvas && $sprite) {
				$canvas.$plugin.hook.selectSprite(false, $canvas, $sprite);
			} else if ($canvas) {
				$canvas.$plugin.hook.cancelSelectSprite($canvas);
			}
		},

		sendGlobalHook: function ($spriteId, $canvasId) {
			let tmp = PLUGIN_BRIDGE.selectSpriteById($spriteId, $canvasId);
			let $sprite = tmp.$sprite;
			let $canvas = tmp.$canvas;

			if (window.$ec === $canvas.$id && window.$es === $sprite.$id) return;

			console.warn(`window.$ec = [Easycanvas ${$canvas.$id}], window.$es = [Easycanvas ${$sprite.$id}]`);
			window.$ec = $canvas;
			window.$es = $sprite;
		},

		pause: function ($canvasId, opt) {
			let $canvas = window[constants.devFlag].$canvas[$canvasId].$canvas;
			$canvas.$pausing = typeof opt !== 'undefined' ? opt : !$canvas.$pausing;
		},
	};

	window[constants.devFlag] = window[constants.devFlag] || {
        isPaintRecording: false,
        selectMode: false,

        peformance: {
            area: 0,
            times: 0,
        },

        $plugin: PLUGIN_BRIDGE,

        $canvas: {},
        current: {},
    };
}
