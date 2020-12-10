import html from '../../templates/components/restaurant-card.html';
import scss from '../../styles/components/restaurant-card.scss';
import templateFactory from '../utils/template-factory.js';
import truncateString from '../utils/truncate-string.js';
import API_ENDPOINT from '../globals/api-endpoint';
import favoriteRestaurantIdb from '../data/favorite-restaurant-idb';

const template = templateFactory(html, scss);

class RestaurantCard extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow( {mode: 'open'} );
    this.shadowDOM.appendChild(template.content.cloneNode(true));
  }

  set item(item) {
    this._item = item;
    this.render();
  }

  render() {
    this._setData();
    this._setImage();
  }

  _setData() {
    const cityNameElm = this.shadowDOM.querySelector('.restaurant__info__city');
    const restaurantNameElm = this.shadowDOM.querySelector('h3');
    const descriptionElm = this.shadowDOM.querySelector('p');
    const ratingElm = this.shadowDOM.querySelector('span');
    const linkElm = this.shadowDOM.querySelector('a');

    cityNameElm.innerHTML = this._item.city;
    restaurantNameElm.innerHTML = this._item.name;
    descriptionElm.innerHTML = truncateString(this._item.description);
    ratingElm.innerHTML = this._item.rating;
    linkElm.href = `/#/detail/${this._item.id}`;
  }

  _setImage() {
    const imgUrl = this._getImageUrl();
    const imgElement = this.shadowDOM.querySelector('#image');
    imgElement.src = imgUrl;
    imgElement.alt = this._item.name;
  }

  _getImageUrl() {
    const imageId = this._item.pictureId;
    const imgUrl = API_ENDPOINT.restaurantImgSmall(imageId);
    return imgUrl;
  }

  addDeleteListener() {
    const removeBtn = this.shadowDOM.querySelector('.remove-restaurant-btn');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        favoriteRestaurantIdb.deleteRestaurant(this._item.id);
        location.reload();
      });
    }
  }

  addRemoveBtn() {
    const restaurantCard = this.shadowDOM.querySelector('.restaurant');
    restaurantCard.innerHTML +=
      '<button class="remove-restaurant-btn">Remove</button>';
  }
}

customElements.define('restaurant-card', RestaurantCard);
