import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from '../../classes'

import getInstanceClassesAtCoords from './getInstanceClassesAtCoords'
import draw from './draw'
import instanceDefinitionsToInstanceClasses from './instanceDefinitionsToInstanceClasses'
import handleActionBack from './handleActionBack'

const actionClassInstances = new Map(
  Object.keys(classes.actions).map(k => {
    return [k, new classes.actions[k]()]
  })
)

class GameSpace extends Component {
  constructor() {
    super()
    this.canvasRef = React.createRef()
    this.eventListeners = new Map()
  }

  handleEvent (event, eventContext, instanceClasses, appliesToInstanceClasses) {
    let instanceClassesToDestroy = []
    let instancesToCreate = []
    appliesToInstanceClasses.forEach(i => {
      const actionBacks = i.onEvent(event, eventContext).filter(ab => typeof ab === 'object' && ab !== null)
      actionBacks.forEach(actionBack => {
        const result = handleActionBack(actionBack)
        instanceClassesToDestroy = instanceClassesToDestroy.concat(result.instanceClassesToDestroy)
        instancesToCreate = instancesToCreate.concat(result.instancesToCreate)
        if (typeof result.imageToSet === 'string') {
          i.setImage(result.imageToSet, eventContext.resourceContainers)
        }
        if (typeof result.spaceToGoTo === 'string') {
          this.props.onSwitchSpace(result.spaceToGoTo)
        }
      })
    })
    if (instanceClassesToDestroy.length > 0) {
      console.log('[Oscar] [handleEvent] instanceClassesToDestroy', instanceClassesToDestroy)
      instanceClasses = this.handleEvent('destroy', eventContext, instanceClasses, instanceClassesToDestroy)
    }
    const createdInstances = instanceDefinitionsToInstanceClasses(instancesToCreate, eventContext.resourceContainers)
    instanceClasses = instanceClasses.concat(createdInstances)
    if (createdInstances.length > 0) {
      console.log('[Oscar] [handleEvent] createdInstances', createdInstances)
      instanceClasses = this.handleEvent('create', eventContext, instanceClasses, createdInstances)
    }
    instanceClasses = instanceClasses.filter(ic => {
      const willDestroy = instanceClassesToDestroy.includes(ic)
      return (!willDestroy)
    })
    return instanceClasses
  }

  eventEventStart(instanceClasses) {
    // console.warn('[eventStart] instanceClasses', instanceClasses)
    const eventContext = {
      instanceClasses,
      spaceContainer: this.props.spaceContainer,
      resourceContainers: this.props.resourceContainers,
      variables: this.props.variables
    }
    return this.handleEvent('create', eventContext, instanceClasses, instanceClasses)
  }

  handleEventStep(instanceClasses) {
    // console.warn('[eventStep] instanceClasses', instanceClasses)
    instanceClasses.forEach(i => {
      i.onStep()
    })
    const eventContext = {
      instanceClasses,
      spaceContainer: this.props.spaceContainer,
      resourceContainers: this.props.resourceContainers,
      variables: this.props.variables
    }
    return this.handleEvent('step', eventContext, instanceClasses, instanceClasses)
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  addEventListener(element, event, logic, passive = false) {
    element.addEventListener(event, logic, {passive})
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

  renderCanvas(canvas) {
  
    // sorry
    const domBoundsX = canvas.getBoundingClientRect().x
    const domBoundsY = canvas.getBoundingClientRect().y
    //

    this.removeEventListeners()

    // let because it can be spliced
    let instanceClasses = instanceDefinitionsToInstanceClasses(this.props.spaceContainer.resource.instances, this.props.resourceContainers)

    const [c, ctx] = [canvas, canvas.getContext('2d')]
    const getTouchData = (e) => {
      e.preventDefault()
      // console.error('[renderCanvas] [getTouchData]', e.touches[0].clientY, domBoundsY, window.scrollY)
      let x = parseInt(e.touches[0].clientX - domBoundsX, 10)
      let y = parseInt(e.touches[0].clientY - domBoundsY, 10)
      const z = parseInt(0, 10)
      return { x, y, z }
    }
    const getMouseData = (e) => {
      e.preventDefault()
      // console.error('[renderCanvas] [getMouseData]', e.clientY, domBoundsY, window.scrollY)
      const x = parseInt(e.clientX - domBoundsX + window.scrollX, 10)
      const y = parseInt(e.clientY - domBoundsY + window.scrollY, 10)
      const z = parseInt(0, 10)
      return { x, y, z }
    }
    const onTouch = (coords) => {
      if (this.props.gridOn === true) {
        const gridWidth = parseInt(this.props.gridWidth, 10)
        const gridHeight = parseInt(this.props.gridHeight, 10)
        coords.x = coords.x - (coords.x % gridWidth)
        coords.y = coords.y - (coords.y % gridHeight)
      }
      this.props.onTouch(coords)
    }
    let touchStartTime = 0
    let touchStartCoords = null
    this.addEventListener(canvas, 'touchstart', (e) => {
      touchStartTime = Date.now()
      touchStartCoords = getTouchData(e)
    }, true)
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
        const eventContext = {
          instanceClasses,
          spaceContainer: this.props.spaceContainer,
          resourceContainers: this.props.resourceContainers,
          variables: this.props.variables
        }
        instanceClasses = this.handleEvent('touch', eventContext, instanceClasses, instancesAtCoords)
      }
    }, true)
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
        const eventContext = {
          instanceClasses,
          spaceContainer: this.props.spaceContainer,
          resourceContainers: this.props.resourceContainers,
          variables: this.props.variables
        }
        instanceClasses = this.handleEvent('touch', eventContext, instanceClasses, instancesAtCoords)
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
    const totalResourceContainersToLoad = this.props.resourceContainers.filter(r => ['image', 'sound'].includes(r.resource.type)).length
    const startLoading = () => {
      console.warn('[Oscar] [Space] [renderCanvas] start loading!')
      c.width = this.props.spaceContainer.resource.width
      c.height = this.props.spaceContainer.resource.height
      c.style.display = 'block'
      c.style.backgroundColor = 'black'
      c.style.width = this.props.spaceContainer.resource.width
      c.style.height = this.props.spaceContainer.resource.height
      // stop blurred lines from https://stackoverflow.com/questions/4261090/html5-canvas-and-anti-aliasing
      ctx.imageSmoothingEnabled = false
      ctx.translate(0.5, 0.5)
      //
      ctx.clearRect(0, 0, this.props.spaceContainer.resource.width, this.props.spaceContainer.resource.height)
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.fillText('Loading...', 16, 24)
    }

    const loadGoodLogic = () => {
      resourceContainersLoadedSoFar += 1
      console.warn(`[Oscar] [Space] [renderCanvas] [loadGoodLogic] done ${resourceContainersLoadedSoFar}/${totalResourceContainersToLoad}`)
      if (resourceContainersLoadedSoFar === totalResourceContainersToLoad) {
        loadedGood()
      }
    }
    const loadedGood = () => {
      console.warn('[Oscar] [Space] [renderCanvas] [loadedGood]')
      if (this.props.designMode === true) {
        draw(ctx, this.props.spaceContainer, instanceClasses, this.props.designMode, this.props.gridOn, parseInt(this.props.gridWidth, 10), parseInt(this.props.gridHeight, 10))
      } else {
        instanceClasses = this.eventEventStart(instanceClasses)
        const logic = () => { 
          instanceClasses = this.handleEventStep(instanceClasses)
          draw(ctx, this.props.spaceContainer, instanceClasses, this.props.designMode, this.props.gridOn, parseInt(this.props.gridWidth, 10), parseInt(this.props.gridHeight, 10))
          if (this.props.designMode === false) {
            window.requestAnimationFrame(logic)
          }
        }
        logic()
      }
    }
    // const loadedBad = () => {
    //   console.warn('[Oscar] [Space] [renderCanvas] [loadedBad]')
    //   ctx.clearRect(0, 0, space.width, space.height)
    //   ctx.fillStyle = '#ffffff'
    //   ctx.font = '16px Arial'
    //   ctx.fillText('This space could not be loaded.', 16, 24)
    //   this.removeEventListeners()
    // }

    startLoading()

    //
    // GET READY FOR EVENTS
    //
    const resourcesAtoms = this.props.resourceContainers.filter(r => r.resource.type === 'atom')
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
                  id: actionClassInstance.id,
                  run: actionClassInstance.run,
                  runArguments: a.runArguments,
                  appliesTo: a.appliesTo,
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
    const resourcesImages = this.props.resourceContainers.filter(r => r.resource.type === 'image')
    resourcesImages.forEach(resource => {
      const element = new window.Image()
      this.addEventListener(element, 'load', loadGoodLogic)
      this.addEventListener(element, 'error', () => {
        element.dataset.oscarErrored = true
        loadGoodLogic()
      })
      resource.extras.element = element
      element.src = resource.resource.getRemoteUrl()
      if (this.props.spaceContainer.resource.backgroundImage === resource.resource.id) {
        this.props.spaceContainer.extras.backgroundImage = resource
      }
      if (this.props.spaceContainer.resource.foregroundImage === resource.resource.id) {
        this.props.spaceContainer.extras.foregroundImage = resource
      }
      resource.extras.image = element
    })

    //
    // LOAD SOUNDS
    //
    const resourcesSounds = this.props.resourceContainers.filter(r => r.resource.type === 'sound')
    resourcesSounds.forEach(resource => {
      const element = new window.Audio()
      this.addEventListener(element, 'loadedmetadata', loadGoodLogic)
      this.addEventListener(element, 'error', () => {
        element.dataset.oscarErrored = true
        loadGoodLogic()
      })
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
    console.warn('[Oscar] [Space] [render]')
    const canvasStyle = {
      width: this.props.spaceContainer.resource.width,
      height: this.props.spaceContainer.resource.height,
      lineHeight: `${this.props.spaceContainer.resource.height}px`
    }
    return (
      <canvas style={canvasStyle} className='component--oscar-engine-space' ref={(element) => {
        if (element === null) {
          return
        }
        this.renderCanvas(element)
      }} />
    )
  }
}

GameSpace.propTypes = {
  spaceContainer: PropTypes.any.isRequired,
  resourceContainers: PropTypes.array.isRequired,
  designMode: PropTypes.bool,
  gridOn: PropTypes.bool,
  gridWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variables: PropTypes.any.isRequired,
  onTouch: PropTypes.func,
  onTouchSecondary: PropTypes.func,
  onTouchMove: PropTypes.func,
  onSwitchSpace: PropTypes.func
}

GameSpace.defaultProps = {
  designMode: false,
  gridOn: false,
  gridWidth: 16,
  gridHeight: 16,
  onTouch: () => {},
  onTouchSecondary: () => {},
  onTouchMove: () => {},
  onSwitchSpace: () => {}
}

export default GameSpace
