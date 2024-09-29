// Views
import HomeView from './../views/home.view.js'
import LoaderView from './../views/loader.view.js'

/**
 * @class Router
 * @version 1.0
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
  loaderView({ loaderType, height, width } = {}) {
    const loaderView = new LoaderView({
      loaderType,
      height: height ? height : '3.8rem',
      width: width ? width : '3.8rem'
    })

    loaderView.setView(/*html*/ `<div class="loader__container"></div>`)
    loaderView.main()
  }

  /**
   * @public
   * @return {void}
   */
  homeView() {
    const homeView = new HomeView()

    homeView.setView(
      /*html*/ `
      <h1 class="title">Pago Móvil</h1>

      <small class="small">
        Gestionar los pagos móviles nunca había sido tan sencillo.
        <strong>$ Pay2m</strong> es la mejor opción. 😎🤑
      </small>

      <button type="button" class="btn" id="btn__modal">
        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Add_Plus"> <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#1d1e24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></g></svg>
        Afiliar
      </button>
    `.trim()
    )

    homeView.main()
  }
}
