import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'

const StyledFooter = styled.footer`
  padding: 2rem;
  background-color: #c0cdd1;
  div {
    max-width: 984px;
    margin: 0 auto 0 auto;
  }
  ul {
    list-style-type: none;
    background-color: red;
    li {
      padding: 0.25rem;
      background-color: pink;
      a {
        color: #2e3131;
        text-decoration: none;
      }
    }
    li + li {
      margin-top: 0.5rem;
    }
  }
  ul + ul {
    margin-top: 2rem;
  }
  @media screen and (min-width: 540px) {
    ul {
      display: inline-block;
      width: 214px;
    }
    ul + ul {
      margin-top: 0;
      margin-left: 2rem;
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <ul>
          <li><Link to='/page1'>Page 1</Link></li>
          <li><Link to='/page2'>Page 2</Link></li>
          <li><Link to='/page3'>Page 3</Link></li>
        </ul>
        <ul>
          <li><Link to='/page4'>Page 4</Link></li>
          <li><Link to='/page5'>Page 5</Link></li>
          <li><Link to='/page6'>Page 6</Link></li>
        </ul>
      </div>
    </StyledFooter>
  )
}

export default Footer
