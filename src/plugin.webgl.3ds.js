/** ********** *
 *
 * Based on lib3ds.js, transform *.3ds files to JSON structrue
 * - https://github.com/timknip/js3ds/blob/master/js/lib3ds.js
 *
 * ********** **/

import Lib3ds from 'lib/lib3ds.js';

function loader3DS(url, callback) {
    var req = new XMLHttpRequest();

    if(req.overrideMimeType) {
        req.overrideMimeType("text/plain; charset=x-user-defined"); // urgh, that took a while to google
    }

    req.onreadystatechange = function () {
        if(req.readyState == 4) {
            if(req.status == 0 || req.status == 200) {
                // @0 is some div to log some stuff, ie: document.getElementById("myDebugDiv")
                // @1 is a boolean indicating whether to log
                var res = new Lib3ds(false, false);
                res.readFile(req.responseText)

                var data = [];

                // loop over the parsed meshes
                for (var i = 0; i < res.meshes.length; i++) {
                    var vertices = [];
                    var indices = [];
                    var textures = [];
                    // var colors = [];

                    var mesh = res.meshes[i]; // a mesh is of type Lib3dsMesh

                    // vertices
                    for (var j = 0; j < mesh.points; j++) {
                        var vert = mesh.pointL[j]; // a vert is an Array(3)
                        vertices.push(vert[0]);
                        vertices.push(vert[1]);
                        vertices.push(vert[2]);
                    }

                    // faces
                    for (j = 0; j < mesh.faces; j++) {
                        var face = mesh.faceL[j] // a face is of type Lib3dsFace

                        // indices into the vert array above
                        var idx0 = face.points[0];
                        var idx1 = face.points[1];
                        var idx2 = face.points[2];
                        indices.push(idx0);
                        indices.push(idx1);
                        indices.push(idx2);

                        // so the face vertices are:
                        // var v0 = mesh.pointL[ idx0 ];
                        // var v1 = mesh.pointL[ idx1 ];
                        // var v2 = mesh.pointL[ idx2 ];

                        // and the material for the face is:
                        // var materialName = face.material;
                        // var material = res.materials[materialName];
                        // if (material) {
                        //     // var useColor = material.ambientColor;
                        //     // var useColor = material.specularColor;
                        //     var useColor = material.diffuseColor;
                        //     if (useColor !== undefined) {
                        //         var current = '000000' + Number(useColor).toString(16);
                        //         colors.push(parseInt(current.substr(-6,2), 16));
                        //         colors.push(parseInt(current.substr(-4,2), 16));
                        //         colors.push(parseInt(current.substr(-2,2), 16));
                        //     }
                        // }
                    }

                    // texels / uv: guess you can use the face indices above
                    for (j = 0; j < mesh.texels; j++) {
                        var uv = mesh.texelL[j];
                        var u = uv[0];
                        var v = uv[1];
                        textures.push(u);
                        textures.push(1-v);
                    }

                    data.push({
                        vertices: vertices,
                        indices: indices,
                        textures: textures,
                        img: mesh.faceL[0] && mesh.faceL[0].material,
                    });
                }

                callback(data, res);
            }
        }
    }
    req.open("GET", url, true);
    req.send(null);
};

const classInit = function (opt) {
    if (!opt.webgl || !opt.webgl._3ds) {
        return;
    }

    let _3dsUrl = opt.webgl._3ds;
    let _3dsImg = opt.webgl._3dsImg;
    let useCache = opt.webgl.cache !== false;
    let sprite = this;

    loader3DS(_3dsUrl, (data) => {
        sprite.webgl = {};
        delete opt.webgl._3ds;
        delete opt.webgl.cache;

        data.forEach(function (model) {
            let imgOrColors = _3dsImg && _3dsImg[model.img];

            sprite.add({
                name: model.img,
                webgl: Object.assign(window.Easycanvas.webglShapes.custom({
                    vertices: model.vertices,
                    indices: model.indices,
                    img: !(imgOrColors instanceof Array) && imgOrColors,
                    textures: model.textures,
                    colors: (imgOrColors instanceof Array) && imgOrColors,
                }), opt.webgl),
            });
        });

        sprite.trigger('webgl-3ds-loaded');
    }, useCache);
};

const inBrowser = typeof window !== 'undefined';

if (inBrowser && window.Easycanvas) {
    window.Easycanvas.loader3DS = loader3DS;
    Easycanvas.extend(classInit);
} else {
    module.exports = {
        loader3DS,
        classInit,
    };
}
