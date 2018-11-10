import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { get, set } from '../localStorage'

import Box from '../components/Box/Box'
import Input from '../components/Input/Input'
import Dropper from '../components/Dropper/Dropper'
import Switch from '../components/Switch/Switch'
import Image from '../components/Image/Image'

import SpaceCanvas from '../component-instances/SpaceCanvas'

const getAtomDropperResources = (resources) => {
  return resources
    .filter(r => r.type === 'atom')
    .map(r => {
      return {
        id: r.id,
        name: r.name
      }
    })
}

const getImageDropperResources = (resources) => {
  return [
    ...resources
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
}

const getAtomToPlot = (resources) => {
  const foundAtom = resources.find(r => r.type === 'atom')
  if (foundAtom !== undefined) {
    return foundAtom.id
  }
  return 'none'
}

const StyledResource = styled.div`
  section.settings-plot-info {
    .component--box.settings {
      margin-bottom: 1rem;
      .coords {
        display: grid;
        grid-template-columns: 2fr 2fr;
        grid-gap: 1rem;
        margin-top: 2rem;
      }
      .component--dropper:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
    .component--box.plot {
      margin-bottom: 1rem;
      .image-container {
        position: relative;
        height: 128px;
        border: 1px solid #dadfe1;
        border-radius: 4px;
      }
      .image-container + .component--dropper {
        margin-top: 1rem;
      }
    }
    .component--box.info {
      margin-bottom: 1rem;
      .touches {
        display: grid;
        grid-template-columns: 2fr 2fr;
        grid-gap: 1rem;
        margin-bottom: 2rem;
      }
      .grid-properties {
        display: grid;
        grid-template-columns: 2fr 2fr;
        grid-gap: 1rem;
        margin-bottom: 2rem;
      }
    }
  }
  section.canvas {
    margin-top: 1rem;
    overflow: scroll;
    // background-color: red;
    .component--gmc-engine-space + .component--switch {
      margin-top: 1rem;
    }
  }
  @media screen and (min-width: 960px) {
    section.settings-plot-info {
      float: left;
      width: 240px;
      .component--box.settings {
        margin-bottom: 2rem;
      }
      .component--box.plot {
        margin-bottom: 2rem;
      }
      .component--box.info {
        margin-bottom: 2rem;
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
    this.state = {
      atomToPlot: getAtomToPlot(props.resources),
      touchCoords: {
        x: 0,
        y: 0
      },
      grid: {
        on: get('grid-on'),
        width: get('grid-width'),
        height: get('grid-height')
      },
      isRunning: false
    }
    this.onChooseBackgroundImage = this.onChooseBackgroundImage.bind(this)
    this.onChooseForegroundImage = this.onChooseForegroundImage.bind(this)
    this.onChooseAtomToPlot = this.onChooseAtomToPlot.bind(this)
    this.plotAtom = this.plotAtom.bind(this)
    this.updateTouchCoords = this.updateTouchCoords.bind(this)
    this.updateRunning = this.updateRunning.bind(this)
  }

  onChangeMasterProp(prop, v) {
    this.props.onUpdate({
      [prop]: parseInt(v, 10)
    })
  }

  onChangeCameraProp(prop, v) {
    this.props.onUpdate({
      camera: {
        ...this.props.resource.camera,
        [prop]: parseInt(v, 10)
      }
    })
  }

  onChooseBackgroundImage(backgroundImage) {
    if (backgroundImage === 'none') {
      backgroundImage = null
    }
    this.props.onUpdate({
      backgroundImage
    })
  }

  onChooseForegroundImage(foregroundImage) {
    if (foregroundImage === 'none') {
      foregroundImage = null
    }
    this.props.onUpdate({
      foregroundImage
    })
  }

  onChooseAtomToPlot(atomToPlot) {
    this.setState({
      atomToPlot
    })
  }

  plotAtom(coords) {
    console.warn('[plotAtoms]', this.state.atomToPlot, 'at', coords)
    if (this.state.atomToPlot === 'none') {
      return
    }
    const [x, y, z] = coords
    this.props.onUpdate({
      instances: [
        ...this.props.resource.instances,
        {
          atomId: this.state.atomToPlot,
          x,
          y,
          z
        }
      ]
    })
  }

  updateTouchCoords(coords) {
    // console.warn('[updateTouchCoords] coords', coords)
    this.setState({
      touchCoords: {
        x: coords[0],
        y: coords[1],
        z: coords[2]
      }
    })
  }

  updateGridProperty(property, value) {
    this.setState({
      grid: {
        ...this.state.grid,
        [property]: value
      }
    }, () => {
      set(`grid-${property}`, value)
    })
  }

  updateRunning(isRunning) {
    this.setState({
      isRunning
    })
  }

  render() {
    console.warn('[component-resource-Space] [render]')

    const atomDropperResources = getAtomDropperResources(this.props.resources)
    const imageDropperResources = getImageDropperResources(this.props.resources)

    const backgroundImage = (this.props.resource.backgroundImage === null ? 'none' : this.props.resource.backgroundImage)
    const foregroundImage = (this.props.resource.foregroundImage === null ? 'none' : this.props.resource.foregroundImage)

    const atomToPlot = this.state.atomToPlot
    const foundAtomResource = this.props.resources.find(r => r.id === atomToPlot)
    const foundImageResource = (foundAtomResource !== undefined ? this.props.resources.find(r => r.id === foundAtomResource.imageId) : undefined)
    const imageSrc = (foundImageResource !== undefined?
      foundImageResource.getRemoteUrl()
      :
      null
    )

    return (
      <StyledResource>
        <section className='settings-plot-info'>
          <Box className='plot'>
            <div className='image-container'>
              <Image src={imageSrc} />
            </div>
            <Dropper options={atomDropperResources} value={atomToPlot} label='Atom to plot' onChoose={this.onChooseAtomToPlot} />
          </Box>
          <Box className='settings'>
            <Dropper options={imageDropperResources} value={backgroundImage} onChoose={this.onChooseBackgroundImage} label='Background image' />
            <Dropper options={imageDropperResources} value={foregroundImage} onChoose={this.onChooseForegroundImage} label='Foreground image' />
            <div className='coords'>
              <Input label='Width' type='number' value={this.props.resource.width} onChange={(v) => this.onChangeMasterProp('width', v)} min='0' max='4096' />
              <Input label='Height' type='number' value={this.props.resource.height} onChange={(v) => this.onChangeMasterProp('height', v)} min='0' max='4096' />
              <Input label='Cam Width' type='number' value={this.props.resource.camera.width} onChange={(v) => this.onChangeCameraProp('width', v)} min='0' max='4096' />
              <Input label='Cam Height' type='number' value={this.props.resource.camera.height} onChange={(v) => this.onChangeCameraProp('height', v)} min='0' max='4096' />
              <Input label='Cam X' type='number' value={this.props.resource.camera.x} min='0' onChange={(v) => this.onChangeCameraProp('x', v)} max='4096' />
              <Input label='Cam Y' type='number' value={this.props.resource.camera.y} min='0' onChange={(v) => this.onChangeCameraProp('y', v)} max='4096' />
            </div>
          </Box>
          <Box className='info'>
            <div className='touches'>
              <Input label='Touch X' value={this.state.touchCoords.x} type='number' disabled />
              <Input label='Touch Y' value={this.state.touchCoords.y} type='number' disabled />
            </div>
            <div className='grid-properties'>
              <Input label='Grid Width' value={this.state.grid.width} type='number' min='4' max='256' onChange={(v) => this.updateGridProperty('width', v)} />
              <Input label='Grid Height' value={this.state.grid.height} type='number' min='4' max='256' onChange={(v) => this.updateGridProperty('height', v)} />
            </div>
            <Switch checked={this.state.grid.on} onChange={(v) => this.updateGridProperty('on', v)}>Grid</Switch>
          </Box>
        </section>
        <section className='canvas'>
          <SpaceCanvas space={this.props.resource} resources={this.props.resources} designMode={!this.state.isRunning} onTouch={this.plotAtom} onTouchMove={this.updateTouchCoords} />
          <Switch checked={this.state.isRunning} onChange={(v) => this.updateRunning(v)}>Run</Switch>
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
