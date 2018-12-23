import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'
import { font } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Input from '../components/Input/Input'
import ImageChooser from '../components/ImageChooser/ImageChooser'
import Uploader from '../components/Uploader/Uploader'
import Heading2 from '../components/Heading2/Heading2'
import Image from '../components/Image/Image'

import BuyModuleBanner from '../component-instances/BuyModuleBanner'

const getFixedImageUrl = (id) => {
  return `https://storage.googleapis.com/gmc-resources/fixed-image-${id}.png`
}

const StyledResource = styled.div`
  section.split-two {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  @media screen and (min-width: 720px) {
    section.split-two {
      grid-template-columns: 2fr 2fr;
      grid-gap: 2rem;
    }
  }
  section.resource {
    position: relative;
    height: 256px;
    border-radius: 4px;
    background-color: #dadfe1;
  }
  section + section {
    margin-top: 2rem;
  }
  .component--uploader {
    height: 100%;
  }
  .component--heading2 + .frame-stuff {
    margin-top: 1rem;
  }
  .frame-stuff {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
  }
  .file {
    .component--dropper + p {
      margin-top: 1rem;
    }
    > p {
      ${font}
      font-size: 80%;
      color: #bdc3c7;
    }
    .component--banner + .component--image-chooser {
      margin-top: 1rem;
    }
    .component--image-chooser + p {
      margin-top: 0.5rem;
    }
  }
`

class ResourceImage extends PureComponent {
  constructor(props) {
    super(props)
    this.onChooseFixed = this.onChooseFixed.bind(this)
    this.onUploadDone = this.onUploadDone.bind(this)
    this.imageHeight = null
    this.onImageLoad = this.onImageLoad.bind(this)
  }

  onUpdateFrameHeight(value) {
    this.props.onUpdate({
      frameHeight: parseInt(value, 10),
      frameCount: parseInt(Math.ceil(this.imageHeight / value), 10)
    })
  }

  onUpdateProp(prop, value) {
    this.props.onUpdate({
      [prop]: parseInt(value, 10)
    })
  }

  onChooseFixed(fixed) {
    if (fixed === 'none') {
      this.props.onUpdate({
        fixed: null,
        extension: 'png'
      })
    } else {
      const {
        width,
        height
      } = resourceTypes.find(rt => rt.type === 'image').getFixed().find(o => o.id === fixed)
      const frameHeight = (height < width ? height : width)
      this.props.onUpdate({
        fixed,
        extension: 'png',
        frameWidth: width,
        frameHeight,
        frameCount: parseInt(Math.ceil(height / frameHeight), 10)
      })
    }
  }

  onUploadDone() {
    this.props.onUpdate({}, true)
  }

  onImageLoad({ height }) {
    this.imageHeight = height
  }

  render() {

    const purchasedResourcePackModule = this.props.moduleIds.includes('resource-pack')
    const fixedOptions = [
      {
        id: 'none',
        name: '<None>',
        url: null
      },
      ...resourceTypes.find(rt => rt.type === 'image').getFixed(purchasedResourcePackModule).map(o => {
        return {
          id: o.id,
          name: o.name,
          url: getFixedImageUrl(o.id)
        }
      })
    ]

    const fixedValue = (this.props.resource.fixed === null ? 'none' : this.props.resource.fixed)
    const remoteUrl = this.props.resource.getRemoteUrl()

    return (
      <StyledResource>
        <section className='resource'>
          <Image src={remoteUrl} onLoad={this.onImageLoad} dontCache={true} />
        </section>
        <section className='split-two'>
          <Box>
            <Uploader route={`me/team/projects/${this.props.project.id}/resources/${this.props.resource.id}`} mimeTypes={['image/png', 'image/gif', 'image/bmp']} onDone={this.onUploadDone} />
          </Box>
          <Box>
            <Heading2>Frame</Heading2>
            <div className='frame-stuff'>
              <Input label='Width' value={this.props.resource.frameWidth} type='number' min='0' max='4096' onChange={(v) => this.onUpdateProp('frameWidth', v)} />
              <Input label='Height' value={this.props.resource.frameHeight} type='number' min='0' max='4096' onChange={(v) => this.onUpdateFrameHeight(v)} />
              <Input label='Speed' value={this.props.resource.frameSpeed} type='number' min='0' max='3' onChange={(v) => this.onUpdateProp('frameSpeed', v)} />
              <Input label='Count' value={this.props.resource.frameCount} type='number' disabled />
            </div>
          </Box>
        </section>
        <section>
          <Box className='file'>
            {purchasedResourcePackModule === false &&
              <BuyModuleBanner moduleId='resource-pack' moduleName='Resource Pack' verb='get more included files' />
            }
            <ImageChooser title='Choose an included file' id='image-fixed' images={fixedOptions} currentImage={fixedValue} onChoose={this.onChooseFixed} />
            <p>Choosing an included file won&rsquo;t erase a file you have uploaded.</p>
          </Box>
        </section>
      </StyledResource>
    )
  }
}

ResourceImage.propTypes = {
  moduleIds: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

ResourceImage.defaultProps = {
  onUpdate: () => {}
}

export default ResourceImage
