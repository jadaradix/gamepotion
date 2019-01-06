import api from './api'

let boughtModuleIds = undefined // not an array
const getBoughtModuleIds = () => {
  if (Array.isArray(boughtModuleIds)) {
    return Promise.resolve(boughtModuleIds)
  }
  return api.get('api-core', 'me')
    .then(user => {
      boughtModuleIds = user.modules.map(m => m.id)
      return boughtModuleIds
    })
}

export default getBoughtModuleIds
