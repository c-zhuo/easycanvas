const inBrowser = typeof window !== 'undefined';

export default (component, name) => {
    if (inBrowser && window.Easycanvas) {
        Easycanvas[name] = function (opt) {
            return component(opt, Easycanvas);
        };
    }
}