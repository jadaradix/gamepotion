import classes from '../classes'
import instanceDefinitionsToInstances from './instanceDefinitionsToInstances'
import handleActionBack from './handleActionBack'

const actionClasses = new Map(
  Object.keys(classes.actions).map(k => {
    return [k, new classes.actions[k]()]
  })
)

const drawBackgroundImage = (ctx, spaceContainer, designMode) => {
  if (typeof spaceContainer.extras.backgroundImage !== 'object') {
    return
  }
  const {
    frameWidth,
    frameHeight
  } = spaceContainer.extras.backgroundImage.resource
  const xCount = (spaceContainer.resource.width + (spaceContainer.resource.width % frameWidth)) / frameWidth
  const yCount = (spaceContainer.resource.height + (spaceContainer.resource.height % frameHeight)) / frameHeight
  const offsetX = (!designMode ? spaceContainer.resource.camera.x : 0)
  const offsetY = (!designMode ? spaceContainer.resource.camera.y : 0)
  for (let x = 0; x < xCount; x++) {
    for (let y = 0; y < yCount; y++) {
      const actualX = x * frameWidth - offsetX
      const actualY = y * frameHeight - offsetY
      ctx.drawImage(spaceContainer.extras.backgroundImage.extras.element, actualX, actualY)
    }
  }
}

const drawInstance = (ctx, spaceContainer, designMode, instance) => {
  // const frame = parseInt(instance.props.frame, 10)
  // const image = instance.getImage()
  // const x = instance.props.x - (!designMode ? spaceContainer.resource.camera.x : 0)
  // const y = instance.props.y - (!designMode ? spaceContainer.resource.camera.y : 0)
  // const width = instance.getWidth()
  // const height = instance.getHeight()
  // // docs: drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
  // if (image !== null) {
  //   ctx.drawImage(image, 0, frame * height, width, height, x, y, width, height) 
  // }
}

const drawForegroundImage = (ctx, spaceContainer) => {
  if (typeof spaceContainer.extras.foregroundImage !== 'object') {
    return
  }
  ctx.drawImage(spaceContainer.extras.foregroundImage.extras.element, 0, 0)
}

const drawGrid = (ctx, spaceContainer, gridWidth, gridHeight) => {
  ctx.globalAlpha = 0.5
  let x = gridWidth
  let y = gridHeight
  ctx.beginPath()
  while (x < spaceContainer.resource.width) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, spaceContainer.resource.height)
    x += gridWidth
    while (y < spaceContainer.resource.height) {
      ctx.moveTo(0, y)
      ctx.lineTo(spaceContainer.resource.width, y)
      y += gridHeight
    }
  }
  ctx.closePath()
  ctx.strokeStyle = '#ffffff'
  ctx.stroke()
  ctx.globalAlpha = 1
}

const drawCamera = (ctx, spaceContainer) => {
  ctx.globalAlpha = 0.75
  ctx.beginPath()
  const {
    x,
    y,
    width,
    height
  } = spaceContainer.resource.camera
  ctx.rect(x, y, width - 1, height - 1)
  ctx.closePath()
  ctx.strokeStyle = '#ff0000'
  ctx.stroke()
  ctx.globalAlpha = 1
}

const clear = (ctx, designMode, spaceContainer) => {
  ctx.clearRect(
    0,
    0,
    (designMode ? spaceContainer.resource.width : spaceContainer.resource.camera.width),
    (designMode ? spaceContainer.resource.height : spaceContainer.resource.camera.height)
  )
}

const draw = ({ctx, spaceContainer, designMode, gridOn, gridWidth, gridHeight}) => {
  clear(ctx, designMode, spaceContainer)
  drawBackgroundImage(ctx, spaceContainer, designMode)
  drawForegroundImage(ctx, spaceContainer)
  if (designMode === true) {
    drawCamera(ctx, spaceContainer)
  }
  if (gridOn === true) {
    drawGrid(ctx, spaceContainer, gridWidth, gridHeight)
  }
}

const getTouchData = (domBoundsX, domBoundsY, e) => {
  e.preventDefault()
  // console.error('[getTouchData]', e.touches[0].clientY, domBoundsY, window.scrollY)
  let x = parseInt(e.touches[0].clientX - domBoundsX - window.scrollX, 10)
  let y = parseInt(e.touches[0].clientY - domBoundsY - window.scrollY, 10)
  const z = parseInt(0, 10)
  return { x, y, z }
}

const getMouseData = (domBoundsX, domBoundsY, e) => {
  e.preventDefault()
  // console.error('[getMouseData]', e.clientY, domBoundsY, window.scrollY)
  const x = parseInt(e.clientX - domBoundsX - window.scrollX, 10)
  const y = parseInt(e.clientY - domBoundsY - window.scrollY, 10)
  const z = parseInt(0, 10)
  return { x, y, z }
}

const normaliseCoords = (spaceContainer, designMode, gridOn, gridWidth, gridHeight, coords) => {
  // console.error('[normaliseCoords] designMode', designMode)
  const normalisedCoords = {
    ...coords
  }
  if (designMode === false) {
    normalisedCoords.x = normalisedCoords.x + spaceContainer.resource.camera.x
    normalisedCoords.y = normalisedCoords.y + spaceContainer.resource.camera.y
  }
  if (gridOn === true) {
    normalisedCoords.x = normalisedCoords.x - (normalisedCoords.x % gridWidth)
    normalisedCoords.y = normalisedCoords.y - (normalisedCoords.y % gridHeight)
  }
  return normalisedCoords
}

const loadResources = (resourceContainers, spaceContainer) => {
  let resourceContainersLoadedSoFar = 0
  const totalResourceContainersToLoad = resourceContainers.filter(r => ['image', 'sound'].includes(r.resource.type)).length

  const resourcesImages = resourceContainers.filter(r => r.resource.type === 'image')
  const resourcesSounds = resourceContainers.filter(r => r.resource.type === 'sound')

  return new Promise((resolve, reject) => {

    const loadBack = () => {
      resourceContainersLoadedSoFar += 1
      console.warn(`[loadBack] done ${resourceContainersLoadedSoFar}/${totalResourceContainersToLoad}`)
      if (resourceContainersLoadedSoFar === totalResourceContainersToLoad) {
        return resolve()
      }
    }

    const errBack = (e) => {
      console.error('[errBack]', e)
      return reject()
    }

    resourcesImages.forEach(resource => {
      const element = new window.Image()
      addEventListener(element, 'load', loadBack)
      addEventListener(element, 'error', () => {
        element.dataset.oscarErrored = true
        loadBack()
      })
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

    resourcesSounds.forEach(resource => {
      const element = new window.Audio()
      addEventListener(element, 'loadedmetadata', loadBack)
      addEventListener(element, 'error', errBack)
      resource.extras.element = element
      element.src = resource.resource.getRemoteUrl()
      element.load()
    })

    if (resourcesImages.length === 0 && resourcesSounds.length === 0) {
      resolve()
    }

  })
}

const eventListeners = []
const addEventListener = (element, name, logic) => {
  const event = {
    element,
    name,
    logic
  }
  eventListeners.push(event)
  element.addEventListener(name, logic)
}

const isInstanceIntersecting = (instance, coords) => {
  console.warn('instance, coords', instance, coords)
  const w = instance.getWidth()
  const h = instance.getHeight()
  const isIntersecting = (
    coords.x >= instance.props.x &&
    coords.y >= instance.props.y &&
    coords.x < (instance.props.x + w) &&
    coords.y < (instance.props.y + h)
  )
  return isIntersecting
}

const gameLoopDesignMode = (ctx, spaceContainer, gridOn, gridWidth, gridHeight, instances) => {
  draw({ctx, spaceContainer, designMode: true, gridOn, gridWidth, gridHeight})
  instances.forEach(instance => {
    drawInstance(ctx, spaceContainer, true, instance)
  })
}

const gameLoopNotDesignMode = (ctx, spaceContainer, gridOn, gridWidth, gridHeight, instances, currentTouchCoords, resourceContainers, variables) => {
  draw({ctx, spaceContainer, designMode: false, gridOn, gridWidth, gridHeight})
  instances.forEach(instance => {
    instance.onStep()
    const isIntersecting = currentTouchCoords && isInstanceIntersecting(instance, currentTouchCoords)
    drawInstance(ctx, spaceContainer, false, instance)
  })
  instances = handleEventStep(instances, spaceContainer, resourceContainers, variables)
  return instances
}

const handleEvent = (eventId, eventContext, instances, appliesToInstanceClasses) => {
  let instancesToDestroy = []
  let instancesToCreate = []
  appliesToInstanceClasses.forEach(i => {
    i.atomContainer.extras.events.filter(e => e.id === eventId).forEach(e => {
      const actions = e.actions
      const actionBacks = i.onEvent(actions, eventContext).filter(ab => typeof ab === 'object' && ab !== null)
      actionBacks.forEach(actionBack => {
        const result = handleActionBack(actionBack)
        instancesToDestroy = instancesToDestroy.concat(result.instanceClassesToDestroy)
        instancesToCreate = instancesToCreate.concat(result.instancesToCreate)
        if (typeof result.imageToSet === 'string') {
          i.setImage(result.imageToSet, eventContext.resourceContainers)
        }
        if (typeof result.spaceToGoTo === 'string') {
          this.props.onSwitchSpace(result.spaceToGoTo)
        }
      })
    })
  })
  if (instancesToDestroy.length > 0) {
    console.log('[handleEvent] instancesToDestroy', instancesToDestroy)
    instances = handleEvent('Destroy', eventContext, instances, instancesToDestroy)
  }
  const createdInstances = instanceDefinitionsToInstances(instancesToCreate, eventContext.resourceContainers)
  instances = instances.concat(createdInstances)
  if (createdInstances.length > 0) {
    console.log('[handleEvent] createdInstances', createdInstances)
    instances = handleEvent('Create', eventContext, instances, createdInstances)
  }
  instances = instances.filter(ic => {
    const willDestroy = instancesToDestroy.includes(ic)
    return (!willDestroy)
  })
  return instances
}

const handleEventStart = (instances, spaceContainer, resourceContainers, variables) => {
  // console.warn('[handleEventStart] instances', instances)
  const eventContext = {
    instances,
    spaceContainer,
    resourceContainers,
    variables
  }
  return handleEvent('Create', eventContext, instances, instances)
}

const handleEventStep = (instances, spaceContainer, resourceContainers, variables) => {
  // console.warn('[handleEventStep] instances', instances)
  const eventContext = {
    instances,
    spaceContainer,
    resourceContainers,
    variables
  }
  return this.handleEvent('Step', eventContext, instances, instances)
}

const RenderGameSpace = (
  {
    canvasElement,
    spaceContainer,
    resourceContainers,
    variables,
    designMode = false,
    gridOn = false,
    gridWidth = 16,
    gridHeight = 16,
    onSwitchSpace,
    onTouch = () => {},
    onTouchSecondary = () => {},
    onTouchMove = () => {}
  }
) => {

  gridWidth = parseInt(gridWidth, 10)
  gridHeight = parseInt(gridHeight, 10)

  const [c, ctx] = [canvasElement, canvasElement.getContext('2d')]
  c.width = (designMode ? spaceContainer.resource.width : spaceContainer.resource.camera.width)
  c.height = (designMode ? spaceContainer.resource.height : spaceContainer.resource.camera.height)
  c.style.display = 'block'
  c.style.backgroundColor = 'black'
  // stop blurred lines from https://stackoverflow.com/questions/4261090/html5-canvas-and-anti-aliasing
  ctx.imageSmoothingEnabled = false
  ctx.translate(0.5, 0.5)
  //

  // sorry
  const domBoundsX = c.getBoundingClientRect().x
  const domBoundsY = c.getBoundingClientRect().y

  // let because it can be spliced
  let instances = instanceDefinitionsToInstances(spaceContainer.resource.instances, resourceContainers)
  console.warn('booting, instances', instances)

  const onLoadedResources = () => {
    let jInputs = {
      touch: {
        primary: false,
        coords: undefined,
        time: 0
      },
      keys: {
        'x': {
          on: false,
          time: 0
        }
      }
    }

    addEventListener(c, 'touchmove', (e) => {
      onTouchMove(getTouchData(domBoundsX, domBoundsY, e))
    })
    addEventListener(c, 'mousemove', (e) => {
      onTouchMove(getMouseData(domBoundsX, domBoundsY, e))
    })
    addEventListener(c, 'contextmenu', (e) => {
      e.preventDefault()
      return false
    })
    addEventListener(c, 'touchstart', (e) => {
      jInputs.touch = {
        primary: true,
        coords: getTouchData(domBoundsX, domBoundsY, e),
        time: Date.now()
      }
    })
    addEventListener(c, 'touchend', () => {
      const timeDifference = Date.now() - jInputs.touch.time
      // console.warn('[touchend] jInputs.touch.time', jInputs.touch.time)
      // console.warn('[touchend] timeDifference', timeDifference)
      if (designMode === true) {
        if (timeDifference <= 1000) {
          onTouch(normaliseCoords(jInputs.touch.coords))
        } else {
          // const indicesAtCoords = instancesAtCoords.map(ic => {
          //   return instanceClasses.indexOf(ic)
          // })
          // onTouchSecondary(indicesAtCoords)
        }
      } else {
        // const instancesAtCoords = getInstancesAtCoords(instances, normaliseCoords(touchStartCoords))
        // const eventContext = {
        //   instances,
        //   spaceContainer: spaceContainer,
        //   resourceContainers: resourceContainers,
        //   variables: variables
        // }
        // instances = this.handleEvent('Touch', eventContext, instances, instancesAtCoords)
      }
    })
    addEventListener(c, 'mousedown', (e) => {
      e.preventDefault()
      const coords = getMouseData(domBoundsX, domBoundsY, e)
      console.warn('mousedown!', coords)
      if (designMode === true) {
        if (e.which === 1) {
          console.warn('calling onTouch?')
          onTouch(normaliseCoords(coords))
        } else {
          // const indicesAtCoords = instancesAtCoords.map(ic => {
          //   return instanceClasses.indexOf(ic)
          // })
          // onTouchSecondary(indicesAtCoords)
        }
      } else {
        // const instancesAtCoords = getInstancesAtCoords(instances, normaliseCoords(coords))
        // const eventContext = {
        //   instances,
        //   spaceContainer: this.props.spaceContainer,
        //   resourceContainers: this.props.resourceContainers,
        //   variables
        // }
        // instances = this.handleEvent('Touch', eventContext, instances, instancesAtCoords)
      }
    })
    const currentTouchCoords = typeof jInputs.touch.coords === 'object' ? normaliseCoords(spaceContainer, false, gridOn, gridWidth, gridHeight, jInputs.touch.coords) : null
    if (designMode === true) {
      gameLoopDesignMode(ctx, spaceContainer, gridOn, gridWidth, gridHeight, instances, currentTouchCoords)
    } else {
      const doGameLoopNotDesignMode = () => {
        instances = gameLoopNotDesignMode(ctx, spaceContainer, gridOn, gridWidth, gridHeight, instances, currentTouchCoords, resourceContainers, variables)
        // window.requestAnimationFrame(doGameLoopNotDesignMode)
        // if (designMode === false) {
        //   window.requestAnimationFrame(doGameLoopNotDesignMode)
        // }
      }
      instances = handleEventStart(instances)
      doGameLoopNotDesignMode()
    }
  }

  clear(ctx, designMode, spaceContainer)
  ctx.fillStyle = '#ffffff'
  ctx.font = '16px Arial'
  ctx.fillText('Loading...', 16, 24)
  loadResources(resourceContainers, spaceContainer)
    .then(onLoadedResources)
    .catch(() => {
      clear(ctx, designMode, spaceContainer)
      ctx.fillStyle = '#ffffff'
      ctx.font = '16px Arial'
      ctx.fillText('This game could not be loaded.', 16, 24)
    })

  const free = () => {
    console.warn('[RenderGameSpace] [free]')
    eventListeners.forEach(event => {
      event.element.removeEventListener(event.name, event.logic)
    })
    eventListeners.length = 0
  }

  return {
    free
  }
}

export default RenderGameSpace
