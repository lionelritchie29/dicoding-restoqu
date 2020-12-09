/* eslint-disable linebreak-style */

// import '@babel/polyfill';
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/footer.scss';
import registerSw from '../scripts/utils/register-sw.js';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit.js';

import App from './views/App.js';

const app = new App();

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  const mainElement = document.querySelector('main');
  app.init(mainElement);
  app.renderPage();
  registerSw();
});

