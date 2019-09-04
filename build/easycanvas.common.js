if (process.env.NODE_ENV === 'production') {
  module.exports = require('./easycanvas.common.prod.js')
} else {
  module.exports = require('./easycanvas.common.dev.js')
}
