const http = require('http')
const { RequestMethods } = require('./constants.js')

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
          res.writeHead(500)
          res.end(err || 'Internal Server Error')
        } else if (this.routers[req.method][req.url]) {
          this.routers[req.method][req.url](req, res)
        } else {
          res.writeHead(404)
          res.end('Page Not Found')
        }
      })
    }
    return http.createServer(handler).listen(config, () => {
      const port = config.port || config
      console.log(`\x1b[33m[node-server] listening on http://localhost:${port}`, '\x1b[0m')
    })
  }

  use (middleware) {
    if (typeof middleware !== 'function') throw new Error('Middleware must be a function!')
    this.middlewares.push(middleware)
  }

  handle (req, res, cb) {
    res.send = (content) => {
      if (typeof content === 'number') {
        res.writeHead(content)
        res.end()
      }
      if (typeof content === 'string') {
        res.setHeader('Content-Type', 'text/plain')
        res.end(content)
      }
      if (typeof content === 'object') {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(content))
      }
    }
    let counter = 0
    const next = (e) => {
      if (e != null) {
        console.error(e)
        return setImmediate(() => cb(e))
      }
      if (counter >= this.middlewares.length) {
        return setImmediate(() => {
          cb()
        })
      }
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

  on (method, route, reqres) {
    this.routers[method.toUpperCase()][route] = reqres
  }
}

module.exports = NodeServer
