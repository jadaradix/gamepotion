export default {
  'local': {
    apis: {
      'api-core': 'http://localhost:1025/v1'
    },
    callbackUrl: 'http://localhost:3000/store/'
  },
  'production': {
    apis: {
      'api-core': 'https://api-core.gamemaker.club/v1'
    },
    callbackUrl: 'https://app.gamemaker.club/store/'
  }
}
