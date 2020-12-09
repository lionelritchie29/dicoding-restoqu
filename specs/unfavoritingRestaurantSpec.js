/* eslint-disable max-len */
import favoriteRestaurantIdb
  from '../src/scripts/data/favorite-restaurant-idb.js';
import FavoriteButtonController
  from '../src/scripts/utils/favorite-button-controller.js';
import * as TestFactories from './helper/testFactories.js';

describe('Unfavoriting a Restaurant', () => {
  it('should show remove from favorite button and widget', () => {
    TestFactories.createUnfavoriteButtonTemplate();

    expect(document.getElementById('add-fav-btn').innerHTML).toEqual('★');
    expect(document.getElementById('add-fav-btn-md').innerHTML)
        .toEqual('Remove from Favorite');
  });

  it('should not show remove from favorite button and widget when the restaurant has not been favorited', () => {
    TestFactories.createUnfavoriteButtonTemplate();

    expect(document.getElementById('add-fav-btn').innerHTML).not.toEqual('☆');
    expect(document.getElementById('add-fav-btn-md').innerHTML)
        .not.toEqual('Add to Favorite');
  });

  it('should be able to unfavorite a restaurant', async () => {
    TestFactories.createFavoriteButtonAndModalTemplate();

    await favoriteRestaurantIdb.putRestaurant({id: 1});
    await FavoriteButtonController.init({id: 1});

    document.querySelector('#add-fav-btn-md').dispatchEvent(new Event('click'));
    expect(await favoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unfavorited restaurant is not in the list', async () => {
    TestFactories.createFavoriteButtonAndModalTemplate();

    await favoriteRestaurantIdb.putRestaurant({id: 1});
    await FavoriteButtonController.init({id: 1});

    await favoriteRestaurantIdb.deleteRestaurant(1);
    document.querySelector('#add-fav-btn-md').dispatchEvent(new Event('click'));
    expect(await favoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
