import {deserialize, Game, serialize} from './model'
import {Deserializer, Serializer} from 'jsonapi-serializer'

const jsonSerializer = new Serializer(serialize.type, serialize.opts)
const jsonDeserializer = new Deserializer(deserialize)

const index = async (ctx, next) => {
  const games = await Game.find()

  ctx.body = jsonSerializer.serialize(games)
  await next()
}

const show = async (ctx, next) => {
  const game = await Game.findOne({
    '_id': ctx.params.id
  })

  ctx.body = jsonSerializer.serialize(game)
  await next()
}

const create = async (ctx, next) => {
  const gameData = await jsonDeserializer.deserialize(ctx.request.body)

  gameData._id = gameData.id
  const newGame = await new Game(gameData).save()

  ctx.body = jsonSerializer.serialize(newGame)
  await next()
}

export default {
  index,
  show,
  create
}
