import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../components/Button/Button'

const StyledResource = styled.div`
  .component--box {
    max-width: 480px;
    margin: 4rem auto 0 auto;
  }
`

class Image extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource
    }
    this.renameToTest = this.renameToTest.bind(this)
  }

  renameToTest () {
    this.props.onUpdate({ name: 'Test' })
  }

  render() {
    return (
      <StyledResource>
        <Button onClick={this.renameToTest}>Rename to Test</Button>
      </StyledResource>
    )
  }
}

Image.propTypes = {
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

Image.defaultProps = {
  onUpdate: () => {}
}

export default Image
