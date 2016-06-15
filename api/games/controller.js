import Game from './model'

const index = async (ctx, next) => {
  ctx.body = await Game.find()
  await next()
}

const show = async (ctx, next) => {
  ctx.body = await Game.findOne({
    'title': ctx.params.title
  })
  await next()
}

export default {
  index,
  show
}
