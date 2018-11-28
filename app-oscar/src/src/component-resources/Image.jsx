import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'
import { font } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Input from '../components/Input/Input'
import Dropper from '../components/Dropper/Dropper'
import Uploader from '../components/Uploader/Uploader'
import Image from '../components/Image/Image'

const StyledResource = styled.div`
  section.split-two {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    @media screen and (min-width: 720px) {
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
  .frame-width-height {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr;
    grid-gap: 1rem;
    margin-bottom: 2rem;
  }
  .file {
    p {
      ${font}
      font-size: 80%;
      color: #bdc3c7;
    }
    .component--dropper + p {
      margin-top: 1rem;
    } 
  }
`

class ResourceImage extends PureComponent {
  constructor(props) {
    super(props)
    this.onUpdateProp = this.onUpdateProp.bind(this)
    this.onChooseFixed = this.onChooseFixed.bind(this)
    this.onUploadDone = this.onUploadDone.bind(this)
  }

  onUpdate(data) {
    this.props.onUpdate(data)
  }

  onUpdateProp (prop, value) {
    this.onUpdate({
      [prop]: parseInt(value, 10)
    })
  }

  onChooseFixed(fixed) {
    if (fixed === 'none') {
      this.onUpdate({
        fixed: null,
        extension: 'png'
      })
    } else {
      const {
        width,
        height
      } = resourceTypes.find(rt => rt.type === 'image').fixed.find(o => o.id === fixed)
      this.onUpdate({
        fixed,
        extension: 'png',
        frameWidth: width,
        frameHeight: height
      })
    }
  }

  onUploadDone(data) {
    // apis go away
    const {
      fixed,
      extension,
      frameWidth,
      frameHeight
    } = data
    this.onUpdate({
      fixed,
      extension,
      frameWidth,
      frameHeight
    })
  }

  render() {
    const fixedOptions = [
      {
        id: 'none',
        name: '<None>'
      },
      ...resourceTypes.find(rt => rt.type === 'image').fixed.map(o => {
        return {
          id: o.id,
          name: o.id
        }
      })
    ]
    const fixedValue = (this.props.resource.fixed === null ? 'none' : this.props.resource.fixed)
    const remoteUrl = this.props.resource.getRemoteUrl()

    return (
      <StyledResource>
        <section className='resource'>
          <Image src={remoteUrl} />
        </section>
        <section className='split-two'>
          <Box>
            <Uploader route={`me/team/projects/${this.props.project.id}/resources/${this.props.resource.id}`} mimeTypes={['image/png', 'image/gif', 'image/bmp']} onDone={this.onUploadDone} />
          </Box>
          <Box>
            <div className='frame-width-height'>
              <Input label='Frame Width' value={this.props.resource.frameWidth} type='number' min='0' max='4096' onChange={(v) => this.onUpdateProp('frameWidth', v)} />
              <Input label='Frame Height' value={this.props.resource.frameHeight} type='number' min='0' max='4096' onChange={(v) => this.onUpdateProp('frameHeight', v)} />
              <Input label='Frame Speed' value={this.props.resource.frameSpeed} type='number' min='0' max='24' onChange={(v) => this.onUpdateProp('frameSpeed', v)} />
            </div>
            <div className='file'>
              <Dropper label={`Choose a ${process.env.REACT_APP_NAME} file`} options={fixedOptions} value={fixedValue} onChoose={this.onChooseFixed} />
              <p>Choosing a {process.env.REACT_APP_NAME} file won&rsquo;t erase a file you have uploaded.</p>
            </div>
          </Box>
        </section>
      </StyledResource>
    )
  }
}

ResourceImage.propTypes = {
  project: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

ResourceImage.defaultProps = {
  onUpdate: () => {}
}

export default ResourceImage
