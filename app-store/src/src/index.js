import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import './index.css'
import logo from './images/logo.png'

import { set } from './localStorage'
import notify from './notify'

import Home from './routes/Home'
import Module from './routes/Module'

const StyledApp = styled.div`
  // a.logo {
  //   max-width: 256px;
  //   display: block;
  //   margin-bottom: 1rem;
  //   img {
  //     display: block;
  //     width: 100%;
  //   }
  // }
`

const getSingleQueryParameter = (paramater) => {
  const query = window.location.search
  if (query.indexOf(`?${paramater}=`) === 0) {
    return query.substring(query.indexOf(`?${paramater}=`) + `?${paramater}=`.length) 
  }
  return undefined
}

const getAccessToken = () => {
  return getSingleQueryParameter('accessToken')
}

const getCallback = () => {
  return getSingleQueryParameter('callback')
}

const CALLBACK_WAIT = 10 * 1000

const CALLBACKS = {
  'good': () => {
    notify.good('Thank you for your purchase!', CALLBACK_WAIT)
  },
  'bad': () => {
    notify.bad('Your purchase did not complete successfully.', CALLBACK_WAIT)
  }
}

const hackyRoutingCallback = () => {
  const accessToken = getAccessToken()
  accessToken && set('access-token', accessToken)
  const callback = getCallback()
  callback && CALLBACKS[callback]()
  return null
}

const App = () => {
  return (
    <StyledApp>
      <Router>
        <div>
          <Route component={hackyRoutingCallback} />
          <Switch>
            <Route path='/modules/:id' exact strict component={Module} />
            <Route component={Home} />
          </Switch>
        </div>
      </Router>
    </StyledApp>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
