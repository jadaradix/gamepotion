import { set } from '../../../localStorage'

export default function (state, { object }) {
  Object.keys(object).forEach(k => {
    set(k, object[k])
  })
  return Promise.resolve({
    ...state,
    localSettings: {
      ...state.localSettings,
      ...object
    }
  })
}
