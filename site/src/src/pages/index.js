import React from 'react'
import { Link } from 'gatsby'
import Page from '../Page'
import LeftRight from '../components/LeftRight'

const TITLE = 'Page 1'

const ThisPage = () => (
  <Page title={TITLE}>
    <LeftRight>
      <div>
        <h1>Hi!</h1>
        <p>
          Hello 1.
        </p>
        <p>
          <Link to="/page-2/">Go to page 2</Link>
        </p>
      </div>
      <div>
        <h1>Hi!</h1>
        <p>
          Hello 2.
        </p>
      </div>
    </LeftRight>
    <LeftRight>
      <div>
        <h1>Hi!</h1>
        <p>
          Hello 3.
        </p>
      </div>
      <div>
        <h1>Hi!</h1>
        <p>
          Hello 4.
        </p>
      </div>
    </LeftRight>
  </Page>
)

export default ThisPage
