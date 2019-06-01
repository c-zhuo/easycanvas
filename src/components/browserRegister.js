const inBrowser = typeof window !== 'undefined';

export default (component, name) => {
    if (inBrowser && window.Easycanvas) {
        Easycanvas.class[name] = (opt) => {
            return component(Easycanvas.sprite, opt);
        };
    }
}