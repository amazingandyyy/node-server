<h1 align="center">
📡 node-server
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

> zero dependencies

## Installation
```shell
$ npm i --save @amazingandyyy/node-server
# or
$ yarn add @amazingandyyy/node-server
```

## Usage

```javascript
const NodeServer = require('@amazingandyyy/node-server')
const bodyParser = require('@amazingandyyy/body-parser');
const morgan = require('morgan') // compatible to express middlewares

const app = new NodeServer()

app.use(morgan('dev'))
app.use(bodyParser)

app.get('/ping', (req, res)=>{
   res.send('pong')
})

app.post('/register', (req, res)=>{
   res.send(req.body)
})

app.start({ port: 4000 })

```

## License

MIT
