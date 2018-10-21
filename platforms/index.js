const html5 = require('./html5/index.js')
const nds = require('./nds/index.js')

module.exports = [
  {
    id: 'html5',
    logic: html5,
    toApi: () => {
      return {
        id: 'html5',
        name: 'HTML5'
      }
    }
  },
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
