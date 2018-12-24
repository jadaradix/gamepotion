import React from 'react'
import Page from '../Page'
import Grid from '../components/Grid'

import videos from '../videos.json' 

const TITLE = 'Tutorials'

const ThisPage = () => {
  const tutorials = videos.filter(v => v.type === 'tutorial')

  return (
    <Page title={TITLE}>
      <Grid>
        {tutorials.map(tutorial => {
          return (
            <div key={tutorial.id}>
              <h1>{tutorial.name}</h1>
            </div>
          )
        })}
      </Grid>
    </Page>
  ) 
}

export default ThisPage

