import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledResource = styled.div`
`

class ResourceSpace extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource
    }
  }

  render() {
    return (
      <StyledResource />
    )
  }
}

ResourceSpace.propTypes = {
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

ResourceSpace.defaultProps = {
  onUpdate: () => {}
}

export default ResourceSpace
