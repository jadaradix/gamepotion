import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'
import { font } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'
import Uploader from '../components/Uploader/Uploader'
import AudioPlayer from '../components/AudioPlayer/AudioPlayer'
import Heading2 from '../components/Heading2/Heading2'

import BuyModuleBanner from '../component-instances/BuyModuleBanner'

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
  section + section {
    margin-top: 2rem;
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
    p + .component--banner {
      margin-top: 1rem;
    }
  }
  .own-file {
    .component--uploader {
      margin-top: 1rem;
    }
  }
`

class ResourceSound extends PureComponent {
  constructor(props) {
    super(props)
    this.onChooseFixed = this.onChooseFixed.bind(this)
    this.onUploadDone = this.onUploadDone.bind(this)
    this.boughtResourcePackModule = this.props.moduleIds.includes('resource-pack')
  }

  onChooseFixed(fixed) {
    if (fixed === 'none') {
      fixed = null
    }
    this.props.onUpdate({
      fixed,
      extension: 'wav'
    })
  }

  onUploadDone() {
    this.props.onUpdate({}, true)
  }

  render() {
    const fixedOptions = [
      {
        id: 'none',
        name: '<None>'
      },
      ...resourceTypes.find(rt => rt.type === 'sound').getFixed(this.boughtResourcePackModule).map(o => {
        return {
          id: o.id,
          name: o.name
        }
      })
    ]
    const fixedValue = (this.props.resource.fixed === null ? 'none' : this.props.resource.fixed)
    const remoteUrl = this.props.resource.getRemoteUrl()

    return (
      <StyledResource>
        <section className='resource'>
          <AudioPlayer url={remoteUrl} />
        </section>
        <section className='split-two'>
          <Box className='own-file'>
            <Heading2>Upload your own file</Heading2>
            <Uploader route={`me/team/projects/${this.props.project.id}/resources/${this.props.resource.id}`} mimeTypes={['audio/wav', 'audio/mpeg', 'audio/mp3']} onDone={this.onUploadDone} />
          </Box>
          <Box className='file'>
            <Dropper label={'Choose an included file'} options={fixedOptions} value={fixedValue} onChoose={this.onChooseFixed} />
            <p>Choosing an included file won&rsquo;t erase a file you have uploaded.</p>
            {this.boughtResourcePackModule === false &&
              <BuyModuleBanner moduleId='resource-pack' moduleName='Resource Pack' verb='get more included files' />
            }
          </Box>
        </section>
      </StyledResource>
    )
  }
}

ResourceSound.propTypes = {
  moduleIds: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

ResourceSound.defaultProps = {
  onUpdate: () => {}
}

export default ResourceSound
