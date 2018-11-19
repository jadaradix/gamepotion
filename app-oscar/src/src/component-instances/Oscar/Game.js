import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GameSpace from './GameSpace'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      space: this.getSpace(this.props.project.startSpace)
    }
    this.onSwitchSpace = this.onSwitchSpace.bind(this)
  }

  onSwitchSpace(id) {
    console.warn('[Oscar] [Game] [onSwitchSpace]', id)
    this.setState({
      space: this.getSpace(id)
    })
  }

  getSpace(id) {
    const foundStartSpace = this.props.resources.find(r => {
      return (r.type === 'space' && r.id === id)
    })
    if (foundStartSpace === undefined) {
      console.error('[Oscar] [Game] [render] foundStartSpace is undefined; returning!')
      return null
    }
    return foundStartSpace
  }

  render() {
    console.warn('[Oscar] [Game] [render] this.state.space', this.state.space)

    if (this.state.space === null) {
      return null
    }

    return (
      <GameSpace space={this.state.space} resources={this.props.resources} onSwitchSpace={this.onSwitchSpace} />
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
