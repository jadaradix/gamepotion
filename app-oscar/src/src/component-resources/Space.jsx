import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from '../components/Box/Box'
import Input from '../components/Input/Input'
import Dropper from '../components/Dropper/Dropper'
import Switch from '../components/Switch/Switch'
import Image from '../components/Image/Image'

import GameSpace from '../component-instances/Oscar/GameSpace'

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
      .component--switch {
        margin-bottom: 1rem;
      }
      .grid-properties {
        display: grid;
        grid-template-columns: 2fr 2fr;
        grid-gap: 1rem;
      }
    }
  }
  section.canvas {
    margin-top: 1rem;
    overflow: scroll;
    // background-color: red;
    .component--oscar-engine-space + .component--switch {
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
      isRunning: false
    }
    this.thisRefs = {
      touchCoordsX: null,
      touchCoordsY: null
    }
    this.onChooseBackgroundImage = this.onChooseBackgroundImage.bind(this)
    this.onChooseForegroundImage = this.onChooseForegroundImage.bind(this)
    this.plotAtom = this.plotAtom.bind(this)
    this.unplotAtoms = this.unplotAtoms.bind(this)
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

  plotAtom(coords) {
    const atomId = this.props.localSettings['atom-to-plot']
    console.warn('[plotAtom] atomId', atomId, 'at', coords)
    if (atomId === 'none') {
      return
    }
    this.props.onUpdate({
      instances: [
        ...this.props.resource.instances,
        {
          atomId,
          ...coords
        }
      ]
    })
  }

  unplotAtoms(indicesAtCoords) {
    // console.warn('[unplotAtoms]', 'of', indicesAtCoords)
    const instances = this.props.resource.instances.filter((ic, i) => {
      return (!indicesAtCoords.includes(i))
    })
    this.props.onUpdate({
      instances
    })
  }

  updateTouchCoords(coords) {
    // console.warn('[updateTouchCoords] coords', coords, this.thisRefs.touchCoordsX)
    this.thisRefs.touchCoordsX.value = coords.x
    this.thisRefs.touchCoordsY.value = coords.y
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

    let atomToPlot = this.props.localSettings['atom-to-plot']
    if (atomToPlot === 'none' && atomDropperResources.length > 0) {
      this.props.onUpdateLocalSetting('atom-to-plot', atomDropperResources[0].id)
    }
    const foundAtomResource = this.props.resources.find(r => r.id === atomToPlot)
    const foundImageResource = (foundAtomResource !== undefined ? this.props.resources.find(r => r.id === foundAtomResource.imageId) : undefined)
    const imageSrc = (foundImageResource !== undefined ?
      foundImageResource.getRemoteUrl()
      :
      null
    )

    // console.warn('[Space] [render] foundAtomResource', foundAtomResource)
    // console.warn('[Space] [render] foundImageResource', foundImageResource)

    const resourceContainers = this.props.resources.map(resource => {
      return {
        resource,
        extras: {}
      }
    })
    const spaceContainer = {
      resource: this.props.resource,
      extras: {}
    }
    const variables = new Map()

    return (
      <StyledResource>
        <section className='settings-plot-info'>
          <Box className='plot'>
            <div className='image-container'>
              <Image src={imageSrc} />
            </div>
            <Dropper options={atomDropperResources} value={atomToPlot} label='Atom to plot' onChoose={(v) => this.props.onUpdateLocalSetting('atom-to-plot', v)} />
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
              <Input label='Touch X' onRef={(r) => { this.thisRefs.touchCoordsX = r; this.thisRefs.touchCoordsX.value = 0 }} type='number' disabled />
              <Input label='Touch Y' onRef={(r) => { this.thisRefs.touchCoordsY = r; this.thisRefs.touchCoordsY.value = 0 }} type='number' disabled />
            </div>
            <Switch checked={this.props.localSettings['grid-on']} onChange={(v) => this.props.onUpdateLocalSetting('grid-on', v)}>Grid</Switch>
            <div className='grid-properties'>
              <Input label='Grid Width' value={this.props.localSettings['grid-width']} disabled={!this.props.localSettings['grid-on']} type='number' min='4' max='256' onChange={(v) => this.props.onUpdateLocalSetting('grid-width', v)} />
              <Input label='Grid Height' value={this.props.localSettings['grid-height']} disabled={!this.props.localSettings['grid-on']} type='number' min='4' max='256' onChange={(v) => this.props.onUpdateLocalSetting('grid-height', v)} />
            </div>
          </Box>
        </section>
        <section className='canvas'>
          <GameSpace
            spaceContainer={spaceContainer}
            resourceContainers={resourceContainers}
            variables={variables}
            designMode={!this.state.isRunning}
            gridOn={this.props.localSettings['grid-on']}
            gridWidth={this.props.localSettings['grid-width']}
            gridHeight={this.props.localSettings['grid-height']}
            onTouch={this.plotAtom} onTouchSecondary={this.unplotAtoms} onTouchMove={this.updateTouchCoords} />
          <Switch checked={this.state.isRunning} onChange={(v) => this.updateRunning(v)}>Run</Switch>
        </section>
      </StyledResource>
    )
  }
}

ResourceSpace.propTypes = {
  resources: PropTypes.array.isRequired,
  resource: PropTypes.object.isRequired,
  localSettings: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
  onUpdateLocalSetting: PropTypes.func,
}

ResourceSpace.defaultProps = {
  onUpdate: () => {},
  onUpdateLocalSetting: () => {}
}

export default ResourceSpace
