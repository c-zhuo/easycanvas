/** ********** *
 *
 * Call canvas.prototype's text functions
 * - Default type is fillText.
 *
 * ********** **/

module.exports = function (text) {
    this.$paintContext.font = text.font;
    this.$paintContext.strokeStyle = text.color;
    this.$paintContext.fillStyle = text.color;
    this.$paintContext.textAlign = text.align;
    this.$paintContext[text.type || 'fillText'](text.content, parseInt(text.tx), parseInt(text.ty));
};
