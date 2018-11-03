import React, { PureComponent } from 'react'
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
    this.canvasContext = null
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    this.renderCanvas(this.props.space)
  }

  componentWillReceiveProps(nextProps) {
    this.renderCanvas(nextProps.space)
  }

  renderCanvas(space) {
    const canvas = this.canvasRef.current
    if (canvas === null) return false;
    ((c, ctx) => {
      c.width = space.width
      c.height = space.height
      c.style.display = 'block'
      c.style.backgroundColor = 'black'
      c.style.width = space.width
      c.style.height = space.height
      ctx.clearRect(0, 0, space.width, space.height)
      ctx.strokeStyle = '#ffffff'
      ctx.rect(space.camera.x + 1, space.camera.y + 1, space.camera.width - 1, space.camera.height - 1)
      ctx.stroke()
    })(canvas, canvas.getContext('2d'))
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <div style={{
          ...LOADING_STYLE,
          width: this.props.space.width,
          height: this.props.space.height,
          lineHeight: `${this.props.space.height}px`
        }}>Loading...</div>
      )
    }
    return (
      <canvas ref={this.canvasRef} />
    )
  }
}

SpaceCanvas.propTypes = {
  space: PropTypes.any.isRequired,
  resources: PropTypes.array.isRequired
}

export default SpaceCanvas
