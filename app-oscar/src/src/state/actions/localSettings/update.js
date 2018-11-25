import { set } from '../../../localStorage'

export default function (state, { name, value }) {
  set(name, value)
  return Promise.resolve({
    ...state,
    localSettings: {
      ...state.localSettings,
      [name]: value
    }
  })
}
