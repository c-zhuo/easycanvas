import intro from './contents/intro.js';
import quickstart from './contents/quickstart.js';
import inherit from './contents/inherit.js';
import image from './contents/image.js';
import events from './contents/events.js';
import text from './contents/text.js';
import sequence from './contents/sequence.js';
import hooks from './contents/hooks.js';
import customEvent from './contents/customEvent.js';
import sprite from './contents/sprite.js';
import pluginPhysics from './contents/plugin-physics.js';

let content = `
    ${intro}
    ${quickstart}

    ${inherit}
    ${image}
    ${events}
    ${text}
    ${sequence}
    ${hooks}
    ${customEvent}
    ${sprite}

    ${pluginPhysics}
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
