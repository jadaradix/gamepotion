import React from 'react'
import styled from 'styled-components'

import modules from '../modules'
import getBoughtModuleIds from '../getBoughtModuleIds'
import getQueryParameter from '../getQueryParameter'
import { font } from '../styleAbstractions'
import notify from '../notify'

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

const getCallback = () => {
  return getQueryParameter('callback')
}

const CALLBACK_DELAY = 5000
const CALLBACK_NOTIFY_SHOW_TIME = 10 * 1000

const CALLBACKS = {
  'good': () => {
    notify.good('Thank you for your purchase!', CALLBACK_NOTIFY_SHOW_TIME)
    return true
  },
  'bad': () => {
    notify.bad('Your purchase did not complete successfully.', CALLBACK_NOTIFY_SHOW_TIME)
    return true
  }
}

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      boughtModuleIds: [],
      authenticated: undefined
    }
  }

  componentDidMount() {
    const callback = getCallback()
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
    !callback && doGetBoughtModuleIds()
    callback && CALLBACKS[callback]() && setTimeout(doGetBoughtModuleIds, CALLBACK_DELAY)
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
