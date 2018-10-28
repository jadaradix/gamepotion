import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'
import { font, colours } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'

const StyledResource = styled.div`
  @keyframes no-image {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  img {
    display: block;
    max-width: 100%;
    margin-top: 1rem;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  img.visible {
    visibility: visible;
    opacity: 1;
  }
  .no-image {
    margin-top: 1rem;
    ${font}
    color: ${colours.fore};
    animation: no-image 0.5s;
  }
  .component--box {
    margin-top: 1rem;
  }
`

class Image extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource,
      imageLoaded: false,
      imageErrored: false
    }
    this.onLoad = this.onLoad.bind(this)
    this.onError = this.onError.bind(this)
    this.onChooseFixed = this.onChooseFixed.bind(this)
  }

  // <Button onClick={this.renameToTest}>Rename to Test</Button>
  // renameToTest () {
  //   this.props.onUpdate({ name: 'Test' })
  // }

  componentWillReceiveProps (nextProps) {
    if (nextProps.resource.fixed !== this.state.resource.fixed) {
      this.setState({ resource: nextProps.resource, imageLoaded: false, imageErrored: false })
    }
  }

  onLoad() {
    this.setState({
      imageLoaded: true
    })
  }

  onError() {
    this.setState({
      imageErrored: true
    })
  }

  onChooseFixed(fixed) {
    if (fixed === 'none') {
      fixed = null
    }
    this.props.onUpdate({
      fixed
    })
  }

  render() {
    const fixedOptions = [
      ...resourceTypes.find(rt => rt.type === 'image').fixed.map(o => {
        return {
          id: o,
          name: o
        }
      }),
      {
        id: 'none',
        name: '<None>'
      }
    ]
    const fixedValue = (this.state.resource.fixed === null ? 'none' : this.state.resource.fixed)
    const remoteUrl = this.state.resource.getRemoteUrl()

    return (
      <StyledResource>
        {!this.state.imageErrored ?
          <img src={remoteUrl} onLoad={this.onLoad} onError={this.onError} className={this.state.imageLoaded ? 'visible' : ''} alt='' />
          :
          <p className='no-image'>You haven&rsquo;t chosen an image yet.</p>
        }
        <Box>
          <Dropper label='Choose a Game Maker Club image' onChoose={this.onChooseFixed} options={fixedOptions} value={fixedValue} />
        </Box>
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
