import {Deserializer, Serializer} from './serializer'
import fp from 'lodash/fp'
import SoccerSeason from './model'
import Team from '../teams/model'

/* eslint-disable camelcase */
const only_id = fp.compose(fp.mapKeys(() => '_id'), fp.pick(['id']))

/* eslint-enable camelcase */
const index = async (ctx, next) => {
  const soccerSeasons = await SoccerSeason.find().populate('teams')

  ctx.body = Serializer.serialize(fp.map((s) => s.toObject(), soccerSeasons))
  await next()
}

const show = async (ctx, next) => {
  const soccerSeason = await SoccerSeason.findOne({
    '_id': ctx.params.id
  }).populate('teams')

  ctx.body = Serializer.serialize(soccerSeason.toObject())
  await next()
}

const create = async (ctx, next) => {
  const requestData = await Deserializer.deserialize(ctx.request.body)
  const newSoccerSeason = await new SoccerSeason(only_id(requestData))
  const soccerSeasonTeams = await Team.createFromSoccerSeason(requestData.id)

  newSoccerSeason.teams.addToSet(...soccerSeasonTeams)
  await newSoccerSeason.save()
  await SoccerSeason.populate(newSoccerSeason, {'path': 'teams'})

  ctx.body = Serializer.serialize(newSoccerSeason)
  await next()
}

export default {
  index,
  show,
  create
}
