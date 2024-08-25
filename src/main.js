'use strict'

// Hot Reload in Styles
import './../static/styles/main.css'

const btnModal = document.getElementById('btn__modal')
const dialog = document.querySelector('dialog')

// Actions
const clickBtnModalEvent = () => dialog.showModal()

// Events
btnModal.addEventListener('click', clickBtnModalEvent, false)
