import parseRunArguments from './parseRunArguments'

const frameSpeedToIncrements = {
  '0': 0,
  '1': 0.1,
  '2': 0.2,
  '3': 0.3
}

class Instance {
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
    if (typeof this.imageContainer === 'object' && this.props.frame <= this.imageContainer.resource.frameCount - 1) {
      this.props.frame += frameSpeedToIncrements[this.imageContainer.resource.frameSpeed]
    } else {
      this.props.frame = 0
    }
  }

  onEvent(actions, eventContext) {
    const instance = this
    const results = []
    let i = 0
    let executeElseClause = true
    while (i < actions.length) {
      const action = actions[i]
      const parseContext = {
        eventContext,
        instanceClass: this
      }
      // console.warn('[onEvent] parseContext', parseContext)
      const runArguments = parseRunArguments(action.argumentTypes, action.runArguments, parseContext)
      const runContext = {
        platform: 'html5',
        eventContext,
        instance,
        otherInstance: null
      }
      const result = action.run(runContext, runArguments, action.appliesTo)

      if (action.id.startsWith('If')) {
        if (result === true) {
          executeElseClause = false
          i += 1
        } else {
          executeElseClause = true
          i += 1
          while (i < actions.length) {
            if (actions[i].id === 'Else' || actions[i].id === 'EndIf') {
              break
            }
            i += 1
          }
        }
        continue
      }

      if (action.id === 'Else') {
        if (executeElseClause === true) {
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
        continue
      }

      results.push(result)
      i += 1
    }
    return results
  }
}

export default Instance
