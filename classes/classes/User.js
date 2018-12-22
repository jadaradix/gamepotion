import uuid from '../abstractions/uuid/index.dist.js'
import guessNameFromUserlandId from './guessNameFromUserlandId.js'

class User {
  constructor (json = {}) {
    this.id = json.id || uuid()
    this.accessToken = json.accessToken || uuid()
    this.teamId = json.teamId || null
    this.createdAt = json.createdAt || Math.floor(new Date() / 1000)
    this.name = json.name || null
    this.isTeamAdmin = (typeof json.isTeamAdmin === 'boolean' ? json.isTeamAdmin : true)
    this.userlandId = json.userlandId || 'a@b.c'
    this.passwordHash = json.passwordHash || null
    this.modules = json.modules || []
    if (this.modules.length === 0) {
      this.addModule('free')
    }
  }

  addModule (id) {
    this.modules.push({
      id,
      when: Math.floor(new Date() / 1000)
    })
  }

  toApi () {
    const json = {
      id: this.id,
      accessToken: this.accessToken,
      teamId: this.teamId,
      createdAt: this.createdAt,
      name: this.name,
      isTeamAdmin: this.isTeamAdmin,
      userlandId: this.userlandId,
      modules: this.modules
    }
    return JSON.parse(JSON.stringify(json))
  }

  toApiList () {
    const json = {
      id: this.id,
      name: this.name,
      isTeamAdmin: this.isTeamAdmin
    }
    return JSON.parse(JSON.stringify(json))
  }

  toDatastore () {
    const json = {
      id: this.id,
      accessToken: this.accessToken,
      teamId: this.teamId,
      createdAt: this.createdAt,
      name: this.name,
      isTeamAdmin: this.isTeamAdmin,
      userlandId: this.userlandId,
      passwordHash: this.passwordHash,
      modules: this.modules
      // someBoolean: (this.someBoolean === true),
    }
    return JSON.parse(JSON.stringify(json))
  }

  fromApiPost (json) {
    if (typeof json.userlandId !== 'string' || json.userlandId.length === 0) { // -1 or 0
      throw new Error('userlandId is not valid')
    }
    this.teamId = (typeof json.teamId === 'string') ? json.teamId : this.teamId
    this.name = guessNameFromUserlandId(json.userlandId)
    this.userlandId = json.userlandId
  }

  fromApiPatch (json) {
    if (typeof json.teamId === 'string') {
      if (json.teamId.length === 0) {
        throw new Error('teamId is not valid')
      } else {
        this.teamId = json.teamId
      }
    }
    if (typeof json.name === 'string') {
      if (json.name.length === 0) {
        throw new Error('name is not valid')
      } else {
        this.name = json.name
      }
    }
    if (typeof json.userlandId === 'string') {
      if (json.userlandId.length === 0) {
        throw new Error('userlandId is not valid')
      } else {
        this.userlandId = json.userlandId
      }
    }
  }

  clientFromApiGet (json) {
    this.id = json.id
    this.accessToken = json.accessToken
    this.teamId = json.teamId
    this.name = json.name
    this.isTeamAdmin = json.isTeamAdmin
    this.userlandId = json.userlandId
    this.modules = json.modules
  }
}

export default User
