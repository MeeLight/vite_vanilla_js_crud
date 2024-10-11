'use strict'

import Component from './../common/component.js'

// Data
// import { navTitle, navLinksData } from './../data/nav.js'

/**
 * ## Form (form)
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class Form extends Component {
  /**
   * @constructor
   * @param {{
   *   className?: string,
   *   id?: string,
   *   autocomplete?: 'on'|'off',
   *   action?: 'string',
   *   accept?: 'string',
   *   enctype?: 'application/x-www-form-urlencoded'|'multipart/form-data'|'text/plain',
   *   method?: 'dialog'|'post'|'get'
   * }}
   * @param {Document|null} [parentElement=null]
   */
  constructor(
    {
      className = 'form',
      autocomplete = '',
      accept = '',
      action = '',
      id = '',
      enctype = '',
      method = ''
    },
    parentElement = null
  ) {
    super('form', parentElement)
    this.node.setAttribute('class', `form ${className}`)
    if (autocomplete !== '') this.node.setAttribute('autocomplete', autocomplete)
    if (action !== '') this.node.setAttribute('action', action)
    if (accept !== '') this.node.setAttribute('accept', accept)
    if (id !== '') this.node.setAttribute('id', id)
    if (enctype !== '') this.node.setAttribute('enctype', enctype)
    if (method !== '') this.node.setAttribute('method', method)
  }
}
