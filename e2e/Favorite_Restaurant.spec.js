/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */

const assert = require('assert');
const {getFirstRestaurantDetailUrl} = require('./helpers/getFirstRestaurantDetailUrl');
const {getFirstRestaurantName} = require('./helpers/getFirstRestaurantName');

Feature('Favorite Restaurant');

Before((I) => {
  I.amOnPage('/#/favorites');
  I.see('You have not favorited any restaurant yet.', '.favorite-not-found p');
});

Scenario('Favoriting a Restaurant', async (I) => {
  I.amOnPage('/');
  // make sure that the 'restaurant-card' element
  // contains expected data, not skeleton
  I.dontSeeElement('img[alt="recommended skeleton"]');
  const url = await getFirstRestaurantDetailUrl(I);
  const testRestaurantNames = await getFirstRestaurantName(I);

  I.amOnPage(url);
  I.seeElement('#add-fav-btn-md');
  I.wait(2);
  I.click('#add-fav-btn-md');

  I.wait(2);
  I.amOnPage('/#/favorites');
  I.dontSeeElement('.favorite-not-found');
  const favoritedRestaurantName = await getFirstRestaurantName(I);
  assert.strictEqual(favoritedRestaurantName, testRestaurantNames);
});
