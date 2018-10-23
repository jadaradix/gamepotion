import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import icons from '../../icons'

import Heading1 from '../../components/Heading1/Heading1'
import List from '../../components/List/List'
import ListItem from '../../components/ListItem/ListItem'

import MainToolbar from '../../component-instances/MainToolbar'
import ResourceList from '../../component-instances/ResourceList'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'

const StyledState = styled.div`
  height: calc(100% - (3rem + 4px));
  .resource-tree {
    width: 256px;
    height: 100%;
    // background-color: red;
    > ul {
      height: 100%;
    }
  }
`

class StateProjectProject extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      resources: [
        {
          type: 'image',
          id: 'image-1',
          name: 'Image 1'
        },
        {
          type: 'image',
          id: 'image-2',
          name: 'Image 2'
        },
        {
          type: 'sound',
          id: 'sound-1',
          name: 'Sound 1'
        },
        {
          type: 'sound',
          id: 'sound-2',
          name: 'Sound 2'
        },
        {
          type: 'atom',
          id: 'atom-1',
          name: 'Atom 1'
        },
        {
          type: 'atom',
          id: 'atom-2',
          name: 'Atom 2'
        },
        {
          type: 'space',
          id: 'space-1',
          name: 'Space 1'
        },
        {
          type: 'space',
          id: 'space-2',
          name: 'Space 2'
        }
      ]
    }
  }

  render() {
    return (
      <Fragment>
        <MainToolbar />
        <StyledState>
          <div className='resource-tree'>
            <ResourceList resources={this.state.resources} />
          </div>
        </StyledState>
      </Fragment>
    )
  }
}

export default StateProjectProject
