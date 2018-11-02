import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { font, colours } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'

const StyledResource = styled.div`
  .component--box.image {
    position: relative;
    height: 192px;
    > .component--dropper {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      width: 100%;
      max-width: 192px;
      opacity: 0.75;
    }
    > img, > p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    > img {
      display: block;
      max-width: calc(100% - 1rem);
      max-height: calc(100% - 1rem);
    }
    > p {
      ${font}
      color: ${colours.fore};
      opacity: 0.5;
      // background-color: yellow;
    }
    // background-color: pink;
  }
`

class Atom extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource
    }
    this.onChooseImage = this.onChooseImage.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.resource.imageId !== this.state.resource.imageId) {
      this.setState({ resource: nextProps.resource })
    }
  }

  onChooseImage(imageId) {
    if (imageId === 'none') {
      imageId = null
    }
    this.props.onUpdate({
      imageId
    })
  }

  render() {
    // console.warn('[resource-Atom] [render] this.state.resourc', this.state.resource)
    const imageResources = [
      ...this.props.resources
        .filter(r => r.type === 'image')
        .map(r => {
          return {
            id: r.id,
            name: r.name
          }
        }),
      {
        id: 'none',
        name: '<None>'
      }
    ]

    const imageId = (this.state.resource.imageId === null ? 'none' : this.state.resource.imageId)
    const foundImageResource = this.props.resources.find(r => r.id === this.state.resource.imageId)

    const image = (foundImageResource !== undefined ?
      <img src={foundImageResource.getRemoteUrl()} />
      :
      <p>No image.</p>
    )

    return (
      <StyledResource>
        <Box className='image'>
          {image}
          <Dropper options={imageResources} value={imageId} onChoose={this.onChooseImage} />
        </Box>
      </StyledResource>
    )
  }
}

Atom.propTypes = {
  resources: PropTypes.array,
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

Atom.defaultProps = {
  onUpdate: () => {}
}

export default Atom
