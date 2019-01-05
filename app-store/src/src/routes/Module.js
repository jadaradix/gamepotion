import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import modules from '../modules'
import buy from '../buy'
import { font } from '../styleAbstractions'

import Heading1 from '../components/Heading1'
import Button from '../components/Button'

const StyledRoute = styled.div`
  .component--heading1 + .actions {
    margin-top: 1rem;
  }
  .actions {
    .component--button {
      display: inline-block;
    }
    .component--button:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
  .actions + .description {
    margin-top: 2rem;
  }
  .description {
    p {
      ${font}
    }
  }
`

class Module extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentModule: modules[process.env.NODE_ENV].find(m => m.id === this.props.match.params.id)
    }
    this.buy = this.buy.bind(this)
  }

  buy() {
    buy(this.state.currentModule)
  }

  render() {
    const {
      currentModule
    } = this.state
    if (currentModule === undefined) {
      return <Redirect to='/' />
    }

    const hasBought = false

    return (
      <StyledRoute>
        <section>
          <Heading1>{currentModule.name}</Heading1>
          <div className='actions'>
            <Button disabled={hasBought} onClick={this.buy}>Buy now ({currentModule.price})</Button>
            <Button route='/' flavour='weak'>Go back</Button>
          </div>
          <div className='description' dangerouslySetInnerHTML={{__html: currentModule.description}} />
        </section>
      </StyledRoute>
    )
  }
}

export default Module
