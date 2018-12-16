import React from 'react'
import { Link } from 'gatsby'
import Page from '../Page'

const TITLE = 'Page 1'

const ThisPage = () => (
  <Page title={TITLE}>
    <h1>Hi!</h1>
    <p>Welcome to the website.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Page>
)

export default ThisPage
