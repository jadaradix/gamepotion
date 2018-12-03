import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import './index.css'

import Home from './routes/Home'
import Module from './routes/Module'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/modules/:id' exact strict component={Module} />
        <Route component={Home} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
