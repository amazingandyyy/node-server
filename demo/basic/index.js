const NodeServer = require('../../index.js')
const app = new NodeServer()
const logger = require('@amazingandyyy/server-logger')

app.get('/', checkUser, checkUserStatus, (req, res) => {
  console.log(req.user);
  res.send(200)
})

app.get('/welcome', (req, res) => {
  res.send('welcome')
})

function checkUser(req, res, next){
  req.user={id: '345678987654', status: 'member'};
  next()
}
function checkUserStatus(req, res, next){
  if(req.user.status!=='admin') return res.send('you are not admin');
  next()
}

app.post('/ping', (req, res) => {
  res.send('pong')
})

app.use(logger('dev'))

app.start({ port: '4000' })
