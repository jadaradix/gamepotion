import React from 'react'
import styled from 'styled-components'

import modules from '../modules'

import logo from '../images/logo.png'
import Modules from '../components/Modules'
import Heading1 from '../components/Heading1'

const StyledRoute = styled.div`
  max-width: 480px;
  section + section {
    margin-top: 1.5rem;
  }
  img {
    display: block;
    width: 100%;
    max-width: 256px;
  }
  .component--modules {
    margin-top: 1.5rem;
  }
`

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentModuleId: null
    }
  }

  render() {
    const currentModule = modules.find(m => m.id === this.state.currentModuleId)

    return (
      <StyledRoute>
        <section>
          <img src={logo} alt='' />
          <Modules
            modules={modules}
          />
        </section>
        {currentModule && (
          <section>
            <Heading1>{currentModule.name}</Heading1>
          </section>
        )}
      </StyledRoute>
    )
  }
}

export default Home
