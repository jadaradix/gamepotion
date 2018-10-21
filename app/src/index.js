import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends PureComponent {
  render() {
    return (
      <main>
        <p>Hello, World.</p>
      </main>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
