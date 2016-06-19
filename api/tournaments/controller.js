import {Deserializer, Serializer} from './serializer'
import fp from 'lodash/fp'
import Tournament from './model'

/* eslint-disable camelcase */
const only_id = fp.compose(fp.mapKeys(() => '_id'), fp.pick(['id']))

/* eslint-enable camelcase */
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
  const tournamentRequestData =
          await Deserializer.deserialize(ctx.request.body)
  const tournamentApiData =
          await ctx.footballData(`/soccerseasons/${tournamentRequestData.id}`)
  const tournamentData = fp.assign(
    only_id(tournamentRequestData),
    tournamentApiData
  )
  const newTournament = await new Tournament(tournamentData).save()

  ctx.body = Serializer.serialize(newTournament)
  await next()
}

export default {
  index,
  show,
  create
}
