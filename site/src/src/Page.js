import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from './components/Header'
import Footer from './components/Footer'

import './Page.css'

const Page = ({ title = undefined, metaTags = [], metaDescription = undefined, children }) => (
  <Fragment>
    <Helmet
      title={typeof title === 'string' ? `${title} - Game Maker Club` : 'Game Maker Club'}
    >
      <html lang='en' />
      {Array.isArray(metaTags) && metaTags.length > 0 && <meta name='keywords' content={metaTags.join(', ')} />}
      {typeof metaDescription === 'string' && <meta name='description' content={metaDescription} />}
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
  title: PropTypes.string,
  metaTags: PropTypes.array,
  metaDescription: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Page