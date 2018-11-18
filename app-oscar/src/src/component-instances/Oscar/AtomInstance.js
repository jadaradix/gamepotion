import parseRunArguments from './parseRunArguments'

class AtomInstance {
  constructor(props, atomContainer, imageContainer) {
    this.props = props
    this.atomContainer = atomContainer
    this.imageContainer = imageContainer
  }

  getWidth() {
    return (this.imageContainer && this.imageContainer.resource.frameWidth) || 0
  }

  getHeight() {
    return (this.imageContainer && this.imageContainer.resource.frameHeight) || 0
  }

  onEvent(event, spaceContainer, variables) {
    const instance = this
    return this.atomContainer.extras.events.get(event).map(a => {
      const context = {
        platform: 'html5',
        space: spaceContainer.space,
        instance,
        otherInstance: null,
        variables
      }
      const runArguments = parseRunArguments(a.argumentTypes, a.runArguments, variables, this)
      return a.run(context, runArguments, a.appliesTo)
    })
  }
}

export default AtomInstance
