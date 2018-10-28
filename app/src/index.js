import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom'

import api from './state/api.js'

import Dashboard from './states/Dashboard.js'
import ProjectNew from './states/Project/New.js'
import ProjectProject from './states/Project/Project.js'
import ProjectPreferences from './states/Project/Preferences.js'
import Auth from './states/Auth.js'

import './index.css'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    api.isLoggedIn() === true
      ? <Component {...props} />
      : <Redirect to='/auth' />
  )} />
)

const router = (
  <Router>
    <Switch>
      <Route path='/auth' exact strict component={Auth} />
      <PrivateRoute path='/dashboard' exact strict component={Dashboard} />
      <PrivateRoute path='/project/new' exact strict component={ProjectNew} />
      <PrivateRoute path='/project/:id/preferences' exact strict component={ProjectPreferences} />
      <PrivateRoute path='/project/:id' exact strict component={ProjectProject} />
      <PrivateRoute component={Dashboard} />
    </Switch>
  </Router>
)

ReactDOM.render(router, document.getElementById('root'))
