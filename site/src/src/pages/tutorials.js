import React from 'react'
import Page from '../Page'
import Grid from '../components/Grid'
import Video from '../components/Video'

import videos from '../videos.json' 

const TITLE = 'Tutorials'

const ThisPage = () => {
  const tutorials = videos.filter(v => v.type === 'tutorial')

  return (
    <Page title={TITLE}>
      <Grid>
        {tutorials.map(tutorial => {
          const {
            id,
            name,
            description
          } = tutorial
          return (
            <Video
              key={id}
              id={id}
              name={name}
              description={description}
            />
          )
        })}
      </Grid>
    </Page>
  ) 
}

export default ThisPage

