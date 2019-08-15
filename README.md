<h1 align="center">
🌐 node-server
</h1>
<p align="center">
A simple node server module.
</p>

<p align="center">
   <a href="https://github.com/amazingandyyy/node-server/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <a href="https://circleci.com/gh/amazingandyyy/node-server">
      <img src="https://circleci.com/gh/amazingandyyy/node-server.svg?style=svg" />
   </a>
</p>

> compatible to express middleware!

## Usage

```javascript
const NodeServer = require('@amazingandyyy/node-server')
const nodeServerParser = require('@amazingandyyy/body-parser');
const morgan = require('morgan')

const app = new NodeServer()

app.use(morgan('dev'))

app.on('get', '/', (req, res)=>{
   res.send(200)
})

app.on('post', '/ping', (req, res)=>{
    res.send(req.body)
})

app.use(nodeServerParser)

app.start({ port: 4000 })

```

## License

MIT
