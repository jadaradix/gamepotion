import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Banner from '../components/Banner/Banner'

const BuyModuleBanner = ({ moduleId, moduleName, verb }) => {
  return (
    <Banner>
      To {verb}, buy <Link to={`/store/${moduleId}`}>{moduleName}</Link> in the Store!
    </Banner>
  )
}

BuyModuleBanner.propTypes = {
  moduleId: PropTypes.string.isRequired,
  moduleName: PropTypes.string.isRequired,
  verb: PropTypes.string.isRequired
}

BuyModuleBanner.defaultProps = {
}

export default BuyModuleBanner
