import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import './index.css'

import Projects from './states/Projects.js'
import NewProject from './states/NewProject.js'
import Preferences from './states/Preferences.js'

const router = (
  <Router>
    <div>
      <Switch>
        <Route path='/projects' exact strict component={Projects} />
        <Route path='/projects/new' exact strict component={NewProject} />
        <Route path='/preferences' component={Preferences} />
        <Route component={Projects} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(router, document.getElementById('root'))
