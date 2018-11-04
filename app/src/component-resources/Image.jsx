import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'
import { font } from '../styleAbstractions'

import Box from '../components/Box/Box'
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
  .component--box > p {
    ${font}
    font-size: 80%;
    color: #bdc3c7;
  }
  .component--box > .component--dropper + p {
    margin-top: 1rem;
  }
`

class ResourceImage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource
    }
    this.onChooseFixed = this.onChooseFixed.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resource.fixed !== this.state.resource.fixed) {
      this.setState({ resource: nextProps.resource })
    }
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

  render() {
    // console.warn('[component-resource-Image] [render]')
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
        <section className='resource'>
          <Image src={remoteUrl} />
        </section>
        <section className='split-two'>
          <Box>
            <Uploader route={`me/team/projects/${this.props.project.id}/resources/${this.state.resource.id}`} mimeTypes={['image/png']} onDone={() => this.onUpdate({})} />
          </Box>
          <Box>
            <Dropper label='Choose a Game Maker Club file' options={fixedOptions} value={fixedValue} onChoose={this.onChooseFixed} />
            <p>Choosing a Game Maker Club file won&rsquo;t erase a file you have uploaded.</p>
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
