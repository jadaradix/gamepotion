const parseRunArguments = (variables, runArguments) => {
  return runArguments.map(r => {
    if (r[0] === '"') {
      return r.substring(1, r.length - 1)
    }
    const foundVariable = variables.get(r)
    if (foundVariable !== undefined) {
      return foundVariable
    }
    return r
  })
}

export default parseRunArguments
