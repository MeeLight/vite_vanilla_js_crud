'use strict'

// Hot Reload in Styles
import './../static/styles/main.css'

// Components
import Modal from './components/modal.js'

const modal = new Modal()

modal.setAttribute('class', 'modal')

modal.setHtml(/*html*/ `
  <h1>Title</h1>

  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    Exercitationem incidunt corporis quos laborum perferendis velit quae,
    tempore ratione debitis dolorem cumque beatae mollitia minus facilis
    corrupti! Tempore vero ex repellat.
  </p>

  <form class="form form__dialog" method="dialog">
    <button class="btn btn__modal btn__gray--outline">Cancel</button>
    <button class="btn btn__modal btn__dark">Ok</button>
  </form>
`)


const mainElement = document.querySelector('main')

mainElement.appendChild(modal.getModal)

const btnModal = document.getElementById('btn__modal')
const dialog = document.querySelector('dialog')

// Actions
const clickBtnModalEvent = () => dialog.showModal()

// Events
btnModal.addEventListener('click', clickBtnModalEvent, false)
