import React from 'react'
import styled from 'styled-components'

import icons from '../../icons'

const StyledLoading = styled.div`
  display: block;
  padding-top: 2rem;
  padding-bottom: 2rem;
  @keyframes gmc-loading { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
  @-webkit-keyframes gmc-loading { 100% { -webkit-transform: rotate(360deg); } }
  @-moz-keyframes gmc-loading { 100% { -moz-transform: rotate(360deg); } }
  // background-color: red;
  img {
    display: block;
    width: 2rem;
    margin: 0 auto 0 auto;
    animation: gmc-loading 4s linear infinite;
    // background-color: blue;
  }
`

const Box = () => {
  return (
    <StyledLoading className='component--loading'>
      <img src={icons.generic.loading} alt='' />
    </StyledLoading>
  )
}

export default Box
