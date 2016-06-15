import {Game, serialize} from './model'
import {Serializer} from 'jsonapi-serializer'

const jsonSerializer = new Serializer(serialize.type, serialize.opts)

const index = async (ctx, next) => {
  const games = await Game.find()

  ctx.body = jsonSerializer.serialize(games)
  await next()
}

const show = async (ctx, next) => {
  const game = await Game.findOne({
    'title': ctx.params.title
  })

  ctx.body = jsonSerializer.serialize(game)
  await next()
}

export default {
  index,
  show
}
