/* Use Babel for async and await support
 * https://github.com/koajs/koa/tree/2.0.0#babel-setup
 */
require('babel-core/register')

/**
 * Load environment variables from .env
 */
const dotenv = require('dotenv')

dotenv.config()

/**
 * Register mongoose plugins
 */
const mongoose = require('mongoose')

mongoose.plugin(require('./plugins/footballData').default, {
  'url': 'http://api.football-data.org/v1/',
  'token': process.env.FD_API_TOKEN
})

/**
 * Load the app
 */
module.exports = require('./app.js').default
