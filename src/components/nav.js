'use strict'

import Component from './../common/component.js'

// Data
import { navTitle, navLinksData } from './../data/nav.js'

/**
 * ## Nav (nav)
 * @class
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class Nav extends Component {
  /**
   * @constructor
   * @param {string} [className='nav']
   * @param {Document|null} [parentElement=null]
   */
  constructor(className = 'nav', parentElement = null) {
    super('nav', parentElement)
    this.node.setAttribute('class', className)

    this.node.innerHTML = /*html*/ `
      <div class="nav__brand">
        <a href="/" class="nav__title" rel="noopener noreferrer" target="_self">
          ${navTitle}
        </a>
      </div>
      <ul class="nav__list">${this.#getNavLinks()}</ul>
    `
  }

  /**
   * @private
   * @return {string}
   */
  #getNavLinks() {
    let liElementsTemplate = ''

    this.#getDataOfNavLinks().forEach(
      ({ className, href, rel, target, value }) => {
        liElementsTemplate += /*html*/ `
        <li class="nav__item">
          <a
            href="${href}"
            class="${className}"
            rel="${rel}"
            target="${target}"
          >
            ${value}
          </a>
        </li>
        `
      }
    )

    return liElementsTemplate
  }

  /**
   * @private
   * @return {Array<{
   *   href: string,
   *   className: string,
   *   target: '_self'|'_blank',
   *   rel: 'noopener'|'noreferrer'|'noopener noreferrer',
   *   value: string
   * }>}
   */
  #getDataOfNavLinks() {
    return navLinksData
  }
}
