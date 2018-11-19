import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GameSpace from './GameSpace'

class Game extends Component {
  constructor() {
    super()
  }

  render() {
    console.warn('[Oscar] [Game] [render]')
    const foundStartSpace = this.props.resources.find(r => {
      return (r.type === 'space' && r.id === this.props.project.startSpace)
    })
    if (foundStartSpace === undefined) {
      console.error('[Oscar] [Game] [render] foundStartSpace is undefined; returning!')
      return
    }
    return (
      <GameSpace space={foundStartSpace} resources={this.props.resources} designMode={false} />
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
