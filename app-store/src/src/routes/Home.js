import React from 'react'
import styled from 'styled-components'

import modules from '../modules'
import getBoughtModuleIds from '../getBoughtModuleIds'

import Modules from '../components/Modules'

const StyledRoute = styled.div`
  max-width: 480px;
  section + section {
    margin-top: 1.5rem;
  }
`

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      boughtModuleIds: [],
      authenticated: undefined
    }
  }

  componentDidMount() {
    getBoughtModuleIds()
      .then(boughtModuleIds => {
        this.setState({
          authenticated: true,
          boughtModuleIds
        })
      })
      .catch(() => {
        this.setState({
          authenticated: false
        })
      })
  }

  render() {
    const {
      boughtModuleIds,
      authenticated
    } = this.state

    if (typeof authenticated !== 'boolean') {
      return null
    }

    return (
      <StyledRoute>
        <section>
          <Modules
            modules={modules[process.env.NODE_ENV]}
            boughtModuleIds={boughtModuleIds}
          />
        </section>
      </StyledRoute>
    )
  }
}

export default Home
