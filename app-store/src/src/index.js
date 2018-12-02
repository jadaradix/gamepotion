import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Modules from './components/Modules'

const modules = [
  {
    id: 'pro',
    name: 'Pro',
    price: '$10'
  },
  {
    id: 'resource-pack',
    name: 'Resource Pack',
    price: '$5'
  }
]

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onChooseModule = this.onChooseModule.bind(this)
  }

  onChooseModule(id) {
    console.warn('[onChooseModule] id', id)
  }

  render() {
    return <Fragment>
      <Modules
        modules={modules}
        onChoose={this.onChooseModule}
      />
    </Fragment>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
