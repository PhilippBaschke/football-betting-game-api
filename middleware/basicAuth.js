import auth from 'koa-basic-auth'

const basicAuth = auth({
  'name': process.env.BA_NAME,
  'pass': process.env.BA_PASS
})

export default basicAuth
