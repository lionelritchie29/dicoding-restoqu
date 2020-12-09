import '../../../styles/detail/heading.scss';
import '../../../styles/detail/detail.scss';
import '../../../styles/detail/no-detail.scss';
import '../../../styles/components/review-list.scss';
import '../../components/review-list.js';

import headingHtml from '../../../templates/detail/heading.html';
import detailHtml from '../../../templates/detail/detail.html';
import noDetailHtml from '../../../templates/detail/no-detail.html';
import RestaurantData from '../../data/restaurant-data';
import API_ENDPOINT from '../../globals/api-endpoint';
import UrlParser from '../../routes/url-parser';
import AccordionController from '../../utils/accordion-controller';
import FavoriteButtonController from '../../utils/favorite-button-controller';

const Detail = {
  async render() {
    const template = await this.generateTemplate();
    return template;
  },

  async generateTemplate() {
    let template = '';
    template += headingHtml;
    template += detailHtml;
    template += '<review-list></review-list>';
    return template;
  },

  async afterRender() {
    window.scrollTo(0, 0);
    const restaurantId = UrlParser.parseActiveUrlWithoutCombiner().id;
    const restaurant = await this._generateData(restaurantId);
    if (restaurant) {
      await this._setData(restaurant);
      AccordionController.init();
      await FavoriteButtonController.init(restaurant);
    } else {
      this._showOfflinePage();
    }
  },

  async _generateData(restaurantId) {
    const restaurant =
      await RestaurantData.getRestaurantById(restaurantId);
    return restaurant;
  },

  async _setData(restaurant) {
    const cityElm = document.getElementById('restaurant-city');
    const nameElm = document.getElementById('restaurant-name');
    const imgElm = document.getElementById('restaurant-image');
    const descElm = document.getElementById('restaurant-description');
    const ratingElm = document.getElementById('restaurant-rating');

    cityElm.innerHTML = restaurant.city;
    nameElm.innerHTML = restaurant.name;
    imgElm.src = API_ENDPOINT.restaurantImgMed(restaurant.pictureId);
    imgElm.alt = restaurant.name;
    descElm.innerHTML = restaurant.description;
    ratingElm.innerHTML = restaurant.rating;

    await this._setAccordionData(restaurant);
    await this._setReviewData(restaurant);
  },

  async _setAccordionData(restaurant) {
    const addressElm = document.getElementById('restaurant-address');
    const categoryElm = document.getElementById('restaurant-category');
    const foodsElm = document.getElementById('restaurant-foods');
    const drinksElm = document.getElementById('restaurant-drinks');

    addressElm.innerHTML = restaurant.address;

    categoryElm.innerHTML = '';
    restaurant.categories.forEach((category) => {
      categoryElm.innerHTML += `<li> ${category.name} </li>`;
    });

    foodsElm.innerHTML = '';
    restaurant.menus.foods.forEach((food) => {
      foodsElm.innerHTML += `<li> ${food.name} </li>`;
    });

    drinksElm.innerHTML = '';
    restaurant.menus.drinks.forEach((drink) => {
      drinksElm.innerHTML += `<li> ${drink.name} </li>`;
    });
  },

  async _setReviewData(restaurant) {
    const reviewListElm = document.querySelector('review-list');
    reviewListElm.items = restaurant.customerReviews;
  },

  _showOfflinePage() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = noDetailHtml;
  },
};

export default Detail;
