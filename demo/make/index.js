const NodeServer = require('../../index.js')
const app = new NodeServer()

app.make({
  'user': {
    'name': 'andy'
  }
})
