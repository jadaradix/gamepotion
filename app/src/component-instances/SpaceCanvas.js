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
    this.removeEventListeners()
    const [c, ctx, cDomBounds] = [canvas, canvas.getContext('2d'), canvas.getBoundingClientRect()]
    const getTouchData = (e) => {
      const x = e.touches[0].clientX - cDomBounds.x
      const y = e.touches[0].clientY - cDomBounds.y
      const z = 0
      return [parseInt(x, 10), parseInt(y, 10), z]
    }
    this.addEventListener(canvas, 'touchstart', (e) => {
      this.props.onTouch(getTouchData(e))
    })
    this.addEventListener(canvas, 'touchmove', (e) => {
      this.props.onTouchMove(getTouchData(e))
    })
    let loadedSoFar = 0
    const totalLoadableCount = resources.filter(r => ['image', 'sound'].includes(r.type)).length
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
    const loadedGood = () => {
      console.warn('renderCanvas] loadedGood!')
      ctx.clearRect(0, 0, space.width, space.height)
      if (this.props.designMode === true) {
        ctx.strokeStyle = '#ffffff'
        ctx.rect(space.camera.x + 1, space.camera.y + 1, space.camera.width - 1, space.camera.height - 1)
        ctx.stroke()
      }
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
    const imageUrls = resources.filter(r => r.type === 'image').map(i => i.getRemoteUrl())
    imageUrls.forEach(url => {
      const image = new window.Image()
      this.addEventListener(image, 'load', loadGoodLogic)
      this.addEventListener(image, 'error', loadBadLogic)
      image.src = url
    })

    // LOAD SOUNDS
    const soundUrls = resources.filter(r => r.type === 'sound').map(i => i.getRemoteUrl())
    soundUrls.forEach(url => {
      const audio = new window.Audio()
      this.addEventListener(audio, 'loadedmetadata', loadGoodLogic)
      this.addEventListener(audio, 'error', loadBadLogic)
      audio.src = url
      audio.load()
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
