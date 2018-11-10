import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom'

import api from './state/api.js'
import CustomHelment from './component-instances/CustomHelmet.js'

import Dashboard from './states/Dashboard.js'
import ProjectNew from './states/Project/New.js'
import ProjectProject from './states/Project/Project.js'
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
        <PrivateRoute path='/project/new' exact strict WhichComponent={ProjectNew} />
        <PrivateRoute path='/project/:id/preferences' exact strict WhichComponent={ProjectPreferences} />
        <PrivateRoute path='/project/:id' exact strict WhichComponent={ProjectProject} />
        <PrivateRoute WhichComponent={Dashboard} />
      </Switch>
    </Router>
  </Fragment>
)

ReactDOM.render(app, document.getElementById('root'))
