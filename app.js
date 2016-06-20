import bets from './api/bets'
import bodyParser from 'koa-bodyparser'
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
app.use(mongoose({
  'host': process.env.DB_HOST,
  'port': process.env.DB_PORT,
  'db': process.env.DB_NAME,
  'username': process.env.DB_USERNAME,
  'password': process.env.DB_PASSWORD
}))

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
  .use(bets.routes())
  .use(bets.allowedMethods())

export default app
