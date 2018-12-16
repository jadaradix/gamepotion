const isInstanceIntersectingInstance = (instance1, instance2) => {
  // console.warn('[isInstanceIntersectingInstance] instance1/instance2', instance1, instance2)
  const r1X = instance1.props.x
  const r1Y = instance1.props.y
  const r1w = instance1.getWidth()
  const r1h = instance1.getHeight()

  const r2X = instance2.props.x
  const r2Y = instance2.props.y
  const r2w = instance2.getWidth()
  const r2h = instance2.getHeight()

  let big1 = r1h
  if (r1w > r1h) big1 = r1w

  let big2 = r2h
  if (r2w > r2h) big2 = r2w

  return !([
    (instance1 === instance2),
    (r1X + big1) < (r2X - big2),
    (r1X - big1) > (r2X + big2),
    (r1Y + big1) < (r2Y - big2),
    (r1Y - big1) > (r2Y + big2)
  ].some(a => a))
}

export default isInstanceIntersectingInstance
