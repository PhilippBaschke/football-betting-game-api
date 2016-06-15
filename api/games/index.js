import controller from './controller'
import Router from 'koa-router'

const gameRouter = new Router({
  'prefix': '/api/games'
})

gameRouter
  .get('/', controller.index)
  .post('/', controller.create)
  .get('/:title', controller.show)

export default gameRouter
