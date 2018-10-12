<<<<<<< HEAD
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(27)},function(t,e){"use strict";var n={isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},funcOrValue:function(t,e){if("function"==typeof t){var n=t.call(e);return n}return t},execFuncs:function(t,e,r){if(t&&(n.isArray(r)||(r=[r])),"function"==typeof t)return t.apply(e,r);if(n.isArray(t)){var o=[];return t.forEach(function(t){o.push(t&&t.apply(e,r))}),o}},blend:["source-over","source-in","source-out","source-atop","destination-over","destination-in","destination-out","destination-atop","lighter","copy","xor","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],pointInRect:function(t,e,n,r,o,a){return!(t<n||t>r||e<o||e>a)},firstValuable:function(t,e,n){return"undefined"==typeof t?"undefined"==typeof e?n:e:t}};t.exports=n},function(t,e){"use strict";var n=3.141593;t.exports=function(t,e,r,o,a,i){var s=a?-a/180*n:0,l=t,u=e;return a&&(l=(t-r)*Math.cos(s)-(e-o)*Math.sin(s)+r,u=(t-r)*Math.sin(s)+(e-o)*Math.cos(s)+o),i?[l,u]:{x:l,y:u}}},function(t,e){"use strict";t.exports={xywh:["sx","sy","sw","sh","tx","ty","tw","th"],txywh:["tx","ty","tw","th"],sxywh:["sx","sy","sw","sh"],devFlag:"__EASYCANVAS_DEVTOOL__",version:"0.5.9"}},,,function(t,e){"use strict";function n(t,e){if(t&&t.match(/^data:/))return void(e&&e(t));if(o[t])return void(o[t]!==r?e(o[t]):setTimeout(function(){n(t,e)},100));o[t]=r;var a=new XMLHttpRequest;a.onload=function(){var n=new FileReader;n.onloadend=function(){o[t]=n.result,e&&e(n.result)},n.readAsDataURL(a.response)},a.open("GET",t),a.responseType="blob",a.send()}var r="processing",o={};t.exports=n},,,function(t,e){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r={},o=[],a=0,i=function t(e,i,s){var l=s||{},u=t.cacheCanvas;if("object"===("undefined"==typeof e?"undefined":n(e))){var c=e;return l.callbackArgs=l.callbackArgs||[],void t(c.shift(),function(e){l.callbackArgs.push(e),c.length>1?t(c,i,l):t(c[0],function(t){l.callbackArgs.push(t),i(l.callbackArgs)},l)},s)}var f=e+"_"+JSON.stringify(s)+"_"+u;if(r[f])return i&&i(r[f]),r[f];var d=new Image;l.block?(d.src=e,a++):0===a?d.src=e:o.push({imgObj:d,src:e}),r[f]=d;var h=void 0;return(l.canvas||l.alphaColor||u)&&(h=document.createElement("canvas"),h.width=h.height||0,r[f]=h),d.onload=function(){if("jpg"===d.src.substr(-3)||"jpeg"===d.src.substr(-3)||"bmp"===d.src.substr(-3)?d.$noAlpha=!0:0===d.src.indexOf("data:image/jpg;")&&(d.$noAlpha=!0),l.block&&(a--,0===a&&(o.forEach(function(t){t.imgObj.src=t.src}),o.splice(0))),h&&(l.canvas||l.alphaColor||u)){var t=h.getContext("2d");if(h.width=d.width,h.height=d.height,h.$noAlpha=d.$noAlpha,t.drawImage(d,0,0),l.alphaColor){for(var e=t.getImageData(0,0,d.width,d.height),n=0;n<e.data.length;n+=4){var r=e.data[n]+e.data[n+1]+e.data[n+2],s=1;e.data[n]<s&&e.data[n+1]<s&&e.data[n+2]<s&&(e.data[n+3]=Math.floor(r/255))}t.putImageData(e,0,0),h.$noAlpha=!1}d=h}i&&i(d)},d.onerror=function(){r[f]=d},h||d};i.cacheCanvas=!1,t.exports=i},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(2);r(o);t.exports=function(t,e,n,r,o,a,i,s,l){return l&&(t=(t-i)*Math.cos(l)-(e-s)*Math.sin(l)+i,e=(t-i)*Math.sin(l)+(e-s)*Math.cos(l)+s),t>=n&&t<=n+o&&e>=r&&e<=r+a}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(2),a=(r(o),n(10)),i=r(a);t.exports=function(t,e,n,r,o,a,s,l,u,c,f){var d=(0,i.default)(t,e,o,a,s,l,u,c,f)||(0,i.default)(t+n,e,o,a,s,l,u,c,f)||(0,i.default)(t,e+r,o,a,s,l,u,c,f)||(0,i.default)(t+n,e+r,o,a,s,l,u,c,f);if(d)return!0;var h=(0,i.default)(o,a,t,e,n,r,u,c,-f)||(0,i.default)(o+s,a,t,e,n,r,u,c,-f)||(0,i.default)(o,a+l,t,e,n,r,u,c,-f)||(0,i.default)(o+s,a+l,t,e,n,r,u,c,-f);return!!h}},function(t,e){"use strict";var n=function(t){setTimeout(t,1e3/60)},r="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||n:n;t.exports=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=n(1),i=r(a),s=n(3),l=r(s),u=n(18),c=r(u),f=n(17),d=r(f),h=n(16),p=r(h),v=n(19),g=r(v),y=n(15),x=r(y),m=n(14),$=(r(m),function t(e){e.children&&e.children.forEach(function(n,r){n.$id||(e.children[r]=new k(n)),e.$id&&!e.$dom?(e.children[r].$canvas=e.$canvas,e.children[r].$parent=e):e.children[r].$canvas=e,t(e.children[r])})}),w=function(t){var e=t||{};e.$id||(e.$id=Math.random().toString(36).substr(2)),e.$tickedTimes=e.$tickedTimes||0,e.content=e.content||{},e.style=e.style||{},e.style.zIndex=e.style.zIndex||0,e.style.mirrX=e.style.mirrX||0,e.style.opacity=i.default.firstValuable(e.style.opacity,1),e.style.locate=e.style.locate||"center",e.style.scale=e.style.scale||1;i.default.funcOrValue(e.content.img);l.default.xywh.forEach(function(t){e.style[t]=e.style[t]||0}),e.inherit=e.inherit||["tx","ty","scale","opacity"],e.drag=e.drag||{},e.events=e.events||{};e.events.eIndex=e.events.eIndex,e.scroll=e.scroll||{},e.scroll.scrollX=e.scroll.scrollX||0,e.scroll.scrollY=e.scroll.scrollY||0,e.hooks=e.hooks||{};return e.children=e.children||[],$(e),e.$scroll={speedX:0,speedY:0},e},b=function(t){var e=this;this.$extendList.forEach(function(n){n.call(e,t)})},k=function(t){var e=w(t);for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(this[n]=e[n]);return b.call(this,e),this};k.prototype.$extendList=[],k.prototype.add=function(t){if(t)return this.children.push(t),$(this),this.children[this.children.length-1]},k.prototype.getRect=function(){var t=this,e={};if(l.default.txywh.forEach(function(n){e[n]=t.getStyle(n)}),0===e.tw&&this.content.img){var n=i.default.funcOrValue(this.content.img,this);e.tw=n.width,e.th=n.height}var r=this.getStyle("locate");return"lt"===r||("ld"===r?e.ty-=e.th:"rt"===r?e.tx-=e.tw:"rd"===r?(e.tx-=e.tw,e.ty-=e.th):(e.tx-=e.tw>>1,e.ty-=e.th>>1)),e},k.prototype.getSelfStyle=function(t){var e={};for(var n in this.style)e[n]=i.default.funcOrValue(this.style[n],this);return e},k.prototype.getStyle=function(t){var e=this,n=i.default.funcOrValue(e.style[t],e);return e.$parent&&e.inherit.indexOf(t)>=0?("tx"===t?n-=e.$parent.scroll.scrollX||0:"ty"===t&&(n-=e.$parent.scroll.scrollY||0),"tw"===t||"th"===t?i.default.firstValuable(n,e.$parent.getStyle(t)):"opacity"===t||"scale"===t?i.default.firstValuable(e.$parent.getStyle(t),1)*i.default.firstValuable(n,1):i.default.firstValuable(e.$parent.getStyle(t),0)+i.default.firstValuable(n,0)):n},k.prototype.remove=function(t){return t?(this.$canvas.remove(t),void i.default.execFuncs(t.hooks.removed,t)):(this.$parent?this.$parent.remove(this):this.$canvas.remove(this),void i.default.execFuncs(this.hooks.removed,this))},k.prototype.update=function(t){if(t)for(var e in t)if("object"===o(t[e]))for(var n in t[e])this[e][n]=t[e][n];else this[e]=t[e]},k.prototype.nextTick=p.default,k.prototype.on=c.default,k.prototype.off=d.default,k.prototype.trigger=g.default,k.prototype.broadcast=x.default,t.exports=k},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=(r(o),!1),i=function(t,e){t.drag.draggingFlag=e,a=e},s=function(t,e,n,r){return t?t.call(e,n):!!r&&"drag"},l="undefined"!=typeof wx||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);t.exports={bind:function(t){var e={x:0,y:0};t.drag=t.drag||{},t.drag.draggingFlag=!1;var n=t.events.mousedown||t.events.touchstart;t.events[l?"touchstart":"mousedown"]=function(r){if(t.drag.dragable){i(t,!0);r.canvasX-this.getStyle("tx"),r.canvasY-this.getStyle("ty");e.x=r.canvasX,e.y=r.canvasY}return s(n,t,r,t.drag.dragable)}.bind(t);var r=t.events.mousemove||t.events.touchmove;t.events[l?"touchmove":"mousemove"]=function(n){var o=t.drag.draggingFlag&&t.drag.dragable;return o&&(this.style.tx+=n.canvasX-e.x,this.style.ty+=n.canvasY-e.y,this.$canvas.$flags.dragging=this,e.x=n.canvasX,e.y=n.canvasY),s(r,t,n,o)}.bind(t);var o=t.events.mouseup||t.events.touchend;t.events[l?"touchend":"mouseup"]=function(e){var n=t.drag.draggingFlag&&t.drag.dragable;return this.$canvas.$flags.dragging=void 0,t.drag.draggingFlag&&t.drag.dragable&&i(t,!1),s(o,t,e,n)};var a=t.events.mouseout;t.events.mouseout=function(e){var n=t.drag.draggingFlag&&t.drag.dragable;return i(t,!1),s(a,t,e,n)};var u=t.events.click;t.events.click=function(e){var n=t.drag.dragable;if(n){e.canvasX-t.getStyle("tx"),e.canvasY-t.getStyle("ty");return!u||u.call(t,e)}return s(u,t,e,n)}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o);t.exports=function(){var t=Array.prototype.slice.call(arguments),e=t.shift();this.hooks[e]&&a.default.execFuncs(this.hooks[e],this,t),t.unshift(e),this.children&&this.children.forEach(function(e){e.broadcast.apply(e,t)})}},function(t,e){"use strict";t.exports=function(t){var e=function e(){t.apply(this,arguments),this.off("ticked",e)};this.on("ticked",e)}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o);t.exports=function(t,e){this.hooks[t]&&(this.hooks[t]!==e&&e?a.default.isArray(this.hooks[t])&&(this.hooks[t][this.hooks[t].indexOf(e)]=void 0):delete this.hooks[t])}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o);t.exports=function(t,e,n){var r=e;if(n){var o=this;r=function(){var t=Date.now();if(t>r.$lastTriggerTime+n){r.$lastTriggerTime=t;var a=Array.prototype.slice.call(arguments);e.apply(o,a)}},r.$lastTriggerTime=-1}this.hooks[t]?a.default.isArray(this.hooks[t])?this.hooks[t].push(r):this.hooks[t]=[this.hooks[t],r]:this.hooks[t]=r}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o);t.exports=function(){var t=Array.prototype.slice.call(arguments),e=t.shift();if(this.hooks[e])return a.default.execFuncs(this.hooks[e],this,t)}},,,,,,function(t,e,n){"use strict";var r=n(1),o=3.141593,a=function(t){return t.$lastPaintTime||Date.now()},i={linear:function(t,e,n){if(t===e)return t;var r=a(this),o=!1,i=function(){var a=this.$lastPaintTime,s=(e-t)*(a-r)/n+t;if(o)if(e>t)for(;s>e;)s-=e-t;else for(;s<e;)s+=t-e;else e>t&&s>e?(i.$done=!0,s=e):e<t&&s<e&&(i.$done=!0,s=e);return s}.bind(this);return i.loop=function(){return o=!0,i},i.restart=function(){r=a(this)},i},pendulum:function(t,e,n,r){if(t===e)return t;var i=a(this),s=r||{};s.start=s.start||0;var l=!1,u=function(){var r=a(this),c=(r-i)/n;l?s.cycle&&(c%=s.cycle):s.cycle?s.cycle<c&&(u.$done=!0,c=s.cycle):c>1&&(u.$done=!0,c=1);var f=c*o*2-o/2+s.start/360*o,d=(e-t)*(Math.sin(f)+1)/2+t;return d}.bind(this);return u.loop=function(){return l=!0,u},u.restart=function(){i=a(this)},u},ease:function(t,e,n){return this.pendulum(t,e,2*n,{cycle:.5})},oneByOne:function(t){var e=t,n=!1,r=function(){for(var t=0;t<e.length;t++){if(!e[t].$done)return e[t]();if(!e[t].$nextRestart&&(e[t].$nextRestart=!0,e[t+1]))return e[t+1].restart(),e[t+1]()}if(n){for(var r=0;r<e.length;r++)e[r].$done=!1,e[r].$nextRestart=!1,e[r].restart();return e[0]()}return e[e.length-1]()};return r.loop=function(){return n=!0,r},r}},s=function t(e,n,o,a,s){var l=(0,r.funcOrValue)(e[n]);l=l||0,e[n]=i[o].bind(t)(l,a,s)};for(var l in i)s[l]=i[l];t.exports=s},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=(Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},n(3)),a=(r(o),n(1));r(a)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(3),a=r(o),i=n(51),s=r(i),l=n(12),u=r(l),c=n(84),f=r(c),d=n(1),h=r(d),p=n(25),v=r(p),g=n(9),y=r(g),x=n(83),m=r(x),$=n(85),w=r($),b=n(13),k=r(b),T=n(26),M=(r(T),{painter:s.default,imgLoader:y.default,imgPretreat:m.default,multlineText:w.default,transition:v.default,tick:u.default,utils:h.default,mirror:f.default,class:{sprite:k.default},sprite:k.default,$version:a.default.version,env:"production"});M.extend=function(t){M.sprite.prototype.$extendList.push(t)},M.use=function(t){t.onUse&&t.onUse(M),M.painter.prototype.$extendList.push(t)};var O="undefined"!=typeof window;O&&(window.Easycanvas?console.warn("[Easycanvas] already loaded, it should be loaded only once."):window.Easycanvas=M),t.exports=M},,,,function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(37),a=r(o),i=n(39),s=r(i),l=n(32),u=r(l),c=n(14),f=r(c),d=n(38),h=r(d),p=n(50),v=(r(p),{$render:s.default,$eventHandler:u.default,$perPaint:a.default,$bindDrag:f.default,$rAFer:h.default});t.exports=v},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o),i=n(3),s=(r(i),"undefined"!=typeof wx||/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),function(t){return t.sort(function(t,e){return a.default.funcOrValue(a.default.firstValuable(t.events.eIndex,t.style.zIndex),t)<a.default.funcOrValue(a.default.firstValuable(e.events.eIndex,e.style.zIndex),e)?1:-1})}),l=function t(e){return!(e.$parent&&!t(e.$parent))&&a.default.funcOrValue(e.style.visible,e)!==!1},u=function(t,e){if(l(t)===!1)return!1;var n=t.getRect();return a.default.pointInRect(e.canvasX,e.canvasY,n.tx,n.tx+n.tw,n.ty,n.ty+n.th)},c=function t(e,n,r){if(e&&e.length)for(var o=0;o<e.length;o++){var i=e[o];i.children.length&&t(s(i.children.filter(function(t){return a.default.funcOrValue(a.default.firstValuable(t.events.eIndex,t.style.zIndex),t)>=0})),n,r),u(i,n)&&r.push(i),i.children.length&&t(s(i.children.filter(function(t){return!(a.default.funcOrValue(a.default.firstValuable(t.events.eIndex,t.style.zIndex),t)>=0)})),n,r)}},f=function(t,e){var n=this;this.$extendList.forEach(function(r){r.onEvent&&r.onEvent.call(n,t,e)})};t.exports=function(t){var e=this;!t.layerX&&t.touches&&t.touches[0]&&(t.layerX=t.targetTouches[0].pageX-t.currentTarget.offsetLeft,t.layerY=t.targetTouches[0].pageY-t.currentTarget.offsetTop),!t.layerX&&t.changedTouches&&t.changedTouches[0]&&(t.layerX=t.changedTouches[0].pageX-t.currentTarget.offsetLeft,t.layerY=t.changedTouches[0].pageY-t.currentTarget.offsetTop);var n=this.$dom.getBoundingClientRect().width>this.$dom.getBoundingClientRect().height!=this.width>this.height,r=Math.floor(this.$dom.getBoundingClientRect()[n?"height":"width"])/this.width,o=Math.floor(this.$dom.getBoundingClientRect()[n?"width":"height"])/this.height;r=r||1,o=o||1;var i={type:t.type,canvasX:t.layerX/r,canvasY:t.layerY/o,event:t};if(!e.events.interceptor||(i=a.default.firstValuable(e.events.interceptor(i),i),i&&!i.$stopPropagation)){var l=[];e.$flags.dragging&&e.$flags.dragging.$id&&l.push(e.$flags.dragging),c(s(e.children),i,l),f.call(e,i,l);e.eHoldingFlag||"mousedown"!==i.type&&"touchstart"!==i.type?!e.eHoldingFlag||"mouseup"!==i.type&&"touchend"!==i.type?!e.eHoldingFlag||"mousemove"!==i.type&&"touchmove"!==i.type||(e.eHoldingFlag=t):e.eHoldingFlag=!1:e.eHoldingFlag=t;for(var u=0;u<l.length;u++){if(("mousemove"===i.type||"touchmove"===i.type)&&e.eLastMouseHover&&e.eLastMouseHover!==l[u]&&l.indexOf(e.eLastMouseHover)===-1){var d=e.eLastMouseHover.events.mouseout||e.eLastMouseHover.events.touchout;d&&d.call(e.eLastMouseHover,i)}if(l[u].events){var h=l[u].events[i.type];if(h){e.eLastMouseHover=l[u];var p=h.call(l[u],i);if(p===!0)return e.eHoldingFlag=!1,p;if("drag"===p)return e.eHoldingFlag=!1,p}if(l[u].events.through===!1)return}}if(!l.length&&e.eLastMouseHover){var v=e.eLastMouseHover.events.mouseout;v&&v.call(e.eLastMouseHover,i),e.eLastMouseHover=null}var g=e.events[i.type];return g&&g.call(e,i)?(e.eHoldingFlag=!1,!0):void 0}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o),i=n(12),s=r(i),l={},u=!1,c=[],f={stop:function(){u=!1},tick:function(){(0,s.default)(f.looper)},looper:function(){c.forEach(function(t,e){if(Math.abs(t.$scroll.speedX)>1?t.$scroll.speedX*=t.scroll.smooth||.8:t.$scroll.speedX=0,Math.abs(t.$scroll.speedY)>1?t.$scroll.speedY*=t.scroll.smooth||.8:t.$scroll.speedY=0,Math.abs(t.$scroll.speedX)<=1&&Math.abs(t.$scroll.speedY)<=1)return void c.splice(e,1);t.scroll.scrollY-=t.$scroll.speedY,t.scroll.scrollX-=t.$scroll.speedX;var n=a.default.funcOrValue(t.scroll.minScrollX,t),r=a.default.funcOrValue(t.scroll.maxScrollX,t),o=a.default.funcOrValue(t.scroll.minScrollY,t),i=a.default.funcOrValue(t.scroll.maxScrollY,t);!isNaN(o)&&t.scroll.scrollY<o?t.scroll.scrollY=o:!isNaN(i)&&t.scroll.scrollY>i&&(t.scroll.scrollY=i),!isNaN(n)&&t.scroll.scrollX<n?t.scroll.scrollX=n:!isNaN(r)&&t.scroll.scrollX>r&&(t.scroll.scrollX=r)}),f.tick()},touch:function(t,e){if(!t.scroll.scrollable)return!1;if(u){c.indexOf(t)===-1&&c.push(t);var n=Math.abs(e.canvasX-l.x),r=Math.abs(e.canvasY-l.y),o=+new Date-u;return u=+new Date,o/=10,n/o>1&&o>1&&(t.$scroll.speedX+=(e.canvasX-l.x)/o),r/o>1&&o>1&&(t.$scroll.speedY+=(e.canvasY-l.y)/o),l.x=e.canvasX,l.y=e.canvasY,e.event.preventDefault(),!0}u=+new Date,l.x=e.canvasX,l.y=e.canvasY},wheel:function(t,e){return!!t.scroll.scrollable&&(c.indexOf(t)===-1&&c.push(t),t.$scroll.speedX=e.event.wheelDeltaX,t.$scroll.speedY=e.event.wheelDeltaY,e.event.preventDefault(),!0)}};t.exports=f},function(t,e){"use strict";t.exports=function(t,e,n,r){if(e.sx<0&&e.sw){var o=-e.sx/e.sw;e.tx+=e.tw*o,e.sx=0}if(e.sy<0&&e.sh){var a=-e.sy/e.sh;e.ty+=e.th*a,e.sy=0}if(n&&e.sx+e.sw>n){var i=(e.sx+e.sw-n)/e.sw;e.sw-=e.sw*i,e.tw-=e.tw*i}if(r&&e.sy+e.sh>r){var s=(e.sy+e.sh-r)/e.sh;e.sh-=e.sh*s,e.th-=e.th*s}if(e.tx<0&&e.tw>-e.tx){var l=-e.tx/e.tw;e.sx+=e.sw*l,e.sw-=e.sw*l,e.tw=e.tw+e.tx,e.tx=0}if(e.ty<0&&e.th>-e.ty){var u=-e.ty/e.th;e.sy+=e.sh*u,e.sh-=e.sh*u,e.th=e.th+e.ty,e.ty=0}if(e.tx+e.tw>t.width&&e.tw){var c=(e.tx+e.tw-t.width)/e.tw;e.tw-=e.tw*c,e.sw-=e.sw*c}if(e.ty+e.th>t.height&&e.th){var f=(e.ty+e.th-t.height)/e.th;e.th-=e.th*f,e.sh-=e.sh*f}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o);t.exports=function(t,e,n){e&&e.filter(function(t){var e=a.default.funcOrValue(t.style.zIndex,t);return n<0?e<0:e>=0}).sort(function(t,e){var n=a.default.funcOrValue(t.style.zIndex,t),r=a.default.funcOrValue(e.style.zIndex,e);return n===r?0:n>r?1:-1}).forEach(function(e,n){t.$perPaint.call(t,e,n)})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o),i=n(3);r(i);t.exports=function(t,e){var n={};for(var r in t.content)n[r]=a.default.funcOrValue(t.content[r],t);"string"==typeof n.img&&(n.img=t.content.img=e.imgLoader(n.img));for(var o in t.style)n[o]=t.getStyle(o);if(t.inherit.forEach(function(e){n[e]=t.getStyle(e)}),n.sequence){var i=n.img,s=n.sequence;n.sequence.index=n.sequence.index||0;var l=n.sequence.index||0;l<0&&(l=0);var u=void 0,c=void 0;if(s.w||s.h){u=s.w<0?i.width/(0-s.w):s.w>0?s.w:i.width,c=s.h<0?i.height/(0-s.h):s.h>0?s.h:i.height;var f=Math.floor(i.width/u),d=Math.floor(i.height/c);n.sx=l%f*u,n.sy=Math.floor(l/f)%d*c}!s.loop&&l>0&&0===n.sx&&0===n.sy&&(n.img=void 0,s.onOver?s.onOver.call(t):t.remove()),n.sequence.lastTickTime=n.sequence.lastTickTime||0,e.$nextTickTime-n.sequence.lastTickTime>=a.default.funcOrValue(n.sequence.interval,t)&&(s.lastTickTime=e.$nextTickTime,n.sequence.index++,n.sequence.lastTickTime=e.$nextTickTime),n.sw=n.sw||u,n.sh=n.sh||c,n.tw=n.tw||u,n.th=n.th||c}return n}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o),i=n(6),s=(r(i),n(3)),l=r(s),u=n(36),c=r(u),f=n(34),d=r(f),h=n(35),p=r(h),v=n(11),g=r(v),y=a.default.blend,x=function(t){var e=/[^\u4e00-\u9fa5]/;return!e.test(t)},m=function(){var t=this;this.$canvas.$extendList.forEach(function(e){e.onPaint&&e.onPaint.call(t)})};t.exports=function(t,e){if(t.$rendered=!1,a.default.funcOrValue(t.style.visible,t)===!1)return a.default.execFuncs(t.hooks.beforeTick,t,t.$tickedTimes),void a.default.execFuncs(t.hooks.ticked,t,++t.$tickedTimes);a.default.execFuncs(t.hooks.beforeTick,t,t.$tickedTimes);var n=this;m.call(t);var r=(0,c.default)(t,n),o={globalAlpha:a.default.firstValuable(r.opacity,1)},i=r.text,s=r.img,u=a.default.funcOrValue(t.children,t),f=s?s.width||0:0,h=s?s.height||0:0;if(r.tw=r.tw||r.sw||f,r.th=r.th||r.sh||h,r.sw=r.sw||f,r.sh=r.sh||h,"lt"===r.locate||("ld"===r.locate?r.ty-=r.th:"rt"===r.locate?r.tx-=r.tw:"rd"===r.locate?(r.tx-=r.tw,r.ty-=r.th):(r.tx-=r.tw>>1,r.ty-=r.th>>1)),(r.fh||r.fv)&&(r.fh=r.fh||0,r.fv=r.fv||0,r.fx=r.fx||0,r.fy=r.fy||0,o.transform={fh:r.fh,fv:r.fv,fx:-(r.ty+(r.th>>1))*r.fv+r.fx,fy:-(r.tx+(r.tw>>1))*r.fh+r.fy}),r.blend&&(o.globalCompositeOperation="string"==typeof r.blend?r.blend:y[r.blend]),r.rotate){var v=a.default.firstValuable(r.rx,r.tx+.5*r.tw),$=a.default.firstValuable(r.ry,r.ty+.5*r.th);o.beforeRotate=[v,$],o.rotate=-r.rotate*Math.PI/180,o.rotate=Number(o.rotate.toFixed(4)),o.afterRotate=[-v,-$]}if(1!==r.scale){var w=r.scale;r.tx-=(w-1)*r.tw>>1,r.ty-=(w-1)*r.th>>1,r.tw*=w,r.th*=w}r.mirrX?(o.translate=[n.width,0],o.scale=[-1,1],r.tx=n.width-r.tx-r.tw,r.mirrY&&(o.translate=[n.width,n.height],o.scale=[-1,-1],r.ty=n.height-r.ty-r.th)):r.mirrY&&(o.translate=[0,n.height],o.scale=[1,-1],r.ty=n.height-r.ty-r.th);if(!r.rotate&&!i&&f&&s.src&&(0,d.default)(n,r,f,h),f>10&&h>10&&l.default.xywh.forEach(function(t){r[t]=Math.round(r[t])}),(0,p.default)(n,u,-1),s&&f&&0!==r.opacity&&r.sw&&r.sh&&(0,g.default)(r.tx,r.ty,r.tw,r.th,0,0,n.width,n.height,o.beforeRotate&&o.beforeRotate[0],o.beforeRotate&&o.beforeRotate[1],r.rotate)){t.$rendered=!0;var b={$id:t.$id,type:"img",settings:o,props:[s,r.sx,r.sy,r.sw,r.sh,r.tx,r.ty,r.tw,r.th]};b.$origin=t,n.$children.push(b)}if(i){t.$rendered=!0;var k=r.tx,T=r.ty,M=r.align||r.textAlign||"left",O=r.textFont||"14px Arial",_=parseInt(O),F=r.lineHeight||_;if("center"===M?k+=r.tw/2:"right"===M&&(k+=r.tw),"top"===r.textVerticalAlign?T+=_+(F-_)/2:"bottom"===r.textVerticalAlign?T+=r.th-(F-_)/2:"middle"===r.textVerticalAlign&&(T+=r.th/2+_/2),"string"==typeof i||"number"==typeof i)n.$children.push({$id:t.$id,type:"text",settings:o,props:{tx:k,ty:T,content:String(i),align:M,font:O,color:r.color,type:r.textType}});else if(i.length)i.forEach(function(e){n.$children.push({$id:t.$id,type:"text",settings:o,props:{tx:k+a.default.funcOrValue(e.tx,t),ty:T+a.default.funcOrValue(e.ty,t),content:a.default.funcOrValue(e.content,t),align:M,font:O,color:r.color,type:r.textType}})});else if("multline-text"===i.type){var A=i.text.split(/\t|\n/),V=[];A.forEach(function(t,e){t=String.prototype.trim.apply(t),i.config.start&&(t=t.replace(i.config.start,""));for(var n=0,o=r.tw;t.length&&n<t.length;)o<=0&&(o=r.tw,V.push(t.substr(0,n)),t=t.substr(n),n=0),n++,o-=_*(x(t[n])?1.05:.6);(t||e)&&V.push(t)}),V.forEach(function(e){n.$children.push({$id:t.$id,type:"text",settings:o,props:{tx:k,ty:T,content:e,align:M,font:O,color:r.color,type:r.textType}}),T+=F||_})}}s||i||(t.$rendered=void 0),(0,p.default)(n,u,1),a.default.execFuncs(t.hooks.ticked,t,++t.$tickedTimes)}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(12),a=r(o),i=n(25),s=r(i);t.exports=function(t){var e=Date.now();s.default.$lastPaintTime=this.$nextTickTime=e,e-this.fpsCalculateTime>=1e3&&(this.fpsCalculateTime=e,this.fpsHandler&&this.fpsHandler.call(this,this.fps),this.lastFps=this.fps,this.fps=0),(0,a.default)(function(n){if(this.$rafTime=n,this.$rAFer(t),this.maxFps>0&&this.maxFps<60){if(e-this.$lastPaintTime<=1e3/this.maxFps)return;this.$lastPaintTime=e-(e-this.$lastPaintTime)%(1e3/this.maxFps)}else this.$lastPaintTime=Date.now();t()}.bind(this))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o),i=function(t,e){var n=this,r=!1;return this.$extendList.forEach(function(o){if(o.onRender){var a=o.onRender.call(n,t,e);a&&(r=a)}}),r},s=function(t,e){var n=this,r=t.props,o=!1;if("img"===t.type){var s=r[7]*r[8],l=n.$children;if(s>4e4)for(var u=l.length-1;u>e;u--){var c=l[u];if(!c.$cannotCover){var f=c.props;if(f&&f[0]){if(!(f[7]*f[8]<s))if(f[0].$noAlpha){var d=c.settings;if(1!==d.globalAlpha||d.globalCompositeOperation||d.rotate)c.$cannotCover=!0;else if(a.default.pointInRect(r[5],r[6],f[5],f[5]+f[7],f[6],f[6]+f[8])&&a.default.pointInRect(r[5]+r[7],r[6]+r[8],f[5],f[5]+f[7],f[6],f[6]+f[8]))return void(o=!0)}else c.$cannotCover=!0}else c.$cannotCover=!0}}}var h=t.settings||{};if(!i.call(n,t,h)){var p=!1,v=n.$paintContext;h.globalCompositeOperation&&(p||(v.save(),p=!0),v.globalCompositeOperation=h.globalCompositeOperation),1===h.globalAlpha||isNaN(h.globalAlpha)||(p||(v.save(),p=!0),v.globalAlpha=h.globalAlpha),h.translate&&(p||(v.save(),p=!0),v.translate(h.translate[0]||0,h.translate[1]||0)),h.rotate&&(p||(v.save(),p=!0),v.translate(h.beforeRotate[0]||0,h.beforeRotate[1]||0),v.rotate(h.rotate||0),v.translate(h.afterRotate[0]||0,h.afterRotate[1]||0)),h.scale&&(p||(v.save(),p=!0),v.scale(h.scale[0]||1,h.scale[1]||1)),h.transform&&(p||(v.save(),p=!0),v.transform(1,h.transform.fh,h.transform.fv,1,h.transform.fx,h.transform.fy)),"img"===t.type?v.drawImage(r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8]):"text"===t.type&&r.content&&(v.font=r.font,v.fillStyle=v.strokeStyle=r.color||"white",v.textAlign=r.align,v[r.type||"fillText"](r.content,r.tx,r.ty)),p&&v.restore()}};t.exports=function(){var t=this;t.$children.forEach(s.bind(t))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(41),a=r(o),i=n(46),s=r(i),l=n(49),u=r(l),c=n(43),f=r(c),d=n(42),h=r(d),p=n(44),v=r(p),g=n(18),y=r(g),x=n(17),m=r(x),$=n(19),w=r($),b=n(15),k=r(b),T=n(16),M=r(T),O=n(45),_=r(O),F=n(47),A=r(F),V=n(48),X=r(V),Y={start:u.default,paint:f.default,add:a.default,remove:s.default,register:_.default,clear:h.default,setFpsHandler:A.default,setMaxFps:X.default,pause:v.default,on:y.default,off:m.default,trigger:w.default,broadcast:k.default,nextTick:M.default};t.exports=Y},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(13),a=r(o);t.exports=a.default.prototype.add},function(t,e){"use strict";t.exports=function(){this.children=[]}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o);t.exports=function(){if(!(this.$pausing||this.$inBrowser&&document.hidden)){var t=this;a.default.execFuncs(t.hooks.beforeTick,t,[t.$rafTime]),t.$freezing||(t.$children=[],this.children.sort(function(t,e){var n=a.default.funcOrValue(t.style.zIndex,t),r=a.default.funcOrValue(e.style.zIndex,e);return n===r?0:n>r?1:-1}).forEach(function(e,n){t.$perPaint(e,n)})),t.$render(),this.fps++,a.default.execFuncs(t.hooks.ticked,t,[t.$rafTime]),t.hooks.nextTick&&(a.default.execFuncs(t.hooks.nextTick,t,[t.$rafTime]),delete t.hooks.nextTick)}}},function(t,e){"use strict";t.exports=function(t){this.$pausing=void 0===t||t}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(33),a=r(o),i=function(t){var e=this;this.$extendList.forEach(function(n){n.onCreate&&n.onCreate.call(e,t)})};t.exports=function(t,e){var n=this,r=e||{};t=this.$dom=t||this.$dom;for(var o in r)this[o]=r[o];if(this.name=r.name||t.id||t.classList&&t.classList[0]||"Unnamed",this.$inBrowser="undefined"!=typeof window,r.fullScreen&&"undefined"!=typeof document&&(t.width=t.style.width=document.body.clientWidth||document.documentElement.clientWidth,t.height=t.style.height=document.body.clientHeight||document.documentElement.clientHeight),t.width=this.width=this.width||r.width||t.width,t.height=this.height=this.height||r.height||t.height,this.events=r.events||{},this.hooks=r.hooks||{},this.$inBrowser){var s=["contextmenu","mousewheel","click","dblclick","mousedown","mouseup","mousemove","touchstart","touchend","touchmove"];s.forEach(function(e){t.addEventListener(e,n.$eventHandler.bind(n))}),a.default.tick()}return i.call(this,r),this.$paintContext=this.$paintContext||t.getContext("2d"),this}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=r(o);t.exports=function(t,e){var n=this;a.default.execFuncs(t.hooks.beforeRemove,t,t.$tickedTimes++),t.style.visible=!1,t.$removing=!0,setTimeout(function(){t.$parent?t.$parent.children=t.$parent.children.filter(function(t){return t.$removing!==!0}):n.children=n.children.filter(function(t){return t.$removing!==!0}),t.$canvas&&(t.$canvas=void 0,t.$parent=void 0,t.$tickedTimes=void 0,t.$cache=void 0,t.$rendered=!1,a.default.execFuncs(t.hooks.removed,t,t.$tickedTimes))}),e&&this.children.splice(this.children.indexOf(t),1)}},function(t,e){"use strict";t.exports=function(t){this.fpsHandler=t}},function(t,e){"use strict";t.exports=function(t){this.maxFps=t||-1}},function(t,e){"use strict";t.exports=function(){var t=this;return this.fpsCalculateTime=Date.now(),this.$rAFer(this.paint.bind(this)),setInterval(function(){if(t.eHoldingFlag){var e=t.eHoldingFlag;t.$eventHandler.call(t,{layerX:e.layerX,layerY:e.layerY,screenX:e.screenX||e.layerX,screenY:e.screenY||e.layerY,type:"hold"})}},40),this}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(1),a=(r(o),n(3));r(a);t.exports=function(){}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(40),a=r(o),i=n(31),s=r(i),l=n(52),u=r(l),c=n(9),f=r(c),d=function(t){this.imgLoader=f.default;for(var e in u.default)this[e]=this[e]||JSON.parse(JSON.stringify(u.default[e]));t&&(t.el||(t={el:t}),t.el&&this.register("string"==typeof t.el?document.querySelector(t.el):t.el,t))};d.prototype.$extendList=[];for(var h in s.default)Object.prototype.hasOwnProperty.call(s.default,h)&&(d.prototype[h]=s.default[h]);for(var p in a.default)Object.prototype.hasOwnProperty.call(a.default,p)&&(d.prototype[p]=a.default[p]);t.exports=d},function(t,e){"use strict";var n={$dom:null,$paintContext:null,$nextTickTime:0,$lastPaintTime:0,$pausing:!1,$freezing:!1,name:"",fps:0,lastFps:0,fpsCalculateTime:0,fpsHandler:null,width:0,height:0,events:{click:null},children:[],eHoldingFlag:!1,eLastMouseHover:null,maxFps:-1,scroll:{scrollable:!1,scrollY:0,minScrollY:void 0,maxScrollY:void 0},$flags:{dragging:!1}};t.exports=n},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(9),a=r(o),i=n(6),s=r(i);t.exports=function(t,e){var n=void 0;return(0,s.default)(t,function(t){return(0,a.default)(t,function(t){for(var r=t.width,o=t.height,a=t.getContext("2d").getImageData(0,0,r,o),i=a.data,s=i.length-1;s>=0;s-=4)if(e&&e.conversion){var l=e.conversion({r:i[s-3],g:i[s-2],b:i[s-1],a:i[s]},(s+1>>2)%r,Math.floor((s+1>>2)/r));i[s-3]=l.r,i[s-2]=l.g,i[s-1]=l.b,i[s-0]=l.a}t.getContext("2d").clearRect(0,0,r,o),t.getContext("2d").putImageData(a,0,0),n=t},{canvas:!0,cacheFlag:Math.random()})}),function(){return n}}},function(t,e){"use strict";t.exports=function(t){var e=t.width,n=t.height,r=document.createElement("canvas");r.width=e,r.height=n;var o=r.getContext("2d");o.scale(1,-1),o.translate(0,-n),o.drawImage(t,0,0);var a=o.getImageData(0,0,e,n);return{canvas:o,img:a}}},function(t,e){"use strict";t.exports=function(t,e){return{type:"multline-text",text:t,config:e}}}])});
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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	var PI = 3.141593;

	module.exports = function (x, y, rx0, ry0, d, returnArr) {
	    var deg = d ? -d / 180 * PI : 0;
	    var _x = x,
	        _y = y;

	    if (d) {
	        _x = (x - rx0) * Math.cos(deg) - (y - ry0) * Math.sin(deg) + rx0;
	        _y = (x - rx0) * Math.sin(deg) + (y - ry0) * Math.cos(deg) + ry0;
	    }

	    if (returnArr) {
	        return [_x, _y];
	    }

	    return {
	        x: _x,
	        y: _y
	    };
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    xywh: ['sx', 'sy', 'sw', 'sh', 'tx', 'ty', 'tw', 'th'],
	    txywh: ['tx', 'ty', 'tw', 'th'],
	    sxywh: ['sx', 'sy', 'sw', 'sh'],
	    devFlag: '__EASYCANVAS_DEVTOOL__',
	    version: '0.5.9'
	};

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	var ProcessingFlag = 'processing';
	var ProcessingPool = {};

	function toDataURL(url, callback) {
	    if (url && url.match(/^data:/)) {
	        callback && callback(url);
	        return;
	    }

	    if (ProcessingPool[url]) {
	        if (ProcessingPool[url] !== ProcessingFlag) {
	            callback(ProcessingPool[url]);
	        } else {
	            setTimeout(function () {
	                toDataURL(url, callback);
	            }, 100);
	        }
	        return;
	    }

	    ProcessingPool[url] = ProcessingFlag;

	    var xhr = new XMLHttpRequest();
	    xhr.onload = function () {
	        var reader = new FileReader();
	        reader.onloadend = function () {
	            ProcessingPool[url] = reader.result;
	            callback && callback(reader.result);
	        };
	        reader.readAsDataURL(xhr.response);
	    };
	    xhr.open('GET', url);
	    xhr.responseType = 'blob';
	    xhr.send();
	}

	module.exports = toDataURL;

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/** ********** *
	 *
	 * Load images
	 * - Easycanvas.imgLoader.cacheCanvas
	 *
	 * ********** **/

	var Cache = {};
	var BlockingImgs = [];
	var ProcessingFlag = 'processing';

	var blockingAmount = 0;

	var loader = function loader(url, callback, option) {
	    var _option = option || {};
	    var cacheCanvas = loader.cacheCanvas;

	    if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object') {
	        var imgs = url;
	        _option.callbackArgs = _option.callbackArgs || [];
	        loader(imgs.shift(), function (perImg) {
	            _option.callbackArgs.push(perImg);
	            if (imgs.length > 1) {
	                loader(imgs, callback, _option);
	            } else {
	                loader(imgs[0], function (lastImg) {
	                    _option.callbackArgs.push(lastImg);
	                    callback(_option.callbackArgs);
	                }, _option);
	            }
	        }, option);
	        return;
	    }

	    var cacheNamespace = url + '_' + JSON.stringify(option) + '_' + cacheCanvas;

	    if (Cache[cacheNamespace]) {
	        // setTimeout(function () {
	        if (callback) {
	            callback(Cache[cacheNamespace]);
	        }
	        // });
	        return Cache[cacheNamespace];
	    }
	    // todo: 多个loader加载同一图片，目前只触发一个callback；待补充

	    var i = new Image();
	    if (_option.block) {
	        i.src = url;
	        blockingAmount++;
	    } else if (blockingAmount === 0) {
	        i.src = url;
	    } else {
	        BlockingImgs.push({
	            imgObj: i,
	            src: url
	        });
	    }

	    Cache[cacheNamespace] = i;

	    var tempCanvas = void 0;
	    if (_option.canvas || _option.alphaColor || cacheCanvas) {
	        tempCanvas = document.createElement('canvas');
	        tempCanvas.width = tempCanvas.height || 0;
	        Cache[cacheNamespace] = tempCanvas;
	    }

	    i.onload = function () {
	        if (i.src.substr(-3) === 'jpg' || i.src.substr(-3) === 'jpeg' || i.src.substr(-3) === 'bmp') {
	            i.$noAlpha = true;
	        } else if (i.src.indexOf('data:image/jpg;') === 0) {
	            i.$noAlpha = true;
	        }

	        if (_option.block) {
	            blockingAmount--;
	            if (blockingAmount === 0) {
	                BlockingImgs.forEach(function (blockingImg) {
	                    blockingImg.imgObj.src = blockingImg.src;
	                });
	                BlockingImgs.splice(0);
	            }
	        }

	        if (tempCanvas && (_option.canvas || _option.alphaColor || cacheCanvas)) {
	            var cts = tempCanvas.getContext('2d');
	            tempCanvas.width = i.width;
	            tempCanvas.height = i.height;
	            tempCanvas.$noAlpha = i.$noAlpha;
	            cts.drawImage(i, 0, 0);

	            if (_option.alphaColor) {
	                var data = cts.getImageData(0, 0, i.width, i.height);
	                var pixel = [];

	                for (var d = 0; d < data.data.length; d += 4) {
	                    var colorWeight = data.data[d] + data.data[d + 1] + data.data[d + 2];
	                    var blackLike = 1;
	                    if (data.data[d] < blackLike && data.data[d + 1] < blackLike && data.data[d + 2] < blackLike) {
	                        data.data[d + 3] = Math.floor(colorWeight / 255);
	                    }
	                }
	                cts.putImageData(data, 0, 0);
	                tempCanvas.$noAlpha = false;
	            }

	            i = tempCanvas;
	        }

	        if (callback) {
	            callback(i);
	        }
	    };

	    i.onerror = function () {
	        Cache[cacheNamespace] = i;
	    };

	    return tempCanvas || i;
	};

	loader.cacheCanvas = false;

	module.exports = loader;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _mathPointRotate = __webpack_require__(2);

	var _mathPointRotate2 = _interopRequireDefault(_mathPointRotate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PI = 3.141593; // 判断矩形(x1,y1,w1,h1)围绕定点(rx,ry)旋转deg角度后，能否与矩形(x2,y2,w2,h2)相交
	// 用于跳过绘制的判断
	// 用中心点距离+上下左右分离的方式模糊判断

	module.exports = function (x, y, x2, y2, w2, h2, rx, ry, deg) {
	    var _deg = deg ? -deg / 180 * PI : 0;

	    if (deg) {
	        x = (x - rx) * Math.cos(deg) - (y - ry) * Math.sin(deg) + rx;
	        y = (x - rx) * Math.sin(deg) + (y - ry) * Math.cos(deg) + ry;
	    }

	    return x >= x2 && x <= x2 + w2 && y >= y2 && y <= y2 + h2;
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _mathPointRotate = __webpack_require__(2);

	var _mathPointRotate2 = _interopRequireDefault(_mathPointRotate);

	var _mathPointInRect = __webpack_require__(10);

	var _mathPointInRect2 = _interopRequireDefault(_mathPointInRect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// module.exports = function (x1, y1, w1, h1, x2, y2, w2, h2, rx, ry, deg) {
	//     var cx = x1 + w1 / 2;
	//     var cy = y1 + h1 / 2;

	//     var distance = Math.max(w1, h1) + Math.max(w2, h2);

	//     if (deg) {
	//         var newxy = pointRotate(cx, cy, rx, ry, deg);
	//         cx = newxy.x, cy = newxy.y;
	//     }

	//     // 中心点距离太远一定不meet
	//     var meet = Math.pow((cx - (x2 + w2 / 2)), 2) + Math.pow((cy - (y2 + y2 / 2)), 2) < Math.pow(distance, 2);
	//     if (!meet) return false;

	//     if (deg) {
	//         // 没必要计算4个点
	//         var point1 = pointRotate(x1, y1, rx, ry, deg);
	//         // var point2 = pointRotate(x1 + w1, y1, rx, ry, deg);
	//         var point3 = pointRotate(x1, y1 + h1, rx, ry, deg);
	//         // var point4 = pointRotate(x1 + w1, y1 + h1, rx, ry, deg);
	//         meet = Math.max(point1.x, point3) > x2 &&
	//             Math.min(point1.x, point3.x) < x2 + w2 &&
	//             Math.max(point1.y, point3.y) > y2 &&
	//             Math.min(point1.y, point3.y) < y2 + h2;
	//         // meet = Math.max(point1.x, point2.x, point3.x, point4.x) > x2 &&
	//         //  Math.min(point1.x, point2.x, point3.x, point4.x) < x2 + w2 &&
	//         //  Math.max(point1.y, point2.y, point3.y, point4.y) > y2 &&
	//         //  Math.min(point1.y, point2.y, point3.y, point4.y) < y2 + h2;

	//     } else {
	//         meet = Math.max(x1 + w1, x2 + w2) - Math.min(x1, x2) < w1 + w2 &&
	//             Math.max(y1 + h1, y2 + h2) - Math.min(y1, y2) < h1 + h2;
	//     }

	//     return meet;
	// };

	// 判断矩形(x1,y1,w1,h1)围绕定点(rx,ry)旋转deg角度后，能否与矩形(x2,y2,w2,h2)相交
	// 用于跳过绘制的判断
	// 用中心点距离+上下左右分离的方式模糊判断

	module.exports = function (x1, y1, w1, h1, x2, y2, w2, h2, rx, ry, deg) {
	    var aMeetB = (0, _mathPointInRect2.default)(x1, y1, x2, y2, w2, h2, rx, ry, deg) || (0, _mathPointInRect2.default)(x1 + w1, y1, x2, y2, w2, h2, rx, ry, deg) || (0, _mathPointInRect2.default)(x1, y1 + h1, x2, y2, w2, h2, rx, ry, deg) || (0, _mathPointInRect2.default)(x1 + w1, y1 + h1, x2, y2, w2, h2, rx, ry, deg);

	    if (aMeetB) return true;

	    // 将矩形1设置为原点，矩形2的xywh为：
	    var bMeetA = (0, _mathPointInRect2.default)(x2, y2, x1, y1, w1, h1, rx, ry, -deg) || (0, _mathPointInRect2.default)(x2 + w2, y2, x1, y1, w1, h1, rx, ry, -deg) || (0, _mathPointInRect2.default)(x2, y2 + h2, x1, y1, w1, h1, rx, ry, -deg) || (0, _mathPointInRect2.default)(x2 + w2, y2 + h2, x1, y1, w1, h1, rx, ry, -deg);

	    if (bMeetA) return true;

	    return false;
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	var fallback = function fallback(callback) {
					setTimeout(callback, 1000 / 60);
	};

	var rAF = typeof window !== 'undefined' ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || fallback : fallback;

	module.exports = rAF;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /** ********** *
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * Sprite Structure
	                                                                                                                                                                                                                                                                               * {
	                                                                                                                                                                                                                                                                               *     style: {
	                                                                                                                                                                                                                                                                               *         tx, ty, tw, th,
	                                                                                                                                                                                                                                                                               *         zIndex, opacity, scale, rotate, rx, ry,
	                                                                                                                                                                                                                                                                               *         sx, sy, sw, sh, locate, // useless for content.text
	                                                                                                                                                                                                                                                                               *         fh, fv, fx, fy, // transfrom
	                                                                                                                                                                                                                                                                               *         align, font, color, // useless for content.img
	                                                                                                                                                                                                                                                                               *         visible, // visible false equals inexistence
	                                                                                                                                                                                                                                                                               *         mirrX, mirrY, // visible false equals inexistence
	                                                                                                                                                                                                                                                                               *     },
	                                                                                                                                                                                                                                                                               *     content: {
	                                                                                                                                                                                                                                                                               *         img,
	                                                                                                                                                                                                                                                                               *         text,
	                                                                                                                                                                                                                                                                               *         sequence: {} // for animate sprite
	                                                                                                                                                                                                                                                                               *     },
	                                                                                                                                                                                                                                                                               *     events: {
	                                                                                                                                                                                                                                                                               *         eIndex,
	                                                                                                                                                                                                                                                                               *         click / touchstart / contextmenu / ... / hold / touchout,
	                                                                                                                                                                                                                                                                               *         through,
	                                                                                                                                                                                                                                                                               *     },
	                                                                                                                                                                                                                                                                               *     children: [
	                                                                                                                                                                                                                                                                               *         { Sprite }, { Sprite } ...
	                                                                                                                                                                                                                                                                               *     ],
	                                                                                                                                                                                                                                                                               *     inherit: ['tx', 'ty', ...] // inherit from parent, default is ['tx', 'ty', 'scale']
	                                                                                                                                                                                                                                                                               *     hooks: {
	                                                                                                                                                                                                                                                                               *         created, mounted, painted, ticked
	                                                                                                                                                                                                                                                                               *     },
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               *     $parent: { Sprite },
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * }
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * ********** **/

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(3);

	var _constants2 = _interopRequireDefault(_constants);

	var _on = __webpack_require__(18);

	var _on2 = _interopRequireDefault(_on);

	var _off = __webpack_require__(17);

	var _off2 = _interopRequireDefault(_off);

	var _nextTick = __webpack_require__(16);

	var _nextTick2 = _interopRequireDefault(_nextTick);

	var _trigger = __webpack_require__(19);

	var _trigger2 = _interopRequireDefault(_trigger);

	var _broadcast = __webpack_require__(15);

	var _broadcast2 = _interopRequireDefault(_broadcast);

	var _bindDrag = __webpack_require__(14);

	var _bindDrag2 = _interopRequireDefault(_bindDrag);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ChangeChildrenToSprite = function ChangeChildrenToSprite($parent) {
	    if ($parent.children) {
	        $parent.children.forEach(function (child, i) {
	            if (!child.$id) {
	                $parent.children[i] = new sprite(child);
	            }
	            if ($parent.$id && !$parent.$dom) {
	                $parent.children[i].$canvas = $parent.$canvas;
	                $parent.children[i].$parent = $parent;
	            } else {
	                $parent.children[i].$canvas = $parent;
	            }

	            // if (typeof $parent.children[i].content.img === 'string') {
	            //     $parent.children[i].content.img = $parent.children[i].$canvas.imgLoader($parent.children[i].content.img);
	            // }

	            ChangeChildrenToSprite($parent.children[i]);
	        });
	    }
	};

	// Set default values to sprite
	var preAdd = function preAdd(_item) {
	    var item = _item || {};

	    if (!item.$id) {
	        item.$id = Math.random().toString(36).substr(2);
	    }

	    item.$tickedTimes = item.$tickedTimes || 0;

	    item.content = item.content || {};

	    item.style = item.style || {};

	    item.style.zIndex = item.style.zIndex || 0;
	    item.style.mirrX = item.style.mirrX || 0;

	    item.style.opacity = _utils2.default.firstValuable(item.style.opacity, 1);
	    item.style.locate = item.style.locate || 'center';
	    // item.style.rotate = item.style.rotate || 0;
	    item.style.scale = item.style.scale || 1;

	    var _img = _utils2.default.funcOrValue(item.content.img);

	    _constants2.default.xywh.forEach(function (key) {
	        item.style[key] = item.style[key] || 0;
	    });

	    item.inherit = item.inherit || ['tx', 'ty', 'scale', 'opacity'];
	    item.drag = item.drag || {};

	    item.events = item.events || {};
	    if (false) {
	        for (var i in item.events) {
	            if (typeof item.events[i] !== 'function' && i !== 'eIndex') {
	                console.warn('[Easycanvas] Handler ' + i + ' is not a function.', item.events[i]);
	            }
	        }
	    }

	    item.events.eIndex = item.events.eIndex;
	    // item.events.through = !!item.events.through;

	    item.scroll = item.scroll || {};
	    item.scroll.scrollX = item.scroll.scrollX || 0;
	    item.scroll.scrollY = item.scroll.scrollY || 0;

	    item.hooks = item.hooks || {};

	    if (false) {
	        item.$perf = {};
	    }

	    if (false) {
	        if (!item.name && item.content.img && item.content.img.src) {
	            var fileName = item.content.img.src.match(/.*\/([^\/]*)$/);
	            if (fileName && fileName[1]) {
	                item.name = fileName[1];
	            }
	        }
	        item.name = item.name || 'Unnamed Easycanvas Object';
	    }

	    item.children = item.children || [];

	    ChangeChildrenToSprite(item);

	    item.$scroll = {
	        speedX: 0,
	        speedY: 0
	    };

	    // item.$cache = {};
	    // item.$styleCacheTime = {};

	    return item;
	};

	var extend = function extend(opt) {
	    var _this = this;

	    this.$extendList.forEach(function (plugin) {
	        plugin.call(_this, opt);
	    });
	};

	var sprite = function sprite(opt) {
	    var _opt = preAdd(opt);

	    for (var i in _opt) {
	        if (Object.prototype.hasOwnProperty.call(_opt, i)) {
	            this[i] = _opt[i];
	        }
	    }

	    extend.call(this, _opt);

	    return this;
	};

	sprite.prototype.$extendList = [];

	sprite.prototype.add = function (child) {
	    if (!child) {
	        return;
	    }

	    this.children.push(child);

	    ChangeChildrenToSprite(this);

	    // bindDrag.bind(this.children[this.children.length - 1]);

	    return this.children[this.children.length - 1];
	};

	sprite.prototype.getRect = function () {
	    var _this2 = this;

	    var res = {};

	    _constants2.default.txywh.forEach(function (key) {
	        res[key] = _this2.getStyle(key);
	    });

	    if (res.tw === 0 && this.content.img) {
	        var img = _utils2.default.funcOrValue(this.content.img, this);
	        res.tw = img.width;
	        res.th = img.height;
	    }

	    var locate = this.getStyle('locate');
	    if (locate === 'lt') {} else if (locate === 'ld') {
	        res.ty -= res.th;
	    } else if (locate === 'rt') {
	        res.tx -= res.tw;
	    } else if (locate === 'rd') {
	        res.tx -= res.tw;
	        res.ty -= res.th;
	    } else {
	        // center
	        res.tx -= res.tw >> 1;
	        res.ty -= res.th >> 1;
	    }

	    return res;
	};

	// sprite.prototype.getRender = function () {

	//     if (!this.$canvas) return {};

	//     let res = this.$canvas.$children.filter(($children) => {
	//         return $children.$id === this.$id;
	//     });

	//     return res && res[0];
	// };

	sprite.prototype.getSelfStyle = function (_ref) {
	    var locate = _ref.locate;

	    var res = {};
	    for (var key in this.style) {
	        res[key] = _utils2.default.funcOrValue(this.style[key], this);
	    }

	    return res;
	};

	sprite.prototype.getStyle = function (key) {
	    var $sprite = this;

	    // if ($sprite.$styleCacheTime[key] === $sprite.$canvas.$lastPaintTime && $sprite.$cache[key]) {
	    //     window.y++;
	    //     return $sprite.$cache[key];
	    // }
	    //     window.n++;

	    var currentValue = _utils2.default.funcOrValue($sprite.style[key], $sprite);

	    if ($sprite.$parent && $sprite.inherit.indexOf(key) >= 0) {
	        // 额外处理滚动
	        if (key === 'tx') {
	            currentValue -= $sprite.$parent.scroll.scrollX || 0;
	        } else if (key === 'ty') {
	            currentValue -= $sprite.$parent.scroll.scrollY || 0;
	        }

	        if (key === 'tw' || key === 'th') {
	            return _utils2.default.firstValuable(currentValue, $sprite.$parent.getStyle(key));
	        } else if (key === 'opacity' || key === 'scale') {
	            return _utils2.default.firstValuable($sprite.$parent.getStyle(key), 1) * _utils2.default.firstValuable(currentValue, 1);
	        } else {
	            return _utils2.default.firstValuable($sprite.$parent.getStyle(key), 0) + _utils2.default.firstValuable(currentValue, 0);
	        }
	    }

	    // $sprite.$styleCacheTime[key] = $sprite.$canvas.$lastPaintTime;
	    // $sprite.$cache[key] = currentValue;

	    return currentValue;
	};

	sprite.prototype.remove = function (child) {
	    if (child) {
	        this.$canvas.remove(child);
	        _utils2.default.execFuncs(child.hooks.removed, child);
	        return;
	    }

	    if (this.$parent) {
	        this.$parent.remove(this);
	    } else {
	        this.$canvas.remove(this);
	    }
	    _utils2.default.execFuncs(this.hooks.removed, this);
	};

	sprite.prototype.update = function (opt) {
	    if (!opt) return;

	    for (var i in opt) {
	        if (_typeof(opt[i]) === 'object') {
	            for (var j in opt[i]) {
	                this[i][j] = opt[i][j];
	            }
	        } else {
	            this[i] = opt[i];
	        }
	    }
	};

	sprite.prototype.nextTick = _nextTick2.default;
	sprite.prototype.on = _on2.default;
	sprite.prototype.off = _off2.default;
	sprite.prototype.trigger = _trigger2.default;
	sprite.prototype.broadcast = _broadcast2.default;

	module.exports = sprite;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var draggingFlag = false; /** ********** *
	                           *
	                           * Bind drag events to EVERY SPRITE.
	                           * - Whether to trigger handlers, is decided by '$Sprite.scroll.scrollable'.
	                           * - Drag events FISRT, scroll events FOLLOWING. Drags will stop events' bubbling.
	                           * - TODO: Move 'bindings' to event handlers
	                           * - WARN: Hold will not trigger on draging
	                           *
	                           * ********** **/

	var setFlag = function setFlag($sprite, value) {
	    $sprite.drag.draggingFlag = value;
	    draggingFlag = value;
	};

	var dragHandler = function dragHandler(originHandler, item, e, dragEnabled) {
	    return originHandler ? originHandler.call(item, e) : dragEnabled ? 'drag' : false;
	};

	var isMobile = typeof wx !== 'undefined' || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	module.exports = {
	    bind: function bind($sprite) {
	        var startDragPosition = {
	            x: 0,
	            y: 0
	        };

	        $sprite.drag = $sprite.drag || {};

	        $sprite.drag.draggingFlag = false;

	        var oMousedown = $sprite.events.mousedown || $sprite.events.touchstart;
	        $sprite.events[isMobile ? 'touchstart' : 'mousedown'] = function (e) {
	            // if dragable is a object, it means the range of dragable area
	            if ($sprite.drag.dragable) {
	                setFlag($sprite, true);
	                var relativeX = e.canvasX - this.getStyle('tx');
	                var relativeY = e.canvasY - this.getStyle('ty');

	                startDragPosition.x = e.canvasX;
	                startDragPosition.y = e.canvasY;
	            }

	            return dragHandler(oMousedown, $sprite, e, $sprite.drag.dragable);
	        }.bind($sprite);

	        var oMousemove = $sprite.events.mousemove || $sprite.events.touchmove;
	        $sprite.events[isMobile ? 'touchmove' : 'mousemove'] = function (e) {
	            var worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
	            if (worked) {
	                this.style.tx += e.canvasX - startDragPosition.x;
	                this.style.ty += e.canvasY - startDragPosition.y;

	                // 立即更新cache，否则拖拽太快可能触发跟不上
	                this.$canvas.$flags.dragging = this;

	                startDragPosition.x = e.canvasX;
	                startDragPosition.y = e.canvasY;
	            }
	            return dragHandler(oMousemove, $sprite, e, worked);
	        }.bind($sprite);

	        var oMouseup = $sprite.events.mouseup || $sprite.events.touchend;
	        $sprite.events[isMobile ? 'touchend' : 'mouseup'] = function (e) {
	            var worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;

	            this.$canvas.$flags.dragging = undefined;

	            if ($sprite.drag.draggingFlag && $sprite.drag.dragable) {
	                setFlag($sprite, false);
	            }
	            return dragHandler(oMouseup, $sprite, e, worked);
	        };

	        var oMouseout = $sprite.events.mouseout;
	        $sprite.events.mouseout = function (e) {
	            var worked = $sprite.drag.draggingFlag && $sprite.drag.dragable;
	            setFlag($sprite, false);
	            return dragHandler(oMouseout, $sprite, e, worked);
	        };

	        var oClick = $sprite.events.click;
	        $sprite.events.click = function (e) {
	            var worked = $sprite.drag.dragable;
	            if (worked) {
	                var relativeX = e.canvasX - $sprite.getStyle('tx');
	                var relativeY = e.canvasY - $sprite.getStyle('ty');
	                return oClick ? oClick.call($sprite, e) : true;
	            }
	            return dragHandler(oClick, $sprite, e, worked);
	        };
	    }
	};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	    var arg = Array.prototype.slice.call(arguments);
	    var name = arg.shift();

	    if (this.hooks[name]) {
	        _utils2.default.execFuncs(this.hooks[name], this, arg);
	        // this.hooks[name].apply(this, arg);
	    }

	    arg.unshift(name);

	    this.children && this.children.forEach(function (child) {
	        child.broadcast.apply(child, arg);
	    });
	}; /** ********** *
	    *
	    * Trigger event on current sprite and its children
	    * - Current sprite first, children following.
	    * - Can pass arguments.
	    *
	    * ********** **/

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	/** ********** *
	 *
	 * Trigger event only once on next painting-tick
	 * - Removed after triggering.
	 *
	 * ********** **/

	module.exports = function (func) {
	    var _func = function _func() {
	        func.apply(this, arguments);
	        this.off('ticked', _func);
	    };

	    this.on('ticked', _func);
	};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (event, func) {
	    if (!this.hooks[event]) return;

	    if (this.hooks[event] === func || !func) {
	        delete this.hooks[event];
	    } else if (_utils2.default.isArray(this.hooks[event])) {
	        this.hooks[event][this.hooks[event].indexOf(func)] = undefined;
	    }
	}; /** ********** *
	    *
	    * Remove current hook
	    *
	    * ********** **/

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (name, func, throttle) {
	    var _handle = func;

	    if (throttle) {
	        var that = this;
	        _handle = function handle() {
	            var now = Date.now();

	            if (now > _handle.$lastTriggerTime + throttle) {
	                _handle.$lastTriggerTime = now;
	                var args = Array.prototype.slice.call(arguments);
	                func.apply(that, args);
	            }
	        };
	        _handle.$lastTriggerTime = -1;
	    }

	    if (!this.hooks[name]) {
	        this.hooks[name] = _handle;
	    } else if (_utils2.default.isArray(this.hooks[name])) {
	        this.hooks[name].push(_handle);
	    } else {
	        this.hooks[name] = [this.hooks[name], _handle];
	    }
	}; /** ********** *
	    *
	    * Add current hook
	    *
	    * ********** **/

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	    var arg = Array.prototype.slice.call(arguments);
	    var name = arg.shift();

	    if (this.hooks[name]) {
	        return _utils2.default.execFuncs(this.hooks[name], this, arg);
	        // this.hooks[name].apply(this, arg);
	    }
	}; /** ********** *
	    *
	    * Trigger event on current sprite without its children
	    * - Current sprite first, children following.
	    * - Can pass arguments.
	    *
	    * ********** **/

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	// Math.PI wastes some performace
	var PI = 3.141593;

	var second2frame = function second2frame(second) {
	    return second / 1000 * 60;
	};

	var getLastPaintTime = function getLastPaintTime(transitions) {
	    return transitions.$lastPaintTime || Date.now();
	};

	var types = {
	    linear: function linear(a, b, duration) {
	        if (a === b) return a;

	        var startTime = getLastPaintTime(this);

	        var loop = false;

	        var resFunc = function () {
	            var currentTime = this.$lastPaintTime;
	            var result = (b - a) * (currentTime - startTime) / duration + a;

	            if (loop) {
	                if (b > a) {
	                    while (result > b) {
	                        result -= b - a;
	                    }
	                } else {
	                    while (result < b) {
	                        result += a - b;
	                    }
	                }
	            } else {
	                if (b > a && result > b) {
	                    resFunc.$done = true;
	                    result = b;
	                } else if (b < a && result < b) {
	                    resFunc.$done = true;
	                    result = b;
	                }
	            }

	            return result;
	        }.bind(this);

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };

	        resFunc.restart = function () {
	            startTime = getLastPaintTime(this);
	        };

	        return resFunc;
	    },

	    pendulum: function pendulum(a, b, duration, _config) {
	        if (a === b) return a;

	        var startTime = getLastPaintTime(this);

	        var config = _config || {};
	        config.start = config.start || 0;

	        var loop = false;

	        var resFunc = function () {
	            var currentTime = getLastPaintTime(this);
	            var passTime = (currentTime - startTime) / duration;

	            if (!loop) {
	                if (config.cycle) {
	                    if (config.cycle < passTime) {
	                        resFunc.$done = true;
	                        passTime = config.cycle;
	                    }
	                } else if (passTime > 1) {
	                    resFunc.$done = true;
	                    passTime = 1;
	                }
	            } else {
	                if (config.cycle) {
	                    passTime %= config.cycle;
	                }
	            }

	            var deg = passTime * PI * 2 - PI / 2 + config.start / 360 * PI;
	            var result = (b - a) * (Math.sin(deg) + 1) / 2 + a;

	            return result;
	        }.bind(this);

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };

	        resFunc.restart = function () {
	            startTime = getLastPaintTime(this);
	        };

	        return resFunc;
	    },

	    ease: function ease(a, b, duration) {
	        return this.pendulum(a, b, duration * 2, {
	            cycle: 0.5
	        });
	    },

	    oneByOne: function oneByOne(_arr) {
	        var arr = _arr;
	        var loop = false;

	        var resFunc = function resFunc() {
	            for (var _i = 0; _i < arr.length; _i++) {
	                if (!arr[_i].$done) {
	                    return arr[_i]();
	                } else if (!arr[_i].$nextRestart) {
	                    arr[_i].$nextRestart = true;
	                    if (arr[_i + 1]) {
	                        arr[_i + 1].restart();
	                        return arr[_i + 1]();
	                    }
	                }
	            }

	            if (loop) {
	                for (var _i2 = 0; _i2 < arr.length; _i2++) {
	                    arr[_i2].$done = false;
	                    arr[_i2].$nextRestart = false;
	                    arr[_i2].restart();
	                }
	                return arr[0]();
	            }

	            return arr[arr.length - 1]();
	        };

	        resFunc.loop = function () {
	            loop = true;
	            return resFunc;
	        };

	        return resFunc;
	    }
	};

	var transition = function transition(parent, key, type, end, duration) {
	    var current = (0, _utils.funcOrValue)(parent[key]);

	    if (false) {
	        if (typeof current === 'undefined') {
	            console.warn('[Easycanvas] start value in transition is undefined, using 0 instead.');
	        }
	    }

	    current = current || 0;

	    parent[key] = types[type].bind(transition)(current, end, duration);
	};

	for (var i in types) {
	    transition[i] = types[i];
	}

	module.exports = transition;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** ********** *
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * Preparing data for devtool.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * ********** **/

	var _constants = __webpack_require__(3);

	var _constants2 = _interopRequireDefault(_constants);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (false) {
	    if (!window[_constants2.default.devFlag]) {
	        // init
	        var devData = window[_constants2.default.devFlag] = {
	            isPaintRecording: false,
	            selectMode: false,
	            current: {},
	            version: _constants2.default.version,
	            $canvas: {},
	            $plugin: null
	        };

	        var BRIDGE = {
	            getSprite: function getSprite($canvasId) {
	                if (!devData.isPaintRecording) return [];

	                var res = {};

	                if ($canvasId) {
	                    var children = devData.$canvas[$canvasId].children;
	                    var $children = devData.$canvas[$canvasId].$children;

	                    var pusher = function pusher(item) {
	                        // Skip $mask in select mode
	                        if (item.name === _constants2.default.devFlag) return;

	                        res[item.$id] = {
	                            name: item.name,
	                            parent: item.$parent && item.$parent.$id,
	                            style: {},
	                            children: item.children.filter(function (child) {
	                                return child.name !== _constants2.default.devFlag;
	                            }).map(function (child) {
	                                return child.$id;
	                            }),
	                            rendered: item.$rendered
	                        };

	                        // if (item.content.img || item.content.text) {
	                        //     res[item.$id].rendered = false;
	                        //     for (let i = 0, l = $children.length; i < l; i++) {
	                        //         if ($children[i].$id === item.$id) {
	                        //             res[item.$id].rendered = true;
	                        //             break;
	                        //         }
	                        //     }
	                        // }

	                        for (var i in item.style) {
	                            res[item.$id].style[i] = _utils2.default.funcOrValue(item.style[i], item);
	                        }

	                        _constants2.default.xywh.forEach(function (key) {
	                            res[item.$id].style[key] = Math.round(res[item.$id].style[key]);
	                        });

	                        ['physics', '$perf'].forEach(function (key) {
	                            res[item.$id][key] = item[key];
	                        });

	                        if (item.webgl) {
	                            res[item.$id].webgl = {};
	                            ['rx', 'ry', 'rz', 'tx', 'ty', 'tz'].forEach(function (key) {
	                                res[item.$id].webgl[key] = _utils2.default.funcOrValue(item.webgl[key], item);
	                            });
	                        }

	                        if (item.children) {
	                            item.children.forEach(pusher);
	                        }
	                    };

	                    children.forEach(pusher);
	                } else {
	                    for (var c in devData.$canvas) {
	                        res = _extends(res, devData.$plugin.getSprite(c));
	                    }
	                }

	                return res;
	            },

	            selectSpriteById: function selectSpriteById($spriteId, $canvasId) {
	                if (!$canvasId) {
	                    for (var i in devData.$canvas) {
	                        var _res = BRIDGE.selectSpriteById($spriteId, i);
	                        if (_res) {
	                            return {
	                                $sprite: _res.$sprite || _res,
	                                $canvas: devData.$canvas[i]
	                            };
	                        }
	                    }

	                    return false;
	                }

	                var looper = function looper(array) {
	                    for (var _i = 0; _i < array.length; _i++) {
	                        if (array[_i].$id === $spriteId) return array[_i];

	                        var _res2 = looper(array[_i].children);
	                        if (_res2) {
	                            return {
	                                $sprite: _res2.$sprite || _res2,
	                                $canvas: devData.$canvas[$canvasId]
	                            };
	                        }
	                    }

	                    return false;
	                };

	                var children = devData.$canvas[$canvasId].children;
	                var res = looper(children);
	                if (res) {
	                    return {
	                        $sprite: res.$sprite || res,
	                        $canvas: devData.$canvas[$canvasId]
	                    };
	                }
	            },

	            updateSprite: function updateSprite($spriteId) {
	                var groupName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'style';
	                var keys = arguments[2];
	                var $canvasId = arguments[3];

	                var $sprite = BRIDGE.selectSpriteById($spriteId, $canvasId).$sprite;
	                if (!$sprite) console.warn('Sprite ' + spriteId + ' Not Found.');

	                _extends($sprite[groupName], keys);
	            },

	            highlightSprite: function highlightSprite($spriteId, opt, $canvasId) {
	                devData.selectMode = Boolean(opt);

	                var tmp = BRIDGE.selectSpriteById($spriteId, $canvasId);
	                var $sprite = tmp.$sprite;
	                var $canvas = tmp.$canvas;

	                if (opt && $canvas && $sprite) {
	                    $canvas.$plugin.selectSprite(false, $canvas, $sprite);
	                } else if ($canvas) {
	                    $canvas.$plugin.cancelSelectSprite($canvas);
	                }
	            },

	            sendGlobalHook: function sendGlobalHook($spriteId, $canvasId) {
	                var tmp = BRIDGE.selectSpriteById($spriteId, $canvasId);
	                var $sprite = tmp.$sprite;
	                var $canvas = tmp.$canvas;

	                console.log('%c window.$0 = %c Current Sprite(' + $sprite.name + ') %c ', "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
	                // console.log(`%c window.$1 = %c Current Painter %c`,
	                //     "background:#4086f4 ; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff",
	                //     "background:#41b883 ; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff",
	                //     "background:transparent");

	                window.$0 = $sprite;
	                window.$1 = $canvas;
	            },

	            pause: function pause($canvasId, opt) {
	                var $canvas = devData.$canvas[$canvasId];
	                $canvas.$pausing = typeof opt !== 'undefined' ? opt : !$canvas.$pausing;
	            },

	            getPerf: function getPerf() {
	                var perfData = {
	                    canvas: [],
	                    navigator: {
	                        clientWidth: document.body.clientWidth,
	                        clientHeight: document.body.clientHeight,
	                        devicePixelRatio: window.devicePixelRatio
	                    }
	                };

	                if (!devData.isPaintRecording) return perfData;

	                for (var c in devData.$canvas) {
	                    perfData.canvas.push({
	                        $id: c,
	                        name: devData.$canvas[c].name,
	                        perf: devData.$canvas[c].$perf,
	                        fps: devData.$canvas[c].lastFps,
	                        size: {
	                            styleWidth: devData.$canvas[c].$dom.getBoundingClientRect().width || parseInt(devData.$canvas[c].$dom.style.width) || devData.$canvas[c].$dom.width,
	                            styleHeight: devData.$canvas[c].$dom.getBoundingClientRect().height || parseInt(devData.$canvas[c].$dom.style.height) || devData.$canvas[c].$dom.height,
	                            canvasWidth: devData.$canvas[c].$dom.width,
	                            canvasHeight: devData.$canvas[c].$dom.height
	                        }
	                    });
	                }

	                return perfData;
	            }
	        };

	        devData.$plugin = BRIDGE;
	    }
	}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _constants = __webpack_require__(3);

	var _constants2 = _interopRequireDefault(_constants);

	var _index = __webpack_require__(51);

	var _index2 = _interopRequireDefault(_index);

	var _tick = __webpack_require__(12);

	var _tick2 = _interopRequireDefault(_tick);

	var _mirror = __webpack_require__(84);

	var _mirror2 = _interopRequireDefault(_mirror);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _transition = __webpack_require__(25);

	var _transition2 = _interopRequireDefault(_transition);

	var _imgLoader = __webpack_require__(9);

	var _imgLoader2 = _interopRequireDefault(_imgLoader);

	var _imgPretreat = __webpack_require__(83);

	var _imgPretreat2 = _interopRequireDefault(_imgPretreat);

	var _multlineText = __webpack_require__(85);

	var _multlineText2 = _interopRequireDefault(_multlineText);

	var _sprite = __webpack_require__(13);

	var _sprite2 = _interopRequireDefault(_sprite);

	var _chromeDevtool = __webpack_require__(26);

	var _chromeDevtool2 = _interopRequireDefault(_chromeDevtool);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Easycanvas = {
	    painter: _index2.default,
	    imgLoader: _imgLoader2.default,
	    imgPretreat: _imgPretreat2.default,
	    multlineText: _multlineText2.default,
	    transition: _transition2.default,
	    tick: _tick2.default,
	    utils: _utils2.default,
	    mirror: _mirror2.default,
	    // 这个class只是为了兼容老版本写法“new Easycanvas.class.sprite(opt);”
	    class: {
	        sprite: _sprite2.default
	    },
	    sprite: _sprite2.default,
	    $version: _constants2.default.version,
	    env: ("production")
	};

	Easycanvas.extend = function (pluginHook) {
	    Easycanvas.sprite.prototype.$extendList.push(pluginHook);
	};

	Easycanvas.use = function (pluginHook) {
	    if (pluginHook.onUse) {
	        pluginHook.onUse(Easycanvas);
	    }

	    Easycanvas.painter.prototype.$extendList.push(pluginHook);
	};

	// if (process.env.NODE_ENV !== 'production') {
	//     Easycanvas.$warn = (() => {
	//         let lastConsoleTime = 0;
	//         return function () {
	//             let now = Date.now();
	//             if (now - lastConsoleTime < 1000) {
	//                 // 防止连续警告
	//                 return;
	//             }

	//             let args = Array.prototype.slice.call(arguments);

	//             lastConsoleTime = now;
	//             console.warn.apply(this, args);
	//         };
	//     })();
	// }

	var inBrowser = typeof window !== 'undefined';

	if (inBrowser) {
	    if (window.Easycanvas) {
	        console.warn('[Easycanvas] already loaded, it should be loaded only once.');
	    } else {
	        if (false) {
	            setTimeout(function () {
	                console.log('%c Easycanvas %c You are using the develop version ' + _constants2.default.version + ' %c', "background:#4086f4; padding: 2px 0; border-radius: 2px 0 0 2px;  color: #fff", "background:#41b883; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff", "background:transparent");
	            }, 500);
	        }
	        window.Easycanvas = Easycanvas;
	    }
	}

	module.exports = Easycanvas;

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _perPaint = __webpack_require__(37);

	var _perPaint2 = _interopRequireDefault(_perPaint);

	var _render = __webpack_require__(39);

	var _render2 = _interopRequireDefault(_render);

	var _eventHandler = __webpack_require__(32);

	var _eventHandler2 = _interopRequireDefault(_eventHandler);

	var _bindDrag = __webpack_require__(14);

	var _bindDrag2 = _interopRequireDefault(_bindDrag);

	var _rAFer = __webpack_require__(38);

	var _rAFer2 = _interopRequireDefault(_rAFer);

	var _apiPlugin = __webpack_require__(50);

	var _apiPlugin2 = _interopRequireDefault(_apiPlugin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Inner apis of an easycanvas instance
	 * - Used for Easycanvas.js only normally.
	 * - Will be added to Easycanvas instance's prototype.
	 *
	 * ********** **/

	var apiInner = {
	    $render: _render2.default,
	    $eventHandler: _eventHandler2.default,
	    $perPaint: _perPaint2.default,
	    $bindDrag: _bindDrag2.default,
	    $rAFer: _rAFer2.default
	};

	if (false) {
	    apiInner.$plugin = (0, _apiPlugin2.default)();
	}

	module.exports = apiInner;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(3);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import eventScroll from './eventHandler.scroll.js';

	/** ********** *
	 *
	 * Handle events on canvas (Includes both user's events and debugging events)
	 * - Compare event's coordinate and the coordinate of every sprite in
	 *   Easycanvas.children, and check sprite's handlers one by one.
	 * - Events: mousedown, mousemove, mouseup, touchstart, touchmove, touchend,
	 *   click, contextmenu
	 * - Expanded events: hold, touchout
	 *
	 * ********** **/

	var isMobile = typeof wx !== 'undefined' || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	// transform
	// const mobileEvents = ['touchstart', 'touchmove', 'touchend'];
	// const pcEvents = ['mousedown', 'mousemove', 'mouseup'];
	// const mobilePCTransform = function (type) {
	//     if (isMobile) {
	//         let index = pcEvents.indexOf(type);
	//         if (index >= 0) return mobileEvents[index];
	//     } else {
	//         let index = mobileEvents.indexOf(type);
	//         if (index >= 0) return pcEvents[index];
	//     }
	//     return type;
	// };

	/**
	 * Sort sprite
	 * - Order by eIndex dev-tool's in events' triggering
	 * - Order by zIndex in dev-tool's select mode
	 */
	var sortByIndex = function sortByIndex(arr) {
	    return arr.sort(function (a, b) {
	        if (false) {
	            if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                return _utils2.default.funcOrValue(a.style.zIndex, a) < _utils2.default.funcOrValue(b.style.zIndex, b) ? 1 : -1;
	            }
	        }

	        return _utils2.default.funcOrValue(_utils2.default.firstValuable(a.events.eIndex, a.style.zIndex), a) < _utils2.default.funcOrValue(_utils2.default.firstValuable(b.events.eIndex, b.style.zIndex), b) ? 1 : -1;
	    });
	};

	/**
	 * Check whether the event hits certain sprite
	 * - Sprite in first frame will not captrue any event [?]
	 */
	var isVisible = function isVisible($sprite) {
	    if ($sprite.$parent && !isVisible($sprite.$parent)) {
	        return false;
	    }
	    return _utils2.default.funcOrValue($sprite.style.visible, $sprite) !== false;
	};
	var hitSprite = function hitSprite($sprite, e) {
	    if (isVisible($sprite) === false) {
	        return false;
	    }

	    var rect = $sprite.getRect();

	    return _utils2.default.pointInRect(e.canvasX, e.canvasY, rect.tx, rect.tx + rect.tw, rect.ty, rect.ty + rect.th);
	};

	/**
	 * Sort all the sprites(including children), then put to @caughts
	 * - Child is above the parent only if Index >= 0
	 */
	var looper = function looper(arr, e, caughts) {
	    if (!arr || !arr.length) return;

	    for (var i = 0; i < arr.length; i++) {
	        var item = arr[i];
	        if (item.children.length) {
	            // Children above
	            looper(sortByIndex(item.children.filter(function (a) {
	                if (false) {
	                    if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                        return _utils2.default.funcOrValue(a.style.zIndex, a) >= 0;
	                    }
	                }

	                return _utils2.default.funcOrValue(_utils2.default.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0;
	            })), e, caughts);
	        }
	        if (hitSprite(item, e)) {
	            caughts.push(item);
	        }
	        if (item.children.length) {
	            // Children below
	            looper(sortByIndex(item.children.filter(function (a) {
	                if (false) {
	                    if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode) {
	                        return _utils2.default.funcOrValue(a.style.zIndex, a) < 0;
	                    }
	                }

	                return !(_utils2.default.funcOrValue(_utils2.default.firstValuable(a.events.eIndex, a.style.zIndex), a) >= 0);
	            })), e, caughts);
	        }
	    }
	};

	var extend = function extend($e, caughts) {
	    var _this = this;

	    this.$extendList.forEach(function (plugin) {
	        if (plugin.onEvent) {
	            plugin.onEvent.call(_this, $e, caughts);
	        }
	    });
	};

	module.exports = function (e) {
	    var $canvas = this;

	    if (!e.layerX && e.touches && e.touches[0]) {
	        e.layerX = e.targetTouches[0].pageX - e.currentTarget.offsetLeft;
	        e.layerY = e.targetTouches[0].pageY - e.currentTarget.offsetTop;
	    }
	    if (!e.layerX && e.changedTouches && e.changedTouches[0]) {
	        e.layerX = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
	        e.layerY = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
	    }

	    var isRotated = this.$dom.getBoundingClientRect().width > this.$dom.getBoundingClientRect().height !== this.width > this.height;

	    var scaleX = Math.floor(this.$dom.getBoundingClientRect()[isRotated ? 'height' : 'width']) / this.width;
	    var scaleY = Math.floor(this.$dom.getBoundingClientRect()[isRotated ? 'width' : 'height']) / this.height;

	    scaleX = scaleX || 1;
	    scaleY = scaleY || 1;

	    var $e = {
	        // type: mobilePCTransform(e.type),
	        type: e.type,
	        canvasX: e.layerX / scaleX,
	        canvasY: e.layerY / scaleY,
	        event: e
	    };

	    if ($canvas.events.interceptor) {
	        $e = _utils2.default.firstValuable($canvas.events.interceptor($e), $e);
	        if (!$e || $e.$stopPropagation) return;
	    }

	    var caughts = [];

	    if ($canvas.$flags.dragging && $canvas.$flags.dragging.$id) {
	        caughts.push($canvas.$flags.dragging);
	    }

	    looper(sortByIndex($canvas.children), $e, caughts);

	    extend.call($canvas, $e, caughts);

	    if (false) {
	        // 开发者工具select模式下为选取元素
	        if (window[_constants2.default.devFlag] && window[_constants2.default.devFlag].selectMode && caughts.length) {
	            var chooseSprite = caughts[0];
	            if (chooseSprite.name === _constants2.default.devFlag) {
	                // 选中mask不算
	                chooseSprite = caughts[1];
	            }

	            if (chooseSprite && $canvas.$plugin.selectSprite(e.type === 'click' || e.type === 'touchend', $canvas, chooseSprite)) {
	                return;
	            }
	        }
	    }

	    // Create a new event: 'hold' (suits both mobile and pc)
	    if (!$canvas.eHoldingFlag && ($e.type === 'mousedown' || $e.type === 'touchstart')) {
	        $canvas.eHoldingFlag = e;
	    } else if ($canvas.eHoldingFlag && ($e.type === 'mouseup' || $e.type === 'touchend')) {
	        $canvas.eHoldingFlag = false;
	        // 基础库不再支持滚动
	        // eventScroll.stop();
	    } else if ($canvas.eHoldingFlag && ($e.type === 'mousemove' || $e.type === 'touchmove')) {
	        $canvas.eHoldingFlag = e;
	    } // else if (!$canvas.eHoldingFlag && e.type === 'contextmenu') {

	    for (var i = 0; i < caughts.length; i++) {
	        // trigger 'mouseout' or 'touchout' event 
	        if (($e.type === 'mousemove' || $e.type === 'touchmove') && $canvas.eLastMouseHover && $canvas.eLastMouseHover !== caughts[i] && caughts.indexOf($canvas.eLastMouseHover) === -1) {
	            // touchout待移除（目前可能不触发）
	            var eMouseout = $canvas.eLastMouseHover['events']['mouseout'] || $canvas.eLastMouseHover['events']['touchout'];
	            if (eMouseout) {
	                eMouseout.call($canvas.eLastMouseHover, $e);
	            }
	        }

	        // 基础库不再支持滚动
	        // if ($e.type === 'mousewheel') {
	        //     eventScroll.wheel(caughts[i], $e);
	        // } else if ($canvas.eHoldingFlag && $e.type === 'touchmove') {
	        //     if (eventScroll.touch(caughts[i], $e)) {
	        //         return;
	        //     }
	        // }

	        if (!caughts[i]['events']) continue; // TODO to remove

	        var _handler = caughts[i]['events'][$e.type];
	        if (_handler) {
	            $canvas.eLastMouseHover = caughts[i];
	            var result = _handler.call(caughts[i], $e);
	            // stop then chain and cancel 'hold' event's flag
	            if (result === true) {
	                $canvas.eHoldingFlag = false;
	                return result;
	            } else if (result === 'drag') {
	                $canvas.eHoldingFlag = false;
	                return result;
	            }
	        }

	        if (caughts[i].events.through === false) {
	            return;
	        }
	    }

	    if (!caughts.length && $canvas.eLastMouseHover) {
	        // hover更替，触发mouseout
	        var _eMouseout = $canvas.eLastMouseHover['events']['mouseout'];
	        if (_eMouseout) {
	            _eMouseout.call($canvas.eLastMouseHover, $e);
	        }
	        $canvas.eLastMouseHover = null;
	    }

	    var handler = $canvas.events[$e.type];
	    if (handler) {
	        if (handler.call($canvas, $e)) {
	            $canvas.eHoldingFlag = false;
	            return true;
	        }
	    }
	};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _tick2 = __webpack_require__(12);

	var _tick3 = _interopRequireDefault(_tick2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Handle wheel events on canvas
	 * - Wheel events pass in from eventHandler.js.
	 * - Includes touch scroll and mouse wheel scroll.
	 *
	 * ********** **/

	var startPos = {};
	var scrolling = false;

	var tickPool = [];

	var scrollFuncs = {
	    stop: function stop() {
	        scrolling = false;
	    },

	    tick: function tick() {
	        (0, _tick3.default)(scrollFuncs.looper);
	    },

	    looper: function looper() {
	        tickPool.forEach(function ($sprite, index) {
	            var speedX = $sprite.$scroll.speedX;
	            var speedY = $sprite.$scroll.speedY;

	            if (Math.abs($sprite.$scroll.speedX) > 1) {
	                $sprite.$scroll.speedX *= $sprite.scroll.smooth || 0.8;
	            } else {
	                $sprite.$scroll.speedX = 0;
	            }
	            if (Math.abs($sprite.$scroll.speedY) > 1) {
	                $sprite.$scroll.speedY *= $sprite.scroll.smooth || 0.8;
	            } else {
	                $sprite.$scroll.speedY = 0;
	            }

	            if (Math.abs($sprite.$scroll.speedX) <= 1 && Math.abs($sprite.$scroll.speedY) <= 1) {
	                tickPool.splice(index, 1);
	                return;
	            }

	            $sprite.scroll.scrollY -= $sprite.$scroll.speedY;
	            $sprite.scroll.scrollX -= $sprite.$scroll.speedX;

	            var minScrollX = _utils2.default.funcOrValue($sprite.scroll.minScrollX, $sprite);
	            var maxScrollX = _utils2.default.funcOrValue($sprite.scroll.maxScrollX, $sprite);
	            var minScrollY = _utils2.default.funcOrValue($sprite.scroll.minScrollY, $sprite);
	            var maxScrollY = _utils2.default.funcOrValue($sprite.scroll.maxScrollY, $sprite);

	            if (!isNaN(minScrollY) && $sprite.scroll.scrollY < minScrollY) {
	                $sprite.scroll.scrollY = minScrollY;
	            } else if (!isNaN(maxScrollY) && $sprite.scroll.scrollY > maxScrollY) {
	                $sprite.scroll.scrollY = maxScrollY;
	            }

	            if (!isNaN(minScrollX) && $sprite.scroll.scrollX < minScrollX) {
	                $sprite.scroll.scrollX = minScrollX;
	            } else if (!isNaN(maxScrollX) && $sprite.scroll.scrollX > maxScrollX) {
	                $sprite.scroll.scrollX = maxScrollX;
	            }
	        });

	        scrollFuncs.tick();
	    },

	    touch: function touch($sprite, $e) {
	        if (!$sprite.scroll.scrollable) return false;

	        if (!scrolling) {
	            // start scroll
	            scrolling = +new Date();
	            startPos.x = $e.canvasX;
	            startPos.y = $e.canvasY;
	        } else {
	            if (tickPool.indexOf($sprite) === -1) {
	                tickPool.push($sprite);
	            }

	            var absX = Math.abs($e.canvasX - startPos.x);
	            var absY = Math.abs($e.canvasY - startPos.y);
	            var deltaTime = +new Date() - scrolling;
	            scrolling = +new Date();
	            deltaTime /= 10;
	            if (absX / deltaTime > 1 && deltaTime > 1) {
	                $sprite.$scroll.speedX += ($e.canvasX - startPos.x) / deltaTime;
	            }
	            if (absY / deltaTime > 1 && deltaTime > 1) {
	                $sprite.$scroll.speedY += ($e.canvasY - startPos.y) / deltaTime;
	            }

	            startPos.x = $e.canvasX;
	            startPos.y = $e.canvasY;

	            $e.event.preventDefault();
	            return true;
	        }
	    },

	    wheel: function wheel($sprite, $e) {
	        if (!$sprite.scroll.scrollable) return false;

	        if (tickPool.indexOf($sprite) === -1) {
	            tickPool.push($sprite);
	        }

	        $sprite.$scroll.speedX = $e.event.wheelDeltaX;
	        $sprite.$scroll.speedY = $e.event.wheelDeltaY;

	        $e.event.preventDefault();
	        return true;
	    }
	};

	module.exports = scrollFuncs;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Fix border to improve performance
	 *
	 * ********** **/

	module.exports = function ($canvas, props, imgWidth, imgHeight) {
	    // source
	    if (props.sx < 0 && props.sw) {
	        var cutRate = -props.sx / props.sw;
	        props.tx += props.tw * cutRate;
	        props.sx = 0;
	    }
	    if (props.sy < 0 && props.sh) {
	        var _cutRate = -props.sy / props.sh;
	        props.ty += props.th * _cutRate;
	        props.sy = 0;
	    }
	    if (imgWidth && props.sx + props.sw > imgWidth) {
	        var _cutRate2 = (props.sx + props.sw - imgWidth) / props.sw;
	        props.sw -= props.sw * _cutRate2;
	        props.tw -= props.tw * _cutRate2;
	    }
	    if (imgHeight && props.sy + props.sh > imgHeight) {
	        var _cutRate3 = (props.sy + props.sh - imgHeight) / props.sh;
	        props.sh -= props.sh * _cutRate3;
	        props.th -= props.th * _cutRate3;
	    }

	    // target
	    if (props.tx < 0 && props.tw > -props.tx) {
	        var _cutRate4 = -props.tx / props.tw;
	        props.sx += props.sw * _cutRate4;
	        props.sw -= props.sw * _cutRate4;
	        props.tw = props.tw + props.tx;
	        props.tx = 0;
	    }
	    if (props.ty < 0 && props.th > -props.ty) {
	        var _cutRate5 = -props.ty / props.th;
	        props.sy += props.sh * _cutRate5;
	        props.sh -= props.sh * _cutRate5;
	        props.th = props.th + props.ty;
	        props.ty = 0;
	    }
	    if (props.tx + props.tw > $canvas.width && props.tw) {
	        var _cutRate6 = (props.tx + props.tw - $canvas.width) / props.tw;
	        props.tw -= props.tw * _cutRate6;
	        props.sw -= props.sw * _cutRate6;
	    }
	    if (props.ty + props.th > $canvas.height && props.th) {
	        var _cutRate7 = (props.ty + props.th - $canvas.height) / props.th;
	        props.th -= props.th * _cutRate7;
	        props.sh -= props.sh * _cutRate7;
	    }
	};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function ($canvas, children, part) {
	    if (children) {
	        children.filter(function (item) {
	            var zIndex = _utils2.default.funcOrValue(item.style.zIndex, item);
	            if (part < 0) {
	                return zIndex < 0;
	            }
	            return zIndex >= 0;
	        }).sort(function (a, b) {
	            var za = _utils2.default.funcOrValue(a.style.zIndex, a);
	            var zb = _utils2.default.funcOrValue(b.style.zIndex, b);
	            if (za === zb) return 0;
	            return za > zb ? 1 : -1;
	        }).forEach(function (c, _index) {
	            $canvas.$perPaint.call($canvas, c, _index);
	        });
	    }
	}; /** ********** *
	    *
	    * Send children to be painted
	    * - Children will be rendered above the parent, if zIndex >= 0
	    * - Even the same zIndex, chilren will be render in differrent orders
	    *   in different environments, like Chrome and PhantomJs.
	    *
	    * ********** **/

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(3);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// const inBrowser = typeof window !== 'undefined';

	/** ********** *
	 *
	 * Get computed style of a sprite
	 * - Returns a COPY of current props.
	 * - Used in perPaint.js ONLY.
	 * - May waste some performance, but not much.
	 * - TODO: performace improving.
	 *
	 * ********** **/

	module.exports = function ($sprite, $canvas) {
	    var _props = {};

	    for (var i in $sprite.content) {
	        _props[i] = _utils2.default.funcOrValue($sprite.content[i], $sprite);
	    }

	    // 正常情况下，add阶段会进行string2object的转换
	    // 此处是防止动态修改了某个img为string
	    if (typeof _props.img === 'string') {
	        _props.img = $sprite.content.img = $canvas.imgLoader(_props.img);
	    }

	    for (var _i in $sprite.style) {
	        _props[_i] = $sprite.getStyle(_i);
	    }
	    $sprite.inherit.forEach(function (i) {
	        _props[i] = $sprite.getStyle(i);
	    });

	    // Maybe a plgin is better ?
	    // @interval 可以是function，其它的必须常量
	    if (_props.sequence) {
	        var _img = _props.img;
	        var config = _props.sequence;

	        // 确立index
	        _props.sequence.index = _props.sequence.index || 0;
	        var index = _props.sequence.index || 0;
	        if (index < 0) index = 0;

	        // 计算每帧的宽高
	        var pw = void 0,
	            ph = void 0;
	        if (config.w || config.h) {
	            if (config.w < 0) {
	                pw = _img.width / (0 - config.w);
	            } else if (config.w > 0) {
	                pw = config.w;
	            } else {
	                pw = _img.width;
	            }
	            if (config.h < 0) {
	                ph = _img.height / (0 - config.h);
	            } else if (config.h > 0) {
	                ph = config.h;
	            } else {
	                ph = _img.height;
	            }

	            var wTimes = Math.floor(_img.width / pw);
	            var hTimes = Math.floor(_img.height / ph);

	            _props.sx = index % wTimes * pw;
	            _props.sy = Math.floor(index / wTimes) % hTimes * ph;
	        }

	        // 不循环的精灵动画自动移除
	        if (!config.loop && index > 0 && _props.sx === 0 && _props.sy === 0) {
	            _props.img = undefined;
	            if (config.onOver) {
	                config.onOver.call($sprite);
	            } else {
	                $sprite.remove();
	            }
	        }

	        // 判断是否应该下一帧
	        _props.sequence.lastTickTime = _props.sequence.lastTickTime || 0;
	        if ($canvas.$nextTickTime - _props.sequence.lastTickTime >= _utils2.default.funcOrValue(_props.sequence.interval, $sprite)) {
	            config.lastTickTime = $canvas.$nextTickTime;
	            _props.sequence.index++;
	            _props.sequence.lastTickTime = $canvas.$nextTickTime;
	        }

	        // 默认的读取和绘制尺寸等于每帧尺寸
	        _props.sw = _props.sw || pw;
	        _props.sh = _props.sh || ph;
	        _props.tw = _props.tw || pw;
	        _props.th = _props.th || ph;
	    }

	    return _props;
	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _img2base = __webpack_require__(6);

	var _img2base2 = _interopRequireDefault(_img2base);

	var _constants = __webpack_require__(3);

	var _constants2 = _interopRequireDefault(_constants);

	var _perPaintGetComputedStyle = __webpack_require__(36);

	var _perPaintGetComputedStyle2 = _interopRequireDefault(_perPaintGetComputedStyle);

	var _perPaintCutOutside = __webpack_require__(34);

	var _perPaintCutOutside2 = _interopRequireDefault(_perPaintCutOutside);

	var _perPaintDeliverChildren = __webpack_require__(35);

	var _perPaintDeliverChildren2 = _interopRequireDefault(_perPaintDeliverChildren);

	var _math = __webpack_require__(11);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var blend = _utils2.default.blend; /** ********** *
	                                    *
	                                    * CORE painting function
	                                    * - Calculates props of every sprite in children, then puts to $children.
	                                    * - Includes optimization.
	                                    * - NOT connecting to canvas's prototype functions.
	                                    *
	                                    * ********** **/

	var isChineseChar = function isChineseChar(temp) {
	    var re = /[^\u4e00-\u9fa5]/;
	    return !re.test(temp);
	};

	var extend = function extend() {
	    var _this = this;

	    this.$canvas.$extendList.forEach(function (plugin) {
	        if (plugin.onPaint) {
	            plugin.onPaint.call(_this);
	        }
	    });
	};

	module.exports = function (i, index) {
	    i.$rendered = false;

	    if (_utils2.default.funcOrValue(i.style.visible, i) === false) {
	        _utils2.default.execFuncs(i.hooks.beforeTick, i, i.$tickedTimes);
	        _utils2.default.execFuncs(i.hooks.ticked, i, ++i.$tickedTimes);
	        return;
	    }

	    _utils2.default.execFuncs(i.hooks.beforeTick, i, i.$tickedTimes);

	    var $canvas = this;

	    extend.call(i);

	    var _props = (0, _perPaintGetComputedStyle2.default)(i, $canvas);

	    var settings = {
	        globalAlpha: _utils2.default.firstValuable(_props.opacity, 1)
	    };

	    var _text = _props.text;
	    var _img = _props.img;

	    var _children = _utils2.default.funcOrValue(i.children, i);

	    var _imgWidth = _img ? _img.width || 0 : 0;
	    var _imgHeight = _img ? _img.height || 0 : 0;

	    _props.tw = _props.tw || _props.sw || _imgWidth;
	    _props.th = _props.th || _props.sh || _imgHeight;
	    _props.sw = _props.sw || _imgWidth;
	    _props.sh = _props.sh || _imgHeight;

	    if (_props.locate === 'lt') {
	        // _props.tx = _props.tx;
	        // _props.ty = _props.ty;
	    } else if (_props.locate === 'ld') {
	        // _props.tx = _props.tx;
	        _props.ty -= _props.th;
	    } else if (_props.locate === 'rt') {
	        _props.tx -= _props.tw;
	        // _props.ty = _props.ty;
	    } else if (_props.locate === 'rd') {
	        _props.tx -= _props.tw;
	        _props.ty -= _props.th;
	    } else {
	        // center
	        _props.tx -= _props.tw >> 1;
	        _props.ty -= _props.th >> 1;
	    }

	    if (_props.fh || _props.fv) {
	        _props.fh = _props.fh || 0;
	        _props.fv = _props.fv || 0;
	        _props.fx = _props.fx || 0;
	        _props.fy = _props.fy || 0;
	        settings.transform = {
	            fh: _props.fh,
	            fv: _props.fv,
	            fx: -(_props.ty + (_props.th >> 1)) * _props.fv + _props.fx,
	            fy: -(_props.tx + (_props.tw >> 1)) * _props.fh + _props.fy
	        };
	    }

	    if (_props.blend) {
	        if (typeof _props.blend === 'string') {
	            settings.globalCompositeOperation = _props.blend;
	        } else {
	            settings.globalCompositeOperation = blend[_props.blend];
	        }
	    }

	    if (_props.rotate) {
	        // 定点旋转
	        var transX = _utils2.default.firstValuable(_props.rx, _props.tx + 0.5 * _props.tw);
	        var transY = _utils2.default.firstValuable(_props.ry, _props.ty + 0.5 * _props.th);
	        settings.beforeRotate = [transX, transY];
	        settings.rotate = -_props.rotate * Math.PI / 180;
	        settings.rotate = Number(settings.rotate.toFixed(4));
	        settings.afterRotate = [-transX, -transY];
	    }

	    if (_props.scale !== 1) {
	        var scale = _props.scale;
	        _props.tx -= (scale - 1) * _props.tw >> 1;
	        _props.ty -= (scale - 1) * _props.th >> 1;
	        _props.tw *= scale;
	        _props.th *= scale;
	    }

	    if (_props.mirrX) {
	        settings.translate = [$canvas.width, 0];
	        settings.scale = [-1, 1];
	        _props.tx = $canvas.width - _props.tx - _props.tw;
	        if (_props.mirrY) {
	            settings.translate = [$canvas.width, $canvas.height];
	            settings.scale = [-1, -1];
	            _props.ty = $canvas.height - _props.ty - _props.th;
	        }
	    } else if (_props.mirrY) {
	        settings.translate = [0, $canvas.height];
	        settings.scale = [1, -1];
	        _props.ty = $canvas.height - _props.ty - _props.th;
	    }

	    /*
	     * 性能浪费检测
	     * 拿到最大的“绘制/源尺寸”比值，如果这个值过低，那么显然存在资源浪费
	     * 由于对象可能处于动画中，因此选用最大的绘制比
	     */
	    if (false) {
	        if (_imgWidth && _imgHeight && _props.sw && _props.sh) {
	            var paintRate = _props.tw * _props.th / (_props.sw * _props.sh);
	            if (!i.$perf.paintRate || paintRate > i.$perf.paintRate) {
	                i.$perf.paintRate = paintRate;
	                // i.$perf.paintProps = JSON.stringify(_props);
	            }
	        }
	    }

	    // ['tx', 'ty', 'tw', 'th', 'rotate', 'rx', 'ry'].forEach((key) => {
	    //     i.$cache[key] = _props[key];
	    // });
	    // for (let key in _props) {
	    //     i.$cache[key] = _props[key];
	    // }

	    /* Avoid overflow painting (wasting & causing bugs in some iOS webview) */
	    // 判断sw、sh是否存在只是从计算上防止js报错，其实上游决定了参数一定存在
	    if (!_props.rotate && !_text && _imgWidth && _img.src) {
	        (0, _perPaintCutOutside2.default)($canvas, _props, _imgWidth, _imgHeight);
	    }

	    if (_imgWidth > 10 && _imgHeight > 10) {
	        // 太小的图不取整，以免“高1像素的图，在sx和sw均为0.5的情况下渲染不出来”
	        _constants2.default.xywh.forEach(function (key) {
	            _props[key] = Math.round(_props[key]);
	            // _props[key] >>= 0;
	        });
	    }

	    // if (process.env.NODE_ENV !== 'production') {
	    //     if (!i.$cache.base64 && _img && _img.src) {
	    //         i.$cache.base64 = 'processing';
	    //         img2base64(_img.src, function (data) {
	    //             i.$cache.base64 = data;
	    //         });
	    //     }
	    // }

	    (0, _perPaintDeliverChildren2.default)($canvas, _children, -1);

	    if (_img && _imgWidth && _props.opacity !== 0 && _props.sw && _props.sh) {
	        if ((0, _math2.default)(_props.tx, _props.ty, _props.tw, _props.th, 0, 0, $canvas.width, $canvas.height, settings.beforeRotate && settings.beforeRotate[0], settings.beforeRotate && settings.beforeRotate[1], _props.rotate)) {
	            i.$rendered = true;

	            var $paintSprite = {
	                $id: i.$id,
	                type: 'img',
	                settings: settings,
	                props: [_img, _props.sx, _props.sy, _props.sw, _props.sh, _props.tx, _props.ty, _props.tw, _props.th]
	            };

	            // if (process.env.NODE_ENV !== 'production') {
	            //     // 开发环境下，将元素挂载到$children里以供标记
	            $paintSprite.$origin = i;
	            // };

	            $canvas.$children.push($paintSprite);
	        }
	    }

	    // TODO: rewrite
	    if (_text) {
	        i.$rendered = true;

	        var textTx = _props.tx;
	        var textTy = _props.ty;
	        var textAlign = _props.align || _props.textAlign || 'left';
	        var textFont = _props.textFont || '14px Arial';
	        var textFontsize = parseInt(textFont);
	        var textLineHeight = _props.lineHeight || textFontsize;

	        // Change css-align to canvas-align style
	        if (textAlign === 'center') {
	            textTx += _props.tw / 2;
	        } else if (textAlign === 'right') {
	            textTx += _props.tw;
	        }

	        // Change css-align to canvas-align style
	        if (_props.textVerticalAlign === 'top') {
	            textTy += textFontsize + (textLineHeight - textFontsize) / 2;
	        } else if (_props.textVerticalAlign === 'bottom') {
	            textTy += _props.th - (textLineHeight - textFontsize) / 2;
	        } else if (_props.textVerticalAlign === 'middle') {
	            textTy += _props.th / 2 + textFontsize / 2;
	        }

	        if (typeof _text === 'string' || typeof _text === 'number') {
	            $canvas.$children.push({
	                $id: i.$id,
	                type: 'text',
	                settings: settings,
	                props: {
	                    tx: textTx,
	                    ty: textTy,
	                    content: String(_text),
	                    align: textAlign,
	                    font: textFont,
	                    color: _props.color,
	                    type: _props.textType
	                }
	            });
	        } else if (_text.length) {
	            _text.forEach(function (t) {
	                $canvas.$children.push({
	                    $id: i.$id,
	                    type: 'text',
	                    settings: settings,
	                    props: {
	                        tx: textTx + _utils2.default.funcOrValue(t.tx, i),
	                        ty: textTy + _utils2.default.funcOrValue(t.ty, i),
	                        content: _utils2.default.funcOrValue(t.content, i),
	                        align: textAlign,
	                        font: textFont,
	                        color: _props.color,
	                        type: _props.textType
	                    }
	                });
	            });
	        } else if (_text.type === 'multline-text') {
	            var textArr = _text.text.split(/\t|\n/);
	            var renderArr = [];
	            textArr.forEach(function (eachText, textIndex) {
	                eachText = String.prototype.trim.apply(eachText);
	                if (_text.config.start) {
	                    eachText = eachText.replace(_text.config.start, '');
	                }
	                var _i = 0;
	                var length = _props.tw;
	                while (eachText.length && _i < eachText.length) {
	                    if (length <= 0) {
	                        length = _props.tw;
	                        renderArr.push(eachText.substr(0, _i));
	                        eachText = eachText.substr(_i);
	                        _i = 0;
	                    }
	                    _i++;
	                    length -= textFontsize * (isChineseChar(eachText[_i]) ? 1.05 : 0.6);
	                }
	                if (eachText || textIndex) {
	                    renderArr.push(eachText);
	                }
	            });
	            renderArr.forEach(function (r) {
	                $canvas.$children.push({
	                    $id: i.$id,
	                    type: 'text',
	                    settings: settings,
	                    props: {
	                        tx: textTx,
	                        ty: textTy,
	                        // tw: _props.tw,
	                        // th: _props.th,
	                        content: r,
	                        align: textAlign,
	                        font: textFont,
	                        color: _props.color,
	                        type: _props.textType
	                    }
	                });
	                textTy += textLineHeight || textFontsize;
	            });
	            // Record last line of this text
	        }
	    }

	    if (!_img && !_text) {
	        i.$rendered = undefined;
	    }

	    (0, _perPaintDeliverChildren2.default)($canvas, _children, 1);

	    _utils2.default.execFuncs(i.hooks.ticked, i, ++i.$tickedTimes);
	};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _tick = __webpack_require__(12);

	var _tick2 = _interopRequireDefault(_tick);

	var _transition = __webpack_require__(25);

	var _transition2 = _interopRequireDefault(_transition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Execute function(@f) in each frame
	 * - Limit by browsers, adjusting the time not being a multiple of RAF's interval (16.7ms).
	 * - See https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
	 *
	 * ********** **/

	module.exports = function (f) {
	    var time = Date.now();
	    _transition2.default.$lastPaintTime = this.$nextTickTime = time;

	    // calculating fps
	    if (time - this.fpsCalculateTime >= 1000) {
	        this.fpsCalculateTime = time;
	        if (this.fpsHandler) {
	            this.fpsHandler.call(this, this.fps);
	        }
	        this.lastFps = this.fps;
	        this.fps = 0;
	    }

	    (0, _tick2.default)(function (rafTime) {
	        this.$rafTime = rafTime;
	        this.$rAFer(f);
	        if (this.maxFps > 0 && this.maxFps < 60) {
	            if (time - this.$lastPaintTime <= 1000 / this.maxFps) {
	                return;
	            }

	            // 让$lastPaintTime不带有小尾巴（101，199，202，298这种变成100，200，300，400）
	            // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
	            this.$lastPaintTime = time - (time - this.$lastPaintTime) % (1000 / this.maxFps);
	        } else {
	            this.$lastPaintTime = Date.now();
	        }
	        f();
	    }.bind(this));
	};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var extend = function extend($sprite, settings) {
	    var _this = this;

	    var stopDefault = false;

	    this.$extendList.forEach(function (plugin) {
	        if (plugin.onRender) {
	            var res = plugin.onRender.call(_this, $sprite, settings);
	            if (res) {
	                stopDefault = res;
	            }
	        }
	    });

	    return stopDefault;
	}; /** ********** *
	    *
	    * CORE painting function
	    * - Controlling canvas context, Transfer $children to rendered sprite.
	    * - Includes some optimization.
	    *
	    * ********** **/

	var render = function render($sprite, i) {
	    var $canvas = this;

	    /*
	        props(Array)
	        @0    image/canvas Object
	        @1~4  source x, y, w, h
	        @5~8  target x, y, w, h
	    */
	    var props = $sprite.props;

	    /*
	        Jump useless paintings, by calculating border size
	    */
	    var isUseless = false;
	    if ($sprite.type === 'img') {
	        // 当前图层不太小的时候，判断是否可以跳过绘制
	        var currentImgSize = props[7] * props[8];
	        var $children = $canvas.$children;
	        if (currentImgSize > 200 * 200) {
	            for (var j = $children.length - 1; j > i; j--) {
	                var $tmpSprite = $children[j];

	                if ($tmpSprite.$cannotCover) {
	                    // 被判断为不能遮挡当前绘制的直接跳过
	                    continue;
	                }

	                var tmpProps = $tmpSprite.props;

	                if (!tmpProps || !tmpProps[0]) {
	                    // 不是图片
	                    $tmpSprite.$cannotCover = true;
	                    continue;
	                }

	                if (tmpProps[7] * tmpProps[8] < currentImgSize) {
	                    // 太小的图片不认为可以遮挡当前图片，不能跳过当前图片的绘制
	                    // 只是对于当前图片来说cannotCover，对其它图片有可能，所以不设置$cannotCover
	                    continue;
	                }

	                if (!tmpProps[0].$noAlpha) {
	                    // 带alpha通道的图片不会遮挡当前图片，不能跳过当前图片的绘制
	                    $tmpSprite.$cannotCover = true;
	                    continue;
	                }

	                var tmpSpriteSettings = $tmpSprite.settings;

	                // 带rotate的元素暂时不考虑，需要复杂的计算
	                if (tmpSpriteSettings.globalAlpha !== 1 || tmpSpriteSettings.globalCompositeOperation || tmpSpriteSettings.rotate) {
	                    $tmpSprite.$cannotCover = true;
	                    continue;
	                }

	                if (_utils2.default.pointInRect(props[5], props[6], tmpProps[5], tmpProps[5] + tmpProps[7], tmpProps[6], tmpProps[6] + tmpProps[8]) && _utils2.default.pointInRect(props[5] + props[7], props[6] + props[8], tmpProps[5], tmpProps[5] + tmpProps[7], tmpProps[6], tmpProps[6] + tmpProps[8])) {
	                    if (false) {
	                        $sprite.$origin.$useless = true;
	                        $canvas.$plugin.jumpRender($canvas, props);
	                    }

	                    isUseless = true;
	                    // console.log('useless');

	                    return;
	                }
	            }
	        }
	        // } else if ($sprite.type === 'text') {
	        // 文本绘制消耗性能较少，毋需优化
	    }

	    if (false) {
	        if ($sprite.$origin) {
	            $sprite.$origin.$useless = false;
	        }
	    }
	    // console.log('useful');

	    var settings = $sprite.settings || {};

	    if (extend.call($canvas, $sprite, settings)) {
	        return;
	    }

	    /*
	        Rendering operation
	    */
	    var saved = false;
	    var cxt = $canvas.$paintContext;

	    if (settings.globalCompositeOperation) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.globalCompositeOperation = settings.globalCompositeOperation;
	    }

	    if (settings.globalAlpha !== 1 && !isNaN(settings.globalAlpha)) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.globalAlpha = settings.globalAlpha;
	    }

	    if (settings.translate) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.translate(settings.translate[0] || 0, settings.translate[1] || 0);
	    }

	    if (settings.rotate) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.translate(settings.beforeRotate[0] || 0, settings.beforeRotate[1] || 0);
	        cxt.rotate(settings.rotate || 0);
	        cxt.translate(settings.afterRotate[0] || 0, settings.afterRotate[1] || 0);
	    }

	    if (settings.scale) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.scale(settings.scale[0] || 1, settings.scale[1] || 1);
	    }

	    if (settings.transform) {
	        if (!saved) {
	            cxt.save();
	            saved = true;
	        }
	        cxt.transform(1, settings.transform.fh, settings.transform.fv, 1, settings.transform.fx, settings.transform.fy);
	    }

	    if ($sprite.type === 'img') {
	        cxt.drawImage(props[0], props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8]);
	        if (false) {
	            $canvas.$plugin.drawImage($canvas, props);
	        }
	    } else if ($sprite.type === 'text' && props.content) {
	        cxt.font = props.font;
	        cxt.fillStyle = cxt.strokeStyle = props.color || 'white';
	        cxt.textAlign = props.align;
	        cxt[props.type || 'fillText'](props.content, props.tx, props.ty);
	    }

	    if (saved) {
	        cxt.restore();
	    }
	};

	module.exports = function () {
	    var $canvas = this;

	    $canvas.$children.forEach(render.bind($canvas));
	};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _add = __webpack_require__(41);

	var _add2 = _interopRequireDefault(_add);

	var _remove = __webpack_require__(46);

	var _remove2 = _interopRequireDefault(_remove);

	var _start = __webpack_require__(49);

	var _start2 = _interopRequireDefault(_start);

	var _paint = __webpack_require__(43);

	var _paint2 = _interopRequireDefault(_paint);

	var _clear = __webpack_require__(42);

	var _clear2 = _interopRequireDefault(_clear);

	var _pause = __webpack_require__(44);

	var _pause2 = _interopRequireDefault(_pause);

	var _on = __webpack_require__(18);

	var _on2 = _interopRequireDefault(_on);

	var _off = __webpack_require__(17);

	var _off2 = _interopRequireDefault(_off);

	var _trigger = __webpack_require__(19);

	var _trigger2 = _interopRequireDefault(_trigger);

	var _broadcast = __webpack_require__(15);

	var _broadcast2 = _interopRequireDefault(_broadcast);

	var _nextTick = __webpack_require__(16);

	var _nextTick2 = _interopRequireDefault(_nextTick);

	var _register = __webpack_require__(45);

	var _register2 = _interopRequireDefault(_register);

	var _setFpsHandler = __webpack_require__(47);

	var _setFpsHandler2 = _interopRequireDefault(_setFpsHandler);

	var _setMaxFps = __webpack_require__(48);

	var _setMaxFps2 = _interopRequireDefault(_setMaxFps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Inner apis of an easycanvas instance
	 * - Used for Easycanvas.js and the outsides.
	 * - Will be added to Easycanvas instance's prototype.
	 *
	 * ********** **/

	var apiOuter = {
	    start: _start2.default,
	    paint: _paint2.default,
	    add: _add2.default,
	    remove: _remove2.default,
	    register: _register2.default,
	    clear: _clear2.default,
	    setFpsHandler: _setFpsHandler2.default,
	    setMaxFps: _setMaxFps2.default,
	    pause: _pause2.default,
	    on: _on2.default,
	    off: _off2.default,
	    trigger: _trigger2.default,
	    broadcast: _broadcast2.default,
	    nextTick: _nextTick2.default
	};

	module.exports = apiOuter;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _sprite = __webpack_require__(13);

	var _sprite2 = _interopRequireDefault(_sprite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _sprite2.default.prototype.add; /** ********** *
	                                                  *
	                                                  * Add a child to instance or sprite
	                                                  * - If @item is not a Sprite, this will create a new sprite first.
	                                                  * - Using $id to judge whether @item is a instance of Sprite.
	                                                  *
	                                                  * ********** **/

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Clear children
	 *
	 * ********** **/

	module.exports = function () {
	  this.children = [];
	  // this.children.splice(0);
	};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	    if (this.$pausing || this.$inBrowser && document.hidden) return;

	    var $canvas = this;

	    _utils2.default.execFuncs($canvas.hooks.beforeTick, $canvas, [$canvas.$rafTime]);

	    if ($canvas.$paintContext.clearRect) {
	        // $canvas.$paintContext.clearRect(0, 0, this.width, this.height);
	    }

	    if (!$canvas.$freezing) {
	        $canvas.$children = [];

	        if (false) {
	            $canvas.$plugin.timeCollect($canvas, 'preprocessTimeSpend', 'START');
	        }

	        this.children.sort(function (a, b) {
	            var za = _utils2.default.funcOrValue(a.style.zIndex, a);
	            var zb = _utils2.default.funcOrValue(b.style.zIndex, b);
	            if (za === zb) return 0;
	            return za > zb ? 1 : -1;
	        }).forEach(function (perItem, index) {
	            $canvas.$perPaint(perItem, index);
	        });

	        if (false) {
	            $canvas.$plugin.timeCollect($canvas, 'preprocessTimeSpend', 'END');
	        }
	    }

	    if (false) {
	        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'START');
	    }

	    $canvas.$render();

	    if (false) {
	        $canvas.$plugin.timeCollect($canvas, 'paintTimeSpend', 'END');
	    }

	    this.fps++;

	    _utils2.default.execFuncs($canvas.hooks.ticked, $canvas, [$canvas.$rafTime]);

	    if ($canvas.hooks.nextTick) {
	        _utils2.default.execFuncs($canvas.hooks.nextTick, $canvas, [$canvas.$rafTime]);
	        delete $canvas.hooks.nextTick;
	    }
	}; /** ********** *
	    *
	    * Sort the sprite and call inner functions
	    * - Will be called in each frame after the 'start' function called.
	    *
	    * ********** **/

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Stop painting in paint function.
	 *
	 * ********** **/

	module.exports = function (val) {
	  this.$pausing = val === undefined ? true : val;
	};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _eventHandlerScroll = __webpack_require__(33);

	var _eventHandlerScroll2 = _interopRequireDefault(_eventHandlerScroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var extend = function extend(opt) {
	    var _this = this;

	    this.$extendList.forEach(function (plugin) {
	        if (plugin.onCreate) {
	            plugin.onCreate.call(_this, opt);
	        }
	    });
	}; /** ********** *
	    *
	    * Create an Easycanvas instance on current dom
	    * - Start the 'hold' event judging interval(may includes a memory waste after destroyed).
	    *
	    * ********** **/

	module.exports = function (dom, option) {
	    var _this2 = this;

	    if (false) {
	        this.fpsHandler = this.fpsHandler || function (fps) {
	            if (this.maxFps > 0 && fps < this.maxFps - 5 && fps < 40) {
	                console.warn('[Easycanvas] Low FPS detected (' + fps + '/' + this.maxFps + ').');
	            }
	        };
	    }

	    var _option = option || {};

	    dom = this.$dom = dom || this.$dom;

	    for (var i in _option) {
	        this[i] = _option[i];
	    }

	    this.name = _option.name || dom.id || dom.classList && dom.classList[0] || 'Unnamed';
	    this.$inBrowser = typeof window !== 'undefined';

	    if (_option.fullScreen && typeof document !== 'undefined') {
	        dom.width = dom.style.width = document.body.clientWidth || document.documentElement.clientWidth;
	        dom.height = dom.style.height = document.body.clientHeight || document.documentElement.clientHeight;
	    }

	    if (false) {
	        if (_option.width && dom.attributes.width && _option.width !== dom.width || _option.height && dom.attributes.height && _option.height !== dom.height) {
	            console.warn('[Easycanvas] Canvas size mismatched in "register" function.');
	        }
	    }

	    dom.width = this.width = this.width || _option.width || dom.width;
	    dom.height = this.height = this.height || _option.height || dom.height;

	    if (false) {
	        this.$plugin.register(this);
	    }

	    this.events = _option.events || {};

	    this.hooks = _option.hooks || {};

	    if (this.$inBrowser) {
	        var eventList = ['contextmenu', 'mousewheel', 'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove'];
	        eventList.forEach(function (e) {
	            dom.addEventListener(e, _this2.$eventHandler.bind(_this2));
	        });

	        _eventHandlerScroll2.default.tick();
	    }

	    if (false) {
	        if (this.$paintContext) {
	            console.error('[Easycanvas] Current instance is already registered.');
	        }
	    }

	    extend.call(this, _option);

	    this.$paintContext = this.$paintContext || dom.getContext('2d');

	    return this;
	};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function ($sprite, sync) {
	    var _this = this;

	    _utils2.default.execFuncs($sprite.hooks.beforeRemove, $sprite, $sprite.$tickedTimes++);

	    $sprite.style.visible = false;
	    $sprite.$removing = true;

	    setTimeout(function () {
	        if ($sprite.$parent) {
	            $sprite.$parent.children = $sprite.$parent.children.filter(function (c) {
	                return c.$removing !== true;
	            });
	        } else {
	            _this.children = _this.children.filter(function (c) {
	                return c.$removing !== true;
	            });
	        }

	        if ($sprite.$canvas) {
	            $sprite.$canvas = undefined;
	            $sprite.$parent = undefined;
	            $sprite.$tickedTimes = undefined;
	            $sprite.$cache = undefined;
	            $sprite.$rendered = false;
	            if (false) {
	                $sprite.$perf = undefined;
	            }
	            _utils2.default.execFuncs($sprite.hooks.removed, $sprite, $sprite.$tickedTimes);
	        }
	    });

	    if (sync) {
	        this.children.splice(this.children.indexOf($sprite), 1);
	    }
	}; /** ********** *
	    *
	    * Remove a sprite (async)
	    * - In develop mode, fps will throw warnings in low performance.
	    *
	    * ********** **/

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Set fps handler
	 * - Same to new Easycanvas.painter().fpsHandler = callback
	 *
	 * ********** **/

	module.exports = function (callback) {
	  this.fpsHandler = callback;
	};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	"use strict";

	/** ********** *
	 *
	 * Set max fps
	 * - @fps -1 means Infinity
	 *
	 * ********** **/

	module.exports = function (fps) {
	  this.maxFps = fps || -1;
	};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	'use strict';

	/** ********** *
	 *
	 * Start rAF loop
	 * - Cannot called twice on same instance
	 *
	 * ********** **/

	module.exports = function () {
	    var _this = this;

	    this.fpsCalculateTime = Date.now();
	    this.$rAFer(this.paint.bind(this));

	    setInterval(function () {
	        if (_this.eHoldingFlag) {
	            var e = _this.eHoldingFlag;
	            _this.$eventHandler.call(_this, {
	                layerX: e.layerX,
	                layerY: e.layerY,
	                screenX: e.screenX || e.layerX,
	                screenY: e.screenY || e.layerY,
	                type: 'hold'
	            });
	        }
	    }, 40); // TODO

	    return this;
	};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _constants = __webpack_require__(3);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Plugined to each canvas instance
	 * - Will add a 'mask' sprite to show the active sprite.
	 * - Only works in develop mode.
	 * - The handlers are in /plugin/panel/index.js file.
	 *
	 * ********** **/

	module.exports = function () {
	    if (false) {
	        var TO_PANEL_EVENT_NAME = '__EASYCANVAS_BRIDGE_TOPANEL__';

	        // 不再通过事件来监听了devTool了，直接从devTool来inspectedWindow.eval
	        // window.document.addEventListener('__EASYCANVAS_BRIDGE_TODOC__', function (recieveData) {
	        //     let data = recieveData.detail;

	        //     if (data.action = 'code') {
	        //         // console.log(data.content);
	        //         eval(data.content);
	        //     }
	        // });

	        var $emit = function $emit(passData) {
	            passData.tabId = window[_constants2.default.devFlag].tabId;

	            window.document.dispatchEvent(new CustomEvent(TO_PANEL_EVENT_NAME, {
	                //  filtering special types
	                detail: JSON.parse(JSON.stringify(passData))
	                // bubbles: true,
	                // cancelable: true
	            }));
	        };

	        setTimeout(function () {
	            $emit({
	                name: 'init'
	            });
	        });

	        var MaskCanvasBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2OYePb/fwAHrQNdl+exzgAAAABJRU5ErkJggg==';

	        var $selectMask = null;

	        var PerSecondCollects = ['paintArea', 'paintTimes', 'paintTimeSpend', 'preprocessTimeSpend', 'loadArea', 'jumpArea'];

	        var ApiPlugin = {
	            drawImage: function drawImage($canvas, _props) {
	                if (!window[_constants2.default.devFlag].isPaintRecording) return;

	                if (_props) {
	                    $canvas.$perf.$paintArea += _props[7] * _props[8];
	                    $canvas.$perf.$loadArea += _props[3] * _props[4];
	                }

	                $canvas.$perf.$paintTimes++;
	            },
	            jumpRender: function jumpRender($canvas, _props) {
	                $canvas.$perf.$jumpArea += _props[7] * _props[8];
	            },
	            register: function register($canvas) {
	                $canvas.$id = Math.random().toString(36).substr(2);

	                // 性能打点
	                // 带$是临时值，否则为每秒的快照值；临时值每秒快照一次
	                // 因此开发工具只需要使用快照进行分析即可
	                $canvas.$perf = {};
	                PerSecondCollects.forEach(function (key) {
	                    $canvas.$perf[key] = 0;
	                    $canvas.$perf['$' + key] = 0;
	                });

	                setInterval(function () {
	                    PerSecondCollects.forEach(function (key) {
	                        $canvas.$perf[key] = $canvas.$perf['$' + key];
	                        $canvas.$perf['$' + key] = 0;
	                    });
	                }, 1000);

	                if (!$canvas.$flags.devtoolHanged) {
	                    window[_constants2.default.devFlag].$canvas[$canvas.$id] = $canvas;
	                    $canvas.$flags.devtoolHanged = true;
	                }
	            },
	            timeCollect: function timeCollect($canvas, type, startOrEnd) {
	                // START与END必须在同一个event loop中，且位于相同的微任务队列中
	                // 否则会影响指标收集
	                $canvas.$perf['$' + type] += (startOrEnd === 'START' || startOrEnd === 'PAUSE' ? -1 : 1) * Date.now();
	            },
	            selectSprite: function selectSprite(isChoosing, $canvas, $sprite) {
	                if (!$sprite || !window[_constants2.default.devFlag].selectMode) {
	                    ApiPlugin.cancelSelectSprite($canvas);
	                    return false;
	                }

	                if (!$selectMask) {
	                    $selectMask = $canvas.add({
	                        name: _constants2.default.devFlag,
	                        content: {
	                            img: $canvas.imgLoader(MaskCanvasBase64)
	                        },
	                        style: {},
	                        webgl: undefined
	                    });
	                }

	                ['tx', 'ty', 'rotate', 'rx', 'ry', 'scale', 'tw', 'th', 'locate'].forEach(function (key) {
	                    (function (_key) {
	                        $selectMask.style[_key] = function () {
	                            if (_key === 'tw' || _key === 'th') {
	                                return $sprite.getStyle(_key) || $sprite.getRect()[_key];
	                            }
	                            return $sprite.getStyle(_key);
	                        };
	                    })(key);
	                });
	                // window.$selectMask = $selectMask;

	                // mask of webgl
	                $selectMask.webgl = $sprite.webgl ? {} : undefined;
	                if ($selectMask.webgl) {
	                    for (var key in $sprite.webgl) {
	                        (function (_key) {
	                            $selectMask.webgl[_key] = function () {
	                                if (typeof $sprite.webgl[_key] === 'function') {
	                                    return $sprite.webgl[_key].call($sprite);
	                                }
	                                return $sprite.webgl[_key];
	                            };
	                        })(key);
	                    }
	                    $selectMask.webgl.img = $canvas.imgLoader(MaskCanvasBase64);
	                    delete $selectMask.webgl.colors;

	                    // disable DEPTH_TEST
	                    // 否则会被$sprite完美遮挡，就看不到了
	                    $selectMask.webgl.hasAlpha = true;
	                }

	                $selectMask.style.zIndex = Number.MAX_SAFE_INTEGER;
	                $selectMask.style.visible = function () {
	                    return window[_constants2.default.devFlag].selectMode;
	                };
	                $selectMask.style.opacity = 0.8;

	                if (isChoosing) {
	                    $canvas.remove($selectMask);
	                    $selectMask = null;
	                    $emit({
	                        name: 'selectSprite',
	                        id: $canvas.$id,
	                        value: {
	                            sprite: $sprite.$id,
	                            canvas: $canvas.$id
	                        }
	                    });
	                    window[_constants2.default.devFlag].current = {
	                        $sprite: $sprite,
	                        $canvas: $canvas
	                    };
	                    window[_constants2.default.devFlag].selectMode = false;
	                }

	                return true;
	            },
	            cancelSelectSprite: function cancelSelectSprite($canvas) {
	                if (!$selectMask) return;

	                $canvas.remove($selectMask);
	                $selectMask = null;
	            }
	        };

	        return ApiPlugin;
	    }
	};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _apiOuter = __webpack_require__(40);

	var _apiOuter2 = _interopRequireDefault(_apiOuter);

	var _apiInner = __webpack_require__(31);

	var _apiInner2 = _interopRequireDefault(_apiInner);

	var _prototype = __webpack_require__(52);

	var _prototype2 = _interopRequireDefault(_prototype);

	var _imgLoader = __webpack_require__(9);

	var _imgLoader2 = _interopRequireDefault(_imgLoader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** ********** *
	 *
	 * Exports an Easycanvas Prototype
	 * - Merge apis to its prototypes.
	 *
	 * ********** **/

	var painter = function painter(config) {
	    this.imgLoader = _imgLoader2.default;

	    for (var i in _prototype2.default) {
	        // Avoid muti instances from sharing data
	        this[i] = this[i] || JSON.parse(JSON.stringify(_prototype2.default[i]));
	    }

	    if (!config) {
	        return;
	    }

	    if (!config.el) {
	        config = {
	            el: config
	        };
	    }

	    if (config.el) {
	        this.register(typeof config.el === 'string' ? document.querySelector(config.el) : config.el, config);
	    }
	};

	painter.prototype.$extendList = [];

	for (var i in _apiInner2.default) {
	    if (Object.prototype.hasOwnProperty.call(_apiInner2.default, i)) {
	        painter.prototype[i] = _apiInner2.default[i];
	    }
	}

	for (var _i in _apiOuter2.default) {
	    if (Object.prototype.hasOwnProperty.call(_apiOuter2.default, _i)) {
	        painter.prototype[_i] = _apiOuter2.default[_i];
	    }
	}

	module.exports = painter;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	'use strict';

	/** ********** *
	 *
	 * Prototype of canvas instance
	 * - In develop mode, fps will throw warnings in low performance.
	 *
	 * ********** **/

	var PROTOS = {
	    $dom: null,
	    $paintContext: null,
	    $nextTickTime: 0,
	    $lastPaintTime: 0, // 只有当maxFps位于1～59时才不为0
	    $pausing: false,
	    $freezing: false,

	    name: '',
	    fps: 0,
	    lastFps: 0,
	    fpsCalculateTime: 0,
	    fpsHandler: null,
	    width: 0,
	    height: 0,
	    events: {
	        click: null
	    },
	    children: [],
	    eHoldingFlag: false,
	    eLastMouseHover: null,

	    maxFps: -1,

	    /* optimise */
	    // optimiser: {
	    //     blockSize: 100,
	    //     cacheMap: {},
	    // },

	    /* scroll */
	    scroll: {
	        scrollable: false,
	        scrollY: 0,
	        minScrollY: undefined,
	        maxScrollY: undefined
	    },

	    /* flags */
	    $flags: {
	        dragging: false
	    }
	};

	module.exports = PROTOS;

/***/ }),
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _imgLoader = __webpack_require__(9);

	var _imgLoader2 = _interopRequireDefault(_imgLoader);

	var _img2base = __webpack_require__(6);

	var _img2base2 = _interopRequireDefault(_img2base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (url, option) {
	    var result = undefined;

	    (0, _img2base2.default)(url, function (base64) {
	        return (0, _imgLoader2.default)(base64, function (canvas) {
	            // let t0 = new Date() * 1;
	            var cw = canvas.width,
	                ch = canvas.height;
	            var imageData = canvas.getContext('2d').getImageData(0, 0, cw, ch);
	            var data = imageData.data;

	            for (var i = data.length - 1; i >= 0; i -= 4) {
	                if (option && option.conversion) {
	                    var pixel = option.conversion({
	                        r: data[i - 3],
	                        g: data[i - 2],
	                        b: data[i - 1],
	                        a: data[i]
	                    }, (i + 1 >> 2) % cw, Math.floor((i + 1 >> 2) / cw));
	                    data[i - 3] = pixel.r;
	                    data[i - 2] = pixel.g;
	                    data[i - 1] = pixel.b;
	                    data[i - 0] = pixel.a;
	                }
	            }

	            canvas.getContext('2d').clearRect(0, 0, cw, ch);
	            canvas.getContext('2d').putImageData(imageData, 0, 0);
	            result = canvas;
	            // console.log(new Date() * 1 - t0);
	        }, {
	            canvas: true,
	            cacheFlag: Math.random()
	        });
	    });

	    return function () {
	        return result;
	    };
	};

/***/ }),
/* 84 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function mirrorImage(orgImage) {
	  var imageWidth = orgImage.width;
	  var imageHeight = orgImage.height;

	  var tempCanvas = document.createElement('canvas');
	  tempCanvas.width = imageWidth;
	  tempCanvas.height = imageHeight;

	  var context = tempCanvas.getContext("2d");
	  context.scale(1, -1);
	  context.translate(0, -imageHeight);
	  context.drawImage(orgImage, 0, 0);
	  var flipImage = context.getImageData(0, 0, imageWidth, imageHeight);

	  return {
	    canvas: context,
	    img: flipImage
	  };
	};

/***/ }),
/* 85 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function (text, config) {
	    return {
	        type: 'multline-text',
	        text: text,
	        config: config
	    };
	};

/***/ })
/******/ ])
});
;
>>>>>>> 44f9f938734159d0f29ab3a3aa631e48dcfabf92
