/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const assert = require('assert');
const {getFirstRestaurantDetailUrl} = require('./helpers/getFirstRestaurantDetailUrl');
const {getFirstRestaurantName} = require('./helpers/getFirstRestaurantName');

Feature('Unfavoriting Restaurant');

Before(async (I) => {
  I.amOnPage('/');
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

Scenario('Unfavoriting a Restaurant', async (I) => {
  I.executeScript(function() {
    const restaurantListElm = document.querySelector('restaurant-list');
    const restaurantCardElm = restaurantListElm.shadowRoot.querySelector('restaurant-card');
    const removeBtn = restaurantCardElm.shadowRoot.querySelector('.remove-restaurant-btn');
    removeBtn.dispatchEvent(new Event('click'));
  });

  I.see('You have not favorited any restaurant yet.', '.favorite-not-found p');
});


