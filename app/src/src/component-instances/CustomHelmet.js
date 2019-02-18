import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const CustomHelmet = ({ title }) => {
  return (
    <Helmet
      defaultTitle={process.env.REACT_APP_NAME}
      titleTemplate={`%s | ${process.env.REACT_APP_NAME}`}
    >
      <title>{title}</title>
    </Helmet>
  )
}

CustomHelmet.propTypes = {
  title: PropTypes.string
}

CustomHelmet.defaultProps = {
}

export default CustomHelmet
