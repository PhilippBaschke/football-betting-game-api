import basicAuth from '../../middleware/basicAuth'
import controller from './controller'
import Router from 'koa-router'

const gameRouter = new Router({
  'prefix': '/api/games'
})

gameRouter
  .get('/', controller.index)
  .post('/', basicAuth, controller.create)
  .get('/:title', controller.show)

export default gameRouter
