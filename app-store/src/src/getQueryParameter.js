const queryParameters = {}
window.location.search.substring(1).split('&').forEach(qp => {
  const [key, value] = qp.split('=')
  queryParameters[key] = value
})

const getQueryParameter = (paramater) => {
  return queryParameters[paramater]
}

export default getQueryParameter
