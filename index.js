const http = require('http')
const { RequestMethods } = require('./constants')

class NodeServer {
  constructor (middlewares = []) {
    this.middlewares = [...middlewares]
    this.routers = [RequestMethods.POST, RequestMethods.GET, RequestMethods.PUT, RequestMethods.DELETE].reduce((a, c) => {
      a[c] = {}
      return a
    }, {})
  }

  start (config) {
    const handler = (req, res) => {
      this.handle(req, res, (err) => {
        if (err) {
          console.error(err)
          res.writeHead(500)
          return res.end(err || 'Internal Server Error')
        } else if (this.routers[req.method][req.url]) {
          const [middlewares, cb] = this.routers[req.method][req.url];
          this.iterateMiddlewareAndCb(req, res, middlewares, cb, (err)=>{
            if (err) {
              console.error(err)
              res.writeHead(500)
              return res.end(err || 'Internal Server Error')
            }
          })
        } else {
          res.writeHead(404)
          return res.end('Page Not Found')
        }
      })
    }
    return http.createServer(handler).listen(config, () => {
      const port = config.port || config
      console.log(`\x1b[33m[node-server] listening on http://localhost:${port}`, '\x1b[0m')
    })
  }

  iterateMiddlewareAndCb(req, res, middlewares, cb, handleError) {
    let counter = 0
    const next = (e) => {
      if (e != null) return setImmediate(() => handleError(e));
      if (counter >= middlewares.length) return setImmediate(() => cb(req, res));
      const middle = middlewares[counter]
      setImmediate(() => {
        try {
          counter++
          middle(req, res, next)
        } catch (error) {
          next(error)
        }
      })
    }
    next()
  }

  use (middleware) {
    if (typeof middleware !== 'function') throw new Error('Middleware must be a function!')
    this.middlewares.push(middleware)
  }

  handle (req, res, cb) {
    res.send = (content) => {
      if (typeof content === 'number') {
        res.writeHead(content)
        return res.end()
      }
      if (typeof content === 'string') {
        res.setHeader('Content-Type', 'text/plain')
        return res.end(content)
      }
      if (typeof content === 'object') {
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(content))
      }
    }
    res.html = (content, value = {}) => {
      if (typeof content === 'string') {
        res.writeHead(content)
        return res.end()
      } else {
        //  user Logger
      }
    }
    let counter = 0
    const next = (e) => {
      if (e != null) setImmediate(() => cb(e));
      if (counter >= this.middlewares.length) return setImmediate(() => cb());
      const middle = this.middlewares[counter]
      setImmediate(() => {
        try {
          counter++
          middle(req, res, next)
        } catch (error) {
          next(error)
        }
      })
    }
    next()
  }

  on (...args) {
    const middlewares = args.splice(2, args.length - 3);
    const [method, route, cb] = args
    this.routers[method.toUpperCase()][route] = [middlewares, cb]
  }
  get(...args) {
    this.on('get', ...args)
  }
  post(...args) {
    this.on('post', ...args)
  }
  put(...args) {
    this.on('put', ...args)
  }
  delete(...args) {
    this.on('delete', ...args)
  }
}

module.exports = NodeServer
