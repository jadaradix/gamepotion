import React from 'react'
import styled from 'styled-components'

import modules from '../modules'
import getBoughtModuleIds from '../getBoughtModuleIds'
import getQueryParameter from '../getQueryParameter'
import { font } from '../styleAbstractions'

import Modules from '../components/Modules'

const StyledRoute = styled.div`
  max-width: 480px;
  section + section {
    margin-top: 1.5rem;
  }
  p.loading {
    ${font}
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
    const delay = (typeof getQueryParameter('callback') === 'string' ? 5000 : 0)
    const doGetBoughtModuleIds = () => {
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
    setTimeout(doGetBoughtModuleIds, delay)
  }

  render() {
    const {
      boughtModuleIds,
      authenticated
    } = this.state

    return (
      <StyledRoute>
        <section>
          {typeof authenticated !== 'boolean' &&
            <p className='loading'>Please wait...</p>
          }
          {typeof authenticated === 'boolean' &&
            <Modules
              modules={modules[process.env.NODE_ENV]}
              boughtModuleIds={boughtModuleIds}
            />
          }
        </section>
      </StyledRoute>
    )
  }
}

export default Home
