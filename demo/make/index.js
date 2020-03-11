const NodeServer = require('../../index.js')
const app = new NodeServer()
const logger = require('@amazingandyyy/server-logger')

app.make({
  'user': {
    'name': 'andy'
  }
})
