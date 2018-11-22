export default function guessNameFromUserlandId (userlandId) {
  const isEmailValid = (userlandId.indexOf('@') > 0 && userlandId.length > userlandId.indexOf('@') + 1)
  if (isEmailValid) {
    return userlandId
      .split('@')
      .shift()
      .split('.')
      .map(n => {
        return `${n[0].toUpperCase()}${n.substring(1)}`
      })
      .join(' ')
  } else {
    return null
  }
}
