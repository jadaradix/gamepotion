import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'

import Dashboard from './states/Dashboard.js'
import ProjectNew from './states/Project/New.js'
import ProjectProject from './states/Project/Project.js'
import ProjectPreferences from './states/Project/Preferences.js'
import Auth from './states/Auth.js'

import './index.css'

const router = (
  <Router>
    <Switch>
      <Route path='/dashboard' exact strict component={Dashboard} />
      <Route path='/project/new' exact strict component={ProjectNew} />
      <Route path='/project/preferences' exact strict component={ProjectPreferences} />
      <Route path='/project/:id' exact strict component={ProjectProject} />
      <Route path='/auth' exact strict component={Auth} />
      <Route component={Dashboard} />
    </Switch>
  </Router>
)

ReactDOM.render(router, document.getElementById('root'))
