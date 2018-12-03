import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import modules from '../modules'

import logo from '../images/logo.png'
import Modules from '../components/Modules'

const StyledRoute = styled.div`
  max-width: 480px;
  section + section {
    margin-top: 1.5rem;
  }
  a.logo {
    max-width: 256px;
    display: block;
    img {
      display: block;
      width: 100%;
    }
  }
  .component--modules {
    margin-top: 1rem;
  }
`

class Home extends React.PureComponent {
  render() {
    return (
      <StyledRoute>
        <section>
          <Link to='/' className='logo'>
            <img src={logo} alt='' />
          </Link>
          <Modules
            modules={modules}
          />
        </section>
      </StyledRoute>
    )
  }
}

export default Home
