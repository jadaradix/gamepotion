import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from '../../classes'

import parseRunArguments from './parseRunArguments'
import getInstanceClassesAtCoords from './getInstanceClassesAtCoords'

const variables = new Map()
let resourceContainers = []

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
      const runArguments = (a.requiresRuntimeRunArgumentParsing === true ? parseRunArguments(a.argumentTypes, a.runArguments, variables).runArguments : a.runArguments)
      return a.run(context, runArguments, a.appliesTo)
    })
  }
}

const getInstanceClasses = (instances) => {
  return instances.map(i => {
    const atomContainer = resourceContainers.find(r => r.resource.type === 'atom' && r.resource.id === i.atomId)
    const imageContainer = resourceContainers.find(r => r.resource.type === 'image' && r.resource.id === atomContainer.resource.imageId)
    const coords = [i.x, i.y, i.z]
    return new AtomInstance(coords, atomContainer, imageContainer)
  })
}

const handleEvent = (event, spaceContainer, instanceClasses, appliesToInstanceClasses) => {
  let instanceClassesToDestroy = []
  let instancesToCreate = []
  appliesToInstanceClasses.forEach(i => {
    const actionBacks = i.onEvent(event, spaceContainer).filter(ab => typeof ab === 'object' && ab !== null)
    actionBacks.forEach(actionBack => {
      const result = handleActionBack(instanceClasses, appliesToInstanceClasses, actionBack)
      instanceClassesToDestroy = instanceClassesToDestroy.concat(result.instanceClassesToDestroy)
      instancesToCreate = instancesToCreate.concat(result.instancesToCreate)
    })
  })
  if (instanceClassesToDestroy.length > 0) {
    console.log('[Oscar] [handleEvent] instanceClassesToDestroy', instanceClassesToDestroy)
    instanceClasses = handleEvent('destroy', spaceContainer, instanceClasses, instanceClassesToDestroy)
  }
  // const createdInstances = instancesToCreate.map(itc => {
  //   return null
  // })
  // instanceClasses = instanceClasses.concat(createdInstances)
  // if (createdInstances.length > 0) {
  //   console.log('[Oscar] [handleEvent] createdInstances', createdInstances)
  //   // instanceClasses = handleEvent('create', spaceContainer, instanceClasses, createdInstances)
  // }
  instanceClasses = instanceClasses.filter(ic => {
    const willDestroy = instanceClassesToDestroy.includes(ic)
    if (willDestroy === true) {
      console.error('willDestroy', willDestroy)
    }
    return (!willDestroy)
  })
  return instanceClasses
}

const handleActionBack = (instanceClasses, appliesToInstanceClasses, actionBack) => {
  // console.warn('[handleActionBack] instanceClasses/appliesToInstanceClasses/actionBack', instanceClasses, appliesToInstanceClasses, actionBack)
  const actionBackLogics = {
    'INSTANCE_DESTROY': () => {
      return {
        instanceClassesToDestroy: actionBack.actionBackArguments,
        instancesToCreate: []
      }
    },
    'INSTANCE_CREATE': () => {
      const getAtomById = (id) => {
        return resourceContainers.find(rc => rc.resource.id === id).resource
      }
      const instancesToCreate = [
        {
          atom: getAtomById(actionBack.actionBackArguments[0]),
          x: actionBack.actionBackArguments[1],
          y: actionBack.actionBackArguments[2]
        }
      ]
      return {
        instanceClassesToDestroy: [],
        instancesToCreate
      }
    }
  }
  const actionBackLogic = actionBackLogics[actionBack.actionBack]
  if (typeof actionBackLogic !== 'function') {
    throw new Error('unsupported actionBack type; this is quite bad')
  }
  return actionBackLogic()
}

const start = (spaceContainer, instanceClasses) => {
  // console.warn('[start] spaceContainer', spaceContainer)
  // console.warn('[start] instanceClasses', instanceClasses)
  return handleEvent('create', spaceContainer, instanceClasses, instanceClasses)
}

const step = (spaceContainer, instanceClasses) => {
  // console.warn('[step] spaceContainer', spaceContainer)
  // console.warn('[step] instanceClasses', instanceClasses)
  instanceClasses.forEach(i => {
    i.vcoords.forEach((vc, vci) => {
      i.coords[vci] += vc
    })
  })
  return handleEvent('step', spaceContainer, instanceClasses, instanceClasses)
}

const draw = (ctx, spaceContainer, instanceClasses, designMode, grid) => {
  ctx.clearRect(0, 0, spaceContainer.resource.width, spaceContainer.resource.height)
  if (spaceContainer.extras.backgroundImage !== null) {
    const imageWidth = spaceContainer.extras.backgroundImage.resource.frameWidth
    const imageHeight = spaceContainer.extras.backgroundImage.resource.frameHeight
    const xCount = (spaceContainer.resource.width + (spaceContainer.resource.width % imageWidth)) / imageWidth
    const yCount = (spaceContainer.resource.height + (spaceContainer.resource.height % imageHeight)) / imageHeight
    for (let x = 0; x < xCount; x++) {
      for (let y = 0; y < yCount; y++) {
        ctx.drawImage(spaceContainer.extras.backgroundImage.extras.element, x * imageWidth, y * imageHeight)
      }
    }    
  }
  instanceClasses.forEach(i => {
    i.imageContainer && ctx.drawImage(i.imageContainer.extras.image, i.coords[0], i.coords[1])
  })
  if (spaceContainer.extras.foregroundImage !== null) {
    ctx.drawImage(spaceContainer.extras.foregroundImage.extras.element, 0, 0)
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
    resourceContainers = resources.map(resource => {
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
    let instanceClasses = getInstanceClasses(space.instances)
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
        instanceClasses = handleEvent('touch', spaceContainer, instanceClasses, instancesAtCoords)
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
        const logic = () => {
          instanceClasses = start(spaceContainer, instanceClasses, this.props.designMode)
          instanceClasses = step(spaceContainer, instanceClasses, this.props.designMode)
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
                const requiresRuntimeRunArgumentParsing = parseRunArguments(argumentTypes, a.runArguments, variables).requiresRuntimeRunArgumentParsing
                return {
                  resourceContainers,
                  argumentTypes,
                  run: actionClassInstance.run,
                  runArguments: a.runArguments,
                  appliesTo: a.appliesTo,
                  requiresRuntimeRunArgumentParsing
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
  onTouchMove: PropTypes.func
}

Oscar.defaultProps = {
  designMode: false,
  onTouch: () => {},
  onTouchSecondary: () => {},
  onTouchMove: () => {}
}

export default Oscar
