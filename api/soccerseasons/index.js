import basicAuth from '../../middleware/basicAuth'
import controller from './controller'
import Router from 'koa-router'

const soccerSeasonsRouter = new Router({
  'prefix': '/api/soccerseasons'
})

soccerSeasonsRouter
  .get('/', controller.index)
  .post('/', basicAuth, controller.create)
  .get('/:id', controller.show)

export default soccerSeasonsRouter
