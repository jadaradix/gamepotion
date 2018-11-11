const parseRunArguments = (oldRunArguments, variables) => {
  let requiresRuntimeRunArgumentParsing = false
  const runArguments = oldRunArguments.map(r => {
    if (r[0] === '"') {
      return r.substring(1, r.length - 1)
    }
    const foundVariable = variables.get(r)
    if (foundVariable !== undefined) {
      requiresRuntimeRunArgumentParsing = true
      return foundVariable
    }
  })
  return {
    requiresRuntimeRunArgumentParsing,
    runArguments
  }
}

export default parseRunArguments
