const RESOURCE_TYPES = [
  'image',
  'sound',
  'atom',
  'space'
]

const functions = new Map([
  [
    'random',
    {
      argumentsNeeded: 2,
      logic: (functionArguments) => {
        const min = functionArguments[0]
        const max = functionArguments[1]
        const r = Math.floor(Math.random() * (max - min + 1)) + min
        return r
      }
    }
  ]
])

const parseFunctionArgumentsString = (argumentsString, typeHint, parseContext) => {
  return argumentsString.split(',').map(p => {
    return parseToken(p.trim(), typeHint, parseContext)
  })
}

const parseToken = (token, typeHint, parseContext) => {
  if (typeof token === 'number') {
    return token
  }
  if (token.startsWith('instance.')) {
    const prop = token.substring('instance.'.length)
    return parseContext.instanceClass.props[prop]
  }
  if (token.startsWith('camera.')) {
    const prop = token.substring('camera.'.length)
    return parseContext.camera[prop]
  }
  if (RESOURCE_TYPES.includes(typeHint)) {
    return token
  }
  if (token[0] === '"' && token[token.length - 1] === '"') {
    return token.substring(1, token.length - 1)
  }
  const foundVariable = parseContext.eventContext.variables.get(token)
  if (foundVariable !== undefined) {
    return foundVariable
  }
  const indexOfFirstBracket = token.indexOf('(')
  const indexOfLastBracket = token.indexOf(')')
  if (indexOfFirstBracket > 0 && indexOfLastBracket === token.length - 1) {
    const functionName = token.substring(0, indexOfFirstBracket)
    const foundFunction = functions.get(functionName)
    if (foundFunction === undefined) {
      throw new Error(`you tried to call function ${functionName} which doesnt exist!`)
    }
    const functionArguments = token.substring(indexOfFirstBracket + 1, indexOfLastBracket)
    const functionRunArguments = parseFunctionArgumentsString(functionArguments, 'generic', parseContext.eventContext.variables)
    if (foundFunction.argumentsNeeded !== functionRunArguments.length) {
      throw new Error(`you tried to call function with ${functionRunArguments.length} arguments instead of ${foundFunction.argumentsNeeded}`)
    }
    return foundFunction.logic(functionRunArguments)
  }
  const asInteger = parseInt(token, 10)
  if (isNaN(asInteger)) {
    throw new Error(`could not parse ${token}`)
  }
  return asInteger
}

const parseRunArguments = (argumentTypes, runArguments, parseContext) => {
  // console.warn('[parseRunArguments] argumentTypes/runArguments/parseContext', argumentTypes, runArguments, parseContext)
  const newRunArguments = runArguments.map((runArgument, i) => {
    const runArgumentType = argumentTypes[i]
    return parseToken(runArgument, runArgumentType, parseContext)
  })
  return newRunArguments
}

export default parseRunArguments
