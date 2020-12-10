/* eslint-disable linebreak-style */

// import '@babel/polyfill';
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/footer.scss';
import registerSw from '../scripts/utils/register-sw.js';

// import navHtml from '../templates/nav-footer/nav.html';
import footerHtml from '../templates/nav-footer/footer.html';

import App from './views/App.js';

const app = new App();

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('DOMContentLoaded', () => {
  // document.body.innerHTML = navHtml;
  // document.body.innerHTML += '<main id="content-wrap"></main>';
  document.body.innerHTML += footerHtml;
  const mainElement = document.querySelector('main');
  app.init(mainElement);
  app.renderPage();
  registerSw();
});

