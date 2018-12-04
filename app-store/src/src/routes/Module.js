import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import modules from '../modules'
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

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const currentModule = modules.find(m => m.id === this.props.match.params.id)
    if (currentModule === undefined) {
      return <Redirect to='/' />
    }

    return (
      <StyledRoute>
        <section>
          <Heading1>{currentModule.name}</Heading1>
          <div className='actions'>
            <Button disabled>Buy now ({currentModule.price})</Button>
            <Button route='/' flavour='weak'>Go back</Button>
          </div>
          <div className='description' dangerouslySetInnerHTML={{__html: currentModule.description}} />
        </section>
      </StyledRoute>
    )
  }
}

export default Home
