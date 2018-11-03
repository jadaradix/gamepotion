import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class SpaceCanvas extends PureComponent {
  constructor() {
    super()
    this.canvasRef = React.createRef()
    this.canvasContext = null
  }

  componentDidMount() {
    this.renderCanvas(this.props.space)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      space: nextProps.space
    })
    this.renderCanvas(nextProps.space)
  }

  renderCanvas(space) {
    ((c, ctx) => {
      c.width = space.width
      c.height = space.height
      c.style.display = 'block'
      c.style.backgroundColor = 'black'
      c.style.width = space.width
      c.style.height = space.height
      ctx.clearRect(0, 0, space.width, space.height)
      ctx.strokeStyle = '#ffffff'
      ctx.rect(space.camera.x, space.camera.y, space.camera.width, space.camera.height)
      ctx.stroke()
    })(this.canvasRef.current, this.canvasRef.current.getContext('2d'))
  }

  render() {
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
