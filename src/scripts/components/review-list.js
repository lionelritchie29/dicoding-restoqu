import './review-card.js';
import html from '../../templates/components/review-list.html';
import scss from '../../styles/components/review-list.scss';
import templateFactory from '../utils/template-factory.js';
import RestaurantData from '../data/restaurant-data.js';
import UrlParser from '../routes/url-parser.js';

const template = templateFactory(html, scss);
import {createReviewCardSkeleton} from '../utils/skeleton-creator.js';

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
    this.shadowDOM.appendChild(template.content.cloneNode(true));
    this._container = this.shadowDOM.querySelector('.detail-review__container');
    this._container.innerHTML = createReviewCardSkeleton(5);
    this.handleReviewForm();
  }

  set items(items) {
    this._items = items;
    this.render();
  }

  render() {
    this._container.innerHTML = '';
    this._items.forEach((item) => {
      const reviewCardElement = document.createElement('review-card');
      reviewCardElement.item = item;
      this._container.appendChild(reviewCardElement);
    });
  }

  handleReviewForm() {
    const formElm = this.shadowDOM.getElementById('review-form');
    const nameElm = this.shadowDOM.getElementById('reviewer-name');
    const reviewElm = this.shadowDOM.getElementById('review-box');

    formElm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (nameElm !== '' && reviewElm !== '') {
        const data = {
          id: UrlParser.parseActiveUrlWithoutCombiner().id,
          name: nameElm.value,
          review: reviewElm.value,
        };

        await RestaurantData.postRestaurantReview(data);
        nameElm.innerHTML = reviewElm.innerHTML = '';
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }
}

customElements.define('review-list', RestaurantList);
