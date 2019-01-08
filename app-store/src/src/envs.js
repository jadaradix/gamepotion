const productionBaseDomain = (() => {
  return window.location.hostname.substring('app.'.length)
})()

export default {
  'development': {
    apis: {
      'api-core': 'http://localhost:1025/v1'
    }
  },
  'production': {
    apis: {
      'api-core': `https://api-core.${productionBaseDomain}/v1`
    }
  }
}
