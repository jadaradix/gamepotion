const defaults = new Map([
  ['credentials-userlandId', ''],
  ['credentials-password', ''],
  ['grid-on', false],
  ['grid-width', 16],
  ['grid-height', 16],
  ['atom-to-plot', 'none']
])

let localLocalStorage = {}
let useLocalLocalStorage = false
if (typeof window.Storage !== 'undefined') {
  // browser supports local storage
  try {
    const x = 'test'
    window.localStorage.setItem(x, x)
    window.localStorage.removeItem(x)
  } catch (e) {
    useLocalLocalStorage = true
  }
} else {
  // browser doesnt support local storage
  useLocalLocalStorage = true
}

export function get (name) {
  console.log('[localStorage] [get]', name)
  let item
  if (useLocalLocalStorage) {
    item = localLocalStorage[name]
  } else {
    item = window.localStorage.getItem(name)
  }
  if (item === null || item === undefined) return null
  if (item.toString().substring(0, 'json:'.length) === 'json:') {
    item = JSON.parse(item.substring('json:'.length))
  } else if (item.toString().substring(0, 'boolean:'.length) === 'boolean:') {
    item = (item.substring('boolean:'.length) === 'true')
  } else if (item.toString().substring(0, 'number:'.length) === 'number:') {
    item = parseInt(item.substring('number:'.length), 10)
  }
  return item
}

export function set (name, value) {
  console.log('[localStorage] [set]', name, value)
  const logic = (name, value) => {
    if (useLocalLocalStorage) {
      localLocalStorage[name] = value
    } else {
      window.localStorage.setItem(name, value)
    }
  }
  if (typeof value === 'object') {
    logic(name, `json:${JSON.stringify(value)}`)
  } else if (typeof value === 'boolean') {
    logic(name, `boolean:${value}`)
  } else if (typeof value === 'number') {
    logic(name, `number:${value}`)
  } else {
    logic(name, value)
  }
}

export function remove (name) {
  console.log('[localStorage] [remove]', name)
  if (useLocalLocalStorage) {
    delete localLocalStorage[name]
  } else {
    window.localStorage.removeItem(name)
  }
}

export function clear () {
  console.log('[localStorage] [clear]')
  localLocalStorage = {}
  window.localStorage.clear()
  init()
}

function init (force) {
  console.log('[localStorage] [init] force', force)
  defaults.forEach((value, key) => {
    if (get(key) === null || force === true) {
      set(key, value)
    }
  })
}
init(false)
