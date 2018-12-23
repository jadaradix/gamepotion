import React from 'react'
import Page from '../Page'

const TITLE = 'Credits'

const ThisPage = () => (
  <Page  title={TITLE}>
    <h1>{TITLE}</h1>
    <h2>People</h2>
    <ul>
      <li>Paul Newton, for backing me all the way through</li>
      <li>Rollo, for supporting me in building an architecture which inspired this one</li>
    </ul>
    <h2>Graphics</h2>
    <ul>
      <li>Reiner's Tilesets by <a href='https://www.reinerstilesets.de/graphics/2d-grafiken/2d-environment/'>Reiner "Tiles" Prokein</a></li>
      <li>Aquatic Pack, Asteroids Pack, Gobble Maze Pack, Shooter Pack and Space Scroller Pack by <a href='https://artibiotics.com/'>Ciléin Kearns</a></li>
    </ul>
  </Page>
)

export default ThisPage
