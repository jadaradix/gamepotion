import React from 'react'
import Page from '../Page'

import { appDashboard } from '../inter-router'
import LeftRight from '../components/LeftRight'
import UL from '../components/UL'
import Button from '../components/Button'

import screenshotSpace from '../images/screenshot-space.png'

const TITLE = 'Gamepotion'

const ThisPage = () => (
  <Page
    metaTags={['game maker']}
    metaDescription='Free online game maker'
  >
    <LeftRight>
      <div>
        <img
          src={screenshotSpace}
          alt='Gamepotion'
          style={{
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            borderRadius: '4px'
          }}
        />
      </div>
      <div>
        <p>
          Are you ready to make your own games and become the game boss?
        </p>
        <p>
          Get Gamepotion, the best free online game maker and game dev community.
        </p>
        <Button route={appDashboard(process.env.NODE_ENV)}>Sign up</Button>
        <h2>It's free!</h2>
        <UL>
          <li>Gamepotion is free forever &mdash; this isn't a trial</li>
          <li>There's nothing to install &mdash; Gamepotion works completely in your browser</li>
          <li>You can make an unlimited number of games and share them with your friends (they don't need to join)</li>
          <li>If you like Gamepotion, you can pay for Pro, removing pre-game advertising and unlocking unlimited game resources</li>
        </UL>
      </div>
    </LeftRight>
  </Page>
)

export default ThisPage
