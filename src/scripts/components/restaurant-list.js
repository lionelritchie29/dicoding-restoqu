import './restaurant-card.js';
import html from '../../templates/components/restaurant-list.html';
import scss from '../../styles/components/restaurant-list.scss';
import templateFactory from '../utils/template-factory.js';
import {createRestaurantCardSkeleton} from '../utils/skeleton-creator.js';

const template = templateFactory(html, scss);

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow( {mode: 'open'} );
    this.shadowDOM.appendChild(template.content.cloneNode(true));
    this._container = this.shadowDOM.querySelector('#inner-container');
    this._container.innerHTML = createRestaurantCardSkeleton(20);
  }

  set items(items) {
    this._items = items;
    this.render();
  }

  render() {
    this._container.innerHTML = '';
    this._items.forEach((item) => {
      const restaurantCardElement =
        document.createElement('restaurant-card');
      restaurantCardElement.item = item;
      this._container.appendChild(restaurantCardElement);
    });
  }

  removeHeader() {
    const h2 = this.shadowDOM.querySelector('h2');
    if (h2) {
      h2.parentNode.removeChild(h2);
    }
  }

  addRemoveBtns() {
    const restaurantCardElm =
      this.shadowDOM.querySelectorAll('restaurant-card');
    restaurantCardElm.forEach((card) => {
      card.addRemoveBtn();
      card.addDeleteListener();
    });
  }

  removeLoadingState() {
    const loadingHtml = this.shadowDOM.querySelector('.loading-container');
    loadingHtml.parentNode.removeChild(loadingHtml);
  }
}

customElements.define('restaurant-list', RestaurantList);
