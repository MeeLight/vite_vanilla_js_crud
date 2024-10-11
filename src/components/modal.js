'use strict'

import Component from './../common/component.js'

/**
 * ## Modal (dialog)
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class Modal extends Component {
  /**
   * @constructor
   * @param {Document|null} [parentElement=null]
   */
  constructor(parentElement = null) {
    super('dialog', parentElement)
    this.node.setAttribute('class', 'modal')
    this.node.setAttribute('draggable', 'false')
  }

  /**
   * @public
   * @return {void}
   */
  show() {
    this.node.showModal()
  }

  /**
   * @public
   * @param {Document} parentElement
   * @param {string} formClass
   * @param {() => void|null} callback
   * @return {void}
   */
  deleteOfDOM(parentElement, formClass, callback = null) {
    const MILLISECONDS = 401
    const _delete = () => parentElement.removeChild(this.node)

    this.node.querySelector(formClass).addEventListener(
      'submit',
      () =>
        setTimeout(() => {
          if (callback !== null) callback()
          _delete()
        }, MILLISECONDS),
      false
    )
  }
}
