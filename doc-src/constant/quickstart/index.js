import quickstartStand from './quickstart-standalone.js';
import quickstartNPM from './quickstart-npm.js';
import quickstartGen from './quickstart-gen.js';
import quickstartWxgame from './quickstart-wxgame.js';
import quickstartWxapp from './quickstart-wxapp.js';

export default `
    ${quickstartNPM}
    ${quickstartGen}
    ${quickstartStand}
    ${quickstartWxgame}
    ${quickstartWxapp}
`;
