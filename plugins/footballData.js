import rp from 'request-promise'

export default function footballDataPlugin(schema, options) {
  schema.statics.footballData = rp.defaults({
    'baseUrl': options.url,
    'headers': {
      'User-Agent': 'football-betting-game-api',
      'X-Auth-Token': options.token,
      'X-Response-Control': 'minified'
    },
    'json': true
  })
}
