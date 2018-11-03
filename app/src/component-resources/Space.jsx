import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from '../components/Box/Box'
import Input from '../components/Input/Input'
import Dropper from '../components/Dropper/Dropper'

import spaceCanvas from '../abstractions/spaceCanvas'

const StyledResource = styled.div`
  section.settings-plot-info {
    .component--box.settings {
      display: grid;
      grid-template-columns: 2fr 2fr;
      grid-gap: 1rem;
    }
    .component--box.plot {
      margin-top: 1rem;
      .component--heading2 + .component--dropper {
        margin-top: 1rem;
      }
    }
    .component--box.info {
      margin-top: 1rem;
      display: grid;
      grid-template-columns: 2fr 2fr;
      grid-gap: 1rem;
    }
  }
  section.canvas {
    margin-top: 1rem;
    // background-color: red;
  }
  @media screen and (min-width: 960px) {
    section.settings-plot-info {
      float: left;
      width: 240px;
      .component--box.plot {
        margin-top: 2rem;
      }
      .component--box.info {
        margin-top: 2rem;
      }
    }
    section.canvas {
      margin-top: 0;
      margin-left: calc(240px + 2rem);
    }
  }
`

class ResourceSpace extends PureComponent {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      resource: props.resource
    }
  }

  renderCanvas(resource) {
    spaceCanvas(this.canvasRef.current, resource, this.props.resources)
  }

  componentDidMount() {
    this.renderCanvas(this.state.resource)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      resource: nextProps.resource
    })
    this.renderCanvas(nextProps.resource)
  }

  render() {
    const atomResources = this.props.resources
      .filter(r => r.type === 'atom')
      .map(r => {
        return {
          id: r.id,
          name: r.name
        }
      })

    return (
      <StyledResource>
        <section className='settings-plot-info'>
          <Box className='settings'>
            <Input label='Width' type='number' value={this.state.resource.width} />
            <Input label='Height' type='number' value={this.state.resource.height} />
            <Input label='Cam Width' type='number' value={this.state.resource.camera.width} />
            <Input label='Cam Height' type='number' value={this.state.resource.camera.height} />
            <Input label='Cam X' type='number' value={this.state.resource.camera.x} />
            <Input label='Cam Y' type='number' value={this.state.resource.camera.y} />
          </Box>
          <Box className='plot'>
            <Dropper options={atomResources} label='Atom to plot' />
          </Box>
          <Box className='info'>
            <Input label='Touch X' value='32' disabled />
            <Input label='Touch Y' value='32' disabled />
          </Box>
        </section>
        <section className='canvas'>
          <canvas ref={this.canvasRef} />
        </section>
      </StyledResource>
    )
  }
}

ResourceSpace.propTypes = {
  resources: PropTypes.array,
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

ResourceSpace.defaultProps = {
  onUpdate: () => {}
}

export default ResourceSpace
