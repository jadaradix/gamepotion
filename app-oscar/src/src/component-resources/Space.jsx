import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from '../components/Box/Box'
import Input from '../components/Input/Input'
import Dropper from '../components/Dropper/Dropper'
import Switch from '../components/Switch/Switch'
import ImageChooser from '../components/ImageChooser/ImageChooser'
import Button from '../components/Button/Button'
import GridModal from '../modals/Grid'

import { font, colours } from '../styleAbstractions'

import Oscar2 from '../Oscar2'

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

const getAtomsToPlot = (resources) => {
  return resources
    .filter(r => r.type === 'atom')
    .map(r => {
      const foundImage = resources.find(i => i.id === r.imageId)
      const url = (foundImage !== undefined ?
        foundImage.getRemoteUrl()
        :
        null
      )
      return {
        id: r.id,
        name: r.name,
        url
      }
    })
}

const StyledResource = styled.div`
  section.main {
    // background-color: yellow;
    .play-touches-grid {
      position: relative;
      height: 2rem;
      margin-top: 1rem;
      margin-bottom: 2rem;
      // background-color: blue;
      .component--switch {
        float: left;
      }
      .grid-settings {
        margin-left: 1rem;
        float: left;
        .component--button {
          font-size: 80%;
          height: 2rem;
          line-height: 2rem;
          padding: 0 0.4rem 0 0.4rem;
        }
      }
      .touches {
        margin-left: 1rem;
        float: left;
        line-height: 2rem;
        // background-color: red;
        ${font}
        font-size: 80%;
        color: #6c7a89;
      }
    }
    .game {
      min-height: 280px;
      background-color: #dadfe1;
    }
  }
  section.settings-info {
    .component--box.settings {
      .coords {
        display: grid;
        grid-template-columns: 2fr 2fr;
        grid-gap: 1rem;
        margin-bottom: 2rem;
      }
      .component--dropper:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
  section.atom-to-place {
    margin-top: 1rem;
  }
  @media screen and (min-width: 1202px) {
    section.main {
      float: left;
      width: 610px;
      .game {
        // 1125 x 2436
        height: 280px;
        overflow: scroll;
      }
    }
    section.settings-info {
      margin-top: 0;
      width: 240px;
      margin-left: calc(610px + 2rem);
      .component--box.settings {
        margin-bottom: 2rem;
      }
    }
    section.atom-to-place {
      width: 882px;
    }
  }
`

class ResourceSpace extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      showingGridModal: false
    }
    this.thisRefs = {
      touchCoordsX: null,
      touchCoordsY: null
    }
    this.onChooseBackgroundImage = this.onChooseBackgroundImage.bind(this)
    this.onChooseForegroundImage = this.onChooseForegroundImage.bind(this)
    this.updatePlaying = this.updatePlaying.bind(this)
    this.updateTouchCoords = this.updateTouchCoords.bind(this)
    this.showGridModal = this.showGridModal.bind(this)
    this.gridModalGood = this.gridModalGood.bind(this)
    this.gridModalBad = this.gridModalBad.bind(this)
    this.plotAtom = this.plotAtom.bind(this)
    this.unplotAtoms = this.unplotAtoms.bind(this)
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

  plotAtom(coords, angle) {
    const atomId = this.props.localSettings['atom-to-plot']
    if (typeof angle !== 'number') {
      const atom = this.props.resources.find(r => r.id === atomId)
      angle = atom.angle
    }
    if (coords.x < 0 || coords.y < 0 || coords.x > this.props.resource.width || coords.y > this.props.resource.height) {
      return console.error('out ot bounds coords', coords)
    }
    console.warn('[plotAtom] atomId', atomId, 'at', coords)
    if (atomId === 'none') {
      return
    }
    this.props.onUpdate({
      instances: [
        ...this.props.resource.instances,
        {
          atomId,
          ...coords,
          angle
        }
      ]
    })
  }

  unplotAtoms(indicesAtCoords) {
    // console.warn('[unplotAtoms]', 'of', indicesAtCoords)
    const instances = this.props.resource.instances.filter((ic, i) => !indicesAtCoords.includes(i))
    this.props.onUpdate({
      instances
    })
  }

  updateTouchCoords(coords) {
    // console.warn('[updateTouchCoords] coords', coords, this.thisRefs.touchCoordsX)
    this.thisRefs.touchCoordsX.innerHTML = coords.x.toString()
    this.thisRefs.touchCoordsY.innerHTML = coords.y.toString()
  }

  updatePlaying(isPlaying) {
    this.setState({
      isPlaying
    })
  }

  showGridModal() {
    this.setState({
      showingGridModal: true
    })
  }

  gridModalGood(state) {
    this.props.onUpdateLocalSetting({
      'grid-on': state.on,
      'grid-width': state.width,
      'grid-height': state.height
    })
    this.setState({
      showingGridModal: false
    })
  }

  gridModalBad() {
    this.setState({
      showingGridModal: false
    })
  }

  render() {
    console.warn('[component-resource-Space] [render]')

    const atomsToPlot = getAtomsToPlot(this.props.resources)
    const imageDropperResources = getImageDropperResources(this.props.resources)

    const backgroundImage = (this.props.resource.backgroundImage === null ? 'none' : this.props.resource.backgroundImage)
    const foregroundImage = (this.props.resource.foregroundImage === null ? 'none' : this.props.resource.foregroundImage)

    let atomToPlot = this.props.localSettings['atom-to-plot']
    if (
      (atomToPlot === 'none' || atomsToPlot.find(r => r.id === atomToPlot) === undefined)
      && atomsToPlot.length > 0)
    {
      this.props.onUpdateLocalSetting({'atom-to-plot': atomsToPlot[0].id})
    }

    console.warn('[Space] [render] this.props.localSettings', this.props.localSettings)

    return (
      <StyledResource>
        {this.state.showingGridModal &&
        <GridModal
          on={this.props.localSettings['grid-on']}
          width={this.props.localSettings['grid-width']}
          height={this.props.localSettings['grid-height']}
          onGood={this.gridModalGood}
          onBad={this.gridModalBad}
        />}
        <section className='main'>
          <div className='game'>
            <div id='oscar2-container' />
            <Oscar2
              containerElementId='oscar2-container'
              project={this.props.project}
              resources={this.props.resources}
              spaceId={this.props.resource.id}
              designMode={!this.state.isPlaying}
              gridOn={this.props.localSettings['grid-on'] && !this.state.isPlaying}
              gridWidth={this.props.localSettings['grid-width']}
              gridHeight={this.props.localSettings['grid-height']}
              onTouch={this.plotAtom}
              onTouchSecondary={this.unplotAtoms}
              onTouchMove={this.updateTouchCoords}
            />          
          </div>
          <div className='play-touches-grid'>
            <Switch checked={this.state.isPlaying} onChange={(v) => this.updatePlaying(v)}>Play</Switch>
            <div className='grid-settings'>
              <Button onClick={this.showGridModal}>Grid settings</Button>
            </div>
            <div className='touches'>
              <span ref={(r) => { this.thisRefs.touchCoordsX = r }}>0</span>&times;<span ref={(r) => { this.thisRefs.touchCoordsY = r }}>0</span>
            </div>
          </div>
        </section>
        <section className='settings-info'>
          <Box className='settings'>
            <div className='coords'>
              <Input label='Width' type='number' value={this.props.resource.width} onChange={(v) => this.onChangeMasterProp('width', v)} min='0' max='4096' />
              <Input label='Height' type='number' value={this.props.resource.height} onChange={(v) => this.onChangeMasterProp('height', v)} min='0' max='4096' />
              <Input label='Cam Width' type='number' value={this.props.resource.camera.width} onChange={(v) => this.onChangeCameraProp('width', v)} min='0' max='4096' />
              <Input label='Cam Height' type='number' value={this.props.resource.camera.height} onChange={(v) => this.onChangeCameraProp('height', v)} min='0' max='4096' />
            </div>
            <Dropper options={imageDropperResources} value={backgroundImage} onChoose={this.onChooseBackgroundImage} label='Background image' />
            <Dropper options={imageDropperResources} value={foregroundImage} onChoose={this.onChooseForegroundImage} label='Foreground image' />
          </Box>
        </section>
        <section className='atom-to-place'>
          <Box>
            <ImageChooser title='Atom to place' images={atomsToPlot} currentImage={atomToPlot} onChoose={(v) => this.props.onUpdateLocalSetting({'atom-to-plot': v})} />
          </Box>
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
  onUpdateLocalSetting: PropTypes.func.isRequired
}

ResourceSpace.defaultProps = {
  onUpdate: () => {}
}

export default ResourceSpace
