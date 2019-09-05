import apiEvent from './api-event';
import apiSprite from './api-sprite';
import apiTransition from './api-transition';

export default `
    ${apiEvent}
    ${apiSprite}
    ${apiTransition}
`.replace(/<</g, '&lt;').replace(/>>/g, '&gt;');
