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

const parseFunctionArgumentsString = (argumentsString, variables) => {
  return argumentsString.split(',').map(p => {
    return parseToken(p.trim(), variables)
  })
}

const parseToken = (r, variables) => {
  if (r[0] === '"' && r[r.length - 1] === '"') {
    return r.substring(1, r.length - 1)
  }
  const foundVariable = variables.get(r)
  if (foundVariable !== undefined) {
    return foundVariable
  }
  const indexOfFirstBracket = r.indexOf('(')
  const indexOfLastBracket = r.indexOf(')')
  if (indexOfFirstBracket > 0 && indexOfLastBracket === r.length - 1) {
    const functionName = r.substring(0, indexOfFirstBracket)
    const foundFunction = functions.get(functionName)
    if (foundFunction === undefined) {
      throw new Error(`you tried to call function ${functionName} which doesnt exist!`)
    }
    const functionArguments = r.substring(indexOfFirstBracket + 1, indexOfLastBracket)
    const functionRunArguments = parseFunctionArgumentsString(functionArguments, variables)
    if (foundFunction.argumentsNeeded !== functionRunArguments.length) {
      throw new Error(`you tried to call function with ${functionRunArguments.length} arguments instead of ${foundFunction.argumentsNeeded}`)
    }
    return foundFunction.logic(functionRunArguments)
  }
  const asInteger = parseInt(r, 10)
  if (isNaN(asInteger)) {
    throw new Error(`could not parse ${r}`)
  }
  return asInteger
}

const parseRunArguments = (oldRunArguments, variables) => {
  let requiresRuntimeRunArgumentParsing = false
  const runArguments = oldRunArguments.map(r => {
    const newR = parseToken(r, variables)
    if (newR !== r) {
      requiresRuntimeRunArgumentParsing = true
    }
    return newR
  })
  return {
    requiresRuntimeRunArgumentParsing,
    runArguments
  }
}

export default parseRunArguments
