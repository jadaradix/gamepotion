import React from 'react'
import Page from '../Page'

import LeftRight from '../components/LeftRight'
import UL from '../components/UL'

const TITLE = 'Credits'

const ThisPage = () => (
  <Page  title={TITLE}>
    <h1>{TITLE}</h1>
    <LeftRight>
      <div>
        <h2>People</h2>
        <UL>
          <li>Paul Newton, for backing me all the way through</li>
          <li>Rollo, for supporting me in building an architecture which inspired this one</li>
        </UL>
      </div>
      <div>
        <h2>Graphics</h2>
        <UL>
          <li>Reiner's Tilesets by <a href='https://www.reinerstilesets.de/graphics/2d-grafiken/2d-environment/'>Reiner "Tiles" Prokein</a></li>
          <li>Aquatic Pack, Asteroids Pack, Gobble Maze Pack, Shooter Pack and Space Pack by <a href='https://artibiotics.com/'>Ciléin Kearns</a></li>
        </UL>
      </div>
    </LeftRight>
  </Page>
)

export default ThisPage
