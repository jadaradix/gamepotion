import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from '../../classes'

// import parseRunArguments from './parseRunArguments'
import getInstanceClassesAtCoords from './getInstanceClassesAtCoords'
import draw from './draw'
import instanceDefinitionsToInstanceClasses from './instanceDefinitionsToInstanceClasses'
import handleEvent from './handleEvent'

const start = (spaceContainer, resourceContainers, variables, instanceClasses) => {
  // console.warn('[start] spaceContainer', spaceContainer)
  // console.warn('[start] instanceClasses', instanceClasses)
  return handleEvent('create', spaceContainer, resourceContainers, variables, instanceClasses, instanceClasses)
}

const step = (spaceContainer, resourceContainers, variables, instanceClasses) => {
  // console.warn('[step] spaceContainer', spaceContainer)
  // console.warn('[step] instanceClasses', instanceClasses)
  instanceClasses.forEach(i => {
    i.props.x += i.props.vx
    i.props.y += i.props.vy
    i.props.z += i.props.vz
  })
  return handleEvent('step', spaceContainer, resourceContainers, variables, instanceClasses, instanceClasses)
}

class Oscar extends Component {
  constructor() {
    super()
    this.canvasRef = React.createRef()
    this.eventListeners = new Map()
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  addEventListener(element, event, logic) {
    element.addEventListener(event, logic)
    this.eventListeners.set(
      {
        element,
        event
      },
      logic
    )
  }

  removeEventListeners() {
    for (const [k, v] of this.eventListeners.entries()) {
      k.element.removeEventListener(k.event, v)
    }
  }

  renderCanvas(canvas, space, resources) {
    const resourceContainers = resources.map(resource => {
      return {
        resource,
        extras: {}
      }
    })
    const spaceContainer = {
      resource: space,
      extras: {
        backgroundImage: null,
        foregroundImage: null
      }
    }
    this.removeEventListeners()

    // let because it can be spliced
    let instanceClasses = instanceDefinitionsToInstanceClasses(resourceContainers, space.instances)
    // console.warn('[renderCanvas] instanceClasses', instanceClasses)

    const [c, ctx, cDomBounds] = [canvas, canvas.getContext('2d'), canvas.getBoundingClientRect()]
    const getTouchData = (e) => {
      e.preventDefault()
      const x = parseInt(e.touches[0].clientX - cDomBounds.x + window.scrollX, 10)
      const y = parseInt(e.touches[0].clientY - cDomBounds.y + window.scrollY, 10)
      const z = parseInt(0, 10)
      return { x, y, z }
    }
    const getMouseData = (e) => {
      e.preventDefault()
      const x = parseInt(e.clientX - cDomBounds.x + window.scrollX, 10)
      const y = parseInt(e.clientY - cDomBounds.y + window.scrollY, 10)
      const z = parseInt(0, 10)
      return { x, y, z }
    }
    const onTouch = (coords) => {
      if (this.props.grid.on === true) {
        coords.x = coords.x - (coords.x % this.props.grid.width)
        coords.y = coords.y - (coords.y % this.props.grid.width)
      }
      this.props.onTouch(coords)
    }
    let touchStartTime = 0
    let touchStartCoords = null
    this.addEventListener(canvas, 'touchstart', (e) => {
      touchStartTime = Date.now()
      touchStartCoords = getTouchData(e)
    })
    this.addEventListener(canvas, 'touchend', () => {
      const instancesAtCoords = getInstanceClassesAtCoords(instanceClasses, touchStartCoords)
      const touchEndTime = Date.now()
      const timeDifference = touchEndTime - touchStartTime
      // console.warn('touchEndTime', touchEndTime)
      // console.warn('touchStartTime', touchStartTime)
      // console.warn('timeDifference', timeDifference)
      if (this.props.designMode === true) {
        if (timeDifference <= 1000) {
          onTouch(touchStartCoords)
        } else {
          const indicesAtCoords = instancesAtCoords.map(ic => {
            return instanceClasses.indexOf(ic)
          })
          this.props.onTouchSecondary(indicesAtCoords)
        }
      } else {
        instanceClasses = handleEvent('touch', spaceContainer, resourceContainers, this.props.variables, instanceClasses, instancesAtCoords)
      }
    })
    this.addEventListener(canvas, 'mousedown', (e) => {
      e.preventDefault()
      const coords = getMouseData(e)
      const instancesAtCoords = getInstanceClassesAtCoords(instanceClasses, coords)
      if (this.props.designMode === true) {
        if (e.which === 1) {
          onTouch(coords)
        } else {
          const indicesAtCoords = instancesAtCoords.map(ic => {
            return instanceClasses.indexOf(ic)
          })
          this.props.onTouchSecondary(indicesAtCoords)
        }
      } else {
        instanceClasses = handleEvent('touch', spaceContainer, resourceContainers, this.props.variables, instanceClasses, instancesAtCoords)
      }
    })
    this.addEventListener(canvas, 'contextmenu', (e) => {
      e.preventDefault()
      return false
    })
    this.addEventListener(canvas, 'touchmove', (e) => {
      this.props.onTouchMove(getTouchData(e))
    })
    this.addEventListener(canvas, 'mousemove', (e) => {
      this.props.onTouchMove(getMouseData(e))
    })
    let resourceContainersLoadedSoFar = 0
    const totalResourceContainersToLoad = resourceContainers.filter(r => ['image', 'sound'].includes(r.resource.type)).length
    const startLoading = () => {
      console.warn('[Oscar] [renderCanvas] start loading!')
      c.width = space.width
      c.height = space.height
      c.style.display = 'block'
      c.style.backgroundColor = 'black'
      c.style.width = space.width
      c.style.height = space.height
      // stop blurred lines from https://stackoverflow.com/questions/4261090/html5-canvas-and-anti-aliasing
      ctx.imageSmoothingEnabled = false
      ctx.translate(0.5, 0.5)
      //
      ctx.clearRect(0, 0, space.width, space.height)
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.fillText('Loading...', 16, 24)
    }

    const loadedGood = () => {
      console.warn('[Oscar] [renderCanvas] [loadedGood]')
      if (this.props.designMode === true) {
        draw(ctx, spaceContainer, instanceClasses, this.props.designMode, this.props.grid)
      } else {
        instanceClasses = start(spaceContainer, resourceContainers, this.props.variables, instanceClasses, this.props.designMode)
        const logic = () => {
          instanceClasses = step(spaceContainer, resourceContainers, this.props.variables, instanceClasses, this.props.designMode)
          draw(ctx, spaceContainer, instanceClasses, this.props.designMode, this.props.grid)
          if (this.props.designMode === false) {
            window.requestAnimationFrame(logic)
          }
        }
        logic()
      }
    }
    const loadedBad = () => {
      console.warn('[Oscar] [renderCanvas] [loadedBad]')
      ctx.clearRect(0, 0, space.width, space.height)
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.fillText('This space could not be loaded.', 16, 24)
      this.removeEventListeners()
    }
    const loadGoodLogic = () => {
      resourceContainersLoadedSoFar += 1
      console.warn(`[Oscar] [renderCanvas] [loadGoodLogic] done ${resourceContainersLoadedSoFar}/${totalResourceContainersToLoad}`)
      if (resourceContainersLoadedSoFar === totalResourceContainersToLoad) {
        loadedGood()
      }
    }
    const loadBadLogic = () => {
      console.warn('[Oscar] [renderCanvas] [loadBadLogic]')
      loadedBad()
    }
    startLoading()

    //
    // GET READY FOR EVENTS
    //
    const actionClassInstances = new Map(
      Object.keys(classes.actions).map(k => {
        return [k, new classes.actions[k]()]
      })
    )
    const resourcesAtoms = resourceContainers.filter(r => r.resource.type === 'atom')
    resourcesAtoms
      .forEach(r => {
        r.extras.events = new Map(
          Object.keys(r.resource.events).map(k => {
            return [
              k,
              r.resource.events[k].map(a => {
                const actionClassInstance = actionClassInstances.get(a.id)
                const argumentTypes = Array.from(actionClassInstance.defaultRunArguments.values()).map(ar => ar.type)
                return {
                  run: actionClassInstance.run,
                  runArguments: a.runArguments,
                  appliesTo: a.appliesTo,
                  resourceContainers,
                  argumentTypes
                }
              })
            ]
          })
        )
      })

    //
    // LOAD IMAGES
    //
    const resourcesImages = resourceContainers.filter(r => r.resource.type === 'image')
    resourcesImages.forEach(resource => {
      const element = new window.Image()
      this.addEventListener(element, 'load', loadGoodLogic)
      this.addEventListener(element, 'error', loadBadLogic)
      resource.extras.element = element
      element.src = resource.resource.getRemoteUrl()
      if (spaceContainer.resource.backgroundImage === resource.resource.id) {
        spaceContainer.extras.backgroundImage = resource
      }
      if (spaceContainer.resource.foregroundImage === resource.resource.id) {
        spaceContainer.extras.foregroundImage = resource
      }
      resource.extras.image = element
    })

    //
    // LOAD SOUNDS
    //
    const resourcesSounds = resourceContainers.filter(r => r.resource.type === 'sound')
    resourcesSounds.forEach(resource => {
      const element = new window.Audio()
      this.addEventListener(element, 'loadedmetadata', loadGoodLogic)
      this.addEventListener(element, 'error', loadBadLogic)
      resource.extras.element = element
      element.src = resource.resource.getRemoteUrl()
      element.load()
    })

    //
    // NO IMAGES OR SOUNDS
    //
    if (resourcesImages.length === 0 && resourcesSounds.length === 0) {
      loadedGood()
    }

  }

  render() {
    console.warn('[Oscar] [render]')
    const canvasStyle = {
      width: this.props.space.width,
      height: this.props.space.height,
      lineHeight: `${this.props.space.height}px`
    }
    return (
      <canvas style={canvasStyle} className='component--oscar-engine-space' ref={(element) => {
        if (element === null) {
          return
        }
        this.renderCanvas(element, this.props.space, this.props.resources)
      }} />
    )
  }
}

Oscar.propTypes = {
  designMode: PropTypes.bool,
  space: PropTypes.any.isRequired,
  resources: PropTypes.array.isRequired,
  grid: PropTypes.object.isRequired,
  onTouch: PropTypes.func,
  onTouchSecondary: PropTypes.func,
  onTouchMove: PropTypes.func,
  variables: PropTypes.any
}

Oscar.defaultProps = {
  designMode: false,
  onTouch: () => {},
  onTouchSecondary: () => {},
  onTouchMove: () => {},
  variables: new Map()
}

export default Oscar
