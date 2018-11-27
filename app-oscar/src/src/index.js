import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom'

import api from './state/api.js'
import CustomHelment from './component-instances/CustomHelmet.js'

import Dashboard from './states/Dashboard.js'
import Account from './states/Account.js'
import ProjectNew from './states/Project/New.js'
import ProjectProject from './states/Project/Project.js'
import ProjectPlay from './states/Project/Play.js'
import ProjectPreferences from './states/Project/Preferences.js'
import Auth from './states/Auth.js'

import './index.css'

const PrivateRoute = ({ WhichComponent, ...rest }) => (
  <Route {...rest} render={(props) => (
    api.isLoggedIn() === true
      ? <WhichComponent {...props} />
      : <Redirect to='/auth' />
  )} />
)

const app = (
  <Fragment>
    <CustomHelment />
    <Router>
      <Switch>
        <Route path='/auth' exact strict component={Auth} />
        <PrivateRoute path='/dashboard' exact strict WhichComponent={Dashboard} />
        <PrivateRoute path='/account' exact strict WhichComponent={Account} />
        <PrivateRoute path='/projects/new' exact strict WhichComponent={ProjectNew} />
        <PrivateRoute path='/projects/:id/play' exact strict WhichComponent={ProjectPlay} />
        <PrivateRoute path='/projects/:id/preferences' exact strict WhichComponent={ProjectPreferences} />
        <PrivateRoute path='/projects/:id' exact strict WhichComponent={ProjectProject} />
        <PrivateRoute path='/projects/:id/resources/:resourceId' exact strict WhichComponent={ProjectProject} />
        <PrivateRoute WhichComponent={Dashboard} />
      </Switch>
    </Router>
  </Fragment>
)

ReactDOM.render(app, document.getElementById('root'))
