import rp from 'request-promise'

export default function footballData(options) {
  const footballDataRequest = rp.defaults({
    'baseUrl': options.url,
    'headers': {
      'User-Agent': 'football-betting-game-api',
      'X-Auth-Token': options.token
    },
    'json': true
  })

  return async (ctx, next) => {
    ctx.footballData = footballDataRequest
    await next()
  }
}
