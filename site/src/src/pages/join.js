import React from 'react'
import Page from '../Page'
import LeftRight from '../components/LeftRight'

import { appDashboard } from '../inter-router' 

import app from '../images/app.png'

const TITLE = 'Join'

const ThisPage = () => (
  <Page  title={TITLE}>
    <LeftRight>
      <div>
        <img
          src={app}
          alt='Game Maker Club'
          style={{
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            borderRadius: '4px'
          }}
        />
      </div>
      <div>
        <h1>{TITLE}</h1>
        <p>
          Are you ready to make your own games and become the game boss?
        </p>
        <p>
          <a href={appDashboard(process.env.NODE_ENV)} target='_blank'>Join now</a> for free.
        </p>
      </div>
    </LeftRight>
  </Page>
)

export default ThisPage
