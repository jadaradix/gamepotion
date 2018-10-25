import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import icons from '../icons'

import Heading1 from '../components/Heading1/Heading1'

const StyledResource = styled.div`
`

const Resource = ({ resource }) => {
  return (
    <StyledResource className='component--resource'>
      <Heading1>{resource.name}</Heading1>
    </StyledResource>
  )
}

Resource.propTypes = {
  resource: PropTypes.object
}

Resource.defaultProps = {
}

export default Resource
