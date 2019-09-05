import constants from 'constants';

module.exports = function () {
    this.off('ticked', this.combine);

    if (!this.$combine) return;
    if (this.$combine === 9) {
        this.$combine = false;
        return;
    }

	this.content = this.$combine.content;
    this.children = this.$combine.children;

    Object.keys(this.style).forEach((key) => {
        this.style[key] = undefined;
    });


    Object.keys(this.$combine.style).forEach((key) => {
        this.style[key] = this.$combine.style[key];
    });

    this.$combine = false;

    this.recalculate(true);
};
