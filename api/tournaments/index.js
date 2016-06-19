import basicAuth from '../../middleware/basicAuth'
import controller from './controller'
import Router from 'koa-router'

const tournamentRouter = new Router({
  'prefix': '/api/tournaments'
})

tournamentRouter
  .get('/', controller.index)
  .post('/', basicAuth, controller.create)
  .get('/:id', controller.show)

export default tournamentRouter
