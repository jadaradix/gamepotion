import React from 'react'
import Page from '../Page'

import { storeHome } from '../inter-router' 

const TITLE = 'Store'

const ThisPage = () => (
  <Page  title={TITLE}>
    <iframe
      style={{
        display: 'block',
        width: '100%',
        height: '800px'
      }}
      title='Store'
      src={storeHome(process.env.NODE_ENV)}
    />
  </Page>
)

export default ThisPage
