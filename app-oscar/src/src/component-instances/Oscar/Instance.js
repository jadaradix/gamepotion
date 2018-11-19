import parseRunArguments from './parseRunArguments'

class Instance {
  constructor(props, atomContainer, imageContainer) {
    this.props = props
    this.atomContainer = atomContainer
    this.imageContainer = imageContainer
  }

  getImage() {
    if (!this.imageContainer) {
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
    return this.atomContainer.extras.events.get(event).map(a => {
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
      const runArguments = parseRunArguments(a.argumentTypes, a.runArguments, parseContext)
      return a.run(runContext, runArguments, a.appliesTo)
    })
  }
}

export default Instance
