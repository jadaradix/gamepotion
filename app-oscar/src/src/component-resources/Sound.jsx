import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'
import { font } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'
import Uploader from '../components/Uploader/Uploader'
import AudioPlayer from '../components/AudioPlayer/AudioPlayer'

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
  .component--uploader {
    height: 100%;
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
`

class ResourceSound extends PureComponent {
  constructor(props) {
    super(props)
    this.onChooseFixed = this.onChooseFixed.bind(this)
    this.onUploadDone = this.onUploadDone.bind(this)
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
    const purchasedResourcePackModule = this.props.moduleIds.includes('resource-pack')
    const fixedOptions = [
      {
        id: 'none',
        name: '<None>'
      },
      ...resourceTypes.find(rt => rt.type === 'sound').getFixed(purchasedResourcePackModule).map(o => {
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
          <AudioPlayer url={remoteUrl} />
        </section>
        <section className='split-two'>
          <Box>
            <Uploader route={`me/team/projects/${this.props.project.id}/resources/${this.props.resource.id}`} mimeTypes={['audio/wav', 'audio/mpeg', 'audio/mp3']} onDone={this.onUploadDone} />
          </Box>
          <Box>
            <div className='file'>
              <Dropper label={'Choose an included file'} options={fixedOptions} value={fixedValue} onChoose={this.onChooseFixed} />
              <p>Choosing an included file won&rsquo;t erase a file you have uploaded.</p>
              {purchasedResourcePackModule === false &&
                <BuyModuleBanner moduleId='resource-pack' moduleName='Resource Pack' verb='get more included files' />
              }
            </div>
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
