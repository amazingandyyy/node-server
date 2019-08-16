const NodeServer = require('../../index.js')
const bodyParser = require('@amazingandyyy/body-parser')
const app = new NodeServer()
const logger = require('@amazingandyyy/server-logger')

app.on('get', '/', (req, res) => {
  res.send(200)
})

app.on('post', '/ping', (req, res) => {
  res.send(req.body)
})

app.use(logger('dev'))
app.use(bodyParser)

app.start({ port: '4000' })
