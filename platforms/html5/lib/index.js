(() => {
  class GMC {
    constructor() {
      this.resources = []
      this.instances = []
    }

    debug(message) {
      console.warn('[GMC]', message)
    }

    error(message) {
      console.error('[GMC]', message)
    }

    start (canvasElement) {
      console.warn('[GMC] [start] canvasElement', canvasElement)
    }

    loadSpace(spaceId) {
      const foundSpace = this.resources.find(resource => {
        return (resource.type === 'space' && resource.id === spaceId)
      })
      if (foundSpace === undefined) {
        this.error(`[loadSpace] space with id ${spaceId} not found`)
      }
      this.instances = foundSpace.instances
    }
  }
  window.GMC = GMC
})()
