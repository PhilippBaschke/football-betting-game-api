import {Bet, deserialize, serialize} from './model'
import {Deserializer, Serializer} from 'jsonapi-serializer'

const jsonSerializer = new Serializer(serialize.type, serialize.opts)
const jsonDeserializer = new Deserializer(deserialize)

const index = async (ctx, next) => {
  const bets = await Bet.find().lean()

  ctx.body = jsonSerializer.serialize(bets)
  await next()
}

const show = async (ctx, next) => {
  // lean() is necessary because serialize checks with
  // lodash.isPlainObject which does not work with a mongoose object
  // filtering out nested attributes does not work in this case
  // See: http://stackoverflow.com/q/7503450
  const bet = await Bet.findOne({
    '_id': ctx.params.id
  }).lean()

  ctx.body = jsonSerializer.serialize(bet)
  await next()
}

const create = async (ctx, next) => {
  const betData = await jsonDeserializer.deserialize(ctx.request.body)
  const newBet = await new Bet(betData).save()

  ctx.body = jsonSerializer.serialize(newBet.toObject())
  await next()
}

export default {
  index,
  show,
  create
}
