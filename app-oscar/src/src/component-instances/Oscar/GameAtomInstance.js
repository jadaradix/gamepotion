import parseRunArguments from './parseRunArguments/parseRunArguments'

class GameAtomInstance {
  constructor(props, atomContainer) {
    this.props = props
    this.atomContainer = atomContainer
  }

  setImage(imageId, resourceContainers) {
    this.imageContainer = resourceContainers.find(r => r.resource.id === imageId)
  }

  getImage() {
    if (this.imageContainer === undefined) {
      return null
    }
    if (typeof this.imageContainer.extras.image.dataset.oscarErrored === 'string') {
      return null
    }
    return this.imageContainer.extras.image
  }

  getWidth() {
    return (this.imageContainer && this.imageContainer.resource.frameWidth) || 0
  }

  getHeight() {
    return (this.imageContainer && this.imageContainer.resource.frameHeight) || 0
  }

  onStep() {
    this.props.x += this.props.vx
    this.props.y += this.props.vy
    this.props.z += this.props.vz
  }

  onEvent(event, eventContext) {
    const instance = this
    const actions = this.atomContainer.extras.events.get(event)
    const results = []
    let i = 0
    while (i < actions.length) {
      const action = actions[i]
      const runContext = {
        eventContext,
        platform: 'html5',
        space: eventContext.spaceContainer.space,
        instance,
        otherInstance: null
      }
      const parseContext = {
        eventContext,
        instanceClass: this,
        camera: eventContext.spaceContainer.resource.camera
      }
      const runArguments = parseRunArguments(action.argumentTypes, action.runArguments, parseContext)
      const result = action.run(runContext, runArguments, action.appliesTo)
      if (action.id.startsWith('If')) {
        if (result === true) {
          i += 1
        } else {
          i += 1
          while (i < actions.length) {
            if (actions[i].id === 'EndIf') {
              break
            }
            i += 1
          }
        }
      } else {
        results.push(action.run(runContext, runArguments, action.appliesTo))
        i += 1
      }
    }
    return results
  }
}

export default GameAtomInstance
