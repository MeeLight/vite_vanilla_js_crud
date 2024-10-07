'use strict'

// Hot Reload in Styles
import './../static/styles/main.css'

// Router
import Router from './router/index.js'

// Config
// import { customFetch } from './helpers/fetch.js'

// Helpers
import { getRandomNumber } from './helpers/index.js'

// Model Temporary
import PagoMovilModel from './models/pagoMovil.model.js'

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

  // Preload Styles
  document.head.lastElementChild.setAttribute('rel', 'preload')

  /** @return {void} */
  const app = () => {
    if (isUser) {
      router.removeView(1)
      router.showHomeView()
    }

    const pagoMovil = new PagoMovilModel({
      document: '284666697',
      alias: 'Moises Reyes',
      numberPhone: '04120519181',
      bank: {
        code: '0102',
        name: 'Banco de Venezuela',
        rif: 'G200099976'
      }
    })

    console.log(pagoMovil)
  }

  if (isUser) {
    setTimeout(() => app(), RANDOM_MILLISECONDS)
    return
  }

  app()
}

// Run
document.addEventListener('DOMContentLoaded', main(), false)
