const http = require('http');

class nodeServer {
  constructor(middlewares=[]) {
    this.middlewares = [...middlewares];
  }
  start(config) {
    const handler = (req, res) => {
      this.handle(req, res, (err) => err && res.writeHead(500))
    }
    return http.createServer(handler).listen(config, ()=>{
      const port = config.port || config;
      console.log(`\x1b[33m[node-server] Server is listening on port ${port}`, '\x1b[0m')
    })
  }
  use(middleware) {
    if (typeof middleware !== 'function') throw new Error('Middleware must be a function!');
    this.middlewares.push(middleware);
  }
  handle(req, res, cb) {
    let counter = 0;
    const next = (e) => {
      if(e!=null) return cb(e);
      if(counter>=this.middlewares.length) return cb();
      const middle = this.middlewares[counter++];
      try {
        middle(req, res, next);
      } catch(error) {
        next(error);
      }
    }
    next();
  }
}

module.exports = nodeServer;
