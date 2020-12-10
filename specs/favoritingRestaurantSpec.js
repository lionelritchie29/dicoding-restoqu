/* eslint-disable max-len */
import favoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb.js';
import FavoriteButtonController from '../src/scripts/utils/favorite-button-controller.js';
import * as TestFactories from './helper/testFactories.js';

describe('Favorite a Restaurant', () => {
  it(`should show the favorite button and widget when the restaurant
    has not been favorited yet`, () => {
    TestFactories.createFavoriteButtonTemplate();
    expect(document.getElementById('add-fav-btn').innerHTML).toEqual('☆');
    expect(document.getElementById('add-fav-btn-md').innerHTML).toEqual('Add to Favorite');
  });

  it(`should not show the remove from favorite button and widget when
    then restaurant has not been favorited`, () => {
    TestFactories.createFavoriteButtonTemplate();
    expect(document.getElementById('add-fav-btn').innerHTML).not.toEqual('★');
    expect(document.getElementById('add-fav-btn-md').innerHTML).not.toEqual('Remove from Favorite');
  });

  it('should be able to favorite the restaurant', async () => {
    TestFactories.createFavoriteButtonAndModalTemplate();
    await FavoriteButtonController.init({id: 1});

    document.querySelector('#add-fav-btn-md').dispatchEvent(new Event('click'));
    const restaurant = await favoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({id: 1});
    await favoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not favorite a restaurant when a restaurant has already favorited', async () => {
    TestFactories.createFavoriteButtonAndModalTemplate();

    await FavoriteButtonController.init({id: 1});
    document.querySelector('#add-fav-btn-md').dispatchEvent(new Event('click'));
    await favoriteRestaurantIdb.putRestaurant({id: 1});

    expect(await favoriteRestaurantIdb.getAllRestaurants()).toEqual([{id: 1}]);
    await favoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not favorite a restaurant when it has no id', async() => {
    TestFactories.createFavoriteButtonAndModalTemplate();

    document.querySelector('#add-fav-btn-md').dispatchEvent(new Event('click'));
    expect(await favoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
