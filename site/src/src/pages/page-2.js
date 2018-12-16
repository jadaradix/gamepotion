import React from 'react'
import { Link } from 'gatsby'
import Page from '../Page'

const TITLE = 'Page 2'

const ThisPage = () => (
  <Page  title={TITLE}>
    <h1>Hi from the second page</h1>
    <p>
      Welcome to page 2
    </p>
    <p>
      <Link to="/">Go back to the homepage</Link>
    </p>
  </Page>
)

export default ThisPage
