import {Deserializer, Serializer} from './serializer'
import fp from 'lodash/fp'
import SoccerSeason from './model'

/* eslint-disable camelcase */
const only_id = fp.compose(fp.mapKeys(() => '_id'), fp.pick(['id']))

/* eslint-enable camelcase */
const index = async (ctx, next) => {
  const soccerSeasons = await SoccerSeason.find().lean()

  ctx.body = Serializer.serialize(soccerSeasons)
  await next()
}

const show = async (ctx, next) => {
  const soccerSeason = await SoccerSeason.findOne({
    '_id': ctx.params.id
  }).lean()

  ctx.body = Serializer.serialize(soccerSeason)
  await next()
}

const create = async (ctx, next) => {
  const requestData = await Deserializer.deserialize(ctx.request.body)
  const apiData = await ctx.footballData(`/soccerseasons/${requestData.id}`)
  const soccerSeasonData = fp.assign(only_id(requestData), apiData)
  const newSoccerSeason = await new SoccerSeason(soccerSeasonData).save()

  ctx.body = Serializer.serialize(newSoccerSeason)
  await next()
}

export default {
  index,
  show,
  create
}
