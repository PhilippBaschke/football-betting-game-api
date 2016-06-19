import {Deserializer, Serializer} from './serializer'
import Tournament from './model'

const index = async (ctx, next) => {
  const tournaments = await Tournament.find().lean()

  ctx.body = Serializer.serialize(tournaments)
  await next()
}

const show = async (ctx, next) => {
  const tournament = await Tournament.findOne({
    '_id': ctx.params.id
  }).lean()

  ctx.body = Serializer.serialize(tournament)
  await next()
}

const create = async (ctx, next) => {
  const tournamentData = await Deserializer.deserialize(ctx.request.body)

  tournamentData._id = tournamentData.id
  const newTournament = await new Tournament(tournamentData).save()

  ctx.body = Serializer.serialize(newTournament)
  await next()
}

export default {
  index,
  show,
  create
}
