const NodeServer = require('../../index.js')
const app = new NodeServer()
const morgan = require('morgan')

// app.get('/'. (req, res)=>{
//    res.send('hello')
// })
// app.post('/ping'. (req, res)=>{
//    res.send(req.body);
// })
app.use(morgan('dev'))

app.use((req, res, next) => {
  next()
})
app.use((req, res, next) => {
  res.end('ok')
  next()
})

app.start({ port: '4000' })
