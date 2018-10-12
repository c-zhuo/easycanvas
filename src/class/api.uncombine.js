module.exports = function () {
    Object.assign(this, this.$combine);

    this.$combine = false;
    this.events.$interceptor = false;
};
