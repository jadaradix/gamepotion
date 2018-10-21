import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import './index.css'

import Projects from './states/Projects.js'
import NewProject from './states/NewProject.js'
import Project from './states/Project.js'

const router = (
  <Router>
    <div>
      <Switch>
        <Route path='/projects' exact strict component={Projects} />
        <Route path='/projects/new' exact strict component={NewProject} />
        <Route path='/projects/:projectId' component={Project} />
        <Route component={Projects} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(router, document.getElementById('root'))
