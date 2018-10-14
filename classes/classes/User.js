import uuid from 'uuid'
import createRandomString from '../abstractions/createRandomString.js'

class User {
  constructor (json = {}) {
    this.id = json.id || uuid()
    this.teamId = json.teamId || null
    this.createdAt = json.createdAt || Math.floor(new Date() / 1000)
    this.name = json.name || 'New User'
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
      email: this.email,
      name: this.name
    }
    return JSON.parse(JSON.stringify(json))
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

  fromApiPost (json) {
    if (typeof json.teamId !== 'string' || json.teamId.length === 0) {
      throw new Error('teamId is not valid')
    }
    if (typeof json.name !== 'string' || json.name.length === 0) {
      throw new Error('name is not valid')
    }
    if (typeof json.email !== 'string' || json.email.indexOf('@') < 1) { // -1 or 0
      throw new Error('email is not valid')
    }
    this.teamId = json.teamId
    this.name = json.name
    this.email = json.email
  }

  fromApiPatch (json) {
    this.name = (typeof json.name === 'string') ? json.name : this.name
    this.email = (typeof json.email === 'string') ? json.email : this.email
  }

  clientFromApiGet (json) {
    this.id = json.id
    this.teamId = json.teamId
    this.email = json.email
    this.name = json.name
  }
}

export default User
