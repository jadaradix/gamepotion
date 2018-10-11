const createRandomString = () => {
  const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890'
  const generateSet = () => {
    return possibleCharacters.split('').map($ => possibleCharacters[parseInt(Math.random() * possibleCharacters.length)]).join('')
  }
  return `${generateSet()}${generateSet()}`
}

module.exports = createRandomString
