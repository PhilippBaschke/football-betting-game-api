import {Serializer} from './serializer'
import Team from './model'

const index = async (ctx, next) => {
  const teams = await Team.find()

  ctx.body = Serializer.serialize(teams)
  await next()
}

const show = async (ctx, next) => {
  const team = await Team.findOne({
    '_id': ctx.params.id
  })

  ctx.body = Serializer.serialize(team)
  await next()
}

export default {
  index,
  show
}
