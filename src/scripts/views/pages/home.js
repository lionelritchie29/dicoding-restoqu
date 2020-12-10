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

    let url = '';
    if (window.innerWidth <= 480) {
      url = `url('images/heros/hero-image_2-small.jpg')`;
    } else if (window.innerWidth <= 800) {
      url = `url('images/heros/hero-image_2-medium.jpg')`;
    } else {
      url = `url('images/heros/hero-image_2-large.jpg')`;
    }

    hero.style.backgroundImage = url;
  },
};

export default Home;
