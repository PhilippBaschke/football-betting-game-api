import {Deserializer, Serializer} from './serializer'
import fp from 'lodash/fp'
import SoccerSeason from './model'
import Team from '../teams/model'

/* eslint-disable camelcase */
const only_id = fp.compose(fp.mapKeys(() => '_id'), fp.pick(['id']))

/* eslint-enable camelcase */
const index = async (ctx, next) => {
  const soccerSeasons = await SoccerSeason.find().populate('teams')

  ctx.body = Serializer.serialize(soccerSeasons)
  await next()
}

const show = async (ctx, next) => {
  const soccerSeason = await SoccerSeason.findOne({
    '_id': ctx.params.id
  }).populate('teams')

  ctx.body = Serializer.serialize(soccerSeason)
  await next()
}

const createTeams = async (apiData) => {
  const teamData =
          fp.map((team) => fp.set('_id', team.id, team), apiData.teams)
  const newTeams = await Team.create(teamData)

  return fp.map('_id', newTeams)
}

const createSoccerSeason = async (ctx) => {
  const requestData = await Deserializer.deserialize(ctx.request.body)
  const soccerseasonsApi = `/soccerseasons/${requestData.id}`
  const apiData = await ctx.footballData(soccerseasonsApi)
  const soccerSeasonData = fp.assign(only_id(requestData), apiData)
  const newTeams = await createTeams(
    await ctx.footballData(`${soccerseasonsApi}/teams`)
  )
  const newSoccerSeason = await new SoccerSeason(soccerSeasonData)

  newSoccerSeason.teams.addToSet(...newTeams)

  return newSoccerSeason
}

const create = async (ctx, next) => {
  const newSoccerSeason = await createSoccerSeason(ctx)

  newSoccerSeason.save()
  await SoccerSeason.populate(newSoccerSeason, {'path': 'teams'})

  ctx.body = Serializer.serialize(newSoccerSeason)
  await next()
}

export default {
  index,
  show,
  create
}
