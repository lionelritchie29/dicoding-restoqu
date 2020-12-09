import favoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import ModalController from '../utils/modal-controller.js';

const FavoriteButtonController = {
  async init(restaurant) {
    this._restaurant = restaurant;

    await this._renderIcon();
  },

  async _renderIcon() {
    const {id} = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    return !!(await favoriteRestaurantIdb.getRestaurant(id));
  },

  _renderLiked() {
    const favBtnContainer = document.getElementById('add-fav-btn');
    const favBtnContainerMd = document.getElementById('add-fav-btn-md');
    favBtnContainer.innerHTML = '★';
    favBtnContainerMd.innerHTML = 'Remove from Favorite';

    this._addDeleteListener(favBtnContainer, favBtnContainerMd);
  },

  _renderLike() {
    const favBtnContainer = document.getElementById('add-fav-btn');
    const favBtnContainerMd = document.getElementById('add-fav-btn-md');
    favBtnContainer.innerHTML = '☆';
    favBtnContainerMd.innerHTML = 'Add to Favorite';
    this._addPutListener(favBtnContainer, favBtnContainerMd);
  },

  _addPutListener(favBtnContainer, favBtnContainerMd) {
    favBtnContainer.addEventListener('click', () => {
      favoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderIcon();
      this._showSuccessAddModal(this._restaurant.name);
    });

    favBtnContainerMd.addEventListener('click', () => {
      favoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderIcon();
      this._showSuccessAddModal(this._restaurant.name);
    });
  },

  _addDeleteListener(favBtnContainer, favBtnContainerMd) {
    favBtnContainer.addEventListener('click', () => {
      favoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderIcon();
      this._showSuccessRemoveModal(this._restaurant.name);
    });

    favBtnContainerMd.addEventListener('click', () => {
      favoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderIcon();
      this._showSuccessRemoveModal(this._restaurant.name);
    });
  },

  _showSuccessAddModal(restaurantName) {
    ModalController.show(
        '🤩',
        `${restaurantName} has 
         succesfully added to your favorite list!`);
  },

  _showSuccessRemoveModal(restaurantName) {
    ModalController.show(
        '🔥',
        `${restaurantName} has 
        succesfully removed from your favorite list!`);
  },
};

export default FavoriteButtonController;
