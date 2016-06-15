import bluebird from 'bluebird'
import mongoose from 'mongoose'

/**
 * Middleware to open a mongoose connection and add it to the ctx
 *
 * @param {object} options The database options
 * @return {function} A koa middleware function that adds db to ctx
 */
export default function mongooseMiddleware(options) {
  let connectionString = 'mongodb://'

  if (options.username && options.password) {
    connectionString += `${options.username}:${options.password}@`
  }
  connectionString += `${options.host}:${options.port}/${options.db}`
  mongoose.connect(connectionString)

  // mpromise is deprecated, you need to plugin in your own Promise library
  // See: http://mongoosejs.com/docs/promises.html
  mongoose.Promise = bluebird

  return async (ctx, next) => {
    ctx.db = mongoose.connection
    await next()
  }
}
