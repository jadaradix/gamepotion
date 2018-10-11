import uuid from 'uuid'
import createRandomString from '../abstractions/createRandomString.js'

class User {
  constructor (json = {}) {
    this.id = json.id || uuid()
    this.teamId = json.teamId || null
    this.createdAt = json.createdAt || Math.floor(new Date() / 1000)
    this.name = json.name || 'User'
    this.email = json.email || 'a@b.c'
    this.passwordHash = json.passwordHash || null
    // activation code
    this.activationCode = json.activationCode || null
    if (this.activationCode === null) {
      this.activationCode = `todo-${createRandomString()}`
    }
    //
  }

  isActivated () {
    return (this.activationCode === null || this.activationCode.indexOf('done-') === 0)
  }

  activate () {
    this.activationCode = `done-${this.activationCode.substring('todo-'.length)}`
  }

  toApi () {
    const json = {
      id: this.id,
      teamId: this.teamId,
      createdAt: this.createdAt,
      email: this.email,
      name: this.name
    }
    return JSON.parse(JSON.stringify(json))
  }

  toApiUsersList () {
    const json = {
      id: this.id,
      teamId: this.teamId,
      createdAt: this.createdAt,
      email: this.email,
      name: this.name
    }
    return JSON.parse(JSON.stringify(json))
  }

  fromApi (apiJson) {
    this.id = apiJson.id
    this.teamId = apiJson.teamId
    this.email = apiJson.email
    this.name = apiJson.name
  }

  fromApiPostBody (json) {
    this.name = (typeof json.name === 'string') ? json.name : this.name
    this.email = (typeof json.email === 'string') ? json.email : this.email
  }

  toDatastore () {
    const json = {
      id: this.id,
      teamId: this.teamId,
      createdAt: this.createdAt,
      email: this.email,
      name: this.name,
      activationCode: this.activationCode,
      passwordHash: this.passwordHash
      // someBoolean: (this.someBoolean === true),
    }
    return JSON.parse(JSON.stringify(json))
  }
}

export default User
