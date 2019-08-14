const nodeServer = require('../../index.js');
const app = new nodeServer();
const morgan  = require('morgan')

// app.get('/'. (req, res)=>{
//    res.send('hello')
// })
// app.post('/ping'. (req, res)=>{
//    res.send(req.body);
// })
app.use(morgan('dev'))

app.use((req, res, next)=>{
    next();
})

app.start({port: '4000'})
