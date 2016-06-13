/* Use Babel for async and await support
 * https://github.com/koajs/koa/tree/2.0.0#babel-setup
 */
require('babel-core/register')
module.exports = require('./app.js').default
