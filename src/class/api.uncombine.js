module.exports = function () {
    this.off('ticked', this.combine);

    if (!this.$combine) return;

	this.content = this.$combine.content;
    this.children = this.$combine.children;

    Object.keys(this.style).forEach((key) => {
        this.style[key] = undefined;
    });


    Object.keys(this.$combine.style).forEach((key) => {
        this.style[key] = this.$combine.style[key];
    });

    this.$combine = false;

    // I don't know why nextTick
    // cache is not 0 after recalculating in current tick
    this.nextTick(() => {
        this.recalculate(true);
    });
};
