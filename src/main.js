'use strict'

// Hot Reload in Styles
import './../static/styles/main.css'

// Views
import HomeView from './views/home.view.js'
import LoaderView from './views/loader.view.js'

// Helpers
import { getRandomNumber } from './helpers/index.js'

const loaderView = new LoaderView({
  height: '3.8rem',
  width: '3.8rem'
})

loaderView.setView(/*html*/ `<div class="loader__container"></div>`)

const homeView = new HomeView()

homeView.setView(/*html*/ `
  <h1 class="title">Pago Móvil</h1>

  <small class="small">
    Gestionar los pagos móviles nunca había sido tan sencillo.
    <strong>$ Pay2m</strong> es la mejor opción. 😎🤑
  </small>

  <button type="button" class="btn" id="btn__modal">
    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#1d1e24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></g></svg>
    Afiliar
  </button>
`)

// Push | Loader View
document.addEventListener('DOMContentLoaded', loaderView.main(), false)

/**
 * ### Range: 1000 - 2000 - 3000
 * @type {number}
 */
const RANDOM_MILLISECONDS = getRandomNumber(1, 3) * 1000

// Run
setTimeout(() => {
  // Remove | Loader View
  document.body.removeChild(document.body.children[1])

  // Push | Home View
  document.addEventListener('DOMContentLoaded', homeView.main(), false)
}, RANDOM_MILLISECONDS)
