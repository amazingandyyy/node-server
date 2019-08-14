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

> open source!

## Usage

```javascript
const nodeServer = require('@amazingandyyy/node-server');
const app = nodeServer();

app.get('/'. (req, res)=>{
   res.send('hello')
})
app.post('/ping'. (req, res)=>{
   res.send(req.body);
})
app.use((req, res, next)=>{
   res.end('hello');
   next();
})
app.listen('4000', ()=>{
   console.log('Server is listening on 4000')
})
```

## License

MIT
