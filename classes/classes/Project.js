import uuid from '../abstractions/uuid/index.dist.js'

class Project {
  constructor (json = {}) {
    this.id = json.id || uuid()
    this.teamId = json.teamId || null
    this.createdAt = json.createdAt || Math.floor(new Date() / 1000)
    this.name = json.name || 'New Project'
    this.startSpace = (typeof json.startSpace === 'string') ? json.startSpace : null
  }

  toApi () {
    const json = {
      id: this.id,
      teamId: this.teamId,
      createdAt: this.createdAt,
      name: this.name,
      startSpace: this.startSpace
    }
    return JSON.parse(JSON.stringify(json))
  }

  toDatastore () {
    const json = {
      id: this.id,
      teamId: this.teamId,
      createdAt: this.createdAt,
      name: this.name,
      startSpace: this.startSpace
    }
    return JSON.parse(JSON.stringify(json))
  }

  fromApiPost (json) {
    if (typeof json.name === 'string') {
      if (json.name.length === 0) {
        throw new Error('name is not valid')
      } else {
        this.name = json.name
      }
    }
    if (typeof json.startSpace === 'string') {
      if (json.startSpace.length === 0) {
        throw new Error('startSpace is not valid')
      } else {
        this.startSpace = json.startSpace
      }
    }
  }

  fromApiPatch (json) {
    if (typeof json.name === 'string') {
      if (json.name.length === 0) {
        throw new Error('name is not valid')
      } else {
        this.name = json.name
      }
    }
    if (typeof json.startSpace === 'string') {
      if (json.startSpace.length === 0) {
        throw new Error('startSpace is not valid')
      } else {
        this.startSpace = json.startSpace
      }
    }
  }

  clientFromApiGet (json) {
    this.id = json.id
    this.teamId = json.teamId
    this.createdAt = json.createdAt
    this.name = json.name
    this.startSpace = json.startSpace
  }
}

export default Project
