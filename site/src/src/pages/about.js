import React from 'react'
import { Link } from 'gatsby'
import Page from '../Page'

import UL from '../components/UL'
import LeftRight from '../components/LeftRight'

const TITLE = 'About'

const ThisPage = () => (
  <Page  title={TITLE}>
    <h1>{TITLE}</h1>
    <p>
      Are you ready to make your own games and become the game boss?
    </p>
    <p>
      Gamepotion is the only free online game maker and game dev community.
    </p>
    <LeftRight>
      <div>
        <h2>Features overview</h2>
        <UL>
          <li>Make games for HTML5 (all modern browsers + iOS + Android)</li>
          <li>Use dozens of included images and sounds to get started</li>
          <li>Make your games come to life with drag-and-drop events, animation, physics and more</li>
          <li>Go all the way with advanced features like alarms, variables and debugging</li>
          <li>You can even run real JavaScript inside your games through a virtual machine</li>
        </UL>
      </div>
      <div>
        <h2>Who made Gamepotion? Why?</h2>
        <p>
          Hi! I'm <a href='https://jada.io'>James Garner</a>, founder of <a href='https://euphoricadventur.es'>Euphoric Adventures</a>. I have a decade-long history on the game dev scene, starting with DS Game Maker which I made when I was 12. By age 16 I'd sold over 1,500 licenses, but the DS started to show its age and to put a long story short, I grew up.
        </p>
        <p>
          But I didn't <em>give</em> up. So 8 years later, I made Gamepotion.
        </p>
        <p>
          I made it because I love making games. And I love seeing other people delight in showing their games to their friends.
        </p>
        <p>
          Some argue I made Gamepotion out of my own nostalgia. That's partially true but it doesn't tell the whole story. I'm a grown up now, so I see opportunities. My generation is "mobile first". They don't want to use a computer to make iPhone games; they want to do crazy things like make Nintendo Switch games on an iPad. That just wasn't possible &mdash; until now.
        </p>
        <p>
          Of course, none of this would be possible without other <Link to='/credits'>amazing people and projects</Link>.
        </p>
      </div>
    </LeftRight>
  </Page>
)

export default ThisPage
