import UrlParser from '../routes/url-parser.js';
import routes from '../routes/routes.js';
import toggleNavbar from '../utils/toggle-navbar.js';
import noDetailHtml from '../../templates/detail/no-detail.html';

class App {
  init(content) {
    toggleNavbar();
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    try {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } catch {
      this._content.innerHTML = noDetailHtml;
    }
  }
}

export default App;
