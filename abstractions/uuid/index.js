const uuid = () => {

  const randomBytesToUuid = (buf, offset) => {
    const byteToHex = []
    for (let b = 0; b < 256; ++b) {
      byteToHex[b] = (b + 0x100).toString(16).substring(1)
    }
    let i = offset || 0
    let bth = byteToHex
    return bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]]
  }
  
  const getRandomBytes = () => {
    const getRandomValues = (typeof(window.crypto) != 'undefined' && window.crypto.getRandomValues) || (typeof(window.msCrypto) != 'undefined' && window.msCrypto.getRandomValues)
    if (typeof require === 'function') {
      const crypto = require('crypto')
      return crypto.randomBytes(16)
    } else if (getRandomValues) {
      return getRandomValues(16)
    } else {
      const randomBytes = new Array(16)
      for (let i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000
        randomBytes[i] = r >>> ((i & 0x03) << 3) & 0xff
      }
      return randomBytes
    }
  }

  const randomBytes = getRandomBytes()
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80
  return randomBytesToUuid(randomBytes)
}

export default uuid
