/**
 * Perform JSON Api content negotiation
 * See: http://jsonapi.org/format/#content-negotiation
 *
 * @param {Context} ctx The koa context of the request
 * @param {function} next The function that should be called next
 * @returns {null} Nothing
 */
const jsonApiContentNegotiation = async (ctx, next) => {
  await next()
  ctx.set('Content-Type', 'application/vnd.api+json')
}

export default jsonApiContentNegotiation
