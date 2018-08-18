<<<<<<< HEAD
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){e.exports=n(82)},72:function(e,t){"use strict";var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(){a.addEventListener=a.canvas.addEventListener=function(e,t){a.document.addEventListener(e,t)},a.removeEventListener=a.canvas.removeEventListener=function(e,t){a.document.removeEventListener(e,t)};var e=wx.getSystemInfoSync(),t=e.platform;if("undefined"==typeof __devtoolssubcontext&&"devtools"===t){for(var n in a){var o=Object.getOwnPropertyDescriptor(u,n);o&&o.configurable!==!0||Object.defineProperty(window,n,{value:a[n]})}for(var r in a.document){var i=Object.getOwnPropertyDescriptor(u.document,r);i&&i.configurable!==!0||Object.defineProperty(u.document,r,{value:a.document[r]})}window.parent=window}else{for(var c in a)u[c]=a[c];u.window=a,window=u,window.top=window.parent=window}}var i=n(1),a=o(i),u=GameGlobal;GameGlobal.__isAdapterInjected||(GameGlobal.__isAdapterInjected=!0,r())},function(e,t,n){function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.cancelAnimationFrame=t.requestAnimationFrame=t.clearInterval=t.clearTimeout=t.setInterval=t.setTimeout=t.canvas=t.location=t.localStorage=t.HTMLElement=t.FileReader=t.Audio=t.Image=t.WebSocket=t.XMLHttpRequest=t.navigator=t.document=void 0;var r=n(2);Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var i=n(3);Object.keys(i).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}})});var a=n(9),u=o(a),c=n(10),l=o(c),s=n(17),f=o(s),d=n(18),p=o(d),h=n(19),y=o(h),v=n(11),b=o(v),g=n(12),_=o(g),w=n(20),m=o(w),O=n(4),E=o(O),j=n(21),T=o(j),P=n(22),k=o(P);t.document=l.default,t.navigator=f.default,t.XMLHttpRequest=p.default,t.WebSocket=y.default,t.Image=b.default,t.Audio=_.default,t.FileReader=m.default,t.HTMLElement=E.default,t.localStorage=T.default,t.location=k.default;var M=new u.default;t.canvas=M,t.setTimeout=setTimeout,t.setInterval=setInterval,t.clearTimeout=clearTimeout,t.clearInterval=clearInterval,t.requestAnimationFrame=requestAnimationFrame,t.cancelAnimationFrame=cancelAnimationFrame},function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n=wx.getSystemInfoSync(),o=n.screenWidth,r=n.screenHeight,i=n.devicePixelRatio,a=t.innerWidth=o,u=t.innerHeight=r;t.devicePixelRatio=i;t.screen={availWidth:a,availHeight:u},t.performance={now:function(){return Date.now()/1e3}},t.ontouchstart=null,t.ontouchmove=null,t.ontouchend=null},function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":o(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":o(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.HTMLCanvasElement=t.HTMLImageElement=void 0;var c=n(4),l=r(c);t.HTMLImageElement=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"img"))}return u(t,e),t}(l.default),t.HTMLCanvasElement=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"canvas"))}return u(t,e),t}(l.default)},function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":o(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":o(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(5),s=r(l),f=n(8),d=n(2),p=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.className="",n.childern=[],n.style={width:d.innerWidth+"px",height:d.innerHeight+"px"},n.insertBefore=f.noop,n.innerHTML="",n.tagName=e.toUpperCase(),n}return u(t,e),c(t,[{key:"setAttribute",value:function(e,t){this[e]=t}},{key:"getAttribute",value:function(e){return this[e]}},{key:"getBoundingClientRect",value:function(){return{top:0,left:0,width:d.innerWidth,height:d.innerHeight}}},{key:"focus",value:function(){}},{key:"clientWidth",get:function(){var e=parseInt(this.style.fontSize,10)*this.innerHTML.length;return Number.isNaN(e)?0:e}},{key:"clientHeight",get:function(){var e=parseInt(this.style.fontSize,10);return Number.isNaN(e)?0:e}}]),t}(s.default);t.default=p},function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":o(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":o(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(6),l=r(c),s=function(e){function t(){i(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.className="",e.children=[],e}return u(t,e),t}(l.default);t.default=s},function(e,t,r){function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":o(t))&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":o(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=r(7),f=i(s),d=function(e){function t(){a(this,t);var e=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.childNodes=[],e}return c(t,e),l(t,[{key:"appendChild",value:function(e){if(!(e instanceof t))throw new TypeError("Failed to executed 'appendChild' on 'Node': parameter 1 is not of type 'Node'.");this.childNodes.push(e)}},{key:"cloneNode",value:function(){var e=Object.create(this);return n(e,this),e}},{key:"removeChild",value:function(e){var t=this.childNodes.findIndex(function(t){return t===e});return t>-1?this.childNodes.splice(t,1):null}}]),t}(f.default);t.default=d},function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=new WeakMap,i=function(){function e(){n(this,e),r.set(this,{})}return o(e,[{key:"addEventListener",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=r.get(this);o||(o={},r.set(this,o)),o[e]||(o[e]=[]),o[e].push(t),n.capture&&console.warn("EventTarget.addEventListener: options.capture is not implemented."),n.once&&console.warn("EventTarget.addEventListener: options.once is not implemented."),n.passive&&console.warn("EventTarget.addEventListener: options.passive is not implemented.")}},{key:"removeEventListener",value:function(e,t){var n=r.get(this)[e];if(n&&n.length>0)for(var o=n.length;o--;o>0)if(n[o]===t){n.splice(o,1);break}}},{key:"dispatchEvent",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=r.get(this)[e.type];if(t)for(var n=0;n<t.length;n++)t[n](e)}}]),e}();t.default=i},function(e,t){function n(){}Object.defineProperty(t,"__esModule",{value:!0}),t.noop=n},function(e,t,n){function o(e){return e&&e.__esModule?e:{default:e}}function r(){var e=wx.createCanvas();e.type="canvas",e.__proto__.__proto__=new a.default("canvas");return e.getBoundingClientRect=function(){var e={top:0,left:0,width:window.innerWidth,height:window.innerHeight};return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=(n(3),n(4)),a=o(i),u=n(10);o(u)},function(e,t,n){function o(e){return e&&e.__esModule?e:{default:e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),a=r(i),u=n(4),c=o(u),l=n(11),s=o(l),f=n(12),d=o(f),p=n(9),h=o(p);n(15);var y={},v={readyState:"complete",visibilityState:"visible",documentElement:a,hidden:!1,style:{},location:a.location,ontouchstart:null,ontouchmove:null,ontouchend:null,head:new c.default("head"),body:new c.default("body"),createElement:function(e){return"canvas"===e?new h.default:"audio"===e?new d.default:"img"===e?new s.default:new c.default(e)},getElementById:function(e){return e===a.canvas.id?a.canvas:null},getElementsByTagName:function(e){return"head"===e?[v.head]:"body"===e?[v.body]:"canvas"===e?[a.canvas]:[]},querySelector:function(e){return"head"===e?v.head:"body"===e?v.body:"canvas"===e?a.canvas:e==="#"+a.canvas.id?a.canvas:null},querySelectorAll:function(e){return"head"===e?[v.head]:"body"===e?[v.body]:"canvas"===e?[a.canvas]:[]},addEventListener:function(e,t){y[e]||(y[e]=[]),y[e].push(t)},removeEventListener:function(e,t){var n=y[e];if(n&&n.length>0)for(var o=n.length;o--;o>0)if(n[o]===t){n.splice(o,1);break}},dispatchEvent:function(e){var t=y[e.type];if(t)for(var n=0;n<t.length;n++)t[n](e)}};t.default=v},function(e,t){function n(){var e=wx.createImage();return e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":o(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":o(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(13),s=r(l),f=0,d=1,p=2,h=3,y=4,v=new WeakMap,b=new WeakMap,g=(new WeakMap,new WeakMap,function(e){function t(e){i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));n.HAVE_NOTHING=f,n.HAVE_METADATA=d,n.HAVE_CURRENT_DATA=p,n.HAVE_FUTURE_DATA=h,n.HAVE_ENOUGH_DATA=y,n.readyState=f,b.set(n,"");var o=wx.createInnerAudioContext();return v.set(n,o),o.onCanplay(function(){n.dispatchEvent({type:"load"}),n.dispatchEvent({type:"loadend"}),n.dispatchEvent({type:"canplay"}),n.dispatchEvent({type:"canplaythrough"}),n.dispatchEvent({type:"loadedmetadata"}),n.readyState=p}),o.onPlay(function(){n.dispatchEvent({type:"play"})}),o.onPause(function(){n.dispatchEvent({type:"pause"})}),o.onEnded(function(){n.dispatchEvent({type:"ended"}),n.readyState=y}),o.onError(function(){n.dispatchEvent({type:"error"})}),e&&(v.get(n).src=e),n}return u(t,e),c(t,[{key:"load",value:function(){console.warn("HTMLAudioElement.load() is not implemented.")}},{key:"play",value:function(){v.get(this).play()}},{key:"pause",value:function(){v.get(this).pause()}},{key:"canPlayType",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"string"!=typeof e?"":e.indexOf("audio/mpeg")>-1||e.indexOf("audio/mp4")?"probably":""}},{key:"cloneNode",value:function(){var e=new t;return e.loop=v.get(this).loop,e.autoplay=v.get(this).loop,e.src=this.src,e}},{key:"currentTime",get:function(){return v.get(this).currentTime},set:function(e){v.get(this).seek(e)}},{key:"src",get:function(){return b.get(this)},set:function(e){b.set(this,e),v.get(this).src=e}},{key:"loop",get:function(){return v.get(this).loop},set:function(e){v.get(this).loop=e}},{key:"autoplay",get:function(){return v.get(this).autoplay},set:function(e){v.get(this).autoplay=e}},{key:"paused",get:function(){return v.get(this).paused}}]),t}(s.default));t.default=g},function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":o(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":o(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(14),l=r(c),s=function(e){function t(){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,"audio"))}return u(t,e),t}(l.default);t.default=s},function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":o(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":o(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(4),s=r(l),f=function(e){function t(e){return i(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return u(t,e),c(t,[{key:"addTextTrack",value:function(){}},{key:"captureStream",value:function(){}},{key:"fastSeek",value:function(){}},{key:"load",value:function(){}},{key:"pause",value:function(){}},{key:"play",value:function(){}}]),t}(s.default);t.default=f},function(e,t,n){n(16)},function(e,t,n){function o(e){return e&&e.__esModule?e:{default:e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e){return function(t){var n=new d(e);n.touches=t.touches,t.touches[0]&&(p=t.touches[0].clientX,h=t.touches[0].clientY),n.layerX=p,n.layerY=h,n.targetTouches=Array.prototype.slice.call(t.touches),n.changedTouches=t.changedTouches,n.timeStamp=t.timeStamp,s.default.dispatchEvent(n)}}var u=n(1),c=r(u),l=n(10),s=o(l),f=n(8),d=function e(t){i(this,e),this.target=c.canvas,this.currentTarget=c.canvas,this.touches=[],this.targetTouches=[],this.changedTouches=[],this.preventDefault=f.noop,this.stopPropagation=f.noop,this.type=t},p=0,h=0;wx.onTouchStart(a("touchstart")),wx.onTouchMove(a("touchmove")),wx.onTouchEnd(a("touchend")),wx.onTouchCancel(a("touchcancel"))},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var o=n(8),r=wx.getSystemInfoSync(),i=r.platform,a={platform:i,language:"zh-cn",appVersion:"5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",userAgent:"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/zh_CN",onLine:!0,geolocation:{getCurrentPosition:o.noop,watchPosition:o.noop,clearWatch:o.noop}};t.default=a},function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e){if("function"==typeof this["on"+e]){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];this["on"+e].apply(this,n)}}function r(e){this.readyState=e,o.call(this,"readystatechange")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=new WeakMap,u=new WeakMap,c=new WeakMap,l=new WeakMap,s=new WeakMap,f=function(){function e(){n(this,e),this.onabort=null,this.onerror=null,this.onload=null,this.onloadstart=null,this.onprogress=null,this.ontimeout=null,this.onloadend=null,this.onreadystatechange=null,this.readyState=0,this.response=null,this.responseText=null,this.responseType="",this.responseXML=null,this.status=0,this.statusText="",this.upload={},this.withCredentials=!1,c.set(this,{"content-type":"application/x-www-form-urlencoded"}),l.set(this,{})}return i(e,[{key:"abort",value:function(){var e=s.get(this);e&&e.abort()}},{key:"getAllResponseHeaders",value:function(){var e=l.get(this);return Object.keys(e).map(function(t){return t+": "+e[t]}).join("\n")}},{key:"getResponseHeader",value:function(e){return l.get(this)[e]}},{key:"open",value:function(t,n){u.set(this,t),a.set(this,n),r.call(this,e.OPENED)}},{key:"overrideMimeType",value:function(){}},{key:"send",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(this.readyState!==e.OPENED)throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");wx.request({data:n,url:a.get(this),method:u.get(this),header:c.get(this),responseType:this.responseType,success:function(n){var i=n.data,a=n.statusCode,u=n.header;if("string"!=typeof i&&!(i instanceof ArrayBuffer))try{i=JSON.stringify(i)}catch(e){i=i}if(t.status=a,l.set(t,u),o.call(t,"loadstart"),r.call(t,e.HEADERS_RECEIVED),r.call(t,e.LOADING),t.response=i,i instanceof ArrayBuffer){t.responseText="";for(var c=new Uint8Array(i),s=c.byteLength,f=0;f<s;f++)t.responseText+=String.fromCharCode(c[f])}else t.responseText=i;r.call(t,e.DONE),o.call(t,"load"),o.call(t,"loadend")},fail:function(e){var n=e.errMsg;n.indexOf("abort")!==-1?o.call(t,"abort"):o.call(t,"error",n),o.call(t,"loadend")}})}},{key:"setRequestHeader",value:function(e,t){var n=c.get(this);n[e]=t,c.set(this,n)}}]),e}();f.UNSEND=0,f.OPENED=1,f.HEADERS_RECEIVED=2,f.LOADING=3,f.DONE=4,t.default=f},function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=new WeakMap,i=function(){function e(t){var o=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(n(this,e),this.binaryType="",this.bufferedAmount=0,this.extensions="",this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this.protocol="",this.readyState=3,"string"!=typeof t||!/(^ws:\/\/)|(^wss:\/\/)/.test(t))throw new TypeError("Failed to construct 'WebSocket': The URL '"+t+"' is invalid");this.url=t,this.readyState=e.CONNECTING;var a=wx.connectSocket({url:t,protocols:Array.isArray(i)?i:[i]});return r.set(this,a),a.onClose(function(t){o.readyState=e.CLOSED,"function"==typeof o.onclose&&o.onclose(t)}),a.onMessage(function(e){"function"==typeof o.onmessage&&o.onmessage(e)}),a.onOpen(function(){o.readyState=e.OPEN,"function"==typeof o.onopen&&o.onopen()}),a.onError(function(e){"function"==typeof o.onerror&&o.onerror(new Error(e.errMsg))}),this}return o(e,[{key:"close",value:function(t,n){this.readyState=e.CLOSING;var o=r.get(this);o.close({code:t,reason:n})}},{key:"send",value:function(e){if("string"!=typeof e&&!(e instanceof ArrayBuffer))throw new TypeError("Failed to send message: The data "+e+" is invalid");var t=r.get(this);t.send({data:e})}}]),e}();i.CONNECTING=0,i.OPEN=1,i.CLOSING=2,i.CLOSED=3,t.default=i},function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function e(){n(this,e)};t.default=o},function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n={get length(){var e=wx.getStorageInfoSync(),t=e.keys;return t.length},key:function(e){var t=wx.getStorageInfoSync(),n=t.keys;return n[e]},getItem:function(e){return wx.getStorageSync(e)},setItem:function(e,t){return wx.setStorageSync(e,t)},removeItem:function(e){wx.removeStorageSync(e)},clear:function(){wx.clearStorageSync()}};t.default=n},function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n={href:"game.js",reload:function(){}};t.default=n}])},82:function(e,t,n){"use strict";n(72)}})});
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

	module.exports = __webpack_require__(82);


/***/ }),

/***/ 72:
/***/ (function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/******/(function (modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/var installedModules = {};

		/******/ // The require function
		/******/function __webpack_require__(moduleId) {

			/******/ // Check if module is in cache
			/******/if (installedModules[moduleId])
				/******/return installedModules[moduleId].exports;

			/******/ // Create a new module (and put it into the cache)
			/******/var module = installedModules[moduleId] = {
				/******/exports: {},
				/******/id: moduleId,
				/******/loaded: false
				/******/

				/******/ // Execute the module function
				/******/ };modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

			/******/ // Flag the module as loaded
			/******/module.loaded = true;

			/******/ // Return the exports of the module
			/******/return module.exports;
			/******/
		}

		/******/ // expose the modules object (__webpack_modules__)
		/******/__webpack_require__.m = modules;

		/******/ // expose the module cache
		/******/__webpack_require__.c = installedModules;

		/******/ // __webpack_public_path__
		/******/__webpack_require__.p = "";

		/******/ // Load entry module and return exports
		/******/return __webpack_require__(0);
		/******/
	})(
	/************************************************************************/
	/******/[
	/* 0 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _window2 = __webpack_require__(1);

		var _window = _interopRequireWildcard(_window2);

		function _interopRequireWildcard(obj) {
			if (obj && obj.__esModule) {
				return obj;
			} else {
				var newObj = {};if (obj != null) {
					for (var key in obj) {
						if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
					}
				}newObj.default = obj;return newObj;
			}
		}

		var global = GameGlobal;

		function inject() {
			_window.addEventListener = _window.canvas.addEventListener = function (type, listener) {
				_window.document.addEventListener(type, listener);
			};
			_window.removeEventListener = _window.canvas.removeEventListener = function (type, listener) {
				_window.document.removeEventListener(type, listener);
			};

			var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
			    platform = _wx$getSystemInfoSync.platform;

			// 开发者工具无法重定义 window


			if (typeof __devtoolssubcontext === 'undefined' && platform === 'devtools') {
				for (var key in _window) {
					var descriptor = Object.getOwnPropertyDescriptor(global, key);

					if (!descriptor || descriptor.configurable === true) {
						Object.defineProperty(window, key, {
							value: _window[key]
						});
					}
				}

				for (var _key in _window.document) {
					var _descriptor = Object.getOwnPropertyDescriptor(global.document, _key);

					if (!_descriptor || _descriptor.configurable === true) {
						Object.defineProperty(global.document, _key, {
							value: _window.document[_key]
						});
					}
				}
				window.parent = window;
			} else {
				for (var _key2 in _window) {
					global[_key2] = _window[_key2];
				}
				global.window = _window;
				window = global;
				window.top = window.parent = window;
			}
		}

		if (!GameGlobal.__isAdapterInjected) {
			GameGlobal.__isAdapterInjected = true;
			inject();
		}

		/***/
	},
	/* 1 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.cancelAnimationFrame = exports.requestAnimationFrame = exports.clearInterval = exports.clearTimeout = exports.setInterval = exports.setTimeout = exports.canvas = exports.location = exports.localStorage = exports.HTMLElement = exports.FileReader = exports.Audio = exports.Image = exports.WebSocket = exports.XMLHttpRequest = exports.navigator = exports.document = undefined;

		var _WindowProperties = __webpack_require__(2);

		Object.keys(_WindowProperties).forEach(function (key) {
			if (key === "default" || key === "__esModule") return;
			Object.defineProperty(exports, key, {
				enumerable: true,
				get: function get() {
					return _WindowProperties[key];
				}
			});
		});

		var _constructor = __webpack_require__(3);

		Object.keys(_constructor).forEach(function (key) {
			if (key === "default" || key === "__esModule") return;
			Object.defineProperty(exports, key, {
				enumerable: true,
				get: function get() {
					return _constructor[key];
				}
			});
		});

		var _Canvas = __webpack_require__(9);

		var _Canvas2 = _interopRequireDefault(_Canvas);

		var _document2 = __webpack_require__(10);

		var _document3 = _interopRequireDefault(_document2);

		var _navigator2 = __webpack_require__(17);

		var _navigator3 = _interopRequireDefault(_navigator2);

		var _XMLHttpRequest2 = __webpack_require__(18);

		var _XMLHttpRequest3 = _interopRequireDefault(_XMLHttpRequest2);

		var _WebSocket2 = __webpack_require__(19);

		var _WebSocket3 = _interopRequireDefault(_WebSocket2);

		var _Image2 = __webpack_require__(11);

		var _Image3 = _interopRequireDefault(_Image2);

		var _Audio2 = __webpack_require__(12);

		var _Audio3 = _interopRequireDefault(_Audio2);

		var _FileReader2 = __webpack_require__(20);

		var _FileReader3 = _interopRequireDefault(_FileReader2);

		var _HTMLElement2 = __webpack_require__(4);

		var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

		var _localStorage2 = __webpack_require__(21);

		var _localStorage3 = _interopRequireDefault(_localStorage2);

		var _location2 = __webpack_require__(22);

		var _location3 = _interopRequireDefault(_location2);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		exports.document = _document3.default;
		exports.navigator = _navigator3.default;
		exports.XMLHttpRequest = _XMLHttpRequest3.default;
		exports.WebSocket = _WebSocket3.default;
		exports.Image = _Image3.default;
		exports.Audio = _Audio3.default;
		exports.FileReader = _FileReader3.default;
		exports.HTMLElement = _HTMLElement3.default;
		exports.localStorage = _localStorage3.default;
		exports.location = _location3.default;

		// 暴露全局的 canvas
		var canvas = new _Canvas2.default();

		exports.canvas = canvas;
		exports.setTimeout = setTimeout;
		exports.setInterval = setInterval;
		exports.clearTimeout = clearTimeout;
		exports.clearInterval = clearInterval;
		exports.requestAnimationFrame = requestAnimationFrame;
		exports.cancelAnimationFrame = cancelAnimationFrame;

		/***/
	},
	/* 2 */
	/***/function (module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
		    screenWidth = _wx$getSystemInfoSync.screenWidth,
		    screenHeight = _wx$getSystemInfoSync.screenHeight,
		    devicePixelRatio = _wx$getSystemInfoSync.devicePixelRatio;

		var innerWidth = exports.innerWidth = screenWidth;
		var innerHeight = exports.innerHeight = screenHeight;
		exports.devicePixelRatio = devicePixelRatio;
		var screen = exports.screen = {
			availWidth: innerWidth,
			availHeight: innerHeight
		};
		var performance = exports.performance = {
			now: function now() {
				return Date.now() / 1000;
			}
		};
		var ontouchstart = exports.ontouchstart = null;
		var ontouchmove = exports.ontouchmove = null;
		var ontouchend = exports.ontouchend = null;

		/***/
	},
	/* 3 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.HTMLCanvasElement = exports.HTMLImageElement = undefined;

		var _HTMLElement3 = __webpack_require__(4);

		var _HTMLElement4 = _interopRequireDefault(_HTMLElement3);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
			}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

		var HTMLImageElement = exports.HTMLImageElement = function (_HTMLElement) {
			_inherits(HTMLImageElement, _HTMLElement);

			function HTMLImageElement() {
				_classCallCheck(this, HTMLImageElement);

				return _possibleConstructorReturn(this, (HTMLImageElement.__proto__ || Object.getPrototypeOf(HTMLImageElement)).call(this, 'img'));
			}

			return HTMLImageElement;
		}(_HTMLElement4.default);

		var HTMLCanvasElement = exports.HTMLCanvasElement = function (_HTMLElement2) {
			_inherits(HTMLCanvasElement, _HTMLElement2);

			function HTMLCanvasElement() {
				_classCallCheck(this, HTMLCanvasElement);

				return _possibleConstructorReturn(this, (HTMLCanvasElement.__proto__ || Object.getPrototypeOf(HTMLCanvasElement)).call(this, 'canvas'));
			}

			return HTMLCanvasElement;
		}(_HTMLElement4.default);

		/***/
	},
	/* 4 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		var _Element2 = __webpack_require__(5);

		var _Element3 = _interopRequireDefault(_Element2);

		var _util = __webpack_require__(8);

		var _WindowProperties = __webpack_require__(2);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
			}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

		var HTMLElement = function (_Element) {
			_inherits(HTMLElement, _Element);

			function HTMLElement() {
				var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

				_classCallCheck(this, HTMLElement);

				var _this = _possibleConstructorReturn(this, (HTMLElement.__proto__ || Object.getPrototypeOf(HTMLElement)).call(this));

				_this.className = '';
				_this.childern = [];
				_this.style = {
					width: _WindowProperties.innerWidth + 'px',
					height: _WindowProperties.innerHeight + 'px'
				};
				_this.insertBefore = _util.noop;
				_this.innerHTML = '';

				_this.tagName = tagName.toUpperCase();
				return _this;
			}

			_createClass(HTMLElement, [{
				key: 'setAttribute',
				value: function setAttribute(name, value) {
					this[name] = value;
				}
			}, {
				key: 'getAttribute',
				value: function getAttribute(name) {
					return this[name];
				}
			}, {
				key: 'getBoundingClientRect',
				value: function getBoundingClientRect() {
					return {
						top: 0,
						left: 0,
						width: _WindowProperties.innerWidth,
						height: _WindowProperties.innerHeight
					};
				}
			}, {
				key: 'focus',
				value: function focus() {}
			}, {
				key: 'clientWidth',
				get: function get() {
					var ret = parseInt(this.style.fontSize, 10) * this.innerHTML.length;

					return Number.isNaN(ret) ? 0 : ret;
				}
			}, {
				key: 'clientHeight',
				get: function get() {
					var ret = parseInt(this.style.fontSize, 10);

					return Number.isNaN(ret) ? 0 : ret;
				}
			}]);

			return HTMLElement;
		}(_Element3.default);

		exports.default = HTMLElement;

		/***/
	},
	/* 5 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _Node2 = __webpack_require__(6);

		var _Node3 = _interopRequireDefault(_Node2);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
			}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

		var ELement = function (_Node) {
			_inherits(ELement, _Node);

			function ELement() {
				_classCallCheck(this, ELement);

				var _this = _possibleConstructorReturn(this, (ELement.__proto__ || Object.getPrototypeOf(ELement)).call(this));

				_this.className = '';
				_this.children = [];
				return _this;
			}

			return ELement;
		}(_Node3.default);

		exports.default = ELement;

		/***/
	},
	/* 6 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		var _EventTarget2 = __webpack_require__(7);

		var _EventTarget3 = _interopRequireDefault(_EventTarget2);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
			}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

		var Node = function (_EventTarget) {
			_inherits(Node, _EventTarget);

			function Node() {
				_classCallCheck(this, Node);

				var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this));

				_this.childNodes = [];
				return _this;
			}

			_createClass(Node, [{
				key: 'appendChild',
				value: function appendChild(node) {
					if (node instanceof Node) {
						this.childNodes.push(node);
					} else {
						throw new TypeError('Failed to executed \'appendChild\' on \'Node\': parameter 1 is not of type \'Node\'.');
					}
				}
			}, {
				key: 'cloneNode',
				value: function cloneNode() {
					var copyNode = Object.create(this);

					_extends(copyNode, this);
					return copyNode;
				}
			}, {
				key: 'removeChild',
				value: function removeChild(node) {
					var index = this.childNodes.findIndex(function (child) {
						return child === node;
					});

					if (index > -1) {
						return this.childNodes.splice(index, 1);
					}
					return null;
				}
			}]);

			return Node;
		}(_EventTarget3.default);

		exports.default = Node;

		/***/
	},
	/* 7 */
	/***/function (module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var _events = new WeakMap();

		var EventTarget = function () {
			function EventTarget() {
				_classCallCheck(this, EventTarget);

				_events.set(this, {});
			}

			_createClass(EventTarget, [{
				key: 'addEventListener',
				value: function addEventListener(type, listener) {
					var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

					var events = _events.get(this);

					if (!events) {
						events = {};
						_events.set(this, events);
					}
					if (!events[type]) {
						events[type] = [];
					}
					events[type].push(listener);

					if (options.capture) {
						console.warn('EventTarget.addEventListener: options.capture is not implemented.');
					}
					if (options.once) {
						console.warn('EventTarget.addEventListener: options.once is not implemented.');
					}
					if (options.passive) {
						console.warn('EventTarget.addEventListener: options.passive is not implemented.');
					}
				}
			}, {
				key: 'removeEventListener',
				value: function removeEventListener(type, listener) {
					var listeners = _events.get(this)[type];

					if (listeners && listeners.length > 0) {
						for (var i = listeners.length; i--; i > 0) {
							if (listeners[i] === listener) {
								listeners.splice(i, 1);
								break;
							}
						}
					}
				}
			}, {
				key: 'dispatchEvent',
				value: function dispatchEvent() {
					var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

					var listeners = _events.get(this)[event.type];

					if (listeners) {
						for (var i = 0; i < listeners.length; i++) {
							listeners[i](event);
						}
					}
				}
			}]);

			return EventTarget;
		}();

		exports.default = EventTarget;

		/***/
	},
	/* 8 */
	/***/function (module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.noop = noop;
		function noop() {}

		/***/
	},
	/* 9 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = Canvas;

		var _constructor = __webpack_require__(3);

		var _HTMLElement = __webpack_require__(4);

		var _HTMLElement2 = _interopRequireDefault(_HTMLElement);

		var _document = __webpack_require__(10);

		var _document2 = _interopRequireDefault(_document);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		var hasModifiedCanvasPrototype = false;
		var hasInit2DContextConstructor = false;
		var hasInitWebGLContextConstructor = false;

		function Canvas() {
			var canvas = wx.createCanvas();

			canvas.type = 'canvas';

			canvas.__proto__.__proto__ = new _HTMLElement2.default('canvas');

			var _getContext = canvas.getContext;

			canvas.getBoundingClientRect = function () {
				var ret = {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight
				};
				return ret;
			};

			return canvas;
		}

		/***/
	},
	/* 10 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _window = __webpack_require__(1);

		var window = _interopRequireWildcard(_window);

		var _HTMLElement = __webpack_require__(4);

		var _HTMLElement2 = _interopRequireDefault(_HTMLElement);

		var _Image = __webpack_require__(11);

		var _Image2 = _interopRequireDefault(_Image);

		var _Audio = __webpack_require__(12);

		var _Audio2 = _interopRequireDefault(_Audio);

		var _Canvas = __webpack_require__(9);

		var _Canvas2 = _interopRequireDefault(_Canvas);

		__webpack_require__(15);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		function _interopRequireWildcard(obj) {
			if (obj && obj.__esModule) {
				return obj;
			} else {
				var newObj = {};if (obj != null) {
					for (var key in obj) {
						if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
					}
				}newObj.default = obj;return newObj;
			}
		}

		var events = {};

		var document = {
			readyState: 'complete',
			visibilityState: 'visible',
			documentElement: window,
			hidden: false,
			style: {},
			location: window.location,
			ontouchstart: null,
			ontouchmove: null,
			ontouchend: null,

			head: new _HTMLElement2.default('head'),
			body: new _HTMLElement2.default('body'),

			createElement: function createElement(tagName) {
				if (tagName === 'canvas') {
					return new _Canvas2.default();
				} else if (tagName === 'audio') {
					return new _Audio2.default();
				} else if (tagName === 'img') {
					return new _Image2.default();
				}

				return new _HTMLElement2.default(tagName);
			},
			getElementById: function getElementById(id) {
				if (id === window.canvas.id) {
					return window.canvas;
				}
				return null;
			},
			getElementsByTagName: function getElementsByTagName(tagName) {
				if (tagName === 'head') {
					return [document.head];
				} else if (tagName === 'body') {
					return [document.body];
				} else if (tagName === 'canvas') {
					return [window.canvas];
				}
				return [];
			},
			querySelector: function querySelector(query) {
				if (query === 'head') {
					return document.head;
				} else if (query === 'body') {
					return document.body;
				} else if (query === 'canvas') {
					return window.canvas;
				} else if (query === '#' + window.canvas.id) {
					return window.canvas;
				}
				return null;
			},
			querySelectorAll: function querySelectorAll(query) {
				if (query === 'head') {
					return [document.head];
				} else if (query === 'body') {
					return [document.body];
				} else if (query === 'canvas') {
					return [window.canvas];
				}
				return [];
			},
			addEventListener: function addEventListener(type, listener) {
				if (!events[type]) {
					events[type] = [];
				}
				events[type].push(listener);
			},
			removeEventListener: function removeEventListener(type, listener) {
				var listeners = events[type];

				if (listeners && listeners.length > 0) {
					for (var i = listeners.length; i--; i > 0) {
						if (listeners[i] === listener) {
							listeners.splice(i, 1);
							break;
						}
					}
				}
			},
			dispatchEvent: function dispatchEvent(event) {
				var listeners = events[event.type];

				if (listeners) {
					for (var i = 0; i < listeners.length; i++) {
						listeners[i](event);
					}
				}
			}
		};

		exports.default = document;

		/***/
	},
	/* 11 */
	/***/function (module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		exports.default = Image;
		function Image() {
			var image = wx.createImage();

			return image;
		}

		/***/
	},
	/* 12 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		var _HTMLAudioElement2 = __webpack_require__(13);

		var _HTMLAudioElement3 = _interopRequireDefault(_HTMLAudioElement2);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
			}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

		var HAVE_NOTHING = 0;
		var HAVE_METADATA = 1;
		var HAVE_CURRENT_DATA = 2;
		var HAVE_FUTURE_DATA = 3;
		var HAVE_ENOUGH_DATA = 4;

		var _innerAudioContext = new WeakMap();
		var _src = new WeakMap();
		var _loop = new WeakMap();
		var _autoplay = new WeakMap();

		var Audio = function (_HTMLAudioElement) {
			_inherits(Audio, _HTMLAudioElement);

			function Audio(url) {
				_classCallCheck(this, Audio);

				var _this = _possibleConstructorReturn(this, (Audio.__proto__ || Object.getPrototypeOf(Audio)).call(this));

				_this.HAVE_NOTHING = HAVE_NOTHING;
				_this.HAVE_METADATA = HAVE_METADATA;
				_this.HAVE_CURRENT_DATA = HAVE_CURRENT_DATA;
				_this.HAVE_FUTURE_DATA = HAVE_FUTURE_DATA;
				_this.HAVE_ENOUGH_DATA = HAVE_ENOUGH_DATA;
				_this.readyState = HAVE_NOTHING;

				_src.set(_this, '');

				var innerAudioContext = wx.createInnerAudioContext();

				_innerAudioContext.set(_this, innerAudioContext);

				innerAudioContext.onCanplay(function () {
					_this.dispatchEvent({ type: 'load' });
					_this.dispatchEvent({ type: 'loadend' });
					_this.dispatchEvent({ type: 'canplay' });
					_this.dispatchEvent({ type: 'canplaythrough' });
					_this.dispatchEvent({ type: 'loadedmetadata' });
					_this.readyState = HAVE_CURRENT_DATA;
				});
				innerAudioContext.onPlay(function () {
					_this.dispatchEvent({ type: 'play' });
				});
				innerAudioContext.onPause(function () {
					_this.dispatchEvent({ type: 'pause' });
				});
				innerAudioContext.onEnded(function () {
					_this.dispatchEvent({ type: 'ended' });
					_this.readyState = HAVE_ENOUGH_DATA;
				});
				innerAudioContext.onError(function () {
					_this.dispatchEvent({ type: 'error' });
				});

				if (url) {
					_innerAudioContext.get(_this).src = url;
				}
				return _this;
			}

			_createClass(Audio, [{
				key: 'load',
				value: function load() {
					console.warn('HTMLAudioElement.load() is not implemented.');
				}
			}, {
				key: 'play',
				value: function play() {
					_innerAudioContext.get(this).play();
				}
			}, {
				key: 'pause',
				value: function pause() {
					_innerAudioContext.get(this).pause();
				}
			}, {
				key: 'canPlayType',
				value: function canPlayType() {
					var mediaType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

					if (typeof mediaType !== 'string') {
						return '';
					}

					if (mediaType.indexOf('audio/mpeg') > -1 || mediaType.indexOf('audio/mp4')) {
						return 'probably';
					}
					return '';
				}
			}, {
				key: 'cloneNode',
				value: function cloneNode() {
					var newAudio = new Audio();
					newAudio.loop = _innerAudioContext.get(this).loop;
					newAudio.autoplay = _innerAudioContext.get(this).loop;
					newAudio.src = this.src;
					return newAudio;
				}
			}, {
				key: 'currentTime',
				get: function get() {
					return _innerAudioContext.get(this).currentTime;
				},
				set: function set(value) {
					_innerAudioContext.get(this).seek(value);
				}
			}, {
				key: 'src',
				get: function get() {
					return _src.get(this);
				},
				set: function set(value) {
					_src.set(this, value);
					_innerAudioContext.get(this).src = value;
				}
			}, {
				key: 'loop',
				get: function get() {
					return _innerAudioContext.get(this).loop;
				},
				set: function set(value) {
					_innerAudioContext.get(this).loop = value;
				}
			}, {
				key: 'autoplay',
				get: function get() {
					return _innerAudioContext.get(this).autoplay;
				},
				set: function set(value) {
					_innerAudioContext.get(this).autoplay = value;
				}
			}, {
				key: 'paused',
				get: function get() {
					return _innerAudioContext.get(this).paused;
				}
			}]);

			return Audio;
		}(_HTMLAudioElement3.default);

		exports.default = Audio;

		/***/
	},
	/* 13 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _HTMLMediaElement2 = __webpack_require__(14);

		var _HTMLMediaElement3 = _interopRequireDefault(_HTMLMediaElement2);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
			}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

		var HTMLAudioElement = function (_HTMLMediaElement) {
			_inherits(HTMLAudioElement, _HTMLMediaElement);

			function HTMLAudioElement() {
				_classCallCheck(this, HTMLAudioElement);

				return _possibleConstructorReturn(this, (HTMLAudioElement.__proto__ || Object.getPrototypeOf(HTMLAudioElement)).call(this, 'audio'));
			}

			return HTMLAudioElement;
		}(_HTMLMediaElement3.default);

		exports.default = HTMLAudioElement;

		/***/
	},
	/* 14 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		var _HTMLElement2 = __webpack_require__(4);

		var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		function _possibleConstructorReturn(self, call) {
			if (!self) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
		}

		function _inherits(subClass, superClass) {
			if (typeof superClass !== "function" && superClass !== null) {
				throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
			}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}

		var HTMLMediaElement = function (_HTMLElement) {
			_inherits(HTMLMediaElement, _HTMLElement);

			function HTMLMediaElement(type) {
				_classCallCheck(this, HTMLMediaElement);

				return _possibleConstructorReturn(this, (HTMLMediaElement.__proto__ || Object.getPrototypeOf(HTMLMediaElement)).call(this, type));
			}

			_createClass(HTMLMediaElement, [{
				key: 'addTextTrack',
				value: function addTextTrack() {}
			}, {
				key: 'captureStream',
				value: function captureStream() {}
			}, {
				key: 'fastSeek',
				value: function fastSeek() {}
			}, {
				key: 'load',
				value: function load() {}
			}, {
				key: 'pause',
				value: function pause() {}
			}, {
				key: 'play',
				value: function play() {}
			}]);

			return HTMLMediaElement;
		}(_HTMLElement3.default);

		exports.default = HTMLMediaElement;

		/***/
	},
	/* 15 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		__webpack_require__(16);

		/***/
	},
	/* 16 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		var _window = __webpack_require__(1);

		var window = _interopRequireWildcard(_window);

		var _document = __webpack_require__(10);

		var _document2 = _interopRequireDefault(_document);

		var _util = __webpack_require__(8);

		function _interopRequireDefault(obj) {
			return obj && obj.__esModule ? obj : { default: obj };
		}

		function _interopRequireWildcard(obj) {
			if (obj && obj.__esModule) {
				return obj;
			} else {
				var newObj = {};if (obj != null) {
					for (var key in obj) {
						if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
					}
				}newObj.default = obj;return newObj;
			}
		}

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var TouchEvent = function TouchEvent(type) {
			_classCallCheck(this, TouchEvent);

			this.target = window.canvas;
			this.currentTarget = window.canvas;
			this.touches = [];
			this.targetTouches = [];
			this.changedTouches = [];
			this.preventDefault = _util.noop;
			this.stopPropagation = _util.noop;

			this.type = type;
		};

		var lastX = 0;
		var lastY = 0;
		function touchEventHandlerFactory(type) {
			return function (event) {
				var touchEvent = new TouchEvent(type);

				touchEvent.touches = event.touches;
				// hacked start
				if (event.touches[0]) {
					lastX = event.touches[0].clientX;
					lastY = event.touches[0].clientY;
				}
				touchEvent.layerX = lastX;
				touchEvent.layerY = lastY;
				// hacked end
				touchEvent.targetTouches = Array.prototype.slice.call(event.touches);
				touchEvent.changedTouches = event.changedTouches;
				touchEvent.timeStamp = event.timeStamp;
				_document2.default.dispatchEvent(touchEvent);
			};
		}

		wx.onTouchStart(touchEventHandlerFactory('touchstart'));
		wx.onTouchMove(touchEventHandlerFactory('touchmove'));
		wx.onTouchEnd(touchEventHandlerFactory('touchend'));
		wx.onTouchCancel(touchEventHandlerFactory('touchcancel'));

		/***/
	},
	/* 17 */
	/***/function (module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _util = __webpack_require__(8);

		// TODO 需要 wx.getSystemInfo 获取更详细信息
		var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
		    platform = _wx$getSystemInfoSync.platform;

		var navigator = {
			platform: platform,
			language: 'zh-cn',
			appVersion: '5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
			userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/zh_CN',
			onLine: true, // TODO 用 wx.getNetworkStateChange 和 wx.onNetworkStateChange 来返回真实的状态

			// TODO 用 wx.getLocation 来封装 geolocation
			geolocation: {
				getCurrentPosition: _util.noop,
				watchPosition: _util.noop,
				clearWatch: _util.noop
			}
		};

		exports.default = navigator;

		/***/
	},
	/* 18 */
	/***/function (module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var _url = new WeakMap();
		var _method = new WeakMap();
		var _requestHeader = new WeakMap();
		var _responseHeader = new WeakMap();
		var _requestTask = new WeakMap();

		function _triggerEvent(type) {
			if (typeof this['on' + type] === 'function') {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				this['on' + type].apply(this, args);
			}
		}

		function _changeReadyState(readyState) {
			this.readyState = readyState;
			_triggerEvent.call(this, 'readystatechange');
		}

		var XMLHttpRequest = function () {
			// TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态
			function XMLHttpRequest() {
				_classCallCheck(this, XMLHttpRequest);

				this.onabort = null;
				this.onerror = null;
				this.onload = null;
				this.onloadstart = null;
				this.onprogress = null;
				this.ontimeout = null;
				this.onloadend = null;
				this.onreadystatechange = null;
				this.readyState = 0;
				this.response = null;
				this.responseText = null;
				this.responseType = '';
				this.responseXML = null;
				this.status = 0;
				this.statusText = '';
				this.upload = {};
				this.withCredentials = false;

				_requestHeader.set(this, {
					'content-type': 'application/x-www-form-urlencoded'
				});
				_responseHeader.set(this, {});
			}

			/*
	   * TODO 这一批事件应该是在 XMLHttpRequestEventTarget.prototype 上面的
	   */

			_createClass(XMLHttpRequest, [{
				key: 'abort',
				value: function abort() {
					var myRequestTask = _requestTask.get(this);

					if (myRequestTask) {
						myRequestTask.abort();
					}
				}
			}, {
				key: 'getAllResponseHeaders',
				value: function getAllResponseHeaders() {
					var responseHeader = _responseHeader.get(this);

					return Object.keys(responseHeader).map(function (header) {
						return header + ': ' + responseHeader[header];
					}).join('\n');
				}
			}, {
				key: 'getResponseHeader',
				value: function getResponseHeader(header) {
					return _responseHeader.get(this)[header];
				}
			}, {
				key: 'open',
				value: function open(method, url /* async, user, password 这几个参数在小程序内不支持*/) {
					_method.set(this, method);
					_url.set(this, url);
					_changeReadyState.call(this, XMLHttpRequest.OPENED);
				}
			}, {
				key: 'overrideMimeType',
				value: function overrideMimeType() {}
			}, {
				key: 'send',
				value: function send() {
					var _this = this;

					var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

					if (this.readyState !== XMLHttpRequest.OPENED) {
						throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
					} else {
						wx.request({
							data: data,
							url: _url.get(this),
							method: _method.get(this),
							header: _requestHeader.get(this),
							responseType: this.responseType,
							success: function success(_ref) {
								var data = _ref.data,
								    statusCode = _ref.statusCode,
								    header = _ref.header;

								if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
									try {
										data = JSON.stringify(data);
									} catch (e) {
										data = data;
									}
								}

								_this.status = statusCode;
								_responseHeader.set(_this, header);
								_triggerEvent.call(_this, 'loadstart');
								_changeReadyState.call(_this, XMLHttpRequest.HEADERS_RECEIVED);
								_changeReadyState.call(_this, XMLHttpRequest.LOADING);

								_this.response = data;

								if (data instanceof ArrayBuffer) {
									_this.responseText = '';
									var bytes = new Uint8Array(data);
									var len = bytes.byteLength;

									for (var i = 0; i < len; i++) {
										_this.responseText += String.fromCharCode(bytes[i]);
									}
								} else {
									_this.responseText = data;
								}
								_changeReadyState.call(_this, XMLHttpRequest.DONE);
								_triggerEvent.call(_this, 'load');
								_triggerEvent.call(_this, 'loadend');
							},
							fail: function fail(_ref2) {
								var errMsg = _ref2.errMsg;

								// TODO 规范错误
								if (errMsg.indexOf('abort') !== -1) {
									_triggerEvent.call(_this, 'abort');
								} else {
									_triggerEvent.call(_this, 'error', errMsg);
								}
								_triggerEvent.call(_this, 'loadend');
							}
						});
					}
				}
			}, {
				key: 'setRequestHeader',
				value: function setRequestHeader(header, value) {
					var myHeader = _requestHeader.get(this);

					myHeader[header] = value;
					_requestHeader.set(this, myHeader);
				}
			}]);

			return XMLHttpRequest;
		}();

		XMLHttpRequest.UNSEND = 0;
		XMLHttpRequest.OPENED = 1;
		XMLHttpRequest.HEADERS_RECEIVED = 2;
		XMLHttpRequest.LOADING = 3;
		XMLHttpRequest.DONE = 4;
		exports.default = XMLHttpRequest;

		/***/
	},
	/* 19 */
	/***/function (module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		var _socketTask = new WeakMap();

		var WebSocket = function () {
			// TODO 更新 binaryType
			// The connection is in the process of closing.
			// The connection is not yet open.
			function WebSocket(url) {
				var _this = this;

				var protocols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

				_classCallCheck(this, WebSocket);

				this.binaryType = '';
				this.bufferedAmount = 0;
				this.extensions = '';
				this.onclose = null;
				this.onerror = null;
				this.onmessage = null;
				this.onopen = null;
				this.protocol = '';
				this.readyState = 3;

				if (typeof url !== 'string' || !/(^ws:\/\/)|(^wss:\/\/)/.test(url)) {
					throw new TypeError('Failed to construct \'WebSocket\': The URL \'' + url + '\' is invalid');
				}

				this.url = url;
				this.readyState = WebSocket.CONNECTING;

				var socketTask = wx.connectSocket({
					url: url,
					protocols: Array.isArray(protocols) ? protocols : [protocols]
				});

				_socketTask.set(this, socketTask);

				socketTask.onClose(function (res) {
					_this.readyState = WebSocket.CLOSED;
					if (typeof _this.onclose === 'function') {
						_this.onclose(res);
					}
				});

				socketTask.onMessage(function (res) {
					if (typeof _this.onmessage === 'function') {
						_this.onmessage(res);
					}
				});

				socketTask.onOpen(function () {
					_this.readyState = WebSocket.OPEN;
					if (typeof _this.onopen === 'function') {
						_this.onopen();
					}
				});

				socketTask.onError(function (res) {
					if (typeof _this.onerror === 'function') {
						_this.onerror(new Error(res.errMsg));
					}
				});

				return this;
			} // TODO 小程序内目前获取不到，实际上需要根据服务器选择的 sub-protocol 返回
			// TODO 更新 bufferedAmount
			// The connection is closed or couldn't be opened.

			// The connection is open and ready to communicate.


			_createClass(WebSocket, [{
				key: 'close',
				value: function close(code, reason) {
					this.readyState = WebSocket.CLOSING;
					var socketTask = _socketTask.get(this);

					socketTask.close({
						code: code,
						reason: reason
					});
				}
			}, {
				key: 'send',
				value: function send(data) {
					if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
						throw new TypeError('Failed to send message: The data ' + data + ' is invalid');
					}

					var socketTask = _socketTask.get(this);

					socketTask.send({
						data: data
					});
				}
			}]);

			return WebSocket;
		}();

		WebSocket.CONNECTING = 0;
		WebSocket.OPEN = 1;
		WebSocket.CLOSING = 2;
		WebSocket.CLOSED = 3;
		exports.default = WebSocket;

		/***/
	},
	/* 20 */
	/***/function (module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});

		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}

		/*
	  * TODO 使用 wx.readFile 来封装 FileReader
	  */
		var FileReader = function FileReader() {
			_classCallCheck(this, FileReader);
		};

		exports.default = FileReader;

		/***/
	},
	/* 21 */
	/***/function (module, exports) {

		"use strict";

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		var localStorage = {
			get length() {
				var _wx$getStorageInfoSyn = wx.getStorageInfoSync(),
				    keys = _wx$getStorageInfoSyn.keys;

				return keys.length;
			},

			key: function key(n) {
				var _wx$getStorageInfoSyn2 = wx.getStorageInfoSync(),
				    keys = _wx$getStorageInfoSyn2.keys;

				return keys[n];
			},
			getItem: function getItem(key) {
				return wx.getStorageSync(key);
			},
			setItem: function setItem(key, value) {
				return wx.setStorageSync(key, value);
			},
			removeItem: function removeItem(key) {
				wx.removeStorageSync(key);
			},
			clear: function clear() {
				wx.clearStorageSync();
			}
		};

		exports.default = localStorage;

		/***/
	},
	/* 22 */
	/***/function (module, exports) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
			value: true
		});
		var location = {
			href: 'game.js',
			reload: function reload() {}
		};

		exports.default = location;

		/***/
	}]
	/******/);

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(72);

/***/ })

/******/ })
});
;
>>>>>>> 44f9f938734159d0f29ab3a3aa631e48dcfabf92
