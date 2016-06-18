import {deserialize, serialize} from './model'
import {Deserializer, Serializer} from 'jsonapi-serializer'
import fp from 'lodash/fp'
import Game from '../games/model'
import mongoose from 'mongoose'

const jsonSerializer = new Serializer(serialize.type, serialize.opts)
const jsonDeserializer = new Deserializer(deserialize)

const index = async (ctx, next) => {
  const bets = await Game.aggregate([
    {
      '$unwind': '$bets'
    },
    {
      '$project': {
        '_id': '$bets._id',
        'game': '$_id',
        'player': '$bets.player',
        'teams': '$bets.teams',
        'surpriseTeam': '$bets.surpriseTeam',
        'loserTeam': '$bets.loserTeam',
        'winner': '$bets.winner'
      }
    }
  ])

  ctx.body = jsonSerializer.serialize(bets)
  await next()
}

const show = async (ctx, next) => {
  // aggregate needs an ObjectId
  // See: https://github.com/Automattic/mongoose/issues/1399
  const objectId = new mongoose.Types.ObjectId(ctx.params.id)

  // First $match selects the game that has the bet
  // Second $match only selects the bet
  const bet = await Game.aggregate([
    {
      '$match': {
        'bets._id': objectId
      }
    },
    {
      '$unwind': '$bets'
    },
    {
      '$match': {
        'bets._id': objectId
      }
    },
    {
      '$project': {
        '_id': '$bets._id',
        'game': '$_id',
        'player': '$bets.player',
        'teams': '$bets.teams',
        'surpriseTeam': '$bets.surpriseTeam',
        'loserTeam': '$bets.loserTeam',
        'winner': '$bets.winner'
      }
    }
  ])

  ctx.body = jsonSerializer.serialize(bet)
  await next()
}

const create = async (ctx, next) => {
  const betData = await jsonDeserializer.deserialize(ctx.request.body)
  const game = await Game.findOne({
    '_id': betData.game
  })
  let newBet = null

  game.bets.push(game.bets.create(betData))
  newBet = fp.last(game.bets)
  await game.save()

  ctx.body = jsonSerializer.serialize(newBet.toObject())
  await next()
}

export default {
  index,
  show,
  create
}
