const nds = require('./nds/index.js')

module.exports = [
  {
    id: 'nds',
    logic: nds,
    toApi: () => {
      return {
        id: 'nds',
        name: 'Nintendo DS'
      }
    }
  }
]
