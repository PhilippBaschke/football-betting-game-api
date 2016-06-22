import auth from 'koa-basic-auth'
import config from 'config'

const basicAuth = auth(config.basicAuth)

export default basicAuth
