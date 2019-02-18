import isInstanceIntersectingInstance from './isInstanceIntersectingInstance'

test('returns true for 2 intersecting instances', () => {
  const instance1 = {
    props: {
      x: 16,
      y: 16
    },
    getWidth() {
      return 32
    },
    getHeight() {
      return 32
    }
  }
  const instance2 = {
    props: {
      x: 24,
      y: 24
    },
    getWidth() {
      return 32
    },
    getHeight() {
      return 32
    }
  }

  const isIntersecting = isInstanceIntersectingInstance(instance1, instance2)
  expect(isIntersecting).toBe(true)
})

test('returns false for 2 not intersecting instances', () => {
  const instance1 = {
    props: {
      x: 16,
      y: 16
    },
    getWidth() {
      return 32
    },
    getHeight() {
      return 32
    }
  }
  const instance2 = {
    props: {
      x: 100,
      y: 100
    },
    getWidth() {
      return 32
    },
    getHeight() {
      return 32
    }
  }

  const isIntersecting = isInstanceIntersectingInstance(instance1, instance2)
  expect(isIntersecting).toBe(false)
})
