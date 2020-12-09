/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
Feature('Post Review');

Before(async (I) => {
  I.amOnPage('/');
  I.waitForElement('.recommended-image', 5);
  const url = await getRestaurantDetailUrl(I);
  I.amOnPage(url);
});

Scenario('Post a review to a restaurant', async (I) => {
  I.waitForElement('review-list');

  await I.executeScript(function() {
    const reviewListElm = document.querySelector('review-list');
    const addReviewContainer = reviewListElm.shadowRoot.querySelector('.detail-review__add');
    const nameInput = addReviewContainer.querySelector('#reviewer-name');
    const reviewsInput = addReviewContainer.querySelector('#review-box');
    const form = addReviewContainer.querySelector('#review-form');

    nameInput.value = 'Brodi';
    reviewsInput.value = 'Hai apa kabar';

    console.log(form);
    setTimeout(() => {
      setTimeout(() => {
        form.dispatchEvent(new Event('submit'));
        console.log('clicked');
      }, 3000);
      window.scrollTo(0, document.body.scrollHeight);
      console.log('scrolled bottom');
    }, 3000);
  });

  I.waitForText('Post Review Success!', 10, '#modal-content');
});

const getRestaurantDetailUrl = async (I) => {
  const res = await I.executeScript(function() {
    const restaurantListElm = document.querySelector('restaurant-list');
    const restaurantCardElm = restaurantListElm.shadowRoot.querySelectorAll('restaurant-card')[1];
    const anchorTag = restaurantCardElm.shadowRoot.querySelector('.restaurant__info__more a');
    const url = anchorTag.getAttribute('href');
    return url;
  });

  return res;
};