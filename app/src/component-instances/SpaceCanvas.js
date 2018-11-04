import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import classes from '../classes'

// const LOADING_STYLE = {
//   font: '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
//   fontWeight: '400',
//   textSizeAdjust: '100%',
//   textAlign: 'center',
//   backgroundColor: 'black',
//   color: 'white'
// }

class AtomInstance {
  constructor(atomWithExtras, coords) {
    this.atomWithExtras = atomWithExtras
    this.coords = coords
    this.vcoords = Array(coords.length).fill(0)
  }

  create() {
    const instance = this
    this.atomWithExtras.extras.events.get('create').forEach(a => {
      const r = a.run('create', 'html5', instance, a.runArguments)
      console.warn('[AtomInstance] [create] r', r)
    })
  }

  step() {
    this.vcoords.forEach((vc, i) => {
      this.coords[i] += vc
    })
    const instance = this
    this.atomWithExtras.extras.events.get('step').forEach(a => {
      const r = a.run('step', 'html5', instance, a.runArguments)
      console.warn('[AtomInstance] [step] r', r)
    })
  }
}

const start = (ctx, spaceWithExtras, instanceClasses, designMode) => {
  console.warn('[start]', ctx, spaceWithExtras, instanceClasses, designMode)
  if (designMode === false) {
    instanceClasses.forEach(i => {
      i.create()
    })
  }
}

const step = (ctx, spaceWithExtras, instanceClasses, designMode) => {
  console.warn('[step] instanceClasses', instanceClasses)
  ctx.clearRect(0, 0, spaceWithExtras.resource.width, spaceWithExtras.resource.height)
  console.warn('[step] spaceWithExtras.extras', spaceWithExtras.extras)
  if (spaceWithExtras.extras.backgroundImage !== null) {
    ctx.drawImage(spaceWithExtras.extras.backgroundImage, 0, 0)
  }
  instanceClasses.forEach(i => {
    if (designMode === false) {
      i.step()
    }
    ctx.drawImage(i.atomWithExtras.extras.image, i.coords[0], i.coords[1])
  })
  if (spaceWithExtras.extras.foregroundImage !== null) {
    ctx.drawImage(spaceWithExtras.extras.foregroundImage, 0, 0)
  }
  if (designMode === true) {
    ctx.strokeStyle = '#ffffff'
    ctx.rect(spaceWithExtras.resource.camera.x + 1, spaceWithExtras.resource.camera.y + 1, spaceWithExtras.resource.camera.width - 2, spaceWithExtras.resource.camera.height - 2)
    ctx.stroke()
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
    const spaceWithExtras = {
      resource: space,
      extras: {
        backgroundImage: null,
        foregroundImage: null
      }
    }
    this.removeEventListeners()
    const [c, ctx, cDomBounds] = [canvas, canvas.getContext('2d'), canvas.getBoundingClientRect()]
    const getTouchData = (e) => {
      e.preventDefault()
      const x = e.touches[0].clientX - cDomBounds.x + window.scrollX
      const y = e.touches[0].clientY - cDomBounds.y + window.scrollY
      const z = 0
      return [parseInt(x, 10), parseInt(y, 10), z]
    }
    const getMouseData = (e) => {
      e.preventDefault()
      const x = e.clientX - cDomBounds.x + window.scrollX
      const y = e.clientY - cDomBounds.y + window.scrollY
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
      console.warn('[getInstanceClasses] resourcesWithExtras', resourcesWithExtras)
      return instances.map(i => {
        const atomWithExtras = resourcesWithExtras.find(r => r.resource.type === 'atom' && r.resource.id === i.atomId)
        const coords = [i.x, i.y, i.z]
        return new AtomInstance(atomWithExtras, coords)
      })
    }

    const loadedGood = () => {
      console.warn('[renderCanvas] loadedGood!')
      const instanceClasses = getInstanceClasses(space.instances)
      const runStepLoop = () => {
        step(ctx, spaceWithExtras, instanceClasses, this.props.designMode)
        window.requestAnimationFrame(runStepLoop)
      }
      const runStepOnce = () => {
        step(ctx, spaceWithExtras, instanceClasses, this.props.designMode)
      }
      if (this.props.designMode === true) {
        start(ctx, spaceWithExtras, instanceClasses, this.props.designMode)
        runStepOnce() // call step once so we get to see something (draw call)
      } else {
        start(ctx, spaceWithExtras, instanceClasses, this.props.designMode)
        runStepLoop()
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
    // GET READY FOR EVENTS
    //
    const actionClassInstances = new Map()
    Object.keys(classes.actions).forEach(k => {
      actionClassInstances.set(k, new classes.actions[k]())
    })
    resourcesWithExtras
      .filter(r => r.resource.type === 'atom')
      .map(r => {
        r.extras.events = new Map()
        Object.keys(r.resource.events).forEach(k => {
          r.extras.events.set(k, r.resource.events[k].map(a => {
            const actionClassRunLogic = actionClassInstances.get(a.id).run
            return {
              run: actionClassRunLogic,
              runArguments: a.runArguments
            }
          }))
        })
        return r
      })

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
      if (spaceWithExtras.resource.backgroundImage === resource.resource.id) {
        spaceWithExtras.extras.backgroundImage = element
      }
      if (spaceWithExtras.resource.foregroundImage === resource.resource.id) {
        spaceWithExtras.extras.foregroundImage = element
      }
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
