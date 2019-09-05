import pluginPhysics from './plugin-physics';
import pluginWebgl3DS from './plugin-webgl-3ds';
import pluginWebglMMD from './plugin-webgl-mmd';
import pluginWebglLoaders from './plugin-webgl-loaders';
import pluginWebgl from './plugin-webgl';

export default `
    ${pluginPhysics}
    ${pluginWebgl3DS}
    ${pluginWebglMMD}
    ${pluginWebglLoaders}
    ${pluginWebgl}
`;
