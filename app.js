import dotenv from 'dotenv'
import games from './api/games'
import jsonApiContentNegotiation from './middleware/jsonApiContentNegotiation'
import Koa from 'koa'
import mongoose from './middleware/mongoose'

const app = new Koa()

/**
 * Load environment variables from .env
 */
dotenv.config()

/**
 * Perform JSON Api content negotiation
 */
app.use(jsonApiContentNegotiation)

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
  .use(games.routes())
  .use(games.allowedMethods())

export default app
