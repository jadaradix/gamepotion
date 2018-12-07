import classes from '../../classes'
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
  const frame = parseInt(instance.props.frame, 10)
  const image = instance.getImage()
  const x = instance.props.x - (!designMode ? spaceContainer.resource.camera.x : 0)
  const y = instance.props.y - (!designMode ? spaceContainer.resource.camera.y : 0)
  const width = instance.getWidth()
  const height = instance.getHeight()
  // docs: drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
  if (image !== null) {
    ctx.drawImage(image, 0, frame * height, width, height, x, y, width, height) 
  }
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

const draw = ({ctx, spaceContainer, designMode, gridOn, gridWidth, gridHeight}) => {
  ctx.clearRect(
    0,
    0,
    (designMode ? spaceContainer.resource.width : spaceContainer.resource.camera.width),
    (designMode ? spaceContainer.resource.height : spaceContainer.resource.camera.height)
  )
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

const normaliseCoords = (spaceContainer, designMode, gridOn, coords) => {
  // console.error('[normaliseCoords] designMode', designMode)
  const normalisedCoords = {
    ...coords
  }
  if (designMode === false) {
    normalisedCoords.x = normalisedCoords.x + spaceContainer.resource.camera.x
    normalisedCoords.y = normalisedCoords.y + spaceContainer.resource.camera.y
  }
  if (gridOn === true) {
    const gridWidth = parseInt(gridWidth, 10)
    const gridHeight = parseInt(gridHeight, 10)
    normalisedCoords.x = normalisedCoords.x - (normalisedCoords.x % gridWidth)
    normalisedCoords.y = normalisedCoords.y - (normalisedCoords.y % gridHeight)
  }
  return normalisedCoords
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

  const [c, ctx] = [canvasElement, canvasElement.getContext('2d')]
  c.width = (designMode ? spaceContainer.resource.width : spaceContainer.resource.camera.width)
  c.height = (designMode ? spaceContainer.resource.height : spaceContainer.resource.camera.height)
  c.style.display = 'block'
  c.style.backgroundColor = 'black'
  // stop blurred lines from https://stackoverflow.com/questions/4261090/html5-canvas-and-anti-aliasing
  ctx.imageSmoothingEnabled = false
  ctx.translate(0.5, 0.5)
  //
  ctx.fillStyle = '#ffffff'
  ctx.font = '16px Arial'
  ctx.fillText('Loading...', 16, 24)

  // sorry
  const domBoundsX = c.getBoundingClientRect().x
  const domBoundsY = c.getBoundingClientRect().y

  // let because it can be spliced
  let instances = instanceDefinitionsToInstances(spaceContainer.resource.instances, resourceContainers)

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
  addEventListener(c, 'touchend', () => {
    const instancesAtCoords = getInstanceClassesAtCoords(instanceClasses, normaliseCoords(touchStartCoords))
    const touchEndTime = Date.now()
    const timeDifference = touchEndTime - touchStartTime
    // console.warn('touchEndTime', touchEndTime)
    // console.warn('touchStartTime', touchStartTime)
    // console.warn('timeDifference', timeDifference)
    if (designMode === true) {
      if (timeDifference <= 1000) {
        onTouch(normaliseCoords(touchStartCoords))
      } else {
        const indicesAtCoords = instancesAtCoords.map(ic => {
          return instanceClasses.indexOf(ic)
        })
        onTouchSecondary(indicesAtCoords)
      }
    } else {
      const eventContext = {
        instanceClasses,
        spaceContainer: spaceContainer,
        resourceContainers: resourceContainers,
        variables: variables
      }
      instanceClasses = this.handleEvent('Touch', eventContext, instanceClasses, instancesAtCoords)
    }
  }, true)
  // addEventListener(canvas, 'mousedown', (e) => {
  //   e.preventDefault()
  //   const coords = getMouseData(e)
  //   const instancesAtCoords = getInstanceClassesAtCoords(instanceClasses, normaliseCoords(coords))
  //   if (this.props.designMode === true) {
  //     if (e.which === 1) {
  //       this.props.onTouch(normaliseCoords(coords))
  //     } else {
  //       const indicesAtCoords = instancesAtCoords.map(ic => {
  //         return instanceClasses.indexOf(ic)
  //       })
  //       this.props.onTouchSecondary(indicesAtCoords)
  //     }
  //   } else {
  //     const eventContext = {
  //       instanceClasses,
  //       spaceContainer: this.props.spaceContainer,
  //       resourceContainers: this.props.resourceContainers,
  //       variables: this.props.variables
  //     }
  //     instanceClasses = this.handleEvent('Touch', eventContext, instanceClasses, instancesAtCoords)
  //   }
  // })
 
  let touchStartTime = 0
  let touchStartCoords = null
  addEventListener(c, 'touchstart', (e) => {
    touchStartTime = Date.now()
    touchStartCoords = getTouchData(domBoundsX, domBoundsY, e)
  }, true)

  const loop = (ctx, spaceContainer, designMode, gridOn, gridWidth, gridHeight, instances) => {
    const currentTouchCoords = normaliseCoords(touchStartCoords)
    draw(ctx, spaceContainer, designMode, gridOn, gridWidth, gridHeight)
    instances.forEach(instance => {
      const isIntersecting = isInstanceIntersecting(instance, currentTouchCoords)
  
      drawInstance(ctx, spaceContainer, designMode, instance)
    })
  }

  loop(ctx, spaceContainer, designMode, gridOn, gridWidth, gridHeight, instances)

  const free = () => {
    console.warn('[RenderGameSpace] [free]')
    eventListeners.forEach(event => {
      event.element.removeEventListener(event.name, event.name)
    })
    eventListeners.length = 0
  }

  return {
    free
  }
}

export default RenderGameSpace
