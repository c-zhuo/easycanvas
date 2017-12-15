import lite from './index.lite.js';

import gif2canvas from './utils/gif2canvas.js';

let supplements = {
    gif2canvas,
};

for (let i in supplements) {
    if (Object.prototype.hasOwnProperty.call(supplements, i)) {
        lite[i] = supplements[i];
    }
}

module.exports = lite;
