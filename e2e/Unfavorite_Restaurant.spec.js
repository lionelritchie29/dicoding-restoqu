/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const assert = require('assert');

Feature('Unfavoriting Restaurant');

Before(async (I) => {
  I.amOnPage('/');
  I.dontSeeElement('img[alt="recommended skeleton"]');
  const url = await getRestaurantDetailUrl(I);
  const testRestaurantNames = await getFirstRestaurantNames(I);

  I.amOnPage(url);
  I.seeElement('#add-fav-btn-md');
  I.wait(2);
  I.click('#add-fav-btn-md');

  I.wait(2);
  I.amOnPage('/#/favorites');
  I.dontSeeElement('.favorite-not-found');
  const favoritedRestaurantName = await getFirstRestaurantNames(I);
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

const getRestaurantDetailUrl = async (I) => {
  const res = await I.executeScript(function() {
    const restaurantListElm = document.querySelector('restaurant-list');
    const restaurantCardElm = restaurantListElm.shadowRoot.querySelector('restaurant-card');
    const anchorTag = restaurantCardElm.shadowRoot.querySelector('.restaurant__info__more a');
    const url = anchorTag.getAttribute('href');
    return url;
  });

  return res;
};

const getFirstRestaurantNames = async (I) => {
  const names = await I.executeScript(function() {
    const restaurantListElm = document.querySelector('restaurant-list');
    const restaurantCardElm = restaurantListElm.shadowRoot.querySelector('restaurant-card');
    const restaurantName = restaurantCardElm.shadowRoot.querySelector('h3').innerHTML;
    return restaurantName;
  });

  return names;
};
