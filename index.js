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
 * Load the configuration
 */
const config = require('config')

/**
 * Register mongoose plugins
 */
const mongoose = require('mongoose')

mongoose.plugin(require('./plugins/footballData').default, config.footballData)

/**
 * Load the app
 */
module.exports = require('./app.js').default
