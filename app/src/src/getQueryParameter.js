const getQueryParameter = (paramater) => {
  const queryParameters = {}
  window.location.search.substring(1).split('&').forEach(qp => {
    const [key, value] = qp.split('=')
    queryParameters[key] = value
  })
  return queryParameters[paramater]
}

export default getQueryParameter
