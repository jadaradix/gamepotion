import React from 'react'
import styled from 'styled-components'

import modules from '../modules'

import Modules from '../components/Modules'

const StyledRoute = styled.div`
  max-width: 480px;
  section + section {
    margin-top: 1.5rem;
  }
`

class Home extends React.PureComponent {
  render() {
    return (
      <StyledRoute>
        <section>
          <Modules
            modules={modules}
          />
        </section>
      </StyledRoute>
    )
  }
}

export default Home
