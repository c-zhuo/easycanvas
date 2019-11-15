/**
 *
 */
function __inherit( child, parent ) {
  var getPrototype = function( p ) {
    if( Object.create ) {
      return Object.create( p ) ;
    }
    function f( ) { } ;
    f.prototype = p ;
    return new f( ) ;
  } ;
  child.prototype = getPrototype( parent.prototype ) ;
  child.prototype.constructor = child ;
}

// function __copyParentMethod(child, parent, methodName) {
//   var parentName = parent.name;
//   var name = parentName + '_' + 
//                ((methodName[0] == '_') ? methodName.slice(1) : methodName);
//   child.prototype[name] = parent.prototype[methodName];
// }

export default __inherit;