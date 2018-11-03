import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import canvasRenderSpace from '../abstractions/canvasRenderSpace'

const StyledResource = styled.div`
  background-color: red;
`

class ResourceSpace extends PureComponent {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      resource: props.resource
    }
  }

  renderCanvas(resource) {
    canvasRenderSpace(this.canvasRef.current, resource, this.props.resources)
  }

  componentDidMount() {
    this.renderCanvas(this.state.resource)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      resource: nextProps.resource
    })
    this.renderCanvas(nextProps.resource)
  }

  render() {
    return (
      <StyledResource>
        <canvas ref={this.canvasRef} />
      </StyledResource>
    )
  }
}

ResourceSpace.propTypes = {
  resources: PropTypes.array,
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

ResourceSpace.defaultProps = {
  onUpdate: () => {}
}

export default ResourceSpace
