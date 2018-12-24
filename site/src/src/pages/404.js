import React from 'react'
import Page from '../Page'

const TITLE = 'Not Found'

const ThisPage = () => (
  <Page title={TITLE}>
    <h1>{TITLE}</h1>
    <p>That page doesn&#39;t exist.</p>
  </Page>
)

export default ThisPage
