import controller from './controller'
import Router from 'koa-router'

const fixturesRouter = new Router({
  'prefix': '/api/fixtures'
})

fixturesRouter
  .get('/:id', controller.show)

export default fixturesRouter
