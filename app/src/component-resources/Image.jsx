import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'
import { font, colours } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'

const StyledResource = styled.div`
  @keyframes no-resource {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
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
    img {
      display: block;
      max-width: 100%;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
    img.visible {
      visibility: visible;
      opacity: 1;
    }
    .no-resource {
      margin-top: 1rem;
      ${font}
      color: ${colours.fore};
      opacity: 0.75;
      animation: no-resource 0.5s;
    }
  }
  section + section {
    margin-top: 1rem;
  }
`

class Image extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource,
      fileLoaded: false,
      fileErrored: false
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
      this.setState({ resource: nextProps.resource, fileLoaded: false, fileErrored: false })
    }
  }

  onLoad() {
    this.setState({
      fileLoaded: true
    })
  }

  onError() {
    this.setState({
      fileErrored: true
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
        <section className='resource'>
          {!this.state.fileErrored ?
            <img src={remoteUrl} onLoad={this.onLoad} onError={this.onError} className={this.state.fileLoaded ? 'visible' : ''} alt='' />
            :
            <p className='no-resource'>You haven&rsquo;t chosen a file yet.</p>
          }
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

Image.propTypes = {
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

Image.defaultProps = {
  onUpdate: () => {}
}

export default Image
