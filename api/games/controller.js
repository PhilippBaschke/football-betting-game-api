import {Deserializer, Serializer} from './serializer'
import fp from 'lodash/fp'
import Game from './model'

const index = async (ctx, next) => {
  const games = await Game.find().populate({
    'path': 'soccerseason',
    'select': 'caption league year'
  })

  ctx.body = Serializer.serialize(games)
  await next()
}

const transformSingleTeams = fp.mapValues.convert({'cap': false})(
  (value, key) => {
    if (key === 'winner' || key === 'surpriseTeam' || key === 'loserTeam') {
      return {'_id': value}
    }

    return value
  }
)
const transformBets = fp.map(transformSingleTeams)
const transform = (game) => fp.set('bets', transformBets(game.bets), game)

const show = async (ctx, next) => {
  const game = await Game.findOne({
    '_id': ctx.params.id
  }).populate({
    'path': 'soccerseason',
    'populate': {'path': 'teams'}
  })

  ctx.body = Serializer.serialize(transform(game.toObject()))
  await next()
}

const create = async (ctx, next) => {
  const gameData = await Deserializer.deserialize(ctx.request.body)

  gameData._id = gameData.id
  const newGame = await new Game(gameData).save()

  ctx.body = Serializer.serialize(newGame)
  await next()
}

export default {
  index,
  show,
  create
}
