import '../../../styles/favorite/heading.scss';
import '../../../styles/favorite/no-favorite.scss';

import headingHtml from '../../../templates/favorite/heading.html';
import noFavoriteHtml from '../../../templates/favorite/no-favorite.html';
import favoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Favorite = {
  async render() {
    let template = '';
    template += headingHtml;
    template += noFavoriteHtml;
    // template += '<restaurant-list></restaurant-list>';
    return template;
  },

  async afterRender() {
    const items = await favoriteRestaurantIdb.getAllRestaurants();
    if (items.length > 0) {
      const restaurantListElm = document.createElement('restaurant-list');
      document.querySelector('main').appendChild(restaurantListElm);
      restaurantListElm.items = items;
      restaurantListElm.addRemoveBtns();
      restaurantListElm.removeHeader();
      document.querySelector('main').
          removeChild(document.querySelector('.favorite-not-found'));
    }
  },
};

export default Favorite;
