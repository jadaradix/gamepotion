import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from '../classes'

const variables = new Map()

const getRunArguments = (runArguments) => {
  return runArguments.map(r => {
    if (r[0] === '"') {
      return r.substring(1, r.length - 1)
    }
    const foundVariable = variables.get(r)
    if (foundVariable !== undefined) {
      return foundVariable
    }
    return r
  })
}

class AtomInstance {
  constructor(coords, atomContainer, imageContainer) {
    this.coords = coords
    this.vcoords = Array(coords.length).fill(0)
    this.atomContainer = atomContainer
    this.imageContainer = imageContainer
  }

  onEvent(event, spaceContainer) {
    const instance = this
    return this.atomContainer.extras.events.get(event).map(a => {
      const context = {
        platform: 'html5',
        space: spaceContainer.space,
        instance,
        variables
      }
      return a.run(context, getRunArguments(a.runArguments), a.appliesTo)
    })
  }
}

const start = (spaceContainer, instanceClasses) => {
  // console.warn('[start] spaceContainer', spaceContainer)
  // console.warn('[start] instanceClasses', instanceClasses)
  return handleEvent('create', spaceContainer, instanceClasses)
}

const step = (spaceContainer, instanceClasses) => {
  // console.warn('[step] spaceContainer', spaceContainer)
  // console.warn('[step] instanceClasses', instanceClasses)
  instanceClasses.forEach(i => {
    i.vcoords.forEach((vc, vci) => {
      i.coords[vci] += vc
    })
  })
  return handleEvent('step', spaceContainer, instanceClasses)
}

const getInstancesAtCoords = (instanceClasses, coords) => {
  return instanceClasses
    .map(ic => {
      const w = (ic.imageContainer && ic.imageContainer.resource.frameWidth) || 0
      const h = (ic.imageContainer && ic.imageContainer.resource.frameHeight) || 0
      const isIntersecting = (
        coords[0] >= ic.coords[0] &&
        coords[1] >= ic.coords[1] &&
        coords[0] < (ic.coords[0] + w) &&
        coords[1] < (ic.coords[1] + h)
      )
      return (isIntersecting ? ic : undefined)
    })
    .filter(ic => ic !== undefined)
}

const getInstanceClasses = (instances, resourceContainers) => {
  console.warn('[SpaceCanvas] [renderCanvas] [getInstanceClasses] resourceContainers', resourceContainers)
  return instances.map(i => {
    const atomContainer = resourceContainers.find(r => r.resource.type === 'atom' && r.resource.id === i.atomId)
    const imageContainer = resourceContainers.find(r => r.resource.type === 'image' && r.resource.id === atomContainer.resource.imageId)
    const coords = [i.x, i.y, i.z]
    return new AtomInstance(coords, atomContainer, imageContainer)
  })
}

const handleActionBack = (instanceClasses, actionBack) => {
  switch(actionBack.actionBack) {
  case 'INSTANCE_DESTROY':
    console.warn('[handleActionBack] instanceClasses/actionBack', instanceClasses, actionBack)
    return {
      instanceClassesToDestroy: [actionBack.actionBackArguments[0]]
    }
  default:
  }
}

const handleEvent = (event, spaceContainer, instanceClasses) => {
  let instanceClassesToDestroy = []
  instanceClasses.forEach(i => {
    const actionBacks = i.onEvent(event, spaceContainer).filter(ab => ab !== null && typeof ab === 'object')
    actionBacks.forEach(actionBack => {
      const result = handleActionBack(instanceClasses, actionBack)
      instanceClassesToDestroy = instanceClassesToDestroy.concat(result.instanceClassesToDestroy)
    })
  })
  // console.log('[handleEvent] instanceClassesToDestroy', instanceClassesToDestroy)
  if (instanceClassesToDestroy.length > 0) {
    instanceClasses = handleEvent('destroy', spaceContainer, instanceClassesToDestroy)
  }
  instanceClasses = instanceClasses.filter(ic => {
    const willDestroy = instanceClassesToDestroy.includes(ic)
    return (!willDestroy)
  })
  return instanceClasses
}

const draw = (ctx, spaceContainer, instanceClasses, designMode, grid) => {
  ctx.clearRect(0, 0, spaceContainer.resource.width, spaceContainer.resource.height)
  if (spaceContainer.extras.backgroundImage !== null) {
    ctx.drawImage(spaceContainer.extras.backgroundImage, 0, 0)
  }
  instanceClasses.forEach(i => {
    i.imageContainer && ctx.drawImage(i.imageContainer.extras.image, i.coords[0], i.coords[1])
  })
  if (spaceContainer.extras.foregroundImage !== null) {
    ctx.drawImage(spaceContainer.extras.foregroundImage, 0, 0)
  }
  const plotGrid = () => {
    let w = parseInt(grid.width, 10)
    let h = parseInt(grid.height, 10)
    ctx.beginPath()
    while (w < spaceContainer.resource.width) {
      ctx.moveTo(w, 0)
      ctx.lineTo(w, spaceContainer.resource.height)
      w += parseInt(grid.width, 10)
      while (h < spaceContainer.resource.height) {
        ctx.moveTo(0, h)
        ctx.lineTo(spaceContainer.resource.width, h)
        h += parseInt(grid.height, 10)
      }
    }
    ctx.closePath()
  }
  const plotCamera = () => {
    ctx.beginPath()
    ctx.rect(spaceContainer.resource.camera.x, spaceContainer.resource.camera.y, spaceContainer.resource.camera.width - 1, spaceContainer.resource.camera.height - 1)
    ctx.closePath()
  }
  if (designMode === true) {
    if (grid.on === true) {
      ctx.globalAlpha = 0.5
      plotGrid()
      ctx.strokeStyle = '#ffffff'
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    ctx.globalAlpha = 0.75
    plotCamera()
    ctx.strokeStyle = '#ff0000'
    ctx.stroke()
    ctx.globalAlpha = 1
  }
}

class SpaceCanvas extends Component {
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
    let instanceClasses = getInstanceClasses(space.instances, resourceContainers)
    console.error('delib here', instanceClasses)

    const [c, ctx, cDomBounds] = [canvas, canvas.getContext('2d'), canvas.getBoundingClientRect()]
    const getTouchData = (e) => {
      e.preventDefault()
      const x = parseInt(e.touches[0].clientX - cDomBounds.x + window.scrollX, 10)
      const y = parseInt(e.touches[0].clientY - cDomBounds.y + window.scrollY, 10)
      const z = parseInt(0, 10)
      const coords = [x, y, z]
      return coords
    }
    const getMouseData = (e) => {
      e.preventDefault()
      const x = parseInt(e.clientX - cDomBounds.x + window.scrollX, 10)
      const y = parseInt(e.clientY - cDomBounds.y + window.scrollY, 10)
      const z = parseInt(0, 10)
      const coords = [x, y, z]
      return coords
    }
    const onTouch = (coords) => {
      if (this.props.grid.on === true) {
        coords[0] = coords[0] - (coords[0] % this.props.grid.width)
        coords[1] = coords[1] - (coords[1] % this.props.grid.width)
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
      const instancesAtCoords = getInstancesAtCoords(instanceClasses, touchStartCoords)
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
        instanceClasses = handleEvent('touch', spaceContainer, instanceClasses, instancesAtCoords)
      }
    })
    this.addEventListener(canvas, 'mousedown', (e) => {
      e.preventDefault()
      const coords = getMouseData(e)
      const instancesAtCoords = getInstancesAtCoords(instanceClasses, coords)
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
        instanceClasses = handleEvent('touch', spaceContainer, instanceClasses, instancesAtCoords)
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
      console.warn('[SpaceCanvas] [renderCanvas] start loading!')
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
      console.warn('[SpaceCanvas] [renderCanvas] [loadedGood]')
      const runStepAndDrawLoop = () => {
        instanceClasses = step(spaceContainer, instanceClasses, this.props.designMode)
        draw(ctx, spaceContainer, instanceClasses, this.props.designMode, this.props.grid)
        window.requestAnimationFrame(runStepAndDrawLoop)
      }
      const runDraw = () => {
        draw(ctx, spaceContainer, instanceClasses, this.props.designMode, this.props.grid)
      }
      if (this.props.designMode === true) {
        runDraw()
      } else {
        instanceClasses = start(spaceContainer, instanceClasses, this.props.designMode)
        runStepAndDrawLoop()
      }
    }
    const loadedBad = () => {
      console.warn('[SpaceCanvas] [renderCanvas] [loadedBad]')
      ctx.clearRect(0, 0, space.width, space.height)
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.fillText('This space could not be loaded.', 16, 24)
      this.removeEventListeners()
    }
    const loadGoodLogic = () => {
      resourceContainersLoadedSoFar += 1
      console.warn(`[SpaceCanvas] [renderCanvas] [loadGoodLogic] done ${resourceContainersLoadedSoFar}/${totalResourceContainersToLoad}`)
      if (resourceContainersLoadedSoFar === totalResourceContainersToLoad) {
        loadedGood()
      }
    }
    const loadBadLogic = () => {
      console.warn('[SpaceCanvas] [renderCanvas] [loadBadLogic]')
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
    resourceContainers
      .filter(r => r.resource.type === 'atom')
      .map(r => {
        r.extras.events = new Map(
          Object.keys(r.resource.events).map(k => {
            return [
              k,
              r.resource.events[k].map(a => {
                const actionClassRunLogic = actionClassInstances.get(a.id).run
                return {
                  run: actionClassRunLogic,
                  runArguments: a.runArguments,
                  appliesTo: a.appliesTo
                }
              })
            ]
          })
        )
        return r
      })

    //
    // LOAD IMAGES
    //
    resourceContainers
      .filter(r => r.resource.type === 'image')
      .forEach(resource => {
        const element = new window.Image()
        this.addEventListener(element, 'load', loadGoodLogic)
        this.addEventListener(element, 'error', loadBadLogic)
        resource.extras.element = element
        element.src = resource.resource.getRemoteUrl()
        if (spaceContainer.resource.backgroundImage === resource.resource.id) {
          spaceContainer.extras.backgroundImage = element
        }
        if (spaceContainer.resource.foregroundImage === resource.resource.id) {
          spaceContainer.extras.foregroundImage = element
        }
        resource.extras.image = element
      })

    //
    // LOAD SOUNDS
    //
    resourceContainers
      .filter(r => r.resource.type === 'sound')
      .forEach(resource => {
        const element = new window.Audio()
        this.addEventListener(element, 'loadedmetadata', loadGoodLogic)
        this.addEventListener(element, 'error', loadBadLogic)
        resource.extras.element = element
        element.src = resource.resource.getRemoteUrl()
        element.load()
      })
  }

  render() {
    console.warn('[SpaceCanvas] [render]')
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

SpaceCanvas.propTypes = {
  designMode: PropTypes.bool,
  space: PropTypes.any.isRequired,
  resources: PropTypes.array.isRequired,
  grid: PropTypes.object.isRequired,
  onTouch: PropTypes.func,
  onTouchSecondary: PropTypes.func,
  onTouchMove: PropTypes.func
}

SpaceCanvas.defaultProps = {
  designMode: false,
  onTouch: () => {},
  onTouchSecondary: () => {},
  onTouchMove: () => {}
}

export default SpaceCanvas
