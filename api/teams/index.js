import controller from './controller'
import Router from 'koa-router'

const teamRouter = new Router({
  'prefix': '/api/teams'
})

teamRouter
  .get('/', controller.index)
  .get('/:id', controller.show)

export default teamRouter
