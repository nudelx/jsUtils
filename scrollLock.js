const preventDefault = function (e) { //eslint-disable-line
  e = e || window.event
  if (e.preventDefault) { e.preventDefault() }
  e.returnValue = false
}

const lockedScrollBehavior = function (e) { //eslint-disable-line
  preventDefault(e)
}

const unlockedScrollBehavior = function (e) { //eslint-disable-line
  this.scrollTop -= e.wheelDelta
}

const disableScrolling = function (el) { //eslint-disable-line
  if (el && el.addEventListener) {
    el.addEventListener('DOMMouseScroll', lockedScrollBehavior)
  }
  el.onwheel = lockedScrollBehavior
  el.ontouchmove = lockedScrollBehavior
}

const enableScrolling = function (el) { //eslint-disable-line
  if (el && el.addEventListener) {
    el.addEventListener('DOMMouseScroll', unlockedScrollBehavior)
  }
  el.onwheel = unlockedScrollBehavior
  el.onwheel = unlockedScrollBehavior
  el.ontouchmove = unlockedScrollBehavior
}

const ScrollLock = {
  lockElements: [],
  targetElements: [],
  setTarget (el) {
    if (el) {
      this.targetElements.push(el)
    }
  },
  pushLockElement (el) {
    if (el) {
      this.lockElements.push(el)
    }
  },
  eraseElements () {
    this.lockElements = []
  },
  lock () {
    const arrOfElem = this.lockElements || []
    arrOfElem.map((el) => {
        el.style.cssText = 'position: fixed; overflow-y: hidden'
        return null
    })
  },
  unlock () {
    const arrOfElem = this.lockElements || []
    arrOfElem.map(el => el.removeAttribute('style'))
  },
  hardLock () {
    const arrOfElem = this.lockElements || []
    const targets = this.targetElements || null
    arrOfElem.map(el => disableScrolling(el))
    targets.map(el => enableScrolling(el))
  },
  hardUnlock () {
    const arrOfElem = this.lockElements || []
    arrOfElem.map((el) => {
        if (el.removeEventListener) {
          el.removeEventListener('DOMMouseScroll', lockedScrollBehavior, false)
        }
        el.onwheel = null
        el.ontouchmove = null
        el.onmousewheel = null
        return null
    })
  }
}

export default ScrollLock

