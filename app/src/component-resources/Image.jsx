import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'
import { font, colours } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'
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
  }
  section + section {
    margin-top: 2rem;
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

  // <Button onClick={this.renameToTest}>Rename to Test</Button>
  // renameToTest () {
  //   this.props.onUpdate({ name: 'Test' })
  // }

  componentWillReceiveProps (nextProps) {
    if (nextProps.resource.fixed !== this.state.resource.fixed) {
      this.setState({ resource: nextProps.resource })
    }
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
        <section className='resource'>
          <Image src={remoteUrl} />
        </section>
        <section className='split-two'>
          <Box>
            <Dropper label='Choose a Game Maker Club file' options={fixedOptions} value={fixedValue} onChoose={this.onChooseFixed} />
          </Box>
          <Box>
            <p>(upload goes here)</p>
          </Box>
        </section>
      </StyledResource>
    )
  }
}

ResourceImage.propTypes = {
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

ResourceImage.defaultProps = {
  onUpdate: () => {}
}

export default ResourceImage
