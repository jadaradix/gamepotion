import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const CustomHelmet = ({ title }) => {
  return (
    <Helmet
      defaultTitle="Game Maker Club"
      titleTemplate="%s | Game Maker Club"
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
