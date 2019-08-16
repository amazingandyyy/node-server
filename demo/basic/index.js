const NodeServer = require('../../index.js')
const bodyParser = require('@amazingandyyy/body-parser')
const app = new NodeServer()
const logger = require('@amazingandyyy/server-logger')

app.on('get', '/', checkUser, checkStatus, (req, res) => {
  console.log(req.user);
  res.send(200)
})

function checkUser(req, res, next){
  req.user={id: '345678987654', status: 'member'};
  next()
}
function checkStatus(req, res, next){
  if(req.user.status!=='admin') return res.send(401);
  next()
}

app.on('post', '/ping', (req, res) => {
  res.send('pong')
})

app.use(logger('dev'))
app.use(bodyParser)

app.start({ port: '4000' })
