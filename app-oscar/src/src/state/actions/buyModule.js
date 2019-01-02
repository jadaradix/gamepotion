export default function (state, { moduleToBuy }) {
  return Promise.resolve({
    ...state,
    moduleToBuy
  })
}
