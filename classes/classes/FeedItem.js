import uuid from '../abstractions/uuid/index.dist.js'

class FeedItem {
  constructor (json = {}) {
    this.id = json.id || uuid()
    this.feedId = json.feedId
    this.createdAt = json.createdAt || Math.floor(new Date() / 1000)
    this.title = (typeof json.title === 'string' ? json.title : '')
    this.content = (typeof json.content === 'string' ? json.content : '')
  }

  toApi () {
    const json = {
      id: this.id,
      feedId: this.feedId,
      createdAt: this.createdAt,
      title: this.title,
      content: this.content
    }
    return JSON.parse(JSON.stringify(json))
  }

  toDatastore () {
    const json = {
      id: this.id,
      feedId: this.feedId,
      createdAt: this.createdAt,
      title: this.title,
      content: this.content
    }
    return JSON.parse(JSON.stringify(json))
  }

  fromApiPost (json) {
    if (typeof json.feedId !== 'string') {
      throw new Error('feedId is not valid')
    }
    this.feedId = json.feedId
    if (json.title.length === 0) {
      throw new Error('title is not valid')
    }
    this.title = json.title
    if (json.content.length === 0) {
      throw new Error('content is not valid')
    }
    this.content = json.content
  }

  fromApiPatch (json) {
    if (typeof json.title === 'string') {
      if (json.title.length === 0) {
        throw new Error('title is not valid')
      }
      this.title = json.title
    }
    if (typeof json.content === 'string') {
      if (json.content.length === 0) {
        throw new Error('content is not valid')
      }
      this.content = json.content
    }
  }

  clientFromApiGet (json) {
    this.id = json.id
    this.feedId = json.feedId
    this.createdAt = json.createdAt
    this.title = json.title
    this.content = json.content
  }
}

export default FeedItem
