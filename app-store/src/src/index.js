import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import './index.css'
import logo from './images/logo.png'

import { set } from './localStorage'

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

const getAccessToken = () => {
  const query = window.location.search
  if (query.indexOf('?accessToken=') === 0) {
    return query.substring(query.indexOf('?accessToken=') + '?accessToken='.length) 
  }
  return undefined
}

const maybeUpdateAccessToken = () => {
  const accessToken = getAccessToken()
  accessToken && set('access-token', accessToken)
  return null
}

const App = () => {
  return (
    <StyledApp>
      <Router>
        <div>
          <Route component={maybeUpdateAccessToken} />
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
