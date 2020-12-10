import '../../../styles/components/restaurant-list.scss';
import '../../../styles/home/hero.scss';
import '../../../styles/home/best-deal.scss';
import '../../../styles/home/recommended.scss';
import '../../../templates/home/hero.html';
import '../../components/restaurant-list.js';

import RestaurantData from '../../data/restaurant-data.js';
import heroHtml from '../../../templates/home/hero.html';
import bestDealHtml from '../../../templates/home/best-deal.html';
import recommendedHtml from '../../../templates/home/recommended.html';

import generateBestDeal from '../generate-best-deal.js';
import generateRecommended from '../generate-recommended.js';
const Home = {
  async render() {
    const template = this.generateTemplate();
    return template;
  },

  generateTemplate() {
    let template = '';
    template += heroHtml;
    template += bestDealHtml;
    template += '<restaurant-list></restaurant-list>';
    template += recommendedHtml;
    return template;
  },

  async afterRender() {
    generateBestDeal();
    this._setHeroImg();
    await this._generateRestaurant();
    generateRecommended();
  },

  async _generateRestaurant() {
    const restaurants = await RestaurantData.getRestaurants();
    const restaurantListElement = document.querySelector('restaurant-list');
    restaurantListElement.items = restaurants;
  },

  _setHeroImg() {
    const hero = document.querySelector('.hero');
    const size = this._getSize();
    const bgImg =
      `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),
       url('images/heros/hero-image_2-${size}.jpg')`;
    hero.style.backgroundImage = bgImg;
  },

  _getSize() {
    const width = window.innerWidth;
    return (width <= 480) ? 'small' : (width <= 800) ? 'medium' : 'large';
  },
};

export default Home;
