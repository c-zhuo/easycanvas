import demos from './contents/demos.js';
import intro from './contents/intro.js';
import quickstartStand from './contents/quickstart-standalone.js';
import quickstartNPM from './contents/quickstart-npm.js';
import quickstartGen from './contents/quickstart-gen.js';
import quickstartWxgame from './contents/quickstart-wxgame.js';
import quickstartWxapp from './contents/quickstart-wxapp.js';
import changelog from './contents/changelog.js';

import add from './contents/base-add.js';
import image from './contents/base-image.js';
import inherit from './contents/base-inherit.js';
import events from './contents/base-events.js';
import text from './contents/base-text.js';
import hooks from './contents/base-hooks.js';
import customEvent from './contents/base-customEvent.js';
import Sprite from './contents/base-Sprite.js';

import apiSprite from './contents/api-sprite.js';
import apiEvent from './contents/api-event.js';

import pluginPhysics from './contents/plugin-physics.js';
import pluginWebgl from './contents/plugin-webgl.js';
import pluginWebgl3DS from './contents/plugin-webgl-3ds.js';
import pluginWebglMMD from './contents/plugin-webgl-mmd.js';
import pluginWebglLoaders from './contents/plugin-webgl-loaders.js';

import componentBase from './contents/component.js';
import componentView from './contents/component-view.js';
import componentText from './contents/component-text.js';
import componentScroll from './contents/component-scroll.js';
import componentSequence from './contents/component-sequence.js';

let content = `
    ${demos}
    ${intro}
    ${quickstartNPM}
    ${quickstartGen}
    ${quickstartStand}
    ${quickstartWxgame}
    ${quickstartWxapp}
    ${changelog}

    ${add}
    ${image}
    ${inherit}
    ${events}
    ${text}
    ${hooks}
    ${customEvent}
    ${Sprite}

    ${apiSprite}
    ${apiEvent}

    ${pluginPhysics}
    ${pluginWebgl}
    ${pluginWebgl3DS}
    ${pluginWebglMMD}
    ${pluginWebglLoaders}

    ${componentBase}
    ${componentView}
    ${componentText}
    ${componentScroll}
    ${componentSequence}
`;

let splits = content.split(/<\/*code>/);
splits = splits.map((str, i) => {
    if (i % 2) {
        let margin = '                ';
        str = str
            .replace(/\</g, '&lt;')
            .replace(/\</g, '&lt;')
            .split(/\n/)
            .slice(1, -1) // 首尾是空行;
            .map((line) => {
                let res = line;
                if (line.indexOf(margin) === 0) {
                    res = line.substr(margin.length);
                } else if (line.indexOf(margin.substr(0, margin.length - 4)) === 0) {
                    res = line.substr(margin.length - 4);
                } else {
                    res = line;
                }
                return res.replace(/ /g, '&nbsp;');
            })
            .join('<br>');
        return '<code>' +
            str +
            '</code>';
    }

    return str;
});

module.exports = splits.join('');
