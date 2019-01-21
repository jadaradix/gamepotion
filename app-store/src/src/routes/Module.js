import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import modules from '../modules'
import getBoughtModuleIds from '../getBoughtModuleIds'
import buy from '../buy'
import { font } from '../styleAbstractions'
import formatPrice from '../formatPrice'

import Heading1 from '../components/Heading1'
import Button from '../react-components/Button/Button'

const StyledRoute = styled.div`
  .component--heading1 + .actions {
    margin-top: 1rem;
  }
  .actions {
    .component--button {
      display: inline-block;
    }
    .component--button:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
  .actions + .description {
    margin-top: 2rem;
  }
  .description {
    p {
      ${font}
    }
    ul {
      padding-left: 2rem;
      li {
        ${font}
      }
    }
  }
`

class Module extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentModule: modules[process.env.NODE_ENV].find(m => m.id === this.props.match.params.id),
      boughtModuleIds: [],
      authenticated: undefined
    }
    this.buy = this.buy.bind(this)
  }

  componentDidMount() {
    getBoughtModuleIds()
      .then(boughtModuleIds => {
        this.setState({
          authenticated: true,
          boughtModuleIds
        })
      })
      .catch(() => {
        this.setState({
          authenticated: false
        })
      })
  }

  buy() {
    buy(this.state.currentModule)
  }

  render() {
    const {
      currentModule,
      boughtModuleIds,
      authenticated
    } = this.state

    if (currentModule === undefined) {
      return <Redirect to='/' />
    }
    if (typeof authenticated !== 'boolean') {
      return null
    }

    const price = formatPrice(currentModule.price)
    const hasBought = boughtModuleIds.includes(currentModule.id)

    return (
      <StyledRoute>
        <section>
          <Heading1>{currentModule.name}</Heading1>
          <div className='actions'>
            {authenticated && !hasBought && <Button onClick={this.buy}>Buy now ({price})</Button>}
            {/* {authenticated && hasBought && <Button disabled onClick={this.buy}>Purchased</Button>} */}
            <Button route='/' flavour='weak'>Go back</Button>
          </div>
          <div className='description' dangerouslySetInnerHTML={{__html: currentModule.description}} />
        </section>
      </StyledRoute>
    )
  }
}

export default Module
