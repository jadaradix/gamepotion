import uuid from 'uuid'

class Project {
  constructor(json = {}) {
    // DO NOT CREATE INSTANCES OF THIS ABSTRACT CLASS (always extended) IN USERLAND
    // USE THE CLASS FACTORY!
    this.id = json.id || uuid()
    this.projectId = json.projectId || null
    this.createdAt = json.createdAt || Math.floor(new Date() / 1000)
    this.type = json.type || 'abstract'
    this.name = json.name || this.getDefaultName()
  }

  getDefaultName () {
    return 'New Abstract Resource'
  }

  toApi() {
    const json = {
      id: this.id,
      projectId: this.projectId,
      createdAt: this.createdAt,
      type: this.type,
      name: this.name
    }
    return JSON.parse(JSON.stringify(json))
  }

  toDatastore() {
    const json = {
      id: this.id,
      projectId: this.projectId,
      createdAt: this.createdAt,
      type: this.type,
      name: this.name
    }
    return JSON.parse(JSON.stringify(json))
  }

  fromApiPost(json) {
    if (typeof json.projectId !== 'string' || json.projectId.length === 0) {
      throw new Error('projectId is not valid')
    }
    if (typeof json.name !== 'string' || json.name.length === 0) {
      throw new Error('name is not valid')
    }
    this.projectId = json.projectId
    this.type = json.type
    this.name = json.name
  }

  fromApiPatch(json) {
    this.name = (typeof json.name === 'string') ? json.name : this.name
  }

  clientFromApiGet(json) {
    this.id = json.id
    this.projectId = json.projectId
    this.createdAt = json.createdAt
    this.type = json.type
    this.name = json.name
  }

  getRemoteUrl() {
    throw new Error('[class Resource] getRemoteUrl needs to be extended')
  }
}

export default Project
