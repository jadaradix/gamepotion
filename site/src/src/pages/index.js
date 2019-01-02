import React from 'react'
import Page from '../Page'

import { appDashboard } from '../inter-router'
import LeftRight from '../components/LeftRight'
import UL from '../components/UL'
import Button from '../components/Button'

import screenshotSpace from '../images/screenshot-space.png'

const TITLE = 'Game Maker Club'

const ThisPage = () => (
  <Page
    metaTags={['game maker']}
    metaDescription='Free online game maker'
  >
    <LeftRight>
      <div>
        <img
          src={screenshotSpace}
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
          Join Game Maker Club, the only free online game maker and game dev community.
        </p>
        <Button route={appDashboard(process.env.NODE_ENV)}>Join now</Button>
        <h2>Did you know? It's free!</h2>
        <UL>
          <li>Joining is free forever &mdash; this isn't a trial</li>
          <li>There's nothing to install &mdash; Game Maker Club works completely in your browser</li>
          <li>You can make an unlimited number of games and share them with your friends (they don't need to join)</li>
          <li>If you like Game Maker Club, you can pay for Pro membership, removing pre-game advertising and unlocking unlimited resources</li>
        </UL>
      </div>
    </LeftRight>
  </Page>
)

export default ThisPage
