import { font } from './styleAbstractions'

const injectCss = (css) => {
  const linkElement = document.createElement('link')
  linkElement.setAttribute('rel', 'stylesheet')
  linkElement.setAttribute('type', 'text/css')
  linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + encodeURIComponent(css))
  document.head.appendChild(linkElement)
}

class Notify {
  constructor () {
    this.element = null
    this.elementTimeout = null
    this.elementFadeOutTimeout = null
    injectCss(`
      @keyframes gmc-notification-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .gmc-notification-fade-in {
        animation: gmc-notification-fade-in 1s;
      }
      @keyframes gmc-notification-fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      .gmc-notification-fade-out {
        animation: gmc-notification-fade-out 1s;
      }
      .notification {
        position: fixed;
        z-index: 3;
        top: 0;
        left: 0;
        right: 0;
        box-shadow: 0 1px 3px rgba(172, 172, 172, 0.75);
        padding: 1rem;
        width: 100%;
        color: white;
        background-color: #666666;
        cursor: default;
        font-size: 15px;
        text-align: center;
        ${font}
      }
      .notification.good {
        color: white;
        background-color: #23cf5f;
      }
      .notification.bad {
        color: white;
        background-color: #e00040;
      }
    `)
  }

  show (dClass, message, howLong = 5000) {
    if (this.element !== null) {
      clearTimeout(this.elementTimeout)
      clearTimeout(this.elementFadeOutTimeout)
      this._removeElementByForce()
    }
    this.element = document.createElement('div')
    this.element.classList.add('notification')
    this.element.classList.add('gmc-notification-fade-in')
    this.element.classList.add(dClass)
    this.element.innerHTML = `<span>${message}</span>`
    document.body.appendChild(this.element)
    this.elementTimeout = setTimeout(() => {
      this._removeElement()
    }, howLong)
    this.element.onclick = () => {
      this._removeElement()
    }
  }

  good (message, howLong) {
    this.show('good', message, howLong)
  }

  bad (message, howLong) {
    this.show('bad', message, howLong)
  }

  _removeElement () {
    if (this.element === null) return
    this.element.classList.add('gmc-notification-fade-out')
    this.elementFadeOutTimeout = setTimeout(() => {
      this._removeElementByForce()
    }, 1000 * 0.9) // ???
  }

  _removeElementByForce () {
    if (this.element === null) return
    document.body.removeChild(this.element)
    this.element = null
  }
}

export default new Notify()
