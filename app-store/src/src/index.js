import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import './index.css'

import logo from './images/logo.png'
import Modules from './components/Modules'

const StyledApp = styled.div`
  max-width: 480px;
  img {
    display: block;
    width: 100%;
    max-width: 256px;
  }
  .component--modules {
    margin-top: 1rem;
  }
`

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
    return (
      <StyledApp>
        <img src={logo} alt='' />
        <Modules
          modules={modules}
          onChoose={this.onChooseModule}
        />
      </StyledApp>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
