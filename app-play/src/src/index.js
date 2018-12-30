import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Oscar2 from './Oscar2'

import './index.css'

const App = () => {
  return (
    <Fragment>
      <div id='oscar2-container' />
      {/* <Oscar2
        containerElementId='oscar2-container'
        project={this.props.project}
        resources={this.props.resources}
        spaceId={this.props.project.startSpace}
        designMode={false}
        gridOn={false}
        gridWidth={16}
        gridHeight={16}
      /> */}
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
