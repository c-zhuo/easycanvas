<<<<<<< HEAD
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var s=e();for(var a in s)("object"==typeof exports?exports:t)[a]=s[a]}}(this,function(){return function(t){function e(a){if(s[a])return s[a].exports;var i=s[a]={exports:{},id:a,loaded:!1};return t[a].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var s={};return e.m=t,e.c=s,e.p="",e(0)}({0:function(t,e,s){t.exports=s(73)},1:function(t,e){"use strict";var s={isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},funcOrValue:function(t,e){if("function"==typeof t){var s=t.call(e);return s}return t},execFuncs:function(t,e,a){if(t&&(s.isArray(a)||(a=[a])),"function"==typeof t)return t.apply(e,a);if(s.isArray(t)){var i=[];return t.forEach(function(t){i.push(t&&t.apply(e,a))}),i}},blend:["source-over","source-in","source-out","source-atop","destination-over","destination-in","destination-out","destination-atop","lighter","copy","xor","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],pointInRect:function(t,e,s,a,i,r){return!(t<s||t>a||e<i||e>r)},firstValuable:function(t,e,s){return"undefined"==typeof t?"undefined"==typeof e?s:e:t}};t.exports=s},73:function(t,e,s){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var i=s(1),r=a(i),l="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII=",o=new Image;o.src=l;var h={drip:function(t,e,s){var a=t.subtype||1;e.clearRect(0,0,this.style.tw,this.style.th),e.globalCompositeOperation="source-over",e.globalAlpha=1,1===a&&e.drawImage(o,(this.style.tw>>1)-(this.style.tw>>1)*t.progress*2,(this.style.th>>1)-(this.style.th>>1)*t.progress*2,this.style.tw*t.progress*2,this.style.th*t.progress*2),1!==a&&e.drawImage(o,(this.style.tw>>1)-(this.style.tw>>1)*(1-t.progress)*2,(this.style.th>>1)-(this.style.th>>1)*(1-t.progress)*2,this.style.tw*(1-t.progress)*2,this.style.th*(1-t.progress)*2),e.globalCompositeOperation=1===a?"source-out":"source-in",e.globalAlpha=Math.max(1-t.progress,0),e.drawImage(r.default.funcOrValue(this.$fade.originImg,this),0,0,this.style.tw,this.style.th)},door:function(t,e,s){var a=t.subtype||1,i=0,l=0;1===a?i=this.style.tw/2:2===a?(i=this.style.tw,l=this.style.th/2):3===a?(i=this.style.tw/2,l=this.style.th):4===a&&(l=this.style.th/2),e.clearRect(0,0,this.style.tw,this.style.th),e.save(),e.translate(i,l),e.rotate(90*(a<3?1:-1)*3.14/180*t.progress),e.translate(-i,-l),e.drawImage(r.default.funcOrValue(this.$fade.originImg,this),0,0,i||this.style.tw,this.style.th-l||l,0,0,i||this.style.tw,this.style.th-l||l),e.restore(),e.save(),e.translate(i,l),e.rotate(90*(a<3?-1:1)*3.14/180*t.progress),e.translate(-i,-l),e.drawImage(r.default.funcOrValue(this.$fade.originImg,this),a<4?this.style.tw-i:0,a<3?l:a<4?0:l,this.style.tw-i||i,this.style.th-l||l,a<4?this.style.tw-i:0,a<3?l:a<4?0:l,this.style.tw-i||i,this.style.th-l||l),e.restore()},rotate:function(t,e,s){var a=t.subtype||1,i=0,l=0;1===a?i=this.style.tw:2===a?(i=this.style.tw,l=this.style.th):3===a&&(l=this.style.th),e.clearRect(0,0,this.style.tw,this.style.th),e.save(),e.translate(i,l),e.rotate(1.57*t.progress),e.translate(-i,-l),e.drawImage(r.default.funcOrValue(this.$fade.originImg,this),0,0,this.style.tw,this.style.th),e.restore()},print:function(t,e,s){e.drawImage(r.default.funcOrValue(this.$fade.originImg,this),0,0);var a=t.subtype||1;1===a&&e.clearRect(0,0,this.style.tw,t.progress*this.style.th),2===a&&e.clearRect(0,0,t.progress*this.style.tw,this.style.th),3===a&&e.clearRect(0,(1-t.progress)*this.style.th,this.style.tw,this.style.th),4===a&&e.clearRect((1-t.progress)*this.style.tw,0,this.style.tw,this.style.th)},switch:function(t,e,s){var a=1.3*t.progress;0===a&&(s.fillStyle="rgba(0, 0, 0, 1)",s.globalAlpha=.2);var i=t.subtype||1;1===i&&s.fillRect(0,0,this.style.tw,a*this.style.th),2===i&&s.fillRect(0,0,a*this.style.tw,this.style.th),3===i&&s.fillRect(0,(1-a)*this.style.th,this.style.tw,this.style.th),4===i&&s.fillRect((1-a)*this.style.tw,0,this.style.tw,this.style.th),e.globalCompositeOperation="source-over",e.clearRect(0,0,this.style.tw,this.style.th),e.drawImage(s.$canvas,0,0),e.globalCompositeOperation="source-out",e.drawImage(r.default.funcOrValue(this.$fade.originImg,this),0,0)},sweep:function(t,e,s){if(!t.particleData.length)for(var a=t.subtype||1,i=this.style.th/this.style.tw,l=0;l<this.style.tw/50;l++)1===a&&t.particleData.push({x:50*l+Math.random()*this.style.tw/5/2-this.style.tw/5,y:50*i*l+Math.random()*this.style.th/5/2-this.style.th/5,size:100-l}),2===a&&t.particleData.push({x:this.style.tw-(50*l+Math.random()*this.style.tw/5/2-this.style.tw/5),y:50*i*l+Math.random()*this.style.th/5/2-this.style.th/5,size:100-l}),3===a&&t.particleData.push({x:this.style.tw/2,y:50*i*l+Math.random()*this.style.th/5/2-this.style.th/5,size:100-l}),4===a&&t.particleData.push({x:50*i*l+Math.random()*this.style.tw/5/2-this.style.tw/5,y:this.style.th/2,size:100-l});s.fillStyle="rgba(0, 0, 0, 0.005)",s.fillRect(0,0,this.style.tw,this.style.th),s.globalAlpha=t.progress*t.progress,t.particleData.forEach(function(e,a){e.size>t.size+t.minsize||(s.drawImage(o,e.x-e.size/2,e.y-e.size/2,e.size,e.size),e.size=t.progress*t.size*1.3)}),e.globalCompositeOperation="source-over",e.clearRect(0,0,this.style.tw,this.style.th),e.drawImage(s.$canvas,0,0),e.globalCompositeOperation="source-out",e.drawImage(r.default.funcOrValue(this.$fade.originImg,this),0,0,this.style.tw,this.style.th)},flow:function(t,e,s){var a=this;if(!t.particleData.length)for(var i=0;i<this.style.tw/50;i++)t.particleData.push({x:-100+50*i+40*Math.random()-20,y:200*-Math.random()-300,extra:20*Math.random()});s.fillStyle="rgba(0, 0, 0, 0.01)",s.fillRect(0,0,this.style.tw,this.style.th),t.particleData.forEach(function(e){s.drawImage(o,e.x,e.y,200,200),e.y+=1/t.ticks*a.style.th+e.extra}),e.globalCompositeOperation="source-over",e.clearRect(0,0,this.style.tw,this.style.th),e.drawImage(s.$canvas,0,0),e.globalCompositeOperation="source-out",e.drawImage(r.default.funcOrValue(this.$fade.originImg,this),0,0,this.style.tw,this.style.th)},spiral:function(t,e,s){s.translate(this.style.tw/2,this.style.th/2),s.rotate(360/t.ticks*3*3.14/180*t.progress),s.translate(-this.style.tw/2,-this.style.th/2),s.globalAlpha=t.progress*t.progress,s.fillStyle="rgba(0, 0, 0, 1)",s.fillRect(this.style.tw/2-t.size*t.progress/2,this.style.th/2-t.size*t.progress/2,t.size*t.progress,t.size*t.progress),e.globalCompositeOperation="source-over",e.clearRect(0,0,this.style.tw,this.style.th),e.drawImage(s.$canvas,0,0),e.globalCompositeOperation="source-out",e.drawImage(r.default.funcOrValue(this.$fade.originImg,this),0,0)}};window.Easycanvas.class.sprite.prototype.fade=function(t){var e=t.type,s=t.ticks,a=t.subtype,i=this;i.$fade||(i.$fade={originImg:i.content.img,filterCanvas:document.createElement("canvas"),middlewareCanvas:document.createElement("canvas")},i.$fade.filterCanvas.width=i.$fade.middlewareCanvas.width=i.style.tw,i.$fade.filterCanvas.height=i.$fade.middlewareCanvas.height=i.style.th,i.$fade.filterCxt=i.$fade.filterCanvas.getContext("2d"),i.$fade.middlewareCxt=i.$fade.middlewareCanvas.getContext("2d"),i.$fade.filterCxt.$canvas=i.$fade.filterCanvas,i.$fade.middlewareCxt.$canvas=i.$fade.middlewareCanvas);var l={ticks:0,progress:0,callback:!1,particleData:[]};l.ticks=s||60,l.subtype=a,l.size=Math.max(i.style.tw,i.style.th),l.minsize=Math.min(i.style.tw,i.style.th);var o=document.createElement("canvas");o.width=r.default.funcOrValue(i.style.tw,i),o.height=r.default.funcOrValue(i.style.th,i);var n=o.getContext("2d");return n.drawImage(i.$canvas.$dom,i.getStyle("tx"),i.getStyle("ty")),i.$fade.originImg=o,i.children=[],i.content.img=i.$fade.filterCanvas,i.on("beforeTick",function t(){if(i.$fade)return h[e||"drip"].call(i,l,i.$fade.filterCxt,i.$fade.middlewareCxt),l.progress>1?(i.off("beforeTick",t),i.style.opacity=0,delete i.$fade,void(l.callback&&i.$canvas.nextTick(function(){l.callback.call(i)}))):void(l.progress+=1/(s||100))}),{then:function(t){l.callback=t}}},window.Easycanvas.class.sprite.prototype.fade.types=[];for(var n in h)window.Easycanvas.class.sprite.prototype.fade.types.push(n)}})});
=======
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(73);


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

	'use strict';

	var utils = {
	    isArray: Array.isArray || function (arg) {
	        return Object.prototype.toString.call(arg) === '[object Array]';
	    },

	    funcOrValue: function funcOrValue(_funcOrValue, _this) {
	        if (typeof _funcOrValue === 'function') {
	            var res = _funcOrValue.call(_this);
	            return res;
	        }

	        return _funcOrValue;
	    },

	    // 执行钩子函数或者钩子函数队列
	    execFuncs: function execFuncs(funcOrArray, _this, _arg) {
	        if (funcOrArray) {
	            if (!utils.isArray(_arg)) {
	                _arg = [_arg];
	            }
	        }

	        if (typeof funcOrArray === 'function') {
	            return funcOrArray.apply(_this, _arg);
	        } else if (utils.isArray(funcOrArray)) {
	            var res = [];
	            funcOrArray.forEach(function (f) {
	                res.push(f && f.apply(_this, _arg));
	            });
	            return res;
	        }
	    },

	    blend: ['source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'copy', 'xor', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],

	    pointInRect: function pointInRect(x, y, x1, x2, y1, y2) {
	        return !(x < x1 || x > x2 || y < y1 || y > y2);
	    },

	    firstValuable: function firstValuable(a, b, c) {
	        // 效率低
	        // for (let i = 0; i < arguments.length; i++) {
	        //     if (typeof arguments[i] !== 'undefined') {
	        //         return arguments[i];
	        //     }
	        // }
	        return typeof a === 'undefined' ? typeof b === 'undefined' ? c : b : a;
	    }
	};

	module.exports = utils;

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var particleBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII='; /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    *  fade插件: 淡出效果
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    *  核心算法见下方transitions对象
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    *  其中sprite.$fade.originImg是sprite的一个screenshot
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    */

	var particleImage = new Image();
	particleImage.src = particleBase64;

	/*
	 *  transitions: 算法函数集合
	 *  @params transition: 当前渐变相关参数的集合，例如进度、原子图的base64
	 *  @params ctx: 对应sprite.$fade.filterCxt, 取代原图片的convas对象，当前sprite呈现给用户的最终画面（一般通过screenshot变幻得来）
	 *  @params ctx2: 对应sprite.$fade.middlewareCxt, 一些复杂的动画用到的临时对象，向ctx提供服务
	 *
	 */
	var transitions = {
	    // 水滴效果
	    drip: function drip(transition, ctx, ctx2) {
	        var subtype = transition.subtype || 1;

	        // ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
	        // ctx.fillRect(0, 0, this.style.tw, this.style.th);
	        ctx.clearRect(0, 0, this.style.tw, this.style.th);

	        ctx.globalCompositeOperation = 'source-over';
	        ctx.globalAlpha = 1;
	        subtype === 1 && ctx.drawImage(particleImage, (this.style.tw >> 1) - (this.style.tw >> 1) * transition.progress * 2, (this.style.th >> 1) - (this.style.th >> 1) * transition.progress * 2, this.style.tw * transition.progress * 2, this.style.th * transition.progress * 2);
	        subtype !== 1 && ctx.drawImage(particleImage, (this.style.tw >> 1) - (this.style.tw >> 1) * (1 - transition.progress) * 2, (this.style.th >> 1) - (this.style.th >> 1) * (1 - transition.progress) * 2, this.style.tw * (1 - transition.progress) * 2, this.style.th * (1 - transition.progress) * 2);

	        ctx.globalCompositeOperation = subtype === 1 ? 'source-out' : 'source-in';
	        ctx.globalAlpha = Math.max(1 - transition.progress, 0);
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
	    },

	    // 开门效果
	    door: function door(transition, ctx, ctx2) {
	        var subtype = transition.subtype || 1;

	        var rx = 0,
	            ry = 0;
	        // 1234上右下左
	        if (subtype === 1) {
	            rx = this.style.tw / 2;
	        } else if (subtype === 2) {
	            rx = this.style.tw;
	            ry = this.style.th / 2;
	        } else if (subtype === 3) {
	            rx = this.style.tw / 2;
	            ry = this.style.th;
	        } else if (subtype === 4) {
	            ry = this.style.th / 2;
	        }

	        ctx.clearRect(0, 0, this.style.tw, this.style.th);
	        // ctx.fillStyle = 'rgba(0,0,0, 0.1)';
	        // ctx.fillRect(0, 0, this.style.tw, this.style.th);

	        ctx.save();

	        ctx.translate(rx, ry);
	        ctx.rotate((subtype < 3 ? 1 : -1) * 90 * 3.14 / 180 * transition.progress);
	        ctx.translate(-rx, -ry);
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), 0, 0, rx || this.style.tw, this.style.th - ry || ry, 0, 0, rx || this.style.tw, this.style.th - ry || ry);

	        ctx.restore();

	        ctx.save();

	        ctx.translate(rx, ry);
	        ctx.rotate((subtype < 3 ? -1 : 1) * 90 * 3.14 / 180 * transition.progress);
	        ctx.translate(-rx, -ry);
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), subtype < 4 ? this.style.tw - rx : 0, subtype < 3 ? ry : subtype < 4 ? 0 : ry, this.style.tw - rx || rx, this.style.th - ry || ry, subtype < 4 ? this.style.tw - rx : 0, subtype < 3 ? ry : subtype < 4 ? 0 : ry, this.style.tw - rx || rx, this.style.th - ry || ry);

	        ctx.restore();
	    },

	    // 整体旋转
	    rotate: function rotate(transition, ctx, ctx2) {
	        var subtype = transition.subtype || 1;

	        var rx = 0,
	            ry = 0;
	        // 1234上右下左
	        if (subtype === 1) {
	            rx = this.style.tw;
	        } else if (subtype === 2) {
	            rx = this.style.tw;
	            ry = this.style.th;
	        } else if (subtype === 3) {
	            ry = this.style.th;
	        }

	        ctx.clearRect(0, 0, this.style.tw, this.style.th);
	        // ctx.fillStyle = 'rgba(0,0,0, 0.1)';
	        // ctx.fillRect(0, 0, this.style.tw, this.style.th);

	        ctx.save();

	        ctx.translate(rx, ry);
	        ctx.rotate(90 * 3.14 / 180 * transition.progress);
	        ctx.translate(-rx, -ry);
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);

	        ctx.restore();
	    },

	    // 印刷效果
	    print: function print(transition, ctx, ctx2) {
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), 0, 0);

	        var subtype = transition.subtype || 1;
	        // 1234 上左下右
	        subtype === 1 && ctx.clearRect(0, 0, this.style.tw, transition.progress * this.style.th);
	        subtype === 2 && ctx.clearRect(0, 0, transition.progress * this.style.tw, this.style.th);
	        subtype === 3 && ctx.clearRect(0, (1 - transition.progress) * this.style.th, this.style.tw, this.style.th);
	        subtype === 4 && ctx.clearRect((1 - transition.progress) * this.style.tw, 0, this.style.tw, this.style.th);
	    },

	    // 带渐变的印刷效果
	    switch: function _switch(transition, ctx, ctx2) {
	        var progress = transition.progress * 1.3;

	        if (progress === 0) {
	            ctx2.fillStyle = 'rgba(0, 0, 0, 1)';
	            ctx2.globalAlpha = 0.2;
	        }

	        var subtype = transition.subtype || 1;
	        // 1234 上下左右
	        subtype === 1 && ctx2.fillRect(0, 0, this.style.tw, progress * this.style.th);
	        subtype === 2 && ctx2.fillRect(0, 0, progress * this.style.tw, this.style.th);
	        subtype === 3 && ctx2.fillRect(0, (1 - progress) * this.style.th, this.style.tw, this.style.th);
	        subtype === 4 && ctx2.fillRect((1 - progress) * this.style.tw, 0, this.style.tw, this.style.th);

	        ctx.globalCompositeOperation = 'source-over';
	        ctx.clearRect(0, 0, this.style.tw, this.style.th);
	        ctx.drawImage(ctx2.$canvas, 0, 0);
	        ctx.globalCompositeOperation = 'source-out';
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), 0, 0);

	        // let subtype = transition.subtype;
	        // // 1234 上下左右
	        // subtype === 1 && ctx.clearRect(0, 0, this.style.tw, transition.progress * this.style.th);
	        // subtype === 2 && ctx.clearRect(0, (1 - transition.progress) * this.style.th, this.style.tw, this.style.th);
	        // subtype === 3 && ctx.clearRect(0, 0, transition.progress * this.style.tw, this.style.th);
	        // subtype === 4 && ctx.clearRect((1 - transition.progress) * this.style.tw, 0, this.style.tw, this.style.th);
	    },

	    // 笔划扩散效果
	    sweep: function sweep(transition, ctx, ctx2) {
	        if (!transition.particleData.length) {
	            var subtype = transition.subtype || 1;
	            var hwRate = this.style.th / this.style.tw;

	            for (var i = 0; i < this.style.tw / 50; i++) {
	                subtype === 1 && transition.particleData.push({
	                    x: 50 * i + Math.random() * this.style.tw / 5 / 2 - this.style.tw / 5,
	                    y: 50 * hwRate * i + Math.random() * this.style.th / 5 / 2 - this.style.th / 5,
	                    size: 100 - i
	                });
	                subtype === 2 && transition.particleData.push({
	                    x: this.style.tw - (50 * i + Math.random() * this.style.tw / 5 / 2 - this.style.tw / 5),
	                    y: 50 * hwRate * i + Math.random() * this.style.th / 5 / 2 - this.style.th / 5,
	                    size: 100 - i
	                });
	                subtype === 3 && transition.particleData.push({
	                    x: this.style.tw / 2,
	                    y: 50 * hwRate * i + Math.random() * this.style.th / 5 / 2 - this.style.th / 5,
	                    size: 100 - i
	                });
	                subtype === 4 && transition.particleData.push({
	                    x: 50 * hwRate * i + Math.random() * this.style.tw / 5 / 2 - this.style.tw / 5,
	                    y: this.style.th / 2,
	                    size: 100 - i
	                });
	            }
	        }

	        // ctx2.fillStyle = 'rgba(0, 0, 0, 0)';
	        ctx2.fillStyle = 'rgba(0, 0, 0, 0.005)';
	        ctx2.fillRect(0, 0, this.style.tw, this.style.th);

	        ctx2.globalAlpha = transition.progress * transition.progress;

	        transition.particleData.forEach(function (p, i) {
	            if (p.size > transition.size + transition.minsize) return;

	            ctx2.drawImage(particleImage, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);

	            p.size = transition.progress * transition.size * 1.3;
	        });

	        ctx.globalCompositeOperation = 'source-over';
	        ctx.clearRect(0, 0, this.style.tw, this.style.th);
	        ctx.drawImage(ctx2.$canvas, 0, 0);
	        ctx.globalCompositeOperation = 'source-out';
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
	    },

	    // 流淌淡出效果
	    flow: function flow(transition, ctx, ctx2) {
	        var _this = this;

	        if (!transition.particleData.length) {
	            for (var i = 0; i < this.style.tw / 50; i++) {
	                transition.particleData.push({
	                    x: -100 + i * 50 + Math.random() * 40 - 20,
	                    y: -Math.random() * 200 - 300,
	                    extra: Math.random() * 20
	                });
	            }
	        }

	        ctx2.fillStyle = 'rgba(0, 0, 0, 0.01)';
	        ctx2.fillRect(0, 0, this.style.tw, this.style.th);
	        transition.particleData.forEach(function (p) {
	            ctx2.drawImage(particleImage, p.x, p.y, 200, 200);
	            p.y += 1 / transition.ticks * _this.style.th + p.extra;
	        });

	        ctx.globalCompositeOperation = 'source-over';
	        ctx.clearRect(0, 0, this.style.tw, this.style.th);
	        ctx.drawImage(ctx2.$canvas, 0, 0);
	        ctx.globalCompositeOperation = 'source-out';
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
	    },

	    // 螺旋渐变
	    spiral: function spiral(transition, ctx, ctx2) {
	        var subtype = transition.subtype || 1;

	        ctx2.translate(this.style.tw / 2, this.style.th / 2);
	        ctx2.rotate(360 / transition.ticks * 3 * 3.14 / 180 * transition.progress);
	        ctx2.translate(-this.style.tw / 2, -this.style.th / 2);

	        ctx2.globalAlpha = transition.progress * transition.progress;
	        ctx2.fillStyle = 'rgba(0, 0, 0, 1)';
	        ctx2.fillRect(this.style.tw / 2 - transition.size * transition.progress / 2, this.style.th / 2 - transition.size * transition.progress / 2, transition.size * transition.progress, transition.size * transition.progress);

	        ctx.globalCompositeOperation = 'source-over';
	        ctx.clearRect(0, 0, this.style.tw, this.style.th);
	        ctx.drawImage(ctx2.$canvas, 0, 0);
	        ctx.globalCompositeOperation = 'source-out';
	        ctx.drawImage(_utils2.default.funcOrValue(this.$fade.originImg, this), 0, 0);
	    }
	};

	window.Easycanvas.class.sprite.prototype.fade = function (_ref) {
	    var type = _ref.type,
	        ticks = _ref.ticks,
	        subtype = _ref.subtype;

	    var sprite = this;

	    if (!sprite.$fade) {
	        sprite.$fade = {
	            originImg: sprite.content.img,
	            filterCanvas: document.createElement('canvas'),
	            middlewareCanvas: document.createElement('canvas')
	        };

	        // if (typeof sprite.$fade.originImg === 'string') {
	        //     sprite.$fade.originImg = Easycanvas.imgLoader(sprite.$fade.originImg);
	        // }

	        sprite.$fade.filterCanvas.width = sprite.$fade.middlewareCanvas.width = sprite.style.tw;
	        sprite.$fade.filterCanvas.height = sprite.$fade.middlewareCanvas.height = sprite.style.th;
	        sprite.$fade.filterCxt = sprite.$fade.filterCanvas.getContext('2d');
	        sprite.$fade.middlewareCxt = sprite.$fade.middlewareCanvas.getContext('2d');

	        sprite.$fade.filterCxt.$canvas = sprite.$fade.filterCanvas;
	        sprite.$fade.middlewareCxt.$canvas = sprite.$fade.middlewareCanvas;
	    }

	    // debug
	    // let debugCanvasDom = sprite.$fade.middlewareCanvas;
	    // document.body.appendChild(debugCanvasDom);
	    // debugCanvasDom.style.position = 'fixed';
	    // debugCanvasDom.style.left = 0;
	    // debugCanvasDom.style.top = 0;
	    // debugCanvasDom.style.zIndex = 999;
	    // debugCanvasDom.style.width = '30%';
	    // debugCanvasDom.style.height = '30%';

	    var transition = {
	        ticks: 0,
	        progress: 0,
	        callback: false,
	        particleData: []
	    };

	    transition.ticks = ticks || 60;
	    transition.subtype = subtype;
	    transition.size = Math.max(sprite.style.tw, sprite.style.th);
	    transition.minsize = Math.min(sprite.style.tw, sprite.style.th);

	    // screenshot
	    {
	        var screenshot = document.createElement('canvas');
	        screenshot.width = _utils2.default.funcOrValue(sprite.style.tw, sprite);
	        screenshot.height = _utils2.default.funcOrValue(sprite.style.th, sprite);
	        var scrctx = screenshot.getContext('2d');
	        scrctx.drawImage(sprite.$canvas.$dom, sprite.getStyle('tx'), sprite.getStyle('ty'));
	        sprite.$fade.originImg = screenshot;
	        sprite.children = [];
	    }

	    sprite.content.img = sprite.$fade.filterCanvas;

	    sprite.on('beforeTick', function beforeTick() {
	        if (!sprite.$fade) {
	            return;
	        }

	        transitions[type || 'drip'].call(sprite, transition, sprite.$fade.filterCxt, sprite.$fade.middlewareCxt);

	        if (transition.progress > 1) {
	            sprite.off('beforeTick', beforeTick);
	            sprite.style.opacity = 0;
	            // delete sprite.content.img;
	            delete sprite.$fade;

	            if (transition.callback) {
	                sprite.$canvas.nextTick(function () {
	                    transition.callback.call(sprite);
	                });
	            }

	            return;
	        }

	        transition.progress += 1 / (ticks || 100);
	    });

	    return {
	        then: function then(callback) {
	            transition.callback = callback;
	        }
	    };
	};

	window.Easycanvas.class.sprite.prototype.fade.types = [];
	for (var i in transitions) {
	    window.Easycanvas.class.sprite.prototype.fade.types.push(i);
	}

/***/ })

/******/ })
});
;
>>>>>>> 44f9f938734159d0f29ab3a3aa631e48dcfabf92
