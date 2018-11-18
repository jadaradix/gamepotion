import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GameSpace from './GameSpace'

class Game extends Component {
  constructor() {
    super()
  }

  render() {
    console.warn('[Oscar] [Game] [render]')
    return (
      <div />
    )
  }
}

Game.propTypes = {
  project: PropTypes.any.isRequired,
  resources: PropTypes.array.isRequired
}

Game.defaultProps = {
}

export default Game
