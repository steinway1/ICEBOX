import { unlockDataLockedInput } from './utils'

function bindUnlockDataLockedInput() {
  document.addEventListener('click', (e) => {
    const target = e.target
    if (target.hasAttribute('data-locked-input')) {
      unlockDataLockedInput(target)
    }
  })
}

export {
  bindUnlockDataLockedInput
}