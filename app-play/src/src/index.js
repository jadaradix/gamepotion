import React, { PureComponent, Fragment } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import classes from './classes'
import classFactory from './classes/factory'
import Oscar2 from './Oscar2'

import './index.css'

const env = (window.location.protocol === 'http:' ? 'local' : 'production')
const envs = {
  'local': {
    apis: {
      'api-core': 'http://localhost:1025/v1'
    }
  },
  'production': {
    apis: {
      'api-core': 'https://api-core.gamemaker.club/v1'
    }
  }
}
const apis = envs[env].apis

const getProjectAndResources = async (id) => {
  const { data: { project, resources } } = await axios.get(`${apis['api-core']}/public-projects/${id}/play`)
  const projectClass = new classes.Project()
  projectClass.clientFromApiGet(project)
  const resourceClasses = resources.map(resource => classFactory.resource(resource))
  return Promise.resolve({
    project: projectClass,
    resources: resourceClasses
  })
}

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      errored: false,
      projectAndResources: undefined
    }
  }
  
  componentDidMount() {
    (async () => {
      const id = window.location.pathname.substring(1)
      try {
        const projectAndResources = await getProjectAndResources(id)
        this.setState({
          projectAndResources
        })
      } catch (error) {
        this.setState({
          errored: true
        })
      }
    })()
  }

  render() {
    if (this.state.errored === true) {
      return (
        <div
          style={{
            padding: '16px',
            color: 'white',
            font: '14px Arial'
          }}
        >
          This game could not be loaded.
        </div>
      )
    }
    if (typeof this.state.projectAndResources === 'object') {
      return (
        <Fragment>
          <div id='oscar2-container' />
          <Oscar2
            containerElementId='oscar2-container'
            resources={this.state.projectAndResources.resources}
            spaceId={this.state.projectAndResources.project.startSpace}
            designMode={false}
            gridOn={false}
            gridWidth={16}
            gridHeight={16}
          />
        </Fragment>
      )
    }
    return null
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
