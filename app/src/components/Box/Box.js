import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

const StyledBox = styled.div`
  display: block;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgb(212, 212, 212);
  background-color: #f0f3f4;
`

const Box = ({ children, className }) => {
  return (
    <StyledBox className={classnames('component--box', className)}>
      {children}
    </StyledBox>
  )
}

Box.propTypes = {
  className: PropTypes.string
}

Box.defaultProps = {
  className: ''
}

export default Box
