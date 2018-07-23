/** ********** *
 *
 * Based on mmd-viewer-js, Ammo.js
 * - https://github.com/takahirox/mmd-viewer-js
 * - https://github.com/kripken/ammo.js
 *
 * ********** **/

import Pmd from './plugins/mmd/Pmd.js';
import PmdFileParser from './plugins/mmd/PmdFileParser.js';
import PmdModelView from './plugins/mmd/PmdModelView_easycanvas.js';
import PmdView from './plugins/mmd/PmdView_easycanvas.js';
import Vmd from './plugins/mmd/Vmd.js';
import VmdFileParser from './plugins/mmd/VmdFileParser.js';
import Physics from './plugins/mmd/Physics.js';

window.PmdModelView = PmdModelView;
window.PmdView = PmdView;
window.Vmd = Vmd;
window.VmdFileParser = VmdFileParser;
window.Physics = Physics;

const err = function (msg) {
    console.error('[Easycanvas-webgl] ' + msg);
};

const pmdCache = {};
const ProcessingFlag = 'processing';

var __analyzePMD = function(url, buffer, callback) {
    var pfp = new PmdFileParser(buffer);

    if(!pfp.valid()) {
        err('PMD Parse Error.');
        return;
    }

    var pmd = pfp.parse();
    pmd.setup();

    var vertices = pmd.vertices.map((a) => {return a.position}).join(',').split(',').map(a => Number(a));
    var normals = pmd.vertices.map((a) => {return a.normal}).join(',').split(',');
    var textures = pmd.vertices.map((a) => {return a.uv}).join(',').split(',');
    var indices = pmd.vertexIndices.map((a) => {return a.index});

    var data = {
        vertices,
        normals,
        textures,
        indices,
    };

    pmd.$vertices = vertices;

    pmdCache[url] = {
        data,
        pmd
    };

    callback(data, pmd);
};

var __analyzeVMD = function(buffers, callback) {
    var vmds = [];
    var vfps = [];
    for(var i = 0; i < buffers.length; i++) {
        vfps[i] = new VmdFileParser(buffers[i]);

        if(!vfps[i].valid()) {
            err('VMD Parse Error.');
            return;
        }

        vmds[i] = vfps[i].parse();
    }

    var vmd = vmds[0];
    var vfp = vfps[0];
    // __vfp = vfps[0]; // for console debug.
    // __vmd = vmds[0]; // for console debug.

    for(var i = 1; i < buffers.length; i++) {
        vmd.merge(vmds[i]);
    }

    // if(__selectedMotion.music) {
    //   __loadMusicFile();
    // } else {
        callback({
            start: function (pmd, vertices) {
                var p = new Physics(pmd);
                var v = new PmdView();
                var mv = new PmdModelView(null, pmd, v);
                mv.setup(); // 
                mv._initMotions();
                v.setup();
                v.addModelView(mv);

                // TODO: has accessed pmdView
                v.setVMD(vmd);
                // pmdView.setEye(__selectedMotion.eye);
                v.startDance();

                let getVerticals = mv.getVerticals;

                window.getVerticals=getVerticals;

                setInterval(() => {
                    v.update();
                    for (let i = 0, l = vertices.length / 3; i < l; i++) {
                        // 这块比较耗性能，需要修改
                        let temp = getVerticals(i);
                        vertices[i * 3 + 0] = temp[0];
                        vertices[i * 3 + 1] = temp[1];
                        vertices[i * 3 + 2] = temp[2];
                    }
                    vertices.$cacheBuffer = undefined;
                }, 50);
            },
        });
    // }
};

const loaderPMD = function(url, callback, useCache = true) {
    if (useCache) {
        if (pmdCache[url]) {
            if (pmdCache[url] === ProcessingFlag) {
                setTimeout(() => {
                    loaderPMD(url, callback);
                }, 100);
            } else {
                callback(pmdCache[url].data, pmdCache[url].pmd);
            }
            return;
        }
        pmdCache[url] = ProcessingFlag;
    }

    var modelURL = url;

    var request = new XMLHttpRequest();
    request.responseType = 'arraybuffer';
    request.onload = function() {
        __analyzePMD(url, request.response, callback);
    };
    request.onerror = function(error) {
        err('PMD File Loaded Error.');
    };
    request.open('GET', modelURL, true);
    request.send(null);
};

const loaderVMD = function(urls, callback, index, buffers) {
    // 这俩参数暂时没发现有多大用
    index = index || 0;
    buffers = buffers || [];

    var url = urls.pop ? urls.length[index] : urls;

    var request = new XMLHttpRequest();
    request.responseType = 'arraybuffer';
    request.onload = function() {
        buffers.push(request.response);
        // if (index + 1 >= urls.length) {
            __analyzeVMD(buffers, callback);
        // } else {
        //     loaderVMD(urls, index+1, buffers);
        // }
    };
    request.onerror = function(error) {
        err('VMD File Loaded Error.');
    };
    request.open('GET', url, true);
    request.send(null);
};

const classInit = function (opt) {
    if (!opt.webgl || !opt.webgl.pmd) {
        return;
    }

    let pmdUrl = opt.webgl.pmd;
    let imgPath = opt.webgl.imgPath;
    let useCache = opt.webgl.cache !== false;
    let sprite = this;

    let vmdQueue;

    loaderPMD(pmdUrl, (data, pmd) => {
        sprite.webgl = {};

        let vertices = data.vertices;
        let normals = data.normals;
        let textures = data.textures;
        let indices = data.indices;

        delete opt.webgl.pmd;
        delete opt.webgl.imgPath;
        delete opt.webgl.cache;

        let lastCount = 0;

        pmd.materials.forEach((mt, i) => {
            let currentIndices = pmdCache[pmdUrl]['currentIndices' + i] || indices.slice(lastCount, lastCount + mt.vertexCount);
            pmdCache[pmdUrl]['currentIndices' + i] = currentIndices;

            sprite.add({
                name: mt.fileName,
                // 这块如果属性是function的话assign过去会有坑，需要改成非function的再assign过去，todo
                webgl: Object.assign(window.Easycanvas.webglShapes.custom({
                    vertices: vertices,
                    normals: normals,
                    indices: currentIndices,
                    textures: textures,
                    img: mt.fileName ? (imgPath + mt.fileName) : undefined,
                    colors: mt.fileName ? undefined : (
                        mt.color.map((num) => {return num * 255}).slice(0, 3)
                    ), // mirrorColor
                }), opt.webgl),
            });
            lastCount += mt.vertexCount;
        });

        sprite.vmdStart = (vmdUrl) => {
            loaderVMD(vmdUrl, function (vmd) {
                vmd.start(pmd, sprite.children[0].webgl.vertices);
            });
        };

        if (vmdQueue) {
            sprite.vmdStart(vmdQueue);
        }

        sprite.trigger('webgl-mmd-loaded');
    }, useCache);

    sprite.vmdStart = (vmdUrl) => {
        vmdQueue = vmdUrl;
    }
};

const inBrowser = typeof window !== 'undefined';

if (inBrowser && window.Easycanvas) {
    Easycanvas.loaderPMD = loaderPMD;
    Easycanvas.loaderVMD = loaderVMD;
    Easycanvas.extend(classInit);
} else {
    module.exports = {
        loaderPMD,
        loaderVMD,
        classInit,
    };
}
