import uuid from '../abstractions/uuid/index.dist.js'

class FeedItem {
  constructor (json = {}) {
    this.id = json.id || uuid()
    this.createdAt = json.createdAt || Math.floor(new Date() / 1000)
    this.title = json.title || 'Feed Item'
    this.content = json.content || ''
  }

  toApi () {
    const json = {
      id: this.id,
      createdAt: this.createdAt,
      title: this.title,
      content: this.content
    }
    return JSON.parse(JSON.stringify(json))
  }

  toDatastore () {
    const json = {
      id: this.id,
      createdAt: this.createdAt,
      title: this.title,
      content: this.content
    }
    return JSON.parse(JSON.stringify(json))
  }

  fromApiPost (json) {
    if (typeof json.title === 'string') {
      if (json.title.length === 0) {
        throw new Error('title is not valid')
      } else {
        this.title = json.title
      }
    }
    if (typeof json.content === 'string') {
      this.content = json.content
    }
  }

  fromApiPatch (json) {
    if (typeof json.title === 'string') {
      if (json.title.length === 0) {
        throw new Error('title is not valid')
      } else {
        this.title = json.title
      }
    }
    if (typeof json.content === 'string') {
      this.content = json.content
    }
  }

  clientFromApiGet (json) {
    this.id = json.id
    this.createdAt = json.createdAt
    this.title = json.title
    this.content = json.content
  }
}

export default FeedItem
