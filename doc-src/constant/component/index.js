import componentInput from './component-input';
import componentScroll from './component-scroll';
import componentSequence from './component-sequence';
import componentText from './component-text';
import componentView from './component-view';
import componentDraggable from './component-draggable';
import component from './component';

export default `
    ${componentInput}
    ${componentScroll}
    ${componentSequence}
    ${componentText}
    ${componentView}
    ${componentDraggable}
    ${component}
`.replace(/<</g, '&lt;').replace(/>>/g, '&gt;');
