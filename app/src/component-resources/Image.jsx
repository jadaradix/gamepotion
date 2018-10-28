import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../components/Button/Button'

const StyledResource = styled.div`
  img {
    display: block;
    max-width: 100%;
    margin-top: 1rem;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  img.visible {
    visibility: visible;
    opacity: 1;
  }
`

class Image extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource,
      imageVisible: false
    }
    this.onLoad = this.onLoad.bind(this)
    // this.renameToTest = this.renameToTest.bind(this)
  }

  // <Button onClick={this.renameToTest}>Rename to Test</Button>
  // renameToTest () {
  //   this.props.onUpdate({ name: 'Test' })
  // }

  onLoad() {
    this.setState({
      imageVisible: true
    })
  }

  render() {
    return (
      <StyledResource>
        <img src={this.state.resource.remoteUrl} onLoad={this.onLoad} className={this.state.imageVisible ? 'visible' : ''} alt='' />
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
