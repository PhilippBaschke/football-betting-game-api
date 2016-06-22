import bets from './api/bets'
import bodyParser from 'koa-bodyparser'
import config from 'config'
import fixtures from './api/fixtures'
import games from './api/games'
import jsonApiContentNegotiation from './middleware/jsonApiContentNegotiation'
import Koa from 'koa'
import mongoose from './middleware/mongoose'
import soccerSeasons from './api/soccerseasons'
import teams from './api/teams'

const app = new Koa()

/**
 * Perform JSON Api content negotiation
 */
app.use(jsonApiContentNegotiation)

/**
 * Parse the body
 */
app.use(bodyParser({
  'enableTypes': [
    'json'
  ],
  'extendTypes': {
    'json': [
      'application/vnd.api+json'
    ]
  }
}))

/**
 * Database (with mongoose)
 */
app.use(mongoose(config.database))

/**
 * Routes
 */
app
  .use(soccerSeasons.routes())
  .use(soccerSeasons.allowedMethods())
  .use(teams.routes())
  .use(teams.allowedMethods())
  .use(games.routes())
  .use(games.allowedMethods())
  .use(fixtures.routes())
  .use(fixtures.allowedMethods())
  .use(bets.routes())
  .use(bets.allowedMethods())

export default app
