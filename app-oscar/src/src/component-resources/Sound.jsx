import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'
import { font } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'
import Uploader from '../components/Uploader/Uploader'
import AudioPlayer from '../components/AudioPlayer/AudioPlayer'

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

class ResourceSound extends PureComponent {
  constructor(props) {
    super(props)
    this.onChooseFixed = this.onChooseFixed.bind(this)
    this.onUploadDone = this.onUploadDone.bind(this)
  }

  onUpdate(data) {
    this.props.onUpdate(data)
  }

  onChooseFixed(fixed) {
    if (fixed === 'none') {
      fixed = null
    }
    this.onUpdate({
      fixed
    })
  }

  onUploadDone(data) {
    // apis go away
    const {
      fixed,
      extension
    } = data
    this.onUpdate({
      fixed,
      extension
    })
  }

  render() {
    const fixedOptions = [
      {
        id: 'none',
        name: '<None>'
      },
      ...resourceTypes.find(rt => rt.type === 'sound').fixed.map(o => {
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
              <Dropper label='Choose a Game Maker Club file' options={fixedOptions} value={fixedValue} onChoose={this.onChooseFixed} />
              <p>Choosing a Game Maker Club file won&rsquo;t erase a file you have uploaded.</p>
            </div>
          </Box>
        </section>
      </StyledResource>
    )
  }
}

ResourceSound.propTypes = {
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

ResourceSound.defaultProps = {
  onUpdate: () => {}
}

export default ResourceSound
