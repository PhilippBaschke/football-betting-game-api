import basicAuth from '../../middleware/basicAuth'
import controller from './controller'
import Router from 'koa-router'

const betRouter = new Router({
  'prefix': '/api/bets'
})

betRouter
  .get('/', controller.index)
  .post('/', basicAuth, controller.create)
  .get('/:id', controller.show)

export default betRouter
