import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

const LOADING_STYLE = {
  font: '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontWeight: '400',
  textSizeAdjust: '100%',
  textAlign: 'center',
  backgroundColor: 'black',
  color: 'white'
}

class Instance {
  constructor(atomWithExtras, coords) {
    this.atomWithExtras = atomWithExtras
    this.coords = coords
    this.vcoords = Array(coords.length).fill(0)
  }

  step() {
    this.vcoords.forEach((vc, i) => {
      this.coords[i] += vc
    })
  }
}

class SpaceCanvas extends PureComponent {
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
    const resourcesWithExtras = resources.map(resource => {
      return {
        resource,
        extras: {}
      }
    })
    this.removeEventListeners()
    const [c, ctx, cDomBounds] = [canvas, canvas.getContext('2d'), canvas.getBoundingClientRect()]
    const getTouchData = (e) => {
      e.preventDefault()
      const x = e.touches[0].clientX - cDomBounds.x
      const y = e.touches[0].clientY - cDomBounds.y
      const z = 0
      return [parseInt(x, 10), parseInt(y, 10), z]
    }
    const getMouseData = (e) => {
      e.preventDefault()
      const x = e.clientX - cDomBounds.x
      const y = e.clientY - cDomBounds.y
      const z = 0
      return [parseInt(x, 10), parseInt(y, 10), z]
    }
    this.addEventListener(canvas, 'touchstart', (e) => {
      this.props.onTouch(getTouchData(e))
    })
    this.addEventListener(canvas, 'click', (e) => {
      this.props.onTouch(getMouseData(e))
    })
    this.addEventListener(canvas, 'touchmove', (e) => {
      this.props.onTouchMove(getTouchData(e))
    })
    this.addEventListener(canvas, 'mousemove', (e) => {
      this.props.onTouchMove(getMouseData(e))
    })
    let loadedSoFar = 0
    const totalLoadableCount = resourcesWithExtras.filter(r => ['image', 'sound'].includes(r.resource.type)).length
    const startLoading = () => {
      console.warn('[renderCanvas] start loading!')
      c.width = space.width
      c.height = space.height
      c.style.display = 'block'
      c.style.backgroundColor = 'black'
      c.style.width = space.width
      c.style.height = space.height
      ctx.clearRect(0, 0, space.width, space.height)
    }

    const getInstanceClasses = (instances) => {
      console.warn('resourcesWithExtras', resourcesWithExtras)
      return instances.map(i => {
        const atomWithExtras = resourcesWithExtras.find(r => r.resource.type === 'atom' && r.resource.id === i.atomId)
        const coords = [i.x, i.y, i.z]
        return new Instance(atomWithExtras, coords)
      })
    }

    const start = (instanceClasses) => {
      console.warn('[start] instanceClasses', instanceClasses)
    }

    const step = (instanceClasses) => {
      console.warn('[step] instanceClasses', instanceClasses)
      ctx.clearRect(0, 0, space.width, space.height)
      instanceClasses.forEach(i => {
        console.warn(i.atomWithExtras)
        ctx.drawImage(i.atomWithExtras.extras.image, i.coords[0], i.coords[1])
      })
      if (this.props.designMode === true) {
        ctx.strokeStyle = '#ffffff'
        ctx.rect(space.camera.x + 1, space.camera.y + 1, space.camera.width - 2, space.camera.height - 2)
        ctx.stroke()
      }
    }

    const loadedGood = () => {
      console.warn('renderCanvas] loadedGood!')
      const instanceClasses = getInstanceClasses(space.instances)
      start(instanceClasses)
      step(instanceClasses)
    }
    const loadedBad = () => {
      console.warn('[renderCanvas] loadedBad!')
      this.removeEventListeners()
    }
    const loadGoodLogic = () => {
      loadedSoFar += 1
      console.warn(`[renderCanvas] loadLogic! done ${loadedSoFar}/${totalLoadableCount}`)
      if (loadedSoFar === totalLoadableCount) {
        loadedGood()
      }
    }
    const loadBadLogic = () => {
      loadedBad()
    }
    startLoading()

    //
    // LOAD IMAGES
    //
    const images = resourcesWithExtras.filter(r => r.resource.type === 'image')
    images.forEach(resource => {
      const element = new window.Image()
      this.addEventListener(element, 'load', loadGoodLogic)
      this.addEventListener(element, 'error', loadBadLogic)
      resource.extras.element = element
      element.src = resource.resource.getRemoteUrl()
      resourcesWithExtras
        .filter(r => r.resource.type === 'atom' && r.resource.imageId === resource.resource.id)
        .map(r => {
          console.error('wow hit here!')
          r.extras.image = element
          return r
        })
    })

    // LOAD SOUNDS
    const sounds = resourcesWithExtras.filter(r => r.resource.type === 'sound')
    sounds.forEach(resource => {
      const element = new window.Audio()
      this.addEventListener(element, 'loadedmetadata', loadGoodLogic)
      this.addEventListener(element, 'error', loadBadLogic)
      resource.extras.element = element
      element.src = resource.resource.getRemoteUrl()
      element.load()
    })
  }

  render() {
    console.warn('[render]')
    const canvasStyle = {
      width: this.props.space.width,
      height: this.props.space.height,
      lineHeight: `${this.props.space.height}px`
    }
    return (
      <canvas style={canvasStyle} ref={(element) => {
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
  onTouch: PropTypes.func,
  onTouchMove: PropTypes.func
}

SpaceCanvas.defaultProps = {
  designMode: false,
  onTouch: () => {},
  onTouchMove: () => {}
}

export default SpaceCanvas
