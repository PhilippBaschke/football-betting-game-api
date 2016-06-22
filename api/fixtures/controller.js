import Fixture from './model'
import {Serializer} from './serializer'

const show = async (ctx, next) => {
  const fixture = await Fixture.findOne({
    '_id': ctx.params.id
  })

  ctx.body = Serializer.serialize(fixture)
  await next()
}

export default {
  show
}
