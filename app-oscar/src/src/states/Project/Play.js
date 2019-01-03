import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'

import { getState, dispatch, subscribe } from '../../state'
import { playProject } from '../../inter-router'
import { font, colours } from '../../styleAbstractions'

import Input from '../../components/Input/Input'
import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import CustomHelmet from '../../component-instances/CustomHelmet'

import Oscar2 from '../../Oscar2'

const StyledState = styled.div`
  padding: 1rem;
  .share {
    max-width: 420px;
    margin: 0 auto 1rem auto;
    padding: 0.5rem 1rem 0.5rem 1rem;
    background-color: ${colours.back};
    border-radius: 4px;
    span {
      display: block;
      line-height: calc(2rem + 4px);
      height: calc(2rem + 4px);
      ${font}
      color: ${colours.fore};
      // background-color: blue;
    }
    .component--input {
      // background-color: yellow;
    }
    span + .component--input {
      margin-top: 0.5rem;
    }
  }
  @media screen and (min-width: 540px) {
    .share {
      height: calc(2rem + 4px);
      span {
        float: left;
      }
      .component--input {
        float: left;
        width: 346px;
        height: calc(2rem + 4px);
      }
      span + .component--input {
        margin-top: 0;
        margin-left: 0.5rem;
      }
    }
  }
`

class StateProjectPlay extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: getState().currentProject
    }
  }

  componentDidMount () {
    this.oldBodyBackgroundColor = document.body.style.backgroundColor
    document.body.style.backgroundColor = 'black'
    this.subscriptions = [
      subscribe('PROJECTS_LOAD', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      })
    ]
    if (this.state.currentProject === null) {
      dispatch({
        name: 'PROJECTS_LOAD',
        data: {
          id: this.props.match.params.id
        }
      })
    }
  }

  componentWillUnmount () {
    document.body.style.backgroundColor = this.oldBodyBackgroundColor
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  render() {
    return (
      <Fragment>
        <MainToolbarContainer />
        <StyledState>
          {this.state.currentProject !== null &&
            <Fragment>
              <CustomHelmet
                title={this.state.currentProject.project.name}
              />
              <div className='share'>
                <span>Play link:</span>
                <Input value={playProject(process.env.NODE_ENV, this.state.currentProject.project.id)} />
              </div>
              <div id='oscar2-container' />
              <Oscar2
                containerElementId='oscar2-container'
                project={this.state.currentProject.project}
                resources={this.state.currentProject.resources}
                spaceId={this.state.currentProject.project.startSpace}
                designMode={false}
                gridOn={false}
              />
            </Fragment>
          }
        </StyledState>
      </Fragment>
    )
  }
}

export default StateProjectPlay
