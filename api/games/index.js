import controller from './controller'
import Router from 'koa-router'

const gameRouter = new Router({
  'prefix': '/api/games'
})

gameRouter
  .get('/', controller.index)
  .get('/:title', controller.show)

export default gameRouter
