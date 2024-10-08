'use strict'

// Hot Reload in Styles
import './../static/styles/main.css'

// Router
import Router from './router/index.js'

// Helpers
import { getRandomNumber } from './helpers/index.js'

/**
 * ### Possible values: 1000 - 2000 - 3000
 * @type {number}
 */
const RANDOM_MILLISECONDS = getRandomNumber(1, 3) * 1000

function main() {
  const router = new Router()
  const isUser = localStorage.getItem('pay2m_name') !== null

  if (!isUser) router.showIndexView()
  else router.showLoaderView()

  // Preload Styles - Dev Mode
  // document.head.lastElementChild.setAttribute('rel', 'preload')

  /** @return {void} */
  const app = () => {
    if (isUser) {
      router.removeView(1)
      router.showHomeView()
    }
  }

  if (isUser) {
    setTimeout(() => app(), RANDOM_MILLISECONDS)
    return
  }

  app()
}

// Run
document.addEventListener('DOMContentLoaded', main, false)
