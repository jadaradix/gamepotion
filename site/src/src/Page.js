import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './Page.css'

const Page = ({ title, children }) => (
  <Fragment>
    <Helmet
      title={title}
    >
      <html lang="en" />
    </Helmet>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children}
    </div>
  </Fragment>
)

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Page
