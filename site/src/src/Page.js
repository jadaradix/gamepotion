import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from './components/Header'
import Footer from './components/Footer'

import './Page.css'

const Page = ({ title, children }) => (
  <Fragment>
    <Helmet
      title={`${title} - Game Maker Club`}
    >
      <html lang="en" />
    </Helmet>
    <Header />
    <main>
      <div>
        {children}
      </div>
    </main>
    <Footer />
  </Fragment>
)

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Page