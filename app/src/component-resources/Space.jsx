import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledResource = styled.div`
`

class Space extends PureComponent {
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

Space.propTypes = {
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

Space.defaultProps = {
  onUpdate: () => {}
}

export default Space
