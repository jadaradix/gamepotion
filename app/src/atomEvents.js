import classes from './classes'
const events = Object.values(classes.events).map(eventClass => {
  const event = new eventClass()
  return event.toApi()
})

export default events
