import uuid from '../abstractions/uuid/index.dist.js'

const currencies = [
  'USD',
  'GBP',
  'EUR'
]

const states = [
  'UNPAID',
  'PAID'
]

class Team {
  constructor (json = {}) {
    this.id = json.id || uuid()
    this.createdAt = json.createdAt || Math.floor(new Date() / 1000)
    this.userId = json.userId || null
    this.moduleId = json.moduleId || null
    this.total = (typeof json.total === 'number' ? json.total : 0)
    this.currency = json.currency || currencies[0]
    this.state = json.state || states[0]
  }

  toApi () {
    const json = {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      moduleId: this.moduleId,
      total: this.total,
      currency: this.currency,
      state: this.state
    }
    return JSON.parse(JSON.stringify(json))
  }

  toDatastore () {
    const json = {
      id: this.id,
      createdAt: this.createdAt,
      userId: this.userId,
      moduleId: this.moduleId,
      total: this.total,
      currency: this.currency,
      state: this.state
    }
    return JSON.parse(JSON.stringify(json))
  }

  fromApiPatch (json) {
    if (states.includes(json.state)) {
      this.state = json.state
    }
  }
}

export default Team
