import parseRunArguments from './parseRunArguments'

class AtomInstance {
  constructor(coords, atomContainer, imageContainer) {
    this.coords = coords
    this.vcoords = Array(coords.length).fill(0)
    this.atomContainer = atomContainer
    this.imageContainer = imageContainer
  }

  onEvent(event, spaceContainer, variables) {
    const instance = this
    return this.atomContainer.extras.events.get(event).map(a => {
      const context = {
        platform: 'html5',
        space: spaceContainer.space,
        instance,
        variables
      }
      const runArguments = parseRunArguments(a.argumentTypes, a.runArguments, variables)
      // (a.requiresRuntimeRunArgumentParsing === true ? parseRunArguments(a.argumentTypes, a.runArguments, variables).runArguments : a.runArguments)
      return a.run(context, runArguments, a.appliesTo)
    })
  }
}

export default AtomInstance
