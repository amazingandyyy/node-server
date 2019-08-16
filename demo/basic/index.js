const NodeServer = require('@amazingandyyy/node-server')
const bodyParser = require('@amazingandyyy/body-parser')
const app = new NodeServer()
const morgan = require('morgan')

app.on('get', '/', (req, res) => {
  res.send(200)
})

app.on('post', '/ping', (req, res) => {
  res.send(req.body)
})

app.use(morgan('dev'))
app.use(bodyParser)

app.start({ port: '4000' })
