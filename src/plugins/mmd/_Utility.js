/**
 * @param {Integer} type bin->2, oct->8, degit->10, hex->16
 * @param {Integer} num
 * @param {Integer} figures
 */
function __toString(type, num, figure) {

  var base = '';
  var prefix = '';
  var minus = '';

  if(type == 8)
    prefix = '0';
  else if(type == 16)
    prefix = '0x';

  for(var i = 0; i < figure; i++)
    base += '0' ;

  return prefix + (base + num.toString(type)).substr(-1 * figure);
};

module.exports = __toString;
