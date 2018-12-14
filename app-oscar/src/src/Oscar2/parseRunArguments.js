import jsep from 'jsep'

const RESOURCE_TYPES = [
  'image',
  'sound',
  'atom',
  'space'
]

const FUNCTIONS = new Map([
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
  ],
  [
    'prompt',
    {
      argumentsNeeded: 2,
      logic: (functionArguments) => {
        const v = window.prompt(functionArguments[0], functionArguments[1])
        if (typeof v !== 'string') {
          return ''
        }
        return v
      }
    }
  ],
  [
    'confirm',
    {
      argumentsNeeded: 1,
      logic: (functionArguments) => {
        return window.confirm(functionArguments[0])
      }
    }
  ]
])

const OPERATORS_BINARY_EXPRESSION = {
  '+'(l, r) {
    return l + r
  },
  '-'(l, r) {
    return l - r
  },
  '*'(l, r) {
    return l * r
  },
  '/'(l, r) {
    return l / r
  }
}

const OPERATORS_UNARY_EXPRESSION = {
  '-'(v) {
    return -v
  },
  '+'(v) {
    return +v
  }
}

const parsers = {
  'Literal'(j, parseContext, memberExpressions) {
    return j.value
  },
  'UnaryExpression'(j, parseContext, memberExpressions) {
    const foundOperator = OPERATORS_UNARY_EXPRESSION[j.operator]
    if (typeof foundOperator === 'function') {
      return foundOperator(j.argument.value)
    } else {
      throw new Error(`found UnaryExpression with unsupported operator ${j.operator}!`)
    }
  },
  'Identifier'(j, parseContext, memberExpressions) {
    const foundVariable = parseContext.eventContext.variables.get(j.name)
    if (foundVariable !== undefined) {
      return foundVariable
    } else {
      throw new Error(`variable ${j.name} unknown`)
    }
  },
  'MemberExpression'(j, parseContext, memberExpressions) {
    const foundMemberExpression = memberExpressions[j.object.name]
    if (foundMemberExpression !== undefined) {
      return foundMemberExpression[j.property.name]
    } else {
      throw new Error(`member ${j.object.name} unknown`)
    }
  },
  'BinaryExpression'(j, parseContext, memberExpressions) {
    const foundOperator = OPERATORS_BINARY_EXPRESSION[j.operator]
    if (typeof foundOperator === 'function') {
      return foundOperator(
        parseToken(j.left, 'generic', parseContext),
        parseToken(j.right, 'generic', parseContext)
      )
    } else {
      throw new Error(`operator ${j.operator} unsupported`)
    }
  },
  'CallExpression'(j, parseContext, memberExpressions) {
    const foundFunction = FUNCTIONS.get(j.callee.name)
    if (foundFunction === undefined) {
      throw new Error(`you tried to call function ${j.callee.name}() which doesnt exist!`)
    }
    if (foundFunction.argumentsNeeded !== j.arguments.length) {
      throw new Error(`you tried to call function ${j.callee.name}() with ${j.arguments.length} arguments instead of ${foundFunction.argumentsNeeded}`)
    }
    const parsedArguments = j.arguments.map(jArgument => {
      return parseToken(jArgument.raw, 'generic', parseContext)
    })
    return foundFunction.logic(parsedArguments)
  }
}

const parseToken = (token, typeHint, parseContext) => {
  if (['variable', 'options'].includes(typeHint)) {
    return token
  }
  if (RESOURCE_TYPES.includes(typeHint)) {
    return token
  }
  if (typeof token === 'boolean') {
    return token
  }
  let j
  if (typeof token === 'object' && token.hasOwnProperty('type')) {
    j = token
  } else {
    j = jsep(token)
  }
  const foundParser = parsers[j.type]
  if (typeof foundParser === 'function') {
    const memberExpressions = {
      instance: {
        ...parseContext.instanceClass.props,
        width: (typeof parseContext.instanceClass.imageContainer === 'object' ? parseContext.instanceClass.imageContainer.resource.frameWidth : 0),
        height: (typeof parseContext.instanceClass.imageContainer === 'object' ? parseContext.instanceClass.imageContainer.resource.frameHeight : 0),
      },
      space: parseContext.eventContext.spaceContainer.resource,
      camera: parseContext.eventContext.camera
    }
    return foundParser(j, parseContext, memberExpressions)
  } else {
    throw new Error(`could not parse ${token}`)
  }
  
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
