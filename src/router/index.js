'use strict'

// Views
import HomeView from './../views/home.view.js'
import LoaderView from './../views/loader.view.js'

/**
 * @class Router
 * @version 1.1
 * @author Moises Reyes - [Github](https://github.com/MeeLight)
 */
export default class Router {
  /** @constructor */
  constructor() {}

  /**
   * @public
   * @param {number} viewIndex
   * @return {void}
   */
  removeView(viewIndex = 1) {
    document.body.removeChild(document.body.children[viewIndex])
  }

  /**
   * @public
   * @param {{
   *   loaderType: 'default'|'ellipsis',
   *   height:     string,
   *   width:      string
   * }}
   * @return {void}
   */
  showLoaderView({ loaderType, height, width } = {}) {
    const loaderView = new LoaderView({
      loaderType,
      height: height ? height : '3.8rem',
      width: width ? width : '3.8rem'
    })

    loaderView.main()
  }

  /**
   * @public
   * @return {void}
   */
  showHomeView() {
    const homeView = new HomeView()
    homeView.main()
  }
}
