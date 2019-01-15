import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import './index.css'
import logo from './images/logo.png'

import { init, set } from './localStorage'
import getQueryParameter from './getQueryParameter'

import Home from './routes/Home'
import Module from './routes/Module'

const StyledApp = styled.div`
  a.logo {
    max-width: 256px;
    display: block;
    margin-bottom: 1rem;
    img {
      display: block;
      width: 100%;
    }
  }
`

const getAccessToken = () => {
  return getQueryParameter('accessToken')
}

const hackyRoutingCallback = () => {
  const accessToken = getAccessToken()
  accessToken && set('access-token', accessToken)
  return null
}

const App = () => {
  init()

  return (
    <StyledApp>
      <Router>
        <div>
          <Link to='/' class='logo'><img src={logo} /></Link>
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
